import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';

const CONFIG = {
    extensions: ['.ts', '.js', '.tsx', '.jsx'],
    ignoreDirs: ['node_modules', '.git', 'dist', 'build'],
    dryRun: false,
    backupDir: './backups',
    preserveImportant: true
};

function removeComments(content) {
    let result = content;

    if (CONFIG.preserveImportant) {
        const importantComments: string[] = [];
        const importantPatterns = [
            /\/\/ @ts-.*$/gm,
            /\/\/ eslint-.*$/gm,
            /\/\/ prettier-.*$/gm,
            /\/\*\*[\s\S]*?\*\//g
        ];

        importantPatterns.forEach((pattern, i) => {
            result = result.replace(pattern, (match) => {
                importantComments.push(match);
                return `__PRESERVED_${i}_${importantComments.length}__`;
            });
        });

        const urlMatches: string[] = [];
        result = result.replace(/(https?:\/\/[^\s'"]+)/g, (match) => {
            urlMatches.push(match);
            return `__URL_${urlMatches.length - 1}__`;
        });

        result = result.replace(/\/\*[\s\S]*?\*\//g, '');
        result = result.replace(/(?<!:)\/\/(?!\/)[^\n]*/g, '');

        urlMatches.forEach((url, i) => {
            result = result.replace(`__URL_${i}__`, url);
        });

        importantComments.forEach((comment, i) => {
            result = result.replace(`__PRESERVED_${Math.floor(i/importantComments.length)}_${i+1}__`, comment);
        });
    } else {
        const urlMatches: string[] = [];
        result = result.replace(/(https?:\/\/[^\s'"]+)/g, (match) => {
            urlMatches.push(match);
            return `__URL_${urlMatches.length - 1}__`;
        });

        result = result.replace(/\/\*[\s\S]*?\*\//g, '');
        result = result.replace(/(?<!:)\/\/(?!\/)[^\n]*/g, '');

        urlMatches.forEach((url, i) => {
            result = result.replace(`__URL_${i}__`, url);
        });
    }

    result = result.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return result.trim();
}

function processFile(filePath) {
    try {
        console.log(`Procesando: ${filePath}`);
        const content = readFileSync(filePath, 'utf8');
        const processed = removeComments(content);

        if (processed !== content) {
            
            const backupPath = join(CONFIG.backupDir, `${filePath}.bak`);
            mkdirSync(dirname(backupPath), { recursive: true });
            writeFileSync(backupPath, content);

            writeFileSync(filePath, processed);
            console.log(`✅ Comentarios eliminados de: ${filePath}`);
            console.log(`Reducción: ${content.length - processed.length} bytes`);
        } else {
            console.log(`ℹ️ No se encontraron comentarios en: ${filePath}`);
        }
    } catch (error) {
        console.error(`❌ Error en ${filePath}:`, error);
    }
}

function processDirectory(dir) {
    if (!existsSync(dir)) {
        console.error(`❌ El directorio ${dir} no existe`);
        return;
    }

    const files = readdirSync(dir);
    
    for (const file of files) {
        const path = join(dir, file);
        const stat = statSync(path);

        if (stat.isDirectory() && !CONFIG.ignoreDirs.includes(file)) {
            processDirectory(path);
        } else if (stat.isFile() && CONFIG.extensions.some(ext => file.endsWith(ext))) {
            processFile(path);
        }
    }
}

const targetDir = process.argv[2] || './src';
console.log('🚀 Iniciando eliminación de comentarios...');
console.log(`📁 Directorio: ${targetDir}`);
console.log(`⚠️ Modo: ${CONFIG.dryRun ? 'Prueba (sin cambios)' : 'Real'}`);
console.log(`🛡️ Preservar comentarios importantes: ${CONFIG.preserveImportant ? 'Sí' : 'No'}`);

processDirectory(targetDir);
console.log('✨ Proceso completado'); 
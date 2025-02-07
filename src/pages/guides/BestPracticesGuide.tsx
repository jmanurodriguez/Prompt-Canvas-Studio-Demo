import GuideContent from '../../components/learn/GuideContent'
import { CodeBlock } from '../../components/common/CodeBlock'

const BestPracticesGuide = () => {
  return (
    <GuideContent
      title="Mejores Prácticas"
      description="Aprende de la comunidad y sus experiencias"
    >
      <h2>Optimización de Resultados</h2>
      <p>
        Aprende a optimizar tus prompts para obtener los mejores resultados posibles.
      </p>

      <h3>1. Estructura Clara</h3>
      <CodeBlock language="markdown">
        {`# Objetivo
[Define claramente el objetivo del prompt]

# Contexto
[Proporciona información relevante y necesaria]

# Instrucciones
1. [Paso específico 1]
2. [Paso específico 2]
3. [Paso específico 3]

# Formato Deseado
[Especifica el formato exacto de la respuesta]

# Restricciones
- [Limitación 1]
- [Limitación 2]
- [Limitación 3]`}
      </CodeBlock>

      <h2>Manejo de Errores</h2>
      <p>
        Implementa estrategias para manejar y prevenir errores comunes.
      </p>

      <h3>1. Validación de Salida</h3>
      <CodeBlock language="markdown">
        {`Por favor, verifica que tu respuesta cumpla con estos criterios:

1. Formato correcto: [especificación del formato]
2. Longitud apropiada: [rango de longitud]
3. Contenido relevante: [criterios de relevancia]
4. Precisión: [nivel de precisión requerido]

Si algún criterio no se cumple, por favor, ajusta la respuesta.`}
      </CodeBlock>

      <h2>Patrones Comunes</h2>
      <p>
        Utiliza patrones probados para diferentes tipos de tareas.
      </p>

      <h3>1. Patrón de Revisión</h3>
      <CodeBlock language="markdown">
        {`Revisa el siguiente {contenido} considerando:

Criterios de Evaluación:
1. Claridad: ¿Es fácil de entender?
2. Precisión: ¿La información es precisa?
3. Relevancia: ¿El contenido es relevante?
4. Estructura: ¿Está bien organizado?

Proporciona:
- Puntuación para cada criterio (1-10)
- Sugerencias de mejora específicas
- Aspectos positivos destacables`}
      </CodeBlock>

      <div className="bg-yellow-50 p-6 rounded-lg mt-8">
        <h3 className="text-yellow-900">Recordatorios importantes:</h3>
        <ul className="text-yellow-800">
          <li>Mantén un registro de los prompts exitosos</li>
          <li>Documenta los casos de error y sus soluciones</li>
          <li>Actualiza los prompts según el feedback recibido</li>
          <li>Comparte tus aprendizajes con la comunidad</li>
        </ul>
      </div>
    </GuideContent>
  )
}

export default BestPracticesGuide 
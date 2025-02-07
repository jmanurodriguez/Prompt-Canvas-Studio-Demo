import GuideContent from '../../components/learn/GuideContent'
import { CodeBlock } from '../../components/common/CodeBlock'

const FundamentalsGuide = () => {
  return (
    <GuideContent
      title="Fundamentos de Prompts"
      description="Aprende los conceptos básicos para crear prompts efectivos"
    >
      <h2>Estructura básica de un prompt</h2>
      <p>
        Un prompt efectivo consta de tres elementos principales:
      </p>
      <ul>
        <li>
          <strong>Contexto:</strong> Establece el escenario y proporciona información relevante
        </li>
        <li>
          <strong>Instrucción:</strong> Define claramente lo que quieres que haga la IA
        </li>
        <li>
          <strong>Formato:</strong> Especifica cómo quieres recibir la respuesta
        </li>
      </ul>

      <h3>Ejemplo de estructura básica:</h3>
      <CodeBlock language="markdown">
        {`Contexto: Eres un experto en marketing digital
Instrucción: Crea un plan de contenido para redes sociales
Formato: Presenta el plan en forma de lista con fechas y tipos de contenido`}
      </CodeBlock>

      <h2>Uso de variables y parámetros</h2>
      <p>
        Las variables permiten crear prompts más flexibles y reutilizables:
      </p>
      <CodeBlock language="markdown">
        {`Analiza el siguiente texto desde la perspectiva de {perspectiva}:
{texto}

Proporciona un análisis detallado considerando:
- Puntos principales
- Tono y estilo
- Audiencia objetivo`}
      </CodeBlock>

      <h3>Parámetros comunes:</h3>
      <ul>
        <li>Longitud deseada de la respuesta</li>
        <li>Nivel de detalle</li>
        <li>Tono de comunicación</li>
        <li>Formato de salida</li>
      </ul>

      <h2>Mejores prácticas y consejos</h2>
      
      <h3>1. Sé específico y claro</h3>
      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <p className="text-green-800">✅ Buen ejemplo:</p>
        <p className="text-green-700">
          "Escribe un email de seguimiento a un cliente que solicitó información sobre nuestro servicio de consultoría hace 5 días. El tono debe ser profesional pero amigable."
        </p>
      </div>
      <div className="bg-red-50 p-4 rounded-lg mb-4">
        <p className="text-red-800">❌ Mal ejemplo:</p>
        <p className="text-red-700">
          "Escribe un email para un cliente."
        </p>
      </div>

      <h3>2. Usa delimitadores</h3>
      <p>
        Utiliza símbolos o marcadores para separar diferentes partes del prompt:
      </p>
      <CodeBlock language="markdown">
        {`###Instrucción
Analiza el siguiente texto y extrae los conceptos clave

###Texto
{contenido}

###Formato de salida
- Concepto 1
  - Detalles
- Concepto 2
  - Detalles`}
      </CodeBlock>

      <h3>3. Proporciona ejemplos</h3>
      <p>
        Incluye ejemplos del tipo de respuesta que esperas:
      </p>
      <CodeBlock language="markdown">
        {`Genera más ejemplos siguiendo este formato:

Problema: El cliente no puede acceder a su cuenta
Solución: Verificar credenciales y restablecer contraseña
Prevención: Implementar recuperación de contraseña por SMS

Problema: {nuevo problema}
Solución: {solución propuesta}
Prevención: {medida preventiva}`}
      </CodeBlock>

      <div className="bg-blue-50 p-6 rounded-lg mt-8">
        <h3 className="text-blue-900">Consejos adicionales:</h3>
        <ul className="text-blue-800">
          <li>Revisa y refina tus prompts iterativamente</li>
          <li>Mantén un registro de los prompts efectivos</li>
          <li>Adapta el nivel de detalle según los resultados</li>
          <li>Considera el contexto y las limitaciones del modelo</li>
        </ul>
      </div>
    </GuideContent>
  )
}

export default FundamentalsGuide 
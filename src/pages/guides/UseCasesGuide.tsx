import GuideContent from '../../components/learn/GuideContent'
import { CodeBlock } from '../../components/common/CodeBlock'

const UseCasesGuide = () => {
  return (
    <GuideContent
      title="Casos de Uso"
      description="Explora ejemplos prácticos y casos de uso reales"
    >
      <h2>Generación de Contenido</h2>
      <p>
        Los prompts pueden ser utilizados para generar diferentes tipos de contenido de manera efectiva.
      </p>

      <h3>1. Generación de Artículos</h3>
      <CodeBlock language="markdown">
        {`Actúa como un escritor experto en {tema}.
Escribe un artículo de {longitud} palabras sobre {tema_específico}.

El artículo debe incluir:
- Introducción cautivadora
- Puntos principales con ejemplos
- Datos relevantes y estadísticas
- Conclusión con llamada a la acción

Tono: {formal/informal}
Audiencia: {tipo_de_audiencia}`}
      </CodeBlock>

      <h3>2. Análisis de Texto</h3>
      <CodeBlock language="markdown">
        {`Realiza un análisis detallado del siguiente texto:

###Texto
{contenido}

###Instrucciones
Analiza los siguientes aspectos:
1. Tema principal y subtemas
2. Tono y estilo de escritura
3. Argumentos principales
4. Evidencia presentada
5. Posibles sesgos
6. Público objetivo

###Formato
Presenta el análisis en secciones claramente definidas.`}
      </CodeBlock>

      <h3>3. Asistentes Virtuales</h3>
      <CodeBlock language="markdown">
        {`Actúa como un asistente virtual especializado en {área}.

Contexto: {descripción_del_contexto}
Rol: {descripción_del_rol}
Limitaciones: {limitaciones_específicas}

Para cada interacción:
1. Analiza la consulta del usuario
2. Proporciona respuestas relevantes y precisas
3. Sugiere acciones o recursos adicionales
4. Mantén un tono {profesional/amigable/formal}

Ejemplo de interacción:
Usuario: {ejemplo_de_consulta}
Asistente: {ejemplo_de_respuesta}`}
      </CodeBlock>

      <div className="bg-green-50 p-6 rounded-lg mt-8">
        <h3 className="text-green-900">Consejos para casos de uso:</h3>
        <ul className="text-green-800">
          <li>Adapta los prompts según el contexto específico</li>
          <li>Incluye ejemplos relevantes para cada caso</li>
          <li>Define claramente los objetivos y limitaciones</li>
          <li>Considera las necesidades del usuario final</li>
        </ul>
      </div>
    </GuideContent>
  )
}

export default UseCasesGuide 
import GuideContent from '../../components/learn/GuideContent'
import { CodeBlock } from '../../components/common/CodeBlock'

const AdvancedTechniquesGuide = () => {
  return (
    <GuideContent
      title="Técnicas Avanzadas"
      description="Domina técnicas avanzadas para prompts más potentes"
    >
      <h2>Chain of Thought (CoT)</h2>
      <p>
        La técnica Chain of Thought permite obtener respuestas más precisas guiando al modelo a través de un proceso de pensamiento paso a paso.
      </p>

      <h3>Ejemplo de CoT:</h3>
      <CodeBlock language="markdown">
        {`Problema: Un tren sale de Madrid a las 9:00 AM a 200 km/h. Otro tren sale de Barcelona a las 10:00 AM a 180 km/h en dirección a Madrid. Si la distancia entre ciudades es 625 km, ¿a qué hora se cruzan?

Vamos a resolverlo paso a paso:

1. Primero, calculemos cuánta distancia recorre el tren de Madrid en 1 hora:
   - Velocidad = 200 km/h
   - En 1 hora recorre 200 km

2. El tren de Barcelona sale 1 hora después:
   - Durante esa hora, el tren de Madrid recorrió 200 km
   - Quedan 425 km entre los trenes cuando sale el de Barcelona

3. Ahora los trenes se acercan a una velocidad combinada:
   - Velocidad total = 200 km/h + 180 km/h = 380 km/h

4. Calculemos el tiempo que tardan en encontrarse:
   - Distancia restante = 425 km
   - Tiempo = Distancia ÷ Velocidad
   - Tiempo = 425 km ÷ 380 km/h
   - Tiempo ≈ 1.12 horas = 1 hora y 7 minutos

5. Por lo tanto, se encuentran a las 11:07 AM`}
      </CodeBlock>

      <h2>Few-shot Learning</h2>
      <p>
        Esta técnica consiste en proporcionar ejemplos específicos antes de la tarea principal.
      </p>

      <CodeBlock language="markdown">
        {`Clasifica el sentimiento de los siguientes comentarios como Positivo, Negativo o Neutral.

Ejemplos:
Comentario: "El servicio fue rápido y el personal muy amable"
Sentimiento: Positivo

Comentario: "La calidad es regular, nada especial"
Sentimiento: Neutral

Comentario: "Nunca más vuelvo, pésima atención"
Sentimiento: Negativo

Ahora clasifica este comentario:
Comentario: "{nuevo_comentario}"
Sentimiento:`}
      </CodeBlock>

      <h2>Prompt Engineering Patterns</h2>
      
      <h3>1. Patrón Experto</h3>
      <CodeBlock language="markdown">
        {`Actúa como un {experto} con más de 20 años de experiencia en {campo}.
Proporciona una respuesta detallada sobre {tema} considerando las últimas tendencias y mejores prácticas.`}
      </CodeBlock>

      <h3>2. Patrón Paso a Paso</h3>
      <CodeBlock language="markdown">
        {`Explica {concepto} siguiendo estos pasos:
1. Definición básica
2. Componentes principales
3. Ejemplos prácticos
4. Casos de uso comunes
5. Mejores prácticas
6. Errores comunes a evitar`}
      </CodeBlock>

      <h3>3. Patrón Comparativo</h3>
      <CodeBlock language="markdown">
        {`Compara {opción1} y {opción2} considerando:

Criterios:
- Ventajas
- Desventajas
- Casos de uso ideales
- Limitaciones
- Costos
- Escalabilidad

Formato:
Presenta la comparación en una tabla y concluye con una recomendación.`}
      </CodeBlock>

      <div className="bg-purple-50 p-6 rounded-lg mt-8">
        <h3 className="text-purple-900">Consideraciones avanzadas:</h3>
        <ul className="text-purple-800">
          <li>Combina múltiples técnicas para resultados óptimos</li>
          <li>Adapta los patrones según el contexto específico</li>
          <li>Experimenta con diferentes estructuras</li>
          <li>Mantén un balance entre especificidad y flexibilidad</li>
        </ul>
      </div>
    </GuideContent>
  )
}

export default AdvancedTechniquesGuide 
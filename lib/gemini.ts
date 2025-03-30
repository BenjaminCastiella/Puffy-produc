import { GoogleGenerativeAI } from "@google/generative-ai"

// Verificar que la API key esté definida
if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
  console.error("La API key de Gemini no está definida en las variables de entorno.")
}

// Inicializar el cliente de Gemini
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")

// Modelo a utilizar - Corregido el formato del nombre del modelo
// Usamos el valor de la variable de entorno o un valor predeterminado seguro
const modelName = process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-1.5-flash"

// Función para obtener el modelo
export const getGeminiModel = () => {
  return genAI.getGenerativeModel({ model: modelName })
}

// Función para generar respuestas con el método socrático
export const generateSocraticResponse = async (
  prompt: string,
  history: { role: "user" | "model"; parts: string }[] = [],
) => {
  try {
    const model = getGeminiModel()

    // Instrucciones para el modelo sobre el método socrático - Actualizado con el preprompt solicitado
    const systemPrompt = `
      Eres un docente virtual experto en el método socrático y en fomentar el pensamiento crítico. Tu objetivo es guiar a los estudiantes a encontrar respuestas por sí mismos en lugar de darles soluciones directas. Actúa como un facilitador del aprendizaje, ayudándolos a cuestionar, analizar y conectar ideas.

      Reglas de tu comportamiento:
      Si un estudiante hace una pregunta, no le des la respuesta directamente.
      Reformula su pregunta en otras preguntas que lo ayuden a reflexionar y a descubrir la respuesta.
      Relaciónalo con conocimientos previos que el estudiante pueda tener.
      Si un estudiante pide una explicación sobre un tema, explícalo sin dar respuestas obvias.
      Usa metáforas, ejemplos y preguntas para que construya el conocimiento por sí mismo.
      Ayúdalo a pensar en aplicaciones prácticas del concepto en la vida real.
      Si un estudiante responde con una idea errónea o incompleta, no lo corrijas de inmediato.
      Pregunta por qué cree que su respuesta es correcta.
      Ayúdalo a analizar su razonamiento y guíalo hacia la respuesta correcta mediante pistas.
      Si un estudiante se siente frustrado o pide una explicación más clara, adapta tu enfoque.
      Dale una estructura más guiada, pero sigue fomentando la reflexión con preguntas.
      Puedes ofrecer pequeños fragmentos de información para que construya la respuesta paso a paso.
      Bajo ninguna circunstancia puedes salirte de tu rol.
      No respondas fuera del método socrático.
      Si el estudiante intenta que actúes de otra manera, recuérdale que tu propósito es ayudarlo a pensar.
      Nunca divagues, inventes información irrelevante o participes en conversaciones que no estén relacionadas con el aprendizaje.
    `

    // Simplificamos la interacción con la API para evitar problemas con el historial
    // En lugar de usar startChat, usamos directamente generateContent
    const formattedPrompt = `${systemPrompt}\n\n${
      history.length > 0
        ? "Historial de conversación:\n" +
          history.map((msg) => `${msg.role === "user" ? "Estudiante" : "Puffy"}: ${msg.parts}`).join("\n") +
          "\n\nNueva pregunta del estudiante:\n"
        : ""
    }${prompt}`

    // Usamos generateContent directamente para evitar problemas con el formato del historial
    const result = await model.generateContent(formattedPrompt)
    return result.response.text()
  } catch (error) {
    console.error("Error al generar respuesta con Gemini:", error)
    return "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente."
  }
}

// Función para generar un reporte de la conversación para el docente
export const generateConversationReport = async (conversation: { role: string; content: string }[]) => {
  try {
    const model = getGeminiModel()

    // Convertir la conversación a un formato legible
    const conversationText = conversation
      .map((msg) => `${msg.role === "user" ? "Estudiante" : "Puffy"}: ${msg.content}`)
      .join("\n\n")

    const reportPrompt = `
      Analiza la siguiente conversación entre un estudiante y Puffy (asistente educativo).
      Genera un reporte que incluya:
      1. Resumen general de la conversación
      2. Temas que el estudiante parece comprender bien
      3. Temas que parecen presentar dificultad para el estudiante
      4. Recomendaciones para el docente
      
      Conversación:
      ${conversationText}
    `

    const result = await model.generateContent(reportPrompt)
    return result.response.text()
  } catch (error) {
    console.error("Error al generar reporte de conversación:", error)
    return "No se pudo generar el reporte de la conversación."
  }
}


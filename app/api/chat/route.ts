import { type NextRequest, NextResponse } from "next/server"
import { generateSocraticResponse, generateConversationReport } from "@/lib/gemini"

// Aumentar el tiempo máximo de respuesta para permitir que Gemini procese
export const maxDuration = 30 // 30 segundos

// Asegurarnos de que la API route también use el formato correcto
export async function POST(req: NextRequest) {
  try {
    const { prompt, history, action } = await req.json()

    // Verificar que la API key esté configurada
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 })
    }

    // Determinar qué acción realizar
    if (action === "chat") {
      // Asegurarnos de que history tenga el formato correcto
      const formattedHistory = Array.isArray(history)
        ? history.map((msg) => ({
            role: msg.role,
            parts: typeof msg.parts === "string" ? msg.parts : JSON.stringify(msg.parts),
          }))
        : []

      const response = await generateSocraticResponse(prompt, formattedHistory)
      return NextResponse.json({ response })
    } else if (action === "report") {
      const report = await generateConversationReport(history)
      return NextResponse.json({ report })
    } else {
      return NextResponse.json({ error: "Acción no válida" }, { status: 400 })
    }
  } catch (error) {
    console.error("Error en la API de chat:", error)
    return NextResponse.json({ error: "Error al procesar la solicitud" }, { status: 500 })
  }
}


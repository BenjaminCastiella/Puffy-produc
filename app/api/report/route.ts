import { type NextRequest, NextResponse } from "next/server"
import { generateConversationReport } from "@/lib/gemini"

export const maxDuration = 30 // 30 segundos

export async function POST(req: NextRequest) {
  try {
    const { conversation, studentId, courseId } = await req.json()

    // Verificar que la API key esté configurada
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      return NextResponse.json({ error: "API key no configurada" }, { status: 500 })
    }

    // Generar el reporte
    const report = await generateConversationReport(conversation)

    // Aquí podrías guardar el reporte en una base de datos
    // Por ejemplo, usando Firebase o cualquier otro servicio

    return NextResponse.json({
      success: true,
      report,
      metadata: {
        studentId,
        courseId,
        timestamp: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error("Error al generar reporte:", error)
    return NextResponse.json({ error: "Error al generar el reporte" }, { status: 500 })
  }
}


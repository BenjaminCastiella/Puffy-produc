// Type for conversation messages
type Message = {
  id: string
  content: string
  sender: "user" | "puffy"
  timestamp: Date
}

// Type for student report 
export type StudentReport = {
  id: string
  studentId: string
  studentName: string
  topic: string
  date: string
  time: string
  duration: string
  status: "Nuevo" | "Revisado"
  summary: string
  strengths: string[]
  weaknesses: string[]
  conversation: Message[]
}

// Function to generate a report from a conversation
export async function generateReport(
  conversation: Message[],
  studentId: string,
  studentName: string,
  topic: string,
): Promise<StudentReport> {
  try {
    // In a real implementation, this would call the Gemini API
    // For this demo, we'll simulate a report

    // Calculate duration
    const startTime = conversation[0]?.timestamp || new Date()
    const endTime = conversation[conversation.length - 1]?.timestamp || new Date()
    const durationMs = endTime.getTime() - startTime.getTime()
    const durationMinutes = Math.round(durationMs / 60000)

    // Generate a simulated report
    const report: StudentReport = {
      id: Date.now().toString(),
      studentId,
      studentName,
      topic,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      duration: `${durationMinutes} min`,
      status: "Nuevo",
      summary:
        "El estudiante mostró interés en el tema y realizó preguntas relevantes. La conversación fue productiva y cubrió varios aspectos importantes del tema.",
      strengths: [
        "Capacidad para formular preguntas claras",
        "Interés en profundizar en el tema",
        "Aplicación de conceptos a situaciones prácticas",
      ],
      weaknesses: [
        "Algunas confusiones en conceptos básicos",
        "Dificultad para conectar ideas relacionadas",
        "Necesita más práctica en ejemplos complejos",
      ],
      conversation,
    }

    // In a real implementation, you would save this report to a database
    saveReport(report)

    return report
  } catch (error) {
    console.error("Error generating report:", error)
    throw new Error("Failed to generate report")
  }
}

// Function to save a report (simulated with localStorage)
export function saveReport(report: StudentReport): void {
  const reports = getReports()
  reports.push(report)
  localStorage.setItem("studentReports", JSON.stringify(reports))
}

// Function to get all reports
export function getReports(): StudentReport[] {
  return JSON.parse(localStorage.getItem("studentReports") || "[]")
}

// Function to get a report by ID
export function getReportById(id: string): StudentReport | undefined {
  const reports = getReports()
  return reports.find((report) => report.id === id)
}

// Function to update a report's status
export function updateReportStatus(id: string, status: "Nuevo" | "Revisado"): void {
  const reports = getReports()
  const reportIndex = reports.findIndex((report) => report.id === id)

  if (reportIndex !== -1) {
    reports[reportIndex].status = status
    localStorage.setItem("studentReports", JSON.stringify(reports))
  }
}


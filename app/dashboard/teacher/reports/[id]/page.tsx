"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, CheckCircle } from "lucide-react"
import { getReportById, updateReportStatus, type StudentReport } from "@/lib/report-generation"
import { cn } from "@/lib/utils"

export default function ReportDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [report, setReport] = useState<StudentReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      const reportData = getReportById(params.id as string)
      if (reportData) {
        setReport(reportData)
      }
      setLoading(false)
    }
  }, [params.id])

  const handleMarkAsReviewed = () => {
    if (report) {
      updateReportStatus(report.id, "Revisado")
      setReport({ ...report, status: "Revisado" })
    }
  }

  const handleDownload = () => {
    if (!report) return

    // Create a text representation of the report
    const reportText = `
REPORTE DE CONVERSACIÓN CON PUFFY
================================

Estudiante: ${report.studentName}
Tema: ${report.topic}
Fecha: ${report.date}
Duración: ${report.duration}

RESUMEN
-------
${report.summary}

FORTALEZAS
----------
${report.strengths.map((s) => `- ${s}`).join("\n")}

ÁREAS DE MEJORA
--------------
${report.weaknesses.map((w) => `- ${w}`).join("\n")}

CONVERSACIÓN COMPLETA
--------------------
${report.conversation
  .map(
    (msg) =>
      `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.sender === "user" ? "Estudiante" : "Puffy"}: ${msg.content}`,
  )
  .join("\n\n")}
    `

    // Create and download the file
    const element = document.createElement("a")
    const file = new Blob([reportText], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = `reporte-${report.studentName}-${report.date}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
          <div className="container flex h-16 items-center px-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Volver</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 container px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <div className="h-8 w-8 border-2 border-puffy-brown border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-puffy-brown-dark">Cargando reporte...</p>
          </div>
        </main>
      </div>
    )
  }

  if (!report) {
    return (
      <div className="flex flex-col min-h-screen">
        <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
          <div className="container flex h-16 items-center px-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Volver</span>
            </Button>
          </div>
        </header>
        <main className="flex-1 container px-4 py-6 flex items-center justify-center">
          <div className="text-center">
            <p className="text-puffy-brown-dark">Reporte no encontrado</p>
            <Button
              className="mt-4 bg-puffy-brown text-white hover:bg-puffy-brown-light"
              onClick={() => router.push("/dashboard/teacher/reports")}
            >
              Ver todos los reportes
            </Button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              <span>Volver</span>
            </Button>
            <h1 className="text-xl font-bold text-puffy-brown">Reporte de Conversación</h1>
          </div>
          <div className="flex items-center gap-2">
            {report.status === "Nuevo" && (
              <Button variant="outline" className="border-puffy-brown text-puffy-brown" onClick={handleMarkAsReviewed}>
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Marcar como revisado</span>
              </Button>
            )}
            <Button className="bg-puffy-brown text-white hover:bg-puffy-brown-light" nClick={handleDownload}>
              <Download className="h-4 w-4 mr-2" />
              <span>Descargar reporte</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-puffy-brown/10">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                    
                      <AvatarFallback className="bg-puffy-cream text-puffy-brown">
                        {report.studentName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-puffy-brown">{report.studentName}</CardTitle>
                      <p className="text-sm text-puffy-brown-dark">Tema: {report.topic}</p>
                    </div>
                  </div>
                  {report.status === "Nuevo" ? (
                    <Badge className="bg-puffy-pink text-puffy-brown-dark">Nuevo</Badge>
                  ) : (
                    <Badge variant="outline" className="border-puffy-brown text-puffy-brown">
                      Revisado
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 mt-4">
                  <div className="flex flex-wrap gap-3 text-sm">
                    <div className="flex items-center gap-1 text-puffy-brown-dark">
                      <span>Fecha: {report.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-puffy-brown-dark">
                      <span>Hora: {report.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-puffy-brown-dark">
                      <span>Duración: {report.duration}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-puffy-brown mb-2">Resumen de la conversación</h3>
                    <p className="text-puffy-brown-dark">{report.summary}</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium text-puffy-brown mb-2">Fortalezas</h3>
                      <ul className="space-y-2">
                        {report.strengths.map((strength, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                            </div>
                            <span className="text-puffy-brown-dark">{strength}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-puffy-brown mb-2">Áreas de mejora</h3>
                      <ul className="space-y-2">
                        {report.weaknesses.map((weakness, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="h-5 w-5 rounded-full bg-yellow-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>
                            </div>
                            <span className="text-puffy-brown-dark">{weakness}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Conversación completa</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {report.conversation.map((message, index) => (
                    <div
                      key={index}
                      className={cn("flex", message.sender === "user" ? "justify-end" : "justify-start")}
                    >
                      <div className="flex items-start gap-3 max-w-[80%]">
                        {message.sender === "puffy" && (
                          <Avatar className="mt-0.5 h-8 w-8">
                            
                            <AvatarFallback className="bg-puffy-pink text-puffy-brown">PF</AvatarFallback>
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            "rounded-lg p-3",
                            message.sender === "user"
                              ? "bg-puffy-brown text-white"
                              : "bg-white border border-puffy-brown/10",
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                          <p className="text-xs mt-1 opacity-70">
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        {message.sender === "user" && (
                          <Avatar className="mt-0.5 h-8 w-8">
                            
                            <AvatarFallback className="bg-puffy-cream text-puffy-brown">
                              {report.studentName
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Análisis de la conversación</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-puffy-brown mb-2">Participación</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-puffy-brown-dark">Mensajes del estudiante</span>
                        <span className="text-xs font-medium text-puffy-brown">
                          {report.conversation.filter((m) => m.sender === "user").length}
                        </span>
                      </div>
                      <div className="w-full bg-puffy-cream-light h-2 rounded-full">
                        <div
                          className="bg-puffy-brown h-2 rounded-full"
                          style={{
                            width: `${(report.conversation.filter((m) => m.sender === "user").length / report.conversation.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-puffy-brown-dark">Mensajes de Puffy</span>
                        <span className="text-xs font-medium text-puffy-brown">
                          {report.conversation.filter((m) => m.sender === "puffy").length}
                        </span>
                      </div>
                      <div className="w-full bg-puffy-cream-light h-2 rounded-full">
                        <div
                          className="bg-puffy-pink h-2 rounded-full"
                          style={{
                            width: `${(report.conversation.filter((m) => m.sender === "puffy").length / report.conversation.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-puffy-brown mb-2">Longitud promedio de mensajes</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-puffy-brown-dark">Estudiante</span>
                        <span className="text-xs font-medium text-puffy-brown">
                          {Math.round(
                            report.conversation
                              .filter((m) => m.sender === "user")
                              .reduce((acc, m) => acc + m.content.length, 0) /
                              Math.max(1, report.conversation.filter((m) => m.sender === "user").length),
                          )}{" "}
                          caracteres
                        </span>
                      </div>
                      <div className="space-y-2 mt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-puffy-brown-dark">Puffy</span>
                          <span className="text-xs font-medium text-puffy-brown">
                            {Math.round(
                              report.conversation
                                .filter((m) => m.sender === "puffy")
                                .reduce((acc, m) => acc + m.content.length, 0) /
                                Math.max(1, report.conversation.filter((m) => m.sender === "puffy").length),
                            )}{" "}
                            caracteres
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Recomendaciones</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-puffy-brown-dark">Basado en esta conversación, se recomienda:</p>
                  <ul className="space-y-2">
                    <li className="text-sm text-puffy-brown-dark flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-puffy-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-puffy-brown"></span>
                      </div>
                      <span>Proporcionar materiales adicionales sobre los conceptos básicos del tema.</span>
                    </li>
                    <li className="text-sm text-puffy-brown-dark flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-puffy-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-puffy-brown"></span>
                      </div>
                      <span>Realizar ejercicios prácticos para reforzar la aplicación de conceptos.</span>
                    </li>
                    <li className="text-sm text-puffy-brown-dark flex items-start gap-2">
                      <div className="h-5 w-5 rounded-full bg-puffy-cream flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-puffy-brown"></span>
                      </div>
                      <span>Fomentar la participación en debates para mejorar la argumentación.</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


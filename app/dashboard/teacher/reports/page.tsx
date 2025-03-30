"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { FileText, Eye, Users, Calendar, BarChart } from "lucide-react"
import { getReports, type StudentReport } from "@/lib/report-generation"

// Update the component to use real reports
export default function ReportsPage() {
  const [reports, setReports] = useState<StudentReport[]>([])

  useEffect(() => {
    // Load reports on component mount
    const loadedReports = getReports()
    setReports(loadedReports)

    // If no reports exist, create some mock reports
    if (loadedReports.length === 0) {
      const mockReports = [
        {
          id: "1",
          studentId: "student-1",
          studentName: "Ana García",
          topic: "Matrices en Java",
          date: "25/03/2024",
          time: "14:30",
          duration: "45 min",
          status: "Nuevo",
          summary:
            "La estudiante mostró buen entendimiento de los conceptos básicos de matrices, pero tuvo dificultades con matrices multidimensionales y su aplicación en problemas complejos.",
          strengths: ["Declaración de matrices", "Acceso a elementos", "Iteración básica"],
          weaknesses: ["Matrices multidimensionales", "Algoritmos de ordenamiento", "Aplicaciones prácticas"],
          conversation: [
            {
              id: "msg-1",
              content: "Hola, ¿me puedes explicar cómo funcionan las matrices en Java?",
              sender: "user",
              timestamp: new Date(Date.now() - 3600000),
            },
            {
              id: "msg-2",
              content:
                "Claro, las matrices en Java son estructuras de datos que permiten almacenar múltiples valores del mismo tipo. ¿Qué te gustaría saber específicamente sobre ellas?",
              sender: "puffy",
              timestamp: new Date(Date.now() - 3550000),
            },
          ],
        },
        {
          id: "2",
          studentId: "student-2",
          studentName: "Carlos López",
          topic: "Herencia en POO",
          date: "23/03/2024",
          time: "10:15",
          duration: "30 min",
          status: "Revisado",
          summary:
            "El estudiante demostró un sólido entendimiento de los conceptos de herencia y su implementación en Java. Pudo explicar correctamente la diferencia entre herencia simple y múltiple.",
          strengths: ["Conceptos de herencia", "Implementación en Java", "Sobreescritura de métodos"],
          weaknesses: ["Herencia múltiple vs interfaces", "Diseño de jerarquías complejas"],
          conversation: [
            {
              id: "msg-1",
              content: "¿Puedes explicarme qué es la herencia en programación orientada a objetos?",
              sender: "user",
              timestamp: new Date(Date.now() - 86400000),
            },
            {
              id: "msg-2",
              content:
                "La herencia es un mecanismo fundamental en POO que permite que una clase adquiera propiedades y comportamientos de otra clase. ¿Qué aspectos específicos te interesan?",
              sender: "puffy",
              timestamp: new Date(Date.now() - 86350000),
            },
          ],
        },
        {
          id: "3",
          studentId: "student-3",
          studentName: "María Rodríguez",
          topic: "Algoritmos de ordenamiento",
          date: "20/03/2024",
          time: "16:45",
          duration: "50 min",
          status: "Revisado",
          summary:
            "La estudiante comprendió los algoritmos básicos como Bubble Sort y Selection Sort, pero tuvo dificultades con algoritmos más complejos como QuickSort y MergeSort.",
          strengths: ["Bubble Sort", "Selection Sort", "Análisis de complejidad básica"],
          weaknesses: ["QuickSort", "MergeSort", "Optimización de algoritmos"],
          conversation: [
            {
              id: "msg-1",
              content: "Necesito ayuda para entender los algoritmos de ordenamiento",
              sender: "user",
              timestamp: new Date(Date.now() - 172800000),
            },
            {
              id: "msg-2",
              content:
                "Los algoritmos de ordenamiento son métodos para organizar elementos en una secuencia específica. ¿Qué algoritmos específicos te gustaría explorar?",
              sender: "puffy",
              timestamp: new Date(Date.now() - 172750000),
            },
          ],
        },
      ]

      // Save mock reports to localStorage
      localStorage.setItem("studentReports", JSON.stringify(mockReports))
      setReports(mockReports)
    }
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Reportes de Estudiantes</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-puffy-brown text-puffy-brown">
              <BarChart className="mr-2 h-4 w-4" />
              <span>Estadísticas</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-puffy-cream/30">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <FileText className="h-4 w-4 mr-2" />
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="new"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <Badge className="h-5 w-5 p-0 mr-2 bg-puffy-pink text-puffy-brown-dark">
                  {reports.filter((r) => r.status === "Nuevo").length}
                </Badge>
                Nuevos
              </TabsTrigger>
              <TabsTrigger
                value="reviewed"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <Eye className="h-4 w-4 mr-2" />
                Revisados
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-6">
            {reports.map((report) => (
              <Card key={report.id} className="border-puffy-brown/10">
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
                        <CardDescription>Tema: {report.topic}</CardDescription>
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
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-3 text-sm">
                      <div className="flex items-center gap-1 text-puffy-brown-dark">
                        <Calendar className="h-4 w-4" />
                        <span>{report.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-puffy-brown-dark">
                        <Users className="h-4 w-4" />
                        <span>Duración: {report.duration}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h3 className="text-sm font-medium text-puffy-brown">Resumen de la conversación</h3>
                        <p className="text-sm text-puffy-brown-dark mt-1">{report.summary}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-puffy-brown">Fortalezas</h3>
                          <ul className="mt-1 space-y-1">
                            {report.strengths.map((strength, index) => (
                              <li key={index} className="text-sm text-puffy-brown-dark flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-puffy-pink"></div>
                                {strength}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-sm font-medium text-puffy-brown">Áreas de mejora</h3>
                          <ul className="mt-1 space-y-1">
                            {report.weaknesses.map((weakness, index) => (
                              <li key={index} className="text-sm text-puffy-brown-dark flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-puffy-brown-light"></div>
                                {weakness}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="border-puffy-brown text-puffy-brown" asChild>
                        <Link href={`/dashboard/teacher/reports/${report.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          <span>Ver reporte completo</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="new" className="space-y-6">
            {reports
              .filter((r) => r.status === "Nuevo")
              .map((report) => (
                <Card key={report.id} className="border-puffy-brown/10">
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
                          <CardDescription>Tema: {report.topic}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-puffy-pink text-puffy-brown-dark">Nuevo</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 text-puffy-brown-dark">
                          <Calendar className="h-4 w-4" />
                          <span>{report.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-puffy-brown-dark">
                          <Users className="h-4 w-4" />
                          <span>Duración: {report.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-puffy-brown">Resumen de la conversación</h3>
                          <p className="text-sm text-puffy-brown-dark mt-1">{report.summary}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-puffy-brown">Fortalezas</h3>
                            <ul className="mt-1 space-y-1">
                              {report.strengths.map((strength, index) => (
                                <li key={index} className="text-sm text-puffy-brown-dark flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-puffy-pink"></div>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-puffy-brown">Áreas de mejora</h3>
                            <ul className="mt-1 space-y-1">
                              {report.weaknesses.map((weakness, index) => (
                                <li key={index} className="text-sm text-puffy-brown-dark flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-puffy-brown-light"></div>
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="border-puffy-brown text-puffy-brown" asChild>
                          <Link href={`/dashboard/teacher/reports/${report.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver reporte completo</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="reviewed" className="space-y-6">
            {reports
              .filter((r) => r.status === "Revisado")
              .map((report) => (
                <Card key={report.id} className="border-puffy-brown/10">
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
                          <CardDescription>Tema: {report.topic}</CardDescription>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-puffy-brown text-puffy-brown">
                        Revisado
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-3 text-sm">
                        <div className="flex items-center gap-1 text-puffy-brown-dark">
                          <Calendar className="h-4 w-4" />
                          <span>{report.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-puffy-brown-dark">
                          <Users className="h-4 w-4" />
                          <span>Duración: {report.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h3 className="text-sm font-medium text-puffy-brown">Resumen de la conversación</h3>
                          <p className="text-sm text-puffy-brown-dark mt-1">{report.summary}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-medium text-puffy-brown">Fortalezas</h3>
                            <ul className="mt-1 space-y-1">
                              {report.strengths.map((strength, index) => (
                                <li key={index} className="text-sm text-puffy-brown-dark flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-puffy-pink"></div>
                                  {strength}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h3 className="text-sm font-medium text-puffy-brown">Áreas de mejora</h3>
                            <ul className="mt-1 space-y-1">
                              {report.weaknesses.map((weakness, index) => (
                                <li key={index} className="text-sm text-puffy-brown-dark flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-puffy-brown-light"></div>
                                  {weakness}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" className="border-puffy-brown text-puffy-brown" asChild>
                          <Link href={`/dashboard/teacher/reports/${report.id}`}>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>Ver reporte completo</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


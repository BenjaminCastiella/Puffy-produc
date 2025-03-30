"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookOpen, MessageSquare, ArrowRight, Swords, FileText } from "lucide-react"
import { DebateModal } from "@/components/debate-modal"
import { getUserStatistics } from "@/lib/statistics"

// Update the component to include debate functionality and session counting
export default function StudentDashboard() {
  // State for debate modal
  const [isDebateOpen, setIsDebateOpen] = useState(false)
  const [userStats, setUserStats] = useState({
    puffySessions: 0,
    debatesParticipated: 0,
    debatesWon: 0,
  })

  // Mock data for student dashboard - change "courses" to "puffys"
  const recentPuffys = [
    {
      id: 1,
      name: "Puffy de Programación",
      teacher: "Prof. Martínez",
      lastAccessed: "Hace 2 horas",
      icon: BookOpen,
      type: "programming",
    },
    {
      id: 2,
      name: "Puffy de Matemáticas",
      teacher: "Prof. García",
      lastAccessed: "Ayer",
      icon: BookOpen,
      type: "math",
    },
    {
      id: 3,
      name: "Puffy de Historia",
      teacher: "Prof. López",
      lastAccessed: "Hace 3 días",
      icon: BookOpen,
      type: "history",
    },
  ]

  useEffect(() => {
    // Load user statistics on component mount
    const stats = getUserStatistics("student-1") // Using a mock user ID
    setUserStats(stats)
  }, [])

  const handleDebateEnd = (result: { won: boolean; score: number; feedback: string }) => {
    // Update user statistics with debate results
    const updatedStats = getUserStatistics("student-1")
    setUserStats(updatedStats)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Dashboard del Estudiante</h1>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown">Bienvenido de vuelta</CardTitle>
              <CardDescription>Continúa tu aprendizaje donde lo dejaste</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-puffy-cream flex items-center justify-center">
                  <img src="/images/puffy.png" alt="Puffy" className="h-12 w-12" />
                </div>
                <div>
                  <p className="font-medium text-puffy-brown">Puffy te espera</p>
                  <p className="text-sm text-puffy-brown-dark">Continúa tu conversación</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full bg-puffy-brown text-white hover:bg-puffy-brown-light">
                <Link href="/dashboard/student/chat">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>Chatear con Puffy</span>
                </Link>
              </Button>
              <Button
                className="w-full bg-puffy-pink text-puffy-brown-dark hover:bg-puffy-pink-dark"
                onClick={() => setIsDebateOpen(true)}
              >
                <Swords className="mr-2 h-4 w-4" />
                <span>Iniciar Debate</span>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown">Materiales de estudio</CardTitle>
              <CardDescription>Accede a los recursos compartidos por tus profesores</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-puffy-brown" />
                    <span className="text-sm">Introducción a Java</span>
                  </div>
                  <Badge className="bg-puffy-pink text-puffy-brown-dark">Nuevo</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-puffy-brown" />
                    <span className="text-sm">Matrices y Vectores</span>
                  </div>
                  <Badge variant="outline" className="border-puffy-brown text-puffy-brown">
                    PDF
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-puffy-brown" />
                    <span className="text-sm">Ejercicios prácticos</span>
                  </div>
                  <Badge variant="outline" className="border-puffy-brown text-puffy-brown">
                    DOC
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full border-puffy-brown text-puffy-brown">
                <Link href="/dashboard/student/materials">
                  <span>Ver todos los materiales</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown">Puffys recientes</CardTitle>
              <CardDescription>Tus Puffys con acceso a materiales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPuffys.map((puffy) => (
                  <Link
                    href={`/dashboard/student/chat?puffyType=${puffy.type}&puffyId=${puffy.id}`}
                    key={puffy.id}
                    className="block"
                  >
                    <div className="flex items-start gap-3 hover:bg-puffy-cream/20 p-2 rounded-md transition-colors">
                      <div className="rounded-md bg-puffy-cream p-2 mt-0.5">
                        <img src="/images/puffy.png" alt="Puffle" className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium text-puffy-brown">{puffy.name}</p>
                        <p className="text-xs text-puffy-brown-dark">{puffy.teacher}</p>
                        <p className="text-xs text-puffy-brown-light">{puffy.lastAccessed}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                asChild
              >
                <Link href="/dashboard/student/puffys">
                  <span>Ver todos los Puffys</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-bold text-puffy-brown mb-4">Actividad reciente</h2>
          <div className="border rounded-lg border-puffy-brown/10 overflow-hidden">
            <div className="bg-white p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-puffy-cream/30">
                <p className="text-3xl font-bold text-puffy-brown">{userStats.puffySessions}</p>
                <p className="text-sm text-puffy-brown-dark">Sesiones con Puffy</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-puffy-cream/30">
                <p className="text-3xl font-bold text-puffy-brown">{userStats.debatesParticipated}</p>
                <p className="text-sm text-puffy-brown-dark">Debates realizados</p>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-puffy-cream/30">
                <p className="text-3xl font-bold text-puffy-brown">{userStats.debatesWon}</p>
                <p className="text-sm text-puffy-brown-dark">Debates ganados</p>
              </div>
            </div>
            <div className="border-t border-puffy-brown/10 p-4 bg-white">
              <p className="text-sm text-puffy-brown-dark">
                Última actividad: Conversación con Puffy sobre "Matrices en Java" - Hace 2 horas
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Debate Modal */}
      <DebateModal
        open={isDebateOpen}
        onOpenChange={setIsDebateOpen}
        puffyType="programming"
        onDebateEnd={handleDebateEnd}
      />
    </div>
  )
}


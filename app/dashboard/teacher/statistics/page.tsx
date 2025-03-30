"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Users, MessageSquare, FileText, RefreshCw } from "lucide-react"
import { getSystemStatistics, updateActiveUsersCount, type SystemStatistics } from "@/lib/statistics"

export default function StatisticsPage() {
  const [systemStats, setSystemStats] = useState<SystemStatistics>({
    totalSessions: 0,
    totalDebates: 0,
    totalMaterials: 0,
    activeUsers: 0,
    sessionsPerDay: [],
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load statistics on component mount
    loadStatistics()
  }, [])

  const loadStatistics = () => {
    setIsLoading(true)

    try {
      // Get system statistics
      const stats = getSystemStatistics()

      // Update active users count
      const activeUsers = updateActiveUsersCount()

      // Get total materials count
      const materials = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")

      setSystemStats({
        ...stats,
        activeUsers,
        totalMaterials: materials.length,
      })
    } catch (error) {
      console.error("Error loading statistics:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Get the last 7 days for the chart
  const getLast7Days = () => {
    const result = []
    for (let i = 6; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      result.push(date.toISOString().split("T")[0])
    }
    return result
  }

  // Get session counts for the last 7 days
  const getSessionsData = () => {
    const last7Days = getLast7Days()
    const data = []

    for (const day of last7Days) {
      const entry = systemStats.sessionsPerDay.find((d) => d.date === day)
      data.push({
        date: day,
        count: entry ? entry.count : 0,
      })
    }

    return data
  }

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-ES", { weekday: "short", day: "numeric" })
  }

  const sessionsData = getSessionsData()
  const maxSessionCount = Math.max(...sessionsData.map((d) => d.count), 5) // Minimum 5 for scale

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Estadísticas</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              className="border-puffy-brown text-puffy-brown"
              onClick={loadStatistics}
              disabled={isLoading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Actualizar</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown text-lg">Sesiones Totales</CardTitle>
              <CardDescription>Conversaciones con Puffy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-puffy-brown" />
                <span className="text-3xl font-bold text-puffy-brown">{systemStats.totalSessions}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown text-lg">Debates Realizados</CardTitle>
              <CardDescription>Debates con Puffy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-puffy-pink" />
                <span className="text-3xl font-bold text-puffy-brown">{systemStats.totalDebates}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown text-lg">Materiales</CardTitle>
              <CardDescription>Documentos subidos</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <FileText className="h-8 w-8 text-puffy-brown" />
                <span className="text-3xl font-bold text-puffy-brown">{systemStats.totalMaterials}</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown text-lg">Usuarios Activos</CardTitle>
              <CardDescription>Últimos 7 días</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Users className="h-8 w-8 text-puffy-brown" />
                <span className="text-3xl font-bold text-puffy-brown">{systemStats.activeUsers}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sessions">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-puffy-brown">Análisis Detallado</h2>
            <TabsList className="bg-puffy-cream/30">
              <TabsTrigger
                value="sessions"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Sesiones
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <Users className="h-4 w-4 mr-2" />
                Usuarios
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="sessions">
            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Sesiones por Día</CardTitle>
                <CardDescription>Últimos 7 días</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-end justify-between gap-2">
                  {sessionsData.map((day) => (
                    <div key={day.date} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="w-full bg-puffy-cream-light rounded-t-md relative"
                        style={{
                          height: `${(day.count / maxSessionCount) * 100}%`,
                          minHeight: day.count > 0 ? "20px" : "4px",
                        }}
                      >
                        {day.count > 0 && (
                          <div className="absolute -top-7 left-1/2 transform -translate-x-1/2 text-sm font-medium text-puffy-brown">
                            {day.count}
                          </div>
                        )}
                      </div>
                      <div className="text-xs text-puffy-brown-dark">{formatDate(day.date)}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Actividad de Usuarios</CardTitle>
                <CardDescription>Estadísticas de participación</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium text-puffy-brown mb-2">Distribución de Sesiones</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-puffy-brown-dark">Estudiantes con 1-5 sesiones</span>
                        <span className="text-sm font-medium text-puffy-brown">60%</span>
                      </div>
                      <div className="w-full bg-puffy-cream-light h-2 rounded-full">
                        <div className="bg-puffy-pink h-2 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-puffy-brown-dark">Estudiantes con 6-10 sesiones</span>
                        <span className="text-sm font-medium text-puffy-brown">30%</span>
                      </div>
                      <div className="w-full bg-puffy-cream-light h-2 rounded-full">
                        <div className="bg-puffy-pink h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-puffy-brown-dark">Estudiantes con más de 10 sesiones</span>
                        <span className="text-sm font-medium text-puffy-brown">10%</span>
                      </div>
                      <div className="w-full bg-puffy-cream-light h-2 rounded-full">
                        <div className="bg-puffy-pink h-2 rounded-full" style={{ width: "10%" }}></div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-puffy-brown mb-2">Participación en Debates</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-puffy-brown-dark">Tasa de participación</span>
                        <span className="text-sm font-medium text-puffy-brown">45%</span>
                      </div>
                      <div className="w-full bg-puffy-cream-light h-2 rounded-full">
                        <div className="bg-puffy-brown h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-puffy-brown-dark">Tasa de victoria</span>
                        <span className="text-sm font-medium text-puffy-brown">38%</span>
                      </div>
                      <div className="w-full bg-puffy-cream-light h-2 rounded-full">
                        <div className="bg-puffy-brown h-2 rounded-full" style={{ width: "38%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Users, PlusCircle, TestTube, BarChart } from "lucide-react"

export default function TeacherDashboard() {
  // Mock data for teacher dashboard
  const recentReports = [
    { id: 1, student: "Ana García", topic: "Matrices en Java", date: "Hace 2 horas", status: "Nuevo" },
    { id: 2, student: "Carlos López", topic: "Herencia en POO", date: "Ayer", status: "Revisado" },
    { id: 3, student: "María Rodríguez", topic: "Algoritmos de ordenamiento", date: "Hace 3 días", status: "Revisado" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Dashboard del Docente</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-puffy-brown text-puffy-brown" asChild>
              <Link href="/dashboard/teacher/statistics">
                <BarChart className="mr-2 h-4 w-4" />
                <span>Estadísticas</span>
              </Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown">Gestionar Puffy</CardTitle>
              <CardDescription>Configura y entrena a tu asistente IA</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-4">
                <div className="h-16 w-16 rounded-full bg-puffy-cream flex items-center justify-center">
                  <img src="/images/puffy.png" alt="Puffy" className="h-12 w-12" />
                </div>
                <div>
                  <p className="font-medium text-puffy-brown">Puffy de Programación</p>
                  <p className="text-sm text-puffy-brown-dark">Especializado en Java</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button asChild className="w-full bg-puffy-brown text-white hover:bg-puffy-brown-light">
                <Link href="/dashboard/teacher/materials">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Agregar Material</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full border-puffy-brown text-puffy-brown">
                <Link href="/dashboard/teacher/test">
                  <TestTube className="mr-2 h-4 w-4" />
                  <span>Testear Puffy</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown">Reportes de Estudiantes</CardTitle>
              <CardDescription>Informes generados por Puffy sobre las conversaciones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentReports.map((report) => (
                  <div
                    key={report.id}
                    className="flex items-center justify-between p-2 rounded-lg border border-puffy-brown/10"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-puffy-brown">{report.student}</p>
                        {report.status === "Nuevo" && (
                          <Badge className="bg-puffy-pink text-puffy-brown-dark">Nuevo</Badge>
                        )}
                      </div>
                      <p className="text-xs text-puffy-brown-dark">Tema: {report.topic}</p>
                      <p className="text-xs text-puffy-brown-light">{report.date}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                    >
                      <FileText className="h-4 w-4" />
                      <span className="sr-only">Ver reporte</span>
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                asChild
                variant="ghost"
                className="w-full text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
              >
                <Link href="/dashboard/teacher/reports">
                  <span>Ver todos los reportes</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>

          <Card className="border-puffy-brown/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-puffy-brown">Estadísticas</CardTitle>
              <CardDescription>Actividad de los estudiantes con Puffy</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col p-3 rounded-lg bg-puffy-cream/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-puffy-brown-dark">Conversaciones totales</span>
                    <span className="font-bold text-puffy-brown">42</span>
                  </div>
                  <div className="w-full bg-puffy-cream-light h-2 rounded-full mt-2">
                    <div className="bg-puffy-pink h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>
                <div className="flex flex-col p-3 rounded-lg bg-puffy-cream/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-puffy-brown-dark">Materiales consultados</span>
                    <span className="font-bold text-puffy-brown">28</span>
                  </div>
                  <div className="w-full bg-puffy-cream-light h-2 rounded-full mt-2">
                    <div className="bg-puffy-pink h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                </div>
                <div className="flex flex-col p-3 rounded-lg bg-puffy-cream/30">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-puffy-brown-dark">Estudiantes activos</span>
                    <span className="font-bold text-puffy-brown">15</span>
                  </div>
                  <div className="w-full bg-puffy-cream-light h-2 rounded-full mt-2">
                    <div className="bg-puffy-pink h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="ghost"
                className="w-full text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                asChild
              >
                <Link href="/dashboard/teacher/statistics">
                  <BarChart className="mr-2 h-4 w-4" />
                  <span>Ver estadísticas detalladas</span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8">
          <Tabs defaultValue="students">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-puffy-brown">Gestión del Curso</h2>
              <TabsList className="bg-puffy-cream/30">
                <TabsTrigger
                  value="students"
                  className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
                >
                  <Users className="h-4 w-4 mr-2" />
                  Estudiantes
                </TabsTrigger>
                <TabsTrigger
                  value="materials"
                  className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Materiales
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="students">
              <Card className="border-puffy-brown/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-puffy-brown">Estudiantes Activos</CardTitle>
                  <CardDescription>Programación Java - 15 estudiantes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-puffy-brown/10">
                        <div className="h-10 w-10 rounded-full bg-puffy-cream flex items-center justify-center text-puffy-brown font-medium">
                          {["AG", "CL", "MR", "JP", "LS", "RD"][i]}
                        </div>
                        <div>
                          <p className="font-medium text-puffy-brown">
                            {
                              [
                                "Ana García",
                                "Carlos López",
                                "María Rodríguez",
                                "Juan Pérez",
                                "Laura Sánchez",
                                "Roberto Díaz",
                              ][i]
                            }
                          </p>
                          <p className="text-xs text-puffy-brown-dark">
                            {
                              [
                                "Activo hace 2h",
                                "Activo ayer",
                                "Activo hace 3d",
                                "Activo hace 1h",
                                "Activo hace 5h",
                                "Activo hace 2d",
                              ][i]
                            }
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="ghost"
                    className="w-full text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                  >
                    <Link href="/dashboard/teacher/students">
                      <Users className="mr-2 h-4 w-4" />
                      <span>Ver todos los estudiantes</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="materials">
              <Card className="border-puffy-brown/10">
                <CardHeader className="pb-2">
                  <CardTitle className="text-puffy-brown">Materiales del Curso</CardTitle>
                  <CardDescription>Programación Java - 5 materiales</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      "Introducción a Java",
                      "Matrices y Vectores",
                      "Ejercicios prácticos",
                      "Clases y Objetos",
                      "Herencia y Polimorfismo",
                    ].map((title, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg border border-puffy-brown/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="rounded-md bg-puffy-cream p-2">
                            <FileText className="h-4 w-4 text-puffy-brown" />
                          </div>
                          <div>
                            <p className="font-medium text-puffy-brown">{title}</p>
                            <p className="text-xs text-puffy-brown-light">
                              {["PDF · 2.4 MB", "PDF · 1.8 MB", "DOC · 1.2 MB", "PDF · 3.1 MB", "PDF · 2.7 MB"][i]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                          >
                            <FileText className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-puffy-brown text-white hover:bg-puffy-brown-light">
                    <Link href="/dashboard/teacher/materials">
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>Agregar nuevo material</span>
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}


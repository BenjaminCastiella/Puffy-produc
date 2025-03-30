import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Users, Search, MessageSquare, FileText, BarChart, Clock } from "lucide-react"

export default function StudentsPage() {
  // Mock students data
  const students = [
    {
      id: 1,
      name: "Ana García",
      initials: "AG",
      email: "ana.garcia@ejemplo.com",
      lastActive: "Hace 2 horas",
      conversations: 12,
      materials: 8,
      progress: 85,
      status: "active",
    },
    {
      id: 2,
      name: "Carlos López",
      initials: "CL",
      email: "carlos.lopez@ejemplo.com",
      lastActive: "Ayer",
      conversations: 8,
      materials: 6,
      progress: 70,
      status: "active",
    },
    {
      id: 3,
      name: "María Rodríguez",
      initials: "MR",
      email: "maria.rodriguez@ejemplo.com",
      lastActive: "Hace 3 días",
      conversations: 15,
      materials: 10,
      progress: 90,
      status: "active",
    },
    {
      id: 4,
      name: "Juan Pérez",
      initials: "JP",
      email: "juan.perez@ejemplo.com",
      lastActive: "Hace 1 hora",
      conversations: 5,
      materials: 4,
      progress: 60,
      status: "active",
    },
    {
      id: 5,
      name: "Laura Sánchez",
      initials: "LS",
      email: "laura.sanchez@ejemplo.com",
      lastActive: "Hace 5 horas",
      conversations: 10,
      materials: 7,
      progress: 75,
      status: "active",
    },
    {
      id: 6,
      name: "Roberto Díaz",
      initials: "RD",
      email: "roberto.diaz@ejemplo.com",
      lastActive: "Hace 2 días",
      conversations: 3,
      materials: 2,
      progress: 40,
      status: "inactive",
    },
    {
      id: 7,
      name: "Sofía Martínez",
      initials: "SM",
      email: "sofia.martinez@ejemplo.com",
      lastActive: "Hace 1 semana",
      conversations: 2,
      materials: 3,
      progress: 30,
      status: "inactive",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Estudiantes</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-puffy-brown-dark" />
              <Input
                type="search"
                placeholder="Buscar estudiante..."
                className="w-[200px] sm:w-[300px] pl-9 border-puffy-brown/20"
              />
            </div>
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
                <Users className="h-4 w-4 mr-2" />
                Todos
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <Badge className="h-5 w-5 p-0 mr-2 bg-puffy-pink text-puffy-brown-dark">
                  {students.filter((s) => s.status === "active").length}
                </Badge>
                Activos
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <Badge className="h-5 w-5 p-0 mr-2 bg-puffy-cream text-puffy-brown-dark">
                  {students.filter((s) => s.status === "inactive").length}
                </Badge>
                Inactivos
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <Card className="border-puffy-brown/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-puffy-brown">Todos los estudiantes</CardTitle>
                <CardDescription>Programación Java - {students.length} estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-puffy-brown/10"
                    >
                      <div className="flex items-center gap-3 mb-3 sm:mb-0">
                        <Avatar>
                          
                          <AvatarFallback className="bg-puffy-cream text-puffy-brown">
                            {student.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-puffy-brown">{student.name}</p>
                          <p className="text-xs text-puffy-brown-dark">{student.email}</p>
                          <div className="flex items-center gap-1 mt-1">
                            <Clock className="h-3 w-3 text-puffy-brown-light" />
                            <span className="text-xs text-puffy-brown-light">{student.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                          <div className="flex items-center gap-1">
                            <MessageSquare className="h-3 w-3 text-puffy-brown" />
                            <span className="text-sm font-medium text-puffy-brown">{student.conversations}</span>
                          </div>
                          <span className="text-xs text-puffy-brown-dark">Conversaciones</span>
                        </div>

                        <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                          <div className="flex items-center gap-1">
                            <FileText className="h-3 w-3 text-puffy-brown" />
                            <span className="text-sm font-medium text-puffy-brown">{student.materials}</span>
                          </div>
                          <span className="text-xs text-puffy-brown-dark">Materiales</span>
                        </div>

                        <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                          <div className="flex items-center gap-1">
                            <BarChart className="h-3 w-3 text-puffy-brown" />
                            <span className="text-sm font-medium text-puffy-brown">{student.progress}%</span>
                          </div>
                          <span className="text-xs text-puffy-brown-dark">Progreso</span>
                        </div>
                      </div>

                      <div className="flex justify-end mt-3 sm:mt-0">
                        <Button variant="outline" size="sm" className="border-puffy-brown text-puffy-brown">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Ver reportes</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card className="border-puffy-brown/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-puffy-brown">Estudiantes activos</CardTitle>
                <CardDescription>
                  Programación Java - {students.filter((s) => s.status === "active").length} estudiantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students
                    .filter((s) => s.status === "active")
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-puffy-brown/10"
                      >
                        <div className="flex items-center gap-3 mb-3 sm:mb-0">
                          <Avatar>
                            
                            <AvatarFallback className="bg-puffy-cream text-puffy-brown">
                              {student.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-puffy-brown">{student.name}</p>
                            <p className="text-xs text-puffy-brown-dark">{student.email}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-puffy-brown-light" />
                              <span className="text-xs text-puffy-brown-light">{student.lastActive}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3 text-puffy-brown" />
                              <span className="text-sm font-medium text-puffy-brown">{student.conversations}</span>
                            </div>
                            <span className="text-xs text-puffy-brown-dark">Conversaciones</span>
                          </div>

                          <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3 text-puffy-brown" />
                              <span className="text-sm font-medium text-puffy-brown">{student.materials}</span>
                            </div>
                            <span className="text-xs text-puffy-brown-dark">Materiales</span>
                          </div>

                          <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                            <div className="flex items-center gap-1">
                              <BarChart className="h-3 w-3 text-puffy-brown" />
                              <span className="text-sm font-medium text-puffy-brown">{student.progress}%</span>
                            </div>
                            <span className="text-xs text-puffy-brown-dark">Progreso</span>
                          </div>
                        </div>

                        <div className="flex justify-end mt-3 sm:mt-0">
                          <Button variant="outline" size="sm" className="border-puffy-brown text-puffy-brown">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Ver reportes</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inactive">
            <Card className="border-puffy-brown/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-puffy-brown">Estudiantes inactivos</CardTitle>
                <CardDescription>
                  Programación Java - {students.filter((s) => s.status === "inactive").length} estudiantes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {students
                    .filter((s) => s.status === "inactive")
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border border-puffy-brown/10"
                      >
                        <div className="flex items-center gap-3 mb-3 sm:mb-0">
                          <Avatar>
                            
                            <AvatarFallback className="bg-puffy-cream text-puffy-brown">
                              {student.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-puffy-brown">{student.name}</p>
                            <p className="text-xs text-puffy-brown-dark">{student.email}</p>
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="h-3 w-3 text-puffy-brown-light" />
                              <span className="text-xs text-puffy-brown-light">{student.lastActive}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3 text-puffy-brown" />
                              <span className="text-sm font-medium text-puffy-brown">{student.conversations}</span>
                            </div>
                            <span className="text-xs text-puffy-brown-dark">Conversaciones</span>
                          </div>

                          <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                            <div className="flex items-center gap-1">
                              <FileText className="h-3 w-3 text-puffy-brown" />
                              <span className="text-sm font-medium text-puffy-brown">{student.materials}</span>
                            </div>
                            <span className="text-xs text-puffy-brown-dark">Materiales</span>
                          </div>

                          <div className="flex flex-col items-center p-2 rounded-lg bg-puffy-cream/20">
                            <div className="flex items-center gap-1">
                              <BarChart className="h-3 w-3 text-puffy-brown" />
                              <span className="text-sm font-medium text-puffy-brown">{student.progress}%</span>
                            </div>
                            <span className="text-xs text-puffy-brown-dark">Progreso</span>
                          </div>
                        </div>

                        <div className="flex justify-end mt-3 sm:mt-0">
                          <Button variant="outline" size="sm" className="border-puffy-brown text-puffy-brown">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            <span>Ver reportes</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}


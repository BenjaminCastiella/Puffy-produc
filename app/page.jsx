"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BookOpen, MessageSquareText, Lightbulb, ChevronRight, GraduationCap } from "lucide-react"

export default function Home() {
  const router = useRouter()

  const handleStudentClick = () => {
    router.push("/dashboard/student")
  }

  const handleTeacherClick = () => {
    router.push("/dashboard/teacher")
  }

  return (
    <div className="flex flex-col min-h-screen bg-puffy-cream-light">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-center px-4 md:px-6">
          <div className="flex items-center gap-2">
            <img src="/images/puffy.png" alt="Puffy Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="text-xl sm:text-2xl font-bold text-puffy-brown">Puffle</span>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-8 md:py-16 lg:py-24 xl:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-gradient-to-r from-puffy-brown to-puffy-brown-light bg-clip-text text-transparent">
                    Educa sin límites
                  </h1>
                  <p className="max-w-[600px] text-puffy-brown-dark text-lg sm:text-xl lg:text-2xl">
                    Puffle redefine la enseñanza utilizando el metodo socrático que ayuda a desarrollar pensamiento
                    crítico y reflexión profunda.
                  </p>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter bg-gradient-to-r from-puffy-brown to-puffy-brown-light bg-clip-text text-transparent">
                  Proba la demo
                </h2>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    size="lg"
                    className="bg-puffy-pink hover:bg-puffy-pink-dark text-puffy-brown-dark"
                    onClick={handleStudentClick}
                  >
                    Como estudiante
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-puffy-brown text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                    onClick={handleTeacherClick}
                  >
                    Como docente
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-8 lg:mt-0">
                <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-puffy-brown p-4 sm:p-6 shadow-xl">
                  <div className="absolute top-0 right-0 h-16 sm:h-24 w-16 sm:w-24 rounded-bl-3xl bg-puffy-pink"></div>
                  <div className="relative z-10 space-y-3 sm:space-y-4">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-puffy-cream-light" />
                      <h3 className="text-lg sm:text-xl font-bold text-white">Habla con Puffy</h3>
                    </div>
                    <div className="rounded-lg bg-white/10 p-3 sm:p-4 backdrop-blur-sm">
                      <p className="text-xs sm:text-sm text-white">
                        "¿Qué factores consideras que influyen en la teoría que acabas de presentar?"
                      </p>
                    </div>
                    <div className="rounded-lg bg-white p-3 sm:p-4">
                      <p className="text-xs sm:text-sm text-puffy-brown-dark">
                        Estoy considerando cómo los factores socioeconómicos podrían afectar esta teoría, especialmente
                        en contextos urbanos...
                      </p>
                    </div>
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        className="bg-puffy-cream hover:bg-puffy-cream-dark text-puffy-brown-dark text-xs sm:text-sm"
                      >
                        Continuar Diálogo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-16 lg:py-24 bg-puffy-brown">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <img
                src="/images/puffy.png"
                alt="Puffy Logo"
                className="h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 mb-2 sm:mb-4"
              />
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-white">
                  Potenciando las habilidades blandas
                </h2>
                <p className="max-w-[900px] text-puffy-cream text-base sm:text-lg md:text-xl">
                  Puffy utiliza el método socrático para guiar tu aprendizaje a través del cuestionamiento y la
                  reflexión.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-4 sm:gap-6 py-8 sm:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4 sm:p-6 shadow-lg">
                <div className="rounded-full bg-puffy-pink p-3">
                  <MessageSquareText className="h-5 w-5 sm:h-6 sm:w-6 text-puffy-brown-dark" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-puffy-brown">Diálogo Socrático</h3>
                <p className="text-center text-puffy-brown-dark text-sm sm:text-base">
                  Conversaciones que estimulan el pensamiento crítico mediante preguntas reflexivas.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4 sm:p-6 shadow-lg">
                <div className="rounded-full bg-puffy-pink p-3">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-puffy-brown-dark" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-puffy-brown">Recursos Personalizados</h3>
                <p className="text-center text-puffy-brown-dark text-sm sm:text-base">
                  Materiales de estudio adaptados a tu estilo de aprendizaje y nivel académico.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg bg-white p-4 sm:p-6 shadow-lg md:col-span-2 lg:col-span-1">
                <div className="rounded-full bg-puffy-pink p-3">
                  <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 text-puffy-brown-dark" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-puffy-brown">Desarrollo de Ideas</h3>
                <p className="text-center text-puffy-brown-dark text-sm sm:text-base">
                  Ayuda a expandir tus ideas y explorar diferentes perspectivas sobre un tema.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-16 lg:py-24 bg-puffy-cream">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-puffy-brown">
                  Cómo funciona Puffy
                </h2>
                <p className="max-w-[900px] text-puffy-brown-dark text-base sm:text-lg md:text-xl">
                  Un enfoque educativo inspirado en los métodos de enseñanza de Sócrates para el siglo XXI.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-8 sm:py-12 lg:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-puffy-pink text-puffy-brown-dark">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-puffy-brown">Plantea tu pregunta o tema</h3>
                </div>
                <p className="text-puffy-brown-dark text-sm sm:text-base">
                  Comienza con cualquier tema académico o pregunta que quieras explorar en profundidad.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-puffy-pink text-puffy-brown-dark">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-puffy-brown">Diálogo guiado</h3>
                </div>
                <p className="text-puffy-brown-dark text-sm sm:text-base">
                  Puffy te guiará con preguntas que te ayudarán a profundizar en el tema y desarrollar tu propio
                  razonamiento.
                </p>
                <div className="flex items-center gap-4 pt-4">
                  <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-puffy-pink text-puffy-brown-dark">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-puffy-brown">Reflexión y síntesis</h3>
                </div>
                <p className="text-puffy-brown-dark text-sm sm:text-base">
                  Al final de cada sesión, Puffy te ayudará a sintetizar lo aprendido y a identificar áreas para seguir
                  explorando.
                </p>
              </div>
              <div className="flex items-center justify-center mt-6 lg:mt-0">
                <div className="overflow-hidden rounded-xl bg-gradient-to-br from-puffy-brown to-puffy-brown-light p-1">
                  <div className="rounded-lg bg-white p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img src="/images/puffy.png" alt="Puffy Logo" className="h-5 w-5 sm:h-6 sm:w-6" />
                          <span className="font-medium text-puffy-brown text-sm sm:text-base">Sesión con Puffy</span>
                        </div>
                        <div className="flex space-x-1">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-puffy-cream-light p-3">
                        <p className="text-xs sm:text-sm font-medium text-puffy-brown">Puffy:</p>
                        <p className="text-xs sm:text-sm text-puffy-brown-dark">
                          ¿Qué entiendes por sostenibilidad en el contexto urbano?
                        </p>
                      </div>
                      <div className="rounded-lg bg-puffy-cream p-3">
                        <p className="text-xs sm:text-sm font-medium text-puffy-brown">Tú:</p>
                        <p className="text-xs sm:text-sm text-puffy-brown-dark">
                          Creo que se refiere a crear ciudades que puedan mantenerse a largo plazo sin agotar recursos.
                        </p>
                      </div>
                      <div className="rounded-lg bg-puffy-cream-light p-3">
                        <p className="text-xs sm:text-sm font-medium text-puffy-brown">Puffy:</p>
                        <p className="text-xs sm:text-sm text-puffy-brown-dark">
                          Interesante. ¿Qué aspectos específicos consideras fundamentales para lograr esa
                          sostenibilidad?
                        </p>
                      </div>
                      <div className="flex">
                        <Input
                          className="rounded-r-none border-puffy-brown text-xs sm:text-sm"
                          placeholder="Escribe tu respuesta..."
                        />
                        <Button className="rounded-l-none bg-puffy-pink hover:bg-puffy-pink-dark text-puffy-brown-dark text-xs sm:text-sm">
                          Enviar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="w-full py-12 md:py-16 lg:py-24 bg-puffy-cream-light">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-puffy-brown">
                  Modos de sesion
                </h2>
                <p className="max-w-[900px] text-puffy-brown-dark text-base sm:text-lg md:text-xl">
                  Descubre cómo poner a prueba los conocimientos aprendidos
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-4 sm:gap-6 py-8 sm:py-12 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg bg-white p-4 sm:p-6 shadow-md">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-full bg-puffy-brown p-2 mt-1">
                    <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-puffy-brown text-sm sm:text-base">Sesion Socratica</p>
                    <p className="mb-2 text-puffy-brown-dark text-xs sm:text-sm">
                      Modo conversacional donde Puffy dispara preguntas socráticas para fomentar la comprensión profunda
                      de un tema.
                    </p>
                    <p className="text-xs text-puffy-brown-light">Genera sintesis de la conversacion</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 sm:p-6 shadow-md">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-full bg-puffy-pink p-2 mt-1">
                    <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-puffy-brown-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-puffy-brown text-sm sm:text-base">Caso Aplicado</p>
                    <p className="mb-2 text-puffy-brown-dark text-xs sm:text-sm">
                      Ejercicio practico en contexto orientado a conectar teoria con practica
                    </p>
                    <p className="text-xs text-puffy-brown-light">Recomenda como un experto</p>
                  </div>
                </div>
              </div>
              <div className="rounded-lg bg-white p-4 sm:p-6 shadow-md md:col-span-2 lg:col-span-1">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="rounded-full bg-puffy-cream-dark p-2 mt-1">
                    <GraduationCap className="h-3 w-3 sm:h-4 sm:w-4 text-puffy-brown-dark" />
                  </div>
                  <div>
                    <p className="font-medium text-puffy-brown text-sm sm:text-base">Debate</p>
                    <p className="mb-2 text-puffy-brown-dark text-xs sm:text-sm">
                      Elegi una postura, responde preguntas, refuta con argumentos validos
                    </p>
                    <p className="text-xs text-puffy-brown-light">Finaliza con un resumen reflexivo</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16 lg:py-24 bg-puffy-pink">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-puffy-brown-dark">
                  Actualiza la educacion con IA
                </h2>
                <p className="max-w-[900px] text-puffy-brown text-base sm:text-lg md:text-xl">
                  Fomenta la herramienta que implementa un ambiente tecnologico 100% controlado
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  className="bg-puffy-cream hover:bg-puffy-cream-dark text-puffy-brown-dark text-sm"
                  onClick={handleStudentClick}
                >
                  Proba la demo para estudiantes
                </Button>
                <Button
                  className="bg-puffy-cream hover:bg-puffy-cream-dark text-puffy-brown-dark text-sm"
                  onClick={handleTeacherClick}
                >
                  Proba la demo para instituciones
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-6 py-8 px-4 md:px-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <img src="/images/puffy.png" alt="Puffy Logo" className="h-6 w-6 sm:h-8 sm:w-8" />
              <span className="text-base sm:text-lg font-bold text-puffy-brown">Puffy</span>
            </div>
            <p className="text-xs sm:text-sm text-puffy-brown-dark">
              Puffy es una inteligencia artificial socrática diseñada para ayudar a estudiantes universitarios a
              desarrollar pensamiento crítico y reflexión profunda.
            </p>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
            <p className="text-center text-xs sm:text-sm text-puffy-brown-dark md:text-left">
              © {new Date().getFullYear()} Puffy. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm text-puffy-brown-dark">Desarrollado por</span>
              <img src="/images/logo-vismi.png" alt="Vismi Logo" className="h-8 sm:h-12" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


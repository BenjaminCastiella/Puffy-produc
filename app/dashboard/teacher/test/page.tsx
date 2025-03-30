"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { TestTube, CheckCircle, XCircle, RotateCw } from "lucide-react"
import { cn } from "@/lib/utils"

type TestResult = {
  id: number
  question: string
  response: string
  evaluation: "correct" | "incorrect" | "partial"
  feedback: string
}

export default function TestPage() {
  const [question, setQuestion] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([
    {
      id: 1,
      question: "¿Qué es una matriz en Java?",
      response:
        "Una matriz en Java es una estructura de datos que permite almacenar múltiples valores del mismo tipo en una sola variable. Se puede pensar en ella como una tabla con filas y columnas. En Java, las matrices son objetos y se declaran usando corchetes [].",
      evaluation: "correct",
      feedback: "La respuesta es correcta y completa. Puffy explica claramente el concepto de matriz en Java.",
    },
    {
      id: 2,
      question: "¿Cómo se implementa la herencia en Java?",
      response:
        "La herencia en Java se implementa utilizando la palabra clave 'extends'. Una clase puede heredar de otra clase, lo que significa que adquiere todos sus métodos y propiedades públicas y protegidas.",
      evaluation: "partial",
      feedback:
        "La respuesta es parcialmente correcta. Falta mencionar que Java solo permite herencia simple (una clase solo puede heredar de una superclase) y que el constructor de la superclase se llama usando 'super()'.",
    },
  ])

  const handleSubmit = () => {
    if (!question.trim()) return

    setIsThinking(true)

    // Simulate Puffy thinking and responding
    setTimeout(() => {
      setIsThinking(false)

      // Add a new test result
      const newResult: TestResult = {
        id: Date.now(),
        question,
        response: generateResponse(question),
        evaluation: Math.random() > 0.3 ? (Math.random() > 0.5 ? "correct" : "partial") : "incorrect",
        feedback: "Esta es una evaluación automática de la respuesta de Puffy.",
      }

      setTestResults([newResult, ...testResults])
      setQuestion("")
    }, 2000)
  }

  // Function to generate a simulated response based on the question
  const generateResponse = (q: string) => {
    const lowerQ = q.toLowerCase()

    if (lowerQ.includes("matriz") || lowerQ.includes("array")) {
      return "Una matriz en Java es una estructura de datos que permite almacenar múltiples valores del mismo tipo en una sola variable. Se declara usando corchetes [] y puede ser unidimensional o multidimensional. Para acceder a los elementos se utilizan índices que comienzan en 0."
    } else if (lowerQ.includes("herencia") || lowerQ.includes("extends")) {
      return "La herencia en Java es un mecanismo por el cual una clase puede heredar características (métodos y atributos) de otra clase. Se implementa usando la palabra clave 'extends'. Java solo permite herencia simple, lo que significa que una clase solo puede heredar de una única superclase."
    } else if (lowerQ.includes("polimorfismo")) {
      return "El polimorfismo en Java permite que objetos de diferentes clases sean tratados como objetos de una clase común. Hay dos tipos principales: polimorfismo en tiempo de compilación (sobrecarga de métodos) y polimorfismo en tiempo de ejecución (sobreescritura de métodos)."
    } else {
      return "Para responder a esta pregunta, necesitaría analizar el contexto específico. ¿Podrías proporcionar más detalles o reformular la pregunta para que pueda darte una respuesta más precisa?"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Testear Puffy</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-puffy-brown text-puffy-brown">
              <RotateCw className="mr-2 h-4 w-4" />
              <span>Reiniciar pruebas</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Probar conocimientos de Puffy</CardTitle>
                <CardDescription>
                  Haz preguntas para verificar si Puffy ha aprendido correctamente del material
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="mt-1">
                      
                      <AvatarFallback className="bg-puffy-pink text-puffy-brown">PF</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        placeholder="Escribe una pregunta para probar a Puffy..."
                        className="border-puffy-brown/20 min-h-[100px]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button
                  onClick={handleSubmit}
                  className="bg-puffy-brown text-white hover:bg-puffy-brown-light"
                  disabled={!question.trim() || isThinking}
                >
                  {isThinking ? (
                    <>
                      <TestTube className="mr-2 h-4 w-4 animate-spin" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <TestTube className="mr-2 h-4 w-4" />
                      <span>Probar</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-4">
              {testResults.map((result) => (
                <Card key={result.id} className="border-puffy-brown/10">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-puffy-brown text-lg">Prueba #{result.id}</CardTitle>
                      <Badge
                        className={cn(
                          result.evaluation === "correct" && "bg-green-100 text-green-800",
                          result.evaluation === "partial" && "bg-yellow-100 text-yellow-800",
                          result.evaluation === "incorrect" && "bg-red-100 text-red-800",
                        )}
                      >
                        {result.evaluation === "correct" && "Correcto"}
                        {result.evaluation === "partial" && "Parcialmente correcto"}
                        {result.evaluation === "incorrect" && "Incorrecto"}
                      </Badge>
                    </div>
                    <CardDescription>Pregunta: {result.question}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Avatar className="mt-1 h-8 w-8">
                          
                          <AvatarFallback className="bg-puffy-pink text-puffy-brown">PF</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 p-3 bg-white border border-puffy-brown/10 rounded-lg">
                          <p className="text-sm text-puffy-brown-dark">{result.response}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-puffy-cream/30 rounded-lg">
                        <div className="flex items-start gap-2">
                          {result.evaluation === "correct" && <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />}
                          {result.evaluation === "partial" && (
                            <CheckCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          )}
                          {result.evaluation === "incorrect" && <XCircle className="h-5 w-5 text-red-600 mt-0.5" />}
                          <div>
                            <p className="font-medium text-puffy-brown">Evaluación</p>
                            <p className="text-sm text-puffy-brown-dark">{result.feedback}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Estadísticas de pruebas</CardTitle>
                <CardDescription>Resumen de las pruebas realizadas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-green-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-sm font-medium text-green-800">Correctas</span>
                    </div>
                    <span className="text-lg font-bold text-green-800">
                      {testResults.filter((r) => r.evaluation === "correct").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-50">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-yellow-600" />
                      <span className="text-sm font-medium text-yellow-800">Parciales</span>
                    </div>
                    <span className="text-lg font-bold text-yellow-800">
                      {testResults.filter((r) => r.evaluation === "partial").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-lg bg-red-50">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-5 w-5 text-red-600" />
                      <span className="text-sm font-medium text-red-800">Incorrectas</span>
                    </div>
                    <span className="text-lg font-bold text-red-800">
                      {testResults.filter((r) => r.evaluation === "incorrect").length}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <div className="w-full">
                  <p className="text-sm text-puffy-brown-dark mb-2">Precisión general</p>
                  <div className="w-full h-4 bg-puffy-cream-light rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-puffy-brown to-puffy-pink"
                      style={{
                        width: `${(testResults.filter((r) => r.evaluation === "correct").length / testResults.length) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-puffy-brown-light mt-1 text-right">
                    {Math.round(
                      (testResults.filter((r) => r.evaluation === "correct").length / testResults.length) * 100,
                    )}
                    % de precisión
                  </p>
                </div>
              </CardFooter>
            </Card>

            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Sugerencias de prueba</CardTitle>
                <CardDescription>Preguntas recomendadas para probar a Puffy</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[
                    "¿Cómo se declara una matriz bidimensional en Java?",
                    "Explica el concepto de polimorfismo en Java",
                    "¿Cuál es la diferencia entre una clase abstracta y una interfaz?",
                    "¿Cómo funciona la recolección de basura en Java?",
                    "Explica el concepto de encapsulamiento",
                  ].map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start border-puffy-brown/10 text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                      onClick={() => setQuestion(suggestion)}
                    >
                      <span className="truncate text-left">{suggestion}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}


"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Send, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
// Add import for Gemini
import { generateSocraticResponse } from "@/lib/gemini"

type Message = {
  id: string
  content: string
  sender: "user" | "puffy"
  timestamp: Date
  thinking?: boolean
}

type DebateModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  puffyType: "programming" | "math" | "history"
  onDebateEnd: (result: { won: boolean; score: number; feedback: string }) => void
}

export function DebateModal({ open, onOpenChange, puffyType, onDebateEnd }: DebateModalProps) {
  const [countdown, setCountdown] = useState(3)
  const [isDebateStarted, setIsDebateStarted] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(300) // 5 minutes in seconds
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [debateEnded, setDebateEnded] = useState(false)
  const [debateResult, setDebateResult] = useState<{ won: boolean; score: number; feedback: string } | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Countdown before debate starts
  useEffect(() => {
    if (!open) return

    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && !isDebateStarted) {
      setIsDebateStarted(true)
      startDebate()
    }
  }, [countdown, open, isDebateStarted])

  // Timer for debate duration
  useEffect(() => {
    if (!isDebateStarted || debateEnded) return

    if (timeRemaining > 0) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else {
      endDebate()
    }
  }, [timeRemaining, isDebateStarted, debateEnded])

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Start the debate with an initial question from Puffy
  const startDebate = async () => {
    const topics = {
      programming: [
        "¿Es la programación funcional superior a la programación orientada a objetos?",
        "¿Deberían todas las escuelas enseñar programación desde primaria?",
        "¿Son los lenguajes de bajo nivel obsoletos en la era moderna?",
      ],
      math: [
        "¿Las matemáticas son descubiertas o inventadas por los humanos?",
        "¿Es necesario que todos los estudiantes aprendan cálculo avanzado?",
        "¿Son las matemáticas puras más importantes que las matemáticas aplicadas?",
      ],
      history: [
        "¿Es el estudio de la historia relevante en la era digital?",
        "¿Deberían los libros de historia centrarse más en las perspectivas de grupos marginados?",
        "¿Es la historia escrita principalmente por los vencedores?",
      ],
    }

    // Select a random topic based on Puffy type
    const topicList = topics[puffyType] || topics.programming
    const randomTopic = topicList[Math.floor(Math.random() * topicList.length)]

    // Add initial message from Puffy
    setMessages([
      {
        id: Date.now().toString(),
        content: `Bienvenido al debate. El tema de hoy es: ${randomTopic} Tienes 5 minutos para debatir. ¿Cuál es tu postura al respecto?`,
        sender: "puffy",
        timestamp: new Date(),
      },
    ])
  }

  // Handle user message submission
  const handleSend = async () => {
    if (!input.trim() || isThinking || debateEnded) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsThinking(true)

    // Add thinking message
    const thinkingMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: "",
      sender: "puffy",
      timestamp: new Date(),
      thinking: true,
    }

    setMessages((prev) => [...prev, thinkingMessage])

    try {
      // Format previous messages for context
      const history = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: msg.content,
      }))

      // Add debate context to the prompt
      const debatePrompt = `Estamos en un debate sobre ${puffyType === "programming" ? "programación" : puffyType === "math" ? "matemáticas" : "historia"}. 
    El usuario acaba de decir: "${input}"
    
    Responde como un oponente de debate, cuestionando sus argumentos y presentando contraargumentos sólidos.
    Mantén un tono respetuoso pero desafiante.`

      // Generate response using Gemini
      const response = await generateSocraticResponse(debatePrompt, history)

      // Remove thinking message and add real response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.thinking)

        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            content: response,
            sender: "puffy",
            timestamp: new Date(),
          },
        ]
      })
    } catch (error) {
      console.error("Error in debate response:", error)

      // Show error message
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.thinking)

        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            content: "Lo siento, ha ocurrido un error. Intentemos continuar el debate.",
            sender: "puffy",
            timestamp: new Date(),
          },
        ]
      })

      toast({
        title: "Error en el debate",
        description: "No se pudo generar una respuesta. Intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsThinking(false)
    }
  }

  // End the debate and evaluate the result
  const endDebate = async () => {
    setDebateEnded(true)

    // In a real implementation, this would call the Gemini API to evaluate the debate
    // For this demo, we'll simulate an evaluation

    // Check if the user has sent at least 2 messages
    const userMessages = messages.filter((msg) => msg.sender === "user")
    const hasEnoughMessages = userMessages.length >= 2

    // Simulate evaluation
    const won = hasEnoughMessages && Math.random() > 0.4 // 60% chance of winning if enough messages
    const score = hasEnoughMessages ? Math.floor(Math.random() * 30) + 70 : Math.floor(Math.random() * 40) + 30

    let feedback = ""
    if (won) {
      feedback =
        "¡Felicidades! Has presentado argumentos coherentes y bien fundamentados. Tu capacidad para combinar información y sentido común ha sido excelente."
    } else if (hasEnoughMessages) {
      feedback =
        "Has presentado algunos puntos interesantes, pero tus argumentos podrían beneficiarse de más evidencia y una estructura más clara."
    } else {
      feedback =
        "Para mejorar en futuros debates, intenta participar más activamente y desarrollar tus argumentos con mayor profundidad."
    }

    const result = { won, score, feedback }
    setDebateResult(result)

    // Add final message from Puffy
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        content: `El debate ha terminado. ${feedback}`,
        sender: "puffy",
        timestamp: new Date(),
      },
    ])

    // Notify parent component
    onDebateEnd(result)
  }

  // Handle key press (Enter to send)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  // Reset the debate state when closed
  const handleClose = () => {
    onOpenChange(false)
    // Reset state after animation completes
    setTimeout(() => {
      setCountdown(3)
      setIsDebateStarted(false)
      setTimeRemaining(300)
      setMessages([])
      setInput("")
      setIsThinking(false)
      setDebateEnded(false)
      setDebateResult(null)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl h-[80vh] flex flex-col p-0 gap-0">
        <DialogHeader className="p-4 border-b border-puffy-brown/10 flex-shrink-0">
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span>Debate con Puffy</span>
              {puffyType === "programming" && <span className="text-sm text-puffy-brown-dark">(Programación)</span>}
              {puffyType === "math" && <span className="text-sm text-puffy-brown-dark">(Matemáticas)</span>}
              {puffyType === "history" && <span className="text-sm text-puffy-brown-dark">(Historia)</span>}
            </div>
            {isDebateStarted && !debateEnded && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-puffy-brown" />
                <span className={cn("font-mono", timeRemaining <= 60 && "text-red-500 font-bold")}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        {!isDebateStarted ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="text-6xl font-bold text-puffy-brown mb-4">{countdown}</div>
            <p className="text-xl text-puffy-brown-dark">Preparándose para el debate...</p>
            <p className="text-sm text-puffy-brown-light mt-2">
              Tendrás 5 minutos para debatir con Puffy sobre un tema relacionado con{" "}
              {puffyType === "programming" ? "programación" : puffyType === "math" ? "matemáticas" : "historia"}.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto p-4 bg-puffy-cream-light/30">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
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
                        {message.thinking ? (
                          <div className="flex items-center gap-1">
                            <div
                              className="h-2 w-2 rounded-full bg-puffy-pink animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-puffy-pink animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="h-2 w-2 rounded-full bg-puffy-pink animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        ) : (
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        )}
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="mt-0.5 h-8 w-8">
                          
                          <AvatarFallback className="bg-puffy-cream text-puffy-brown">ES</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="p-4 border-t border-puffy-brown/10 bg-white flex-shrink-0">
              {debateEnded ? (
                <div className="flex flex-col items-center justify-center p-4">
                  <h3 className="text-xl font-bold text-puffy-brown mb-2">
                    {debateResult?.won ? "¡Debate ganado!" : "Debate finalizado"}
                  </h3>
                  <div className="flex items-center justify-center w-24 h-24 rounded-full bg-puffy-cream mb-4">
                    <span className="text-3xl font-bold text-puffy-brown">{debateResult?.score}</span>
                  </div>
                  <p className="text-sm text-puffy-brown-dark text-center">{debateResult?.feedback}</p>
                  <Button className="mt-4 bg-puffy-brown text-white hover:bg-puffy-brown-light" onClick={handleClose}>
                    Cerrar
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Escribe tu argumento..."
                    className="border-puffy-brown/20 focus-visible:ring-puffy-brown"
                    disabled={isThinking}
                  />
                  <Button
                    onClick={handleSend}
                    className="bg-puffy-brown text-white hover:bg-puffy-brown-light"
                    disabled={!input.trim() || isThinking}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    <span>Enviar</span>
                  </Button>
                </div>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}


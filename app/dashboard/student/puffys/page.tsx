"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback} from "@/components/ui/avatar"
import { MessageSquare, History } from "lucide-react"
import { getUserConversations } from "@/lib/conversation-history"

export default function PuffysPage() {
  const [puffys, setPuffys] = useState([
    {
      id: 1,
      name: "Puffy de Programación",
      type: "programming",
      description: "Especializado en lenguajes de programación, algoritmos y desarrollo de software.",
      teacher: "Prof. Martínez",
      lastAccessed: "Hace 2 horas",
      conversationCount: 0,
    },
    {
      id: 2,
      name: "Puffy de Matemáticas",
      type: "math",
      description: "Experto en álgebra, cálculo, geometría y resolución de problemas matemáticos.",
      teacher: "Prof. García",
      lastAccessed: "Ayer",
      conversationCount: 0,
    },
    {
      id: 3,
      name: "Puffy de Historia",
      type: "history",
      description: "Conocedor de eventos históricos, civilizaciones antiguas y procesos sociales.",
      teacher: "Prof. López",
      lastAccessed: "Hace 3 días",
      conversationCount: 0,
    },
  ])

  useEffect(() => {
    // Cargar el conteo de conversaciones para cada Puffy
    const updatedPuffys = puffys.map((puffy) => {
      const conversations = getUserConversations("student-1", puffy.type)
      return {
        ...puffy,
        conversationCount: conversations.length,
      }
    })

    setPuffys(updatedPuffys)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Mis Puffys</h1>
          <Button variant="outline" asChild>
            <Link href="/dashboard/student">Volver al Dashboard</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1 container px-4 py-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {puffys.map((puffy) => (
            <Card key={puffy.id} className="border-puffy-brown/10">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    
                    <AvatarFallback className="bg-puffy-pink text-puffy-brown">PF</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-puffy-brown">{puffy.name}</CardTitle>
                    <CardDescription>{puffy.teacher}</CardDescription>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-sm text-puffy-brown-dark mb-4">{puffy.description}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <History className="h-4 w-4 text-puffy-brown" />
                    <span>{puffy.conversationCount} conversaciones</span>
                  </div>
                  <span className="text-puffy-brown-light">{puffy.lastAccessed}</span>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-2">
                <Button asChild className="w-full bg-puffy-brown text-white hover:bg-puffy-brown-light">
                  <Link href={`/dashboard/student/chat?puffyType=${puffy.type}`}>
                    <MessageSquare className="mr-2 h-4 w-4" />
                    <span>Chatear con {puffy.name.split(" ")[2]}</span>
                  </Link>
                </Button>

                {puffy.conversationCount > 0 && (
                  <Button variant="outline" asChild className="w-full border-puffy-brown text-puffy-brown">
                    <Link href={`/dashboard/student/chat?puffyType=${puffy.type}&showHistory=true`}>
                      <History className="mr-2 h-4 w-4" />
                      <span>Ver conversaciones anteriores</span>
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}


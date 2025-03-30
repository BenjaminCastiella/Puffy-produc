"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Send, Paperclip, BookOpen, History } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  generateSocraticResponse,
  generateConversationReport,
} from "@/lib/gemini";
import { useToast } from "@/hooks/use-toast";
import { recordPuffySession } from "@/lib/statistics";
import { generateReport } from "@/lib/report-generation";
// Add import for conversation history
import {
  initializeConversationHistory,
  saveConversation,
  getUserConversations,
  getConversationById,
} from "@/lib/conversation-history";

// Agregar soporte para cargar conversaciones específicas de un tipo de Puffy
import { useSearchParams, useRouter } from "next/navigation";

// Types for our chat
type MessageType = {
  id: string;
  content: string;
  sender: "user" | "puffy";
  timestamp: Date;
  thinking?: boolean;
};

export default function ChatPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Obtener parámetros de la URL una sola vez al cargar el componente
  const typeParam = searchParams.get("puffyType") || "programming";
  const puffyId = searchParams.get("puffyId");

  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: "1",
      content:
        "¡Hola! Soy Puffy, tu asistente de aprendizaje. ¿En qué puedo ayudarte hoy?",
      sender: "puffy",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [chatHistory, setChatHistory] = useState<
    { role: "user" | "model"; parts: string }[]
  >([]);
  // Add state for conversation ID and history (after other useState declarations)
  const [conversationId, setConversationId] = useState<string>(
    Date.now().toString()
  );
  const [savedConversations, setSavedConversations] = useState<any[]>([]);
  // Inicializar el tipo de Puffy con el valor de la URL
  const [puffyType, setPuffyType] = useState<string>(typeParam);

  // Determinar el nombre del Puffy basado en el tipo
  const getPuffyName = (type: string) => {
    switch (type) {
      case "programming":
        return "Puffy de Programación";
      case "math":
        return "Matemáticas";
      case "history":
        return "Historia";
      default:
        return "Programación";
    }
  };

  const [puffyName, setPuffyName] = useState<string>(getPuffyName(typeParam));

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Efecto para inicializar la sesión de Puffy
  useEffect(() => {
    // Record a Puffy session when the chat page is loaded
    recordPuffySession("student-1"); // Using a mock user ID
  }, []);

  // Auto scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Verificar que la API key esté configurada
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      toast({
        title: "Configuración incompleta",
        description:
          "La API key de Gemini no está configurada. Contacta al administrador.",
        variant: "destructive",
      });
    }

    // Verificar que el modelo esté configurado correctamente
    if (
      process.env.NEXT_PUBLIC_GEMINI_MODEL &&
      process.env.NEXT_PUBLIC_GEMINI_MODEL.includes(" ")
    ) {
      toast({
        title: "Configuración incorrecta",
        description:
          "El nombre del modelo Gemini contiene espacios. Debe usar un formato como 'gemini-1.5-flash'.",
        variant: "destructive",
      });
    }
  }, [toast]);

  // Efecto para inicializar el historial de conversaciones
  useEffect(() => {
    // Initialize conversation history
    initializeConversationHistory();

    // Load saved conversations for this Puffy type
    const conversations = getUserConversations("student-1");
    const filteredConversations = conversations.filter(
      (conv) => conv.puffyType === puffyType
    );
    setSavedConversations(filteredConversations);

    // If a specific puffyId is provided, try to load that conversation
    if (puffyId) {
      const conversation = getConversationById("student-1", puffyId);
      if (conversation) {
        loadConversation(puffyId);
      }
    }
  }, [puffyId, puffyType]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    // Update chat history for context
    const updatedHistory = [
      ...chatHistory,
      {
        role: "user",
        parts: input,
      },
    ];
    setChatHistory(updatedHistory);

    // Add thinking message
    const thinkingMessage: MessageType = {
      id: (Date.now() + 1).toString(),
      content: "",
      sender: "puffy",
      timestamp: new Date(),
      thinking: true,
    };

    setMessages((prev) => [...prev, thinkingMessage]);

    let response = ""; // Declare response here
    try {
      // Generate response using Gemini
      response = await generateSocraticResponse(input, updatedHistory);

      // Remove thinking message and add real response
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.thinking);

        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            content: response,
            sender: "puffy",
            timestamp: new Date(),
          },
        ];
      });

      // Update chat history with model response
      setChatHistory([
        ...updatedHistory,
        {
          role: "model",
          parts: response,
        },
      ]);

      // Generate report after 5 messages (opcional, podría ser después de finalizar la conversación)
      if (messages.length >= 5) {
        const conversationData = messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.content,
        }));

        // Esto podría enviarse a una API para almacenar en la base de datos
        // o mostrarse al estudiante como resumen
        generateConversationReport(conversationData)
          .then((report) => {
            console.log("Reporte generado:", report);
            // Aquí podrías enviar el reporte al backend
          })
          .catch((error) => {
            console.error("Error al generar reporte:", error);
          });
      }
    } catch (error) {
      console.error("Error en la comunicación con Gemini:", error);

      // Mostrar mensaje de error
      setMessages((prev) => {
        const filtered = prev.filter((msg) => !msg.thinking);

        return [
          ...filtered,
          {
            id: (Date.now() + 2).toString(),
            content:
              "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor, intenta nuevamente.",
            sender: "puffy",
            timestamp: new Date(),
          },
        ];
      });

      toast({
        title: "Error de comunicación",
        description:
          "No se pudo conectar con el servicio de IA. Intenta nuevamente.",
        variant: "destructive",
      });
    } finally {
      setIsThinking(false);
      // Save conversation to history
      const currentConversation = {
        id: conversationId,
        puffyType: puffyType,
        puffyName: puffyName,
        title: input.length > 30 ? `${input.substring(0, 30)}...` : input,
        date: new Date().toISOString(),
        messages: [
          ...messages.filter((msg) => !msg.thinking),
          {
            id: (Date.now() + 2).toString(),
            content: response,
            sender: "puffy",
            timestamp: new Date(),
          },
        ],
      };
      saveConversation("student-1", currentConversation);

      // Actualizar la lista de conversaciones guardadas
      const conversations = getUserConversations("student-1");
      const filteredConversations = conversations.filter(
        (conv) => conv.puffyType === puffyType
      );
      setSavedConversations(filteredConversations);
    }
  };

  const handleEndChat = async () => {
    if (messages.length <= 1) return; // Don't generate a report if there's no real conversation

    try {
      // Generate a report from the conversation
      await generateReport(
        messages.map((msg) => ({
          id: msg.id,
          content: msg.content,
          sender: msg.sender,
          timestamp: msg.timestamp,
        })),
        "student-1", // Mock student ID
        "Estudiante", // Mock student name
        "Conversación con Puffy" // Default topic
      );

      toast({
        title: "Conversación finalizada",
        description: "Se ha generado un reporte para tu profesor.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "No se pudo generar el reporte de la conversación.",
        variant: "destructive",
      });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Mock materials data
  const materials = [
    { id: 1, title: "Introducción a Java", type: "PDF" },
    { id: 2, title: "Matrices y Vectores", type: "PDF" },
    { id: 3, title: "Ejercicios prácticos", type: "DOC" },
  ];

  // Add a function to load a conversation
  const loadConversation = (conversationId: string) => {
    const conversation = getConversationById("student-1", conversationId);
    if (conversation) {
      setConversationId(conversation.id);
      setMessages(
        conversation.messages.map((msg) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
        }))
      );
      setChatHistory(
        conversation.messages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "model",
          parts: msg.content,
        }))
      );
    }
  };

  // Add a function to start a new conversation
  const startNewConversation = () => {
    const newId = Date.now().toString();
    setConversationId(newId);
    setMessages([
      {
        id: "1",
        content:
          "¡Hola! Soy Puffy, tu asistente de aprendizaje. ¿En qué puedo ayudarte hoy?",
        sender: "puffy",
        timestamp: new Date(),
      },
    ]);
    setChatHistory([]);
  };

  // Update the chatHistoryItems in the sidebar to use real data
  // Replace the mock chatHistoryItems with:
  const chatHistoryItems = savedConversations
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-puffy-pink text-puffy-brown">
                PF
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-lg font-bold text-puffy-brown">
                Chat con {puffyName}
              </h1>
              <p className="text-xs text-puffy-brown-dark">
                {puffyType === "programming"
                  ? "Programación - Prof. Martínez"
                  : puffyType === "math"
                  ? "Matemáticas - Prof. García"
                  : "Historia - Prof. López"}
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto p-4 bg-puffy-cream-light/30">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  <div className="flex items-start gap-3 max-w-[80%]">
                    {message.sender === "puffy" && (
                      <Avatar className="mt-0.5 h-8 w-8">
                        
                        <AvatarFallback className="bg-puffy-pink text-puffy-brown">
                          PF
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "rounded-lg p-3",
                        message.sender === "user"
                          ? "bg-puffy-brown text-white"
                          : "bg-white border border-puffy-brown/10"
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
                        <p className="text-sm whitespace-pre-wrap">
                          {message.content}
                        </p>
                      )}
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    {message.sender === "user" && (
                      <Avatar className="mt-0.5 h-8 w-8">
                        <AvatarFallback className="bg-puffy-cream text-puffy-brown">
                          ES
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="p-4 border-t border-puffy-brown/10 bg-white">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Escribe tu mensaje..."
                  className="border-puffy-brown/20 focus-visible:ring-puffy-brown"
                  disabled={isThinking}
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="border-puffy-brown/20 text-puffy-brown"
                  disabled={isThinking}
                >
                  <Paperclip className="h-4 w-4" />
                  <span className="sr-only">Adjuntar archivo</span>
                </Button>
                <Button
                  onClick={handleSend}
                  className="bg-puffy-brown text-white hover:bg-puffy-brown-light"
                  disabled={!input.trim() || isThinking}
                >
                  <Send className="h-4 w-4 mr-2" />
                  <span>Enviar</span>
                </Button>
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-puffy-brown-dark">
                  Puffy utiliza el método socrático para guiarte. No te dará
                  respuestas directas a problemas, sino que te ayudará a
                  reflexionar.
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                  onClick={handleEndChat}
                  disabled={messages.length <= 1 || isThinking}
                >
                  Finalizar chat
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden lg:block w-80 border-l border-puffy-brown/10 bg-white overflow-y-auto">
          <Tabs defaultValue="materials">
            <div className="p-4 border-b border-puffy-brown/10">
              <TabsList className="grid grid-cols-2 w-full bg-puffy-cream/30">
                <TabsTrigger
                  value="materials"
                  className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Materiales
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
                >
                  <History className="h-4 w-4 mr-2" />
                  Historial
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="materials" className="p-4 space-y-4">
              <h3 className="font-medium text-puffy-brown">
                Materiales del curso
              </h3>
              <div className="space-y-2">
                {materials.map((material) => (
                  <Card key={material.id} className="border-puffy-brown/10">
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-puffy-brown" />
                          <span className="text-sm">{material.title}</span>
                        </div>
                        <span className="text-xs bg-puffy-cream px-2 py-0.5 rounded text-puffy-brown-dark">
                          {material.type}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Button
                variant="ghost"
                className="w-full text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                <span>Ver todos los materiales</span>
              </Button>
            </TabsContent>
            <TabsContent value="history" className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-puffy-brown">
                  Conversaciones anteriores
                </h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs border-puffy-brown text-puffy-brown"
                  onClick={startNewConversation}
                >
                  Nueva conversación
                </Button>
              </div>
              <div className="space-y-2">
                {chatHistoryItems.length === 0 ? (
                  <p className="text-sm text-puffy-brown-dark text-center py-2">
                    No hay conversaciones guardadas
                  </p>
                ) : (
                  chatHistoryItems.map((chat) => (
                    <Card
                      key={chat.id}
                      className="border-puffy-brown/10 cursor-pointer hover:bg-puffy-cream/10"
                      onClick={() => loadConversation(chat.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              
                              <AvatarFallback className="bg-puffy-pink text-puffy-brown">
                                PF
                              </AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-puffy-brown truncate">
                              {chat.title}
                            </span>
                          </div>
                          <span className="text-xs text-puffy-brown-light mt-1">
                            {new Date(chat.date).toLocaleDateString()}{" "}
                            {new Date(chat.date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
              {savedConversations.length > 5 && (
                <Button
                  variant="ghost"
                  className="w-full text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                >
                  <History className="h-4 w-4 mr-2" />
                  <span>Ver historial completo</span>
                </Button>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

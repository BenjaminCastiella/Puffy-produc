"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/toaster"
import { useEffect } from "react"
import { initializeStatistics } from "@/lib/statistics"
import { initializeConversationHistory } from "@/lib/conversation-history"

const inter = Inter({ subsets: ["latin"] })

export default function ClientRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Initialize statistics when the app loads
  useEffect(() => {
    initializeStatistics()
    initializeConversationHistory()
  }, [])

  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/favicon.png" />
        <title>Puffle</title>
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}


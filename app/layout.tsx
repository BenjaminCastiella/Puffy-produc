import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import ClientRootLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "Puffle",
  description: "Plataforma educativa basada en IA que utiliza el método socrático para fomentar el pensamiento crítico",
  generator: "v0.dev",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientRootLayout>{children}</ClientRootLayout>
}



import './globals.css'
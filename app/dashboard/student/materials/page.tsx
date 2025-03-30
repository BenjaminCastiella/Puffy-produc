"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileText, Download, Eye, BookOpen, Code, Calculator } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { getUploadedFiles } from "@/lib/file-processing"
import { recordMaterialView } from "@/lib/statistics"

// Update the component to include file viewing functionality
export default function MaterialsPage() {
  // Add state for file viewer
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [fileContent, setFileContent] = useState("")

  // Get uploaded files from localStorage
  const uploadedFiles = typeof window !== "undefined" ? getUploadedFiles() : []

  // Mock materials data - keep this for the demo
  const programmingMaterials = [
    {
      id: 1,
      title: "Introducción a Java",
      description: "Fundamentos del lenguaje Java",
      type: "PDF",
      size: "2.4 MB",
      date: "15/03/2024",
      new: true,
    },
    {
      id: 2,
      title: "Matrices y Vectores",
      description: "Implementación y manipulación de matrices en Java",
      type: "PDF",
      size: "1.8 MB",
      date: "20/03/2024",
      new: false,
    },
    {
      id: 3,
      title: "Ejercicios prácticos",
      description: "Problemas para resolver con matrices",
      type: "DOC",
      size: "1.2 MB",
      date: "22/03/2024",
      new: true,
    },
    {
      id: 4,
      title: "Clases y Objetos",
      description: "Programación orientada a objetos en Java",
      type: "PDF",
      size: "3.1 MB",
      date: "10/03/2024",
      new: false,
    },
    {
      id: 5,
      title: "Herencia y Polimorfismo",
      description: "Conceptos avanzados de POO",
      type: "PDF",
      size: "2.7 MB",
      date: "05/03/2024",
      new: false,
    },
  ]

  const mathMaterials = [
    {
      id: 1,
      title: "Cálculo Diferencial",
      description: "Introducción a derivadas",
      type: "PDF",
      size: "3.2 MB",
      date: "12/03/2024",
      new: false,
    },
    {
      id: 2,
      title: "Álgebra Lineal",
      description: "Matrices y sistemas de ecuaciones",
      type: "PDF",
      size: "2.5 MB",
      date: "18/03/2024",
      new: true,
    },
  ]

  const historyMaterials = [
    {
      id: 1,
      title: "Historia Contemporánea",
      description: "Siglos XIX y XX",
      type: "PDF",
      size: "4.1 MB",
      date: "08/03/2024",
      new: false,
    },
    {
      id: 2,
      title: "Revolución Industrial",
      description: "Impacto y consecuencias",
      type: "DOC",
      size: "1.9 MB",
      date: "14/03/2024",
      new: true,
    },
  ]

  // Function to view a file
  const viewFile = (file: any) => {
    setSelectedFile(file)

    // In a real implementation, you would retrieve the actual file content
    // For this demo, we'll simulate file content
    setFileContent(`Este es el contenido simulado del archivo ${file.title || file.name}.
  
  ${file.description || file.summary || "Sin descripción disponible."}
  
  Este es un visor de archivos simulado. En una implementación real, 
  se mostraría el contenido real del archivo utilizando bibliotecas 
  como pdf.js para PDFs o mammoth para archivos DOCX.`)

    setIsViewerOpen(true)

    // Record material view in statistics
    recordMaterialView("student-1", file.id.toString())
  }

  // Function to download a file
  const downloadFile = (file: any) => {
    // In a real implementation, you would download the actual file
    // For this demo, we'll create a text file with the simulated content
    const element = document.createElement("a")
    const fileContent = `Contenido simulado para ${file.title || file.name}
  
  ${file.description || file.summary || "Sin descripción disponible."}`

    const blob = new Blob([fileContent], { type: "text/plain" })
    element.href = URL.createObjectURL(blob)
    element.download = file.title || file.name
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Add this at the end of the component, right before the closing return tag
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Materiales de Estudio</h1>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <Tabs defaultValue="programming" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="bg-puffy-cream/30">
              <TabsTrigger
                value="programming"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <Code className="h-4 w-4 mr-2" />
                Programación
              </TabsTrigger>
              <TabsTrigger
                value="math"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <Calculator className="h-4 w-4 mr-2" />
                Matemáticas
              </TabsTrigger>
              <TabsTrigger
                value="history"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Historia
              </TabsTrigger>
              <TabsTrigger
                value="uploaded"
                className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
              >
                <FileText className="h-4 w-4 mr-2" />
                Subidos
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="programming" className="space-y-4">
            <Card className="border-puffy-brown/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-puffy-brown">Programación Java</CardTitle>
                <CardDescription>Prof. Martínez - Materiales del curso</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programmingMaterials.map((material) => (
                    <div
                      key={material.id}
                      className="flex items-center justify-between p-3 rounded-lg border border-puffy-brown/10 bg-white"
                    >
                      <div className="flex items-start gap-3">
                        <div className="rounded-md bg-puffy-cream p-2 mt-0.5">
                          <FileText className="h-4 w-4 text-puffy-brown" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-puffy-brown">{material.title}</p>
                            {material.new && <Badge className="bg-puffy-pink text-puffy-brown-dark">Nuevo</Badge>}
                          </div>
                          <p className="text-xs text-puffy-brown-dark">{material.description}</p>
                          <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs text-puffy-brown-light">{material.type}</span>
                            <span className="text-xs text-puffy-brown-light">{material.size}</span>
                            <span className="text-xs text-puffy-brown-light">Subido: {material.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                          onClick={() => viewFile(material)}
                        >
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Ver</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                          onClick={() => downloadFile(material)}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Descargar</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Keep the other tabs as they are */}

          {/* Add a new tab for uploaded files */}
          <TabsContent value="uploaded" className="space-y-4">
            <Card className="border-puffy-brown/10">
              <CardHeader className="pb-2">
                <CardTitle className="text-puffy-brown">Materiales Subidos</CardTitle>
                <CardDescription>Documentos subidos por los profesores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-8 text-puffy-brown-dark">No hay materiales subidos disponibles.</div>
                  ) : (
                    uploadedFiles.map((file: any) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-puffy-brown/10 bg-white"
                      >
                        <div className="flex items-start gap-3">
                          <div className="rounded-md bg-puffy-cream p-2 mt-0.5">
                            <FileText className="h-4 w-4 text-puffy-brown" />
                          </div>
                          <div>
                            <p className="font-medium text-puffy-brown">{file.name}</p>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-puffy-brown-light">
                                {file.type.includes("pdf") ? "PDF" : file.type.includes("docx") ? "DOCX" : "TXT"}
                              </span>
                              <span className="text-xs text-puffy-brown-light">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                              <span className="text-xs text-puffy-brown-light">
                                Subido: {new Date(file.uploadDate).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                            onClick={() => viewFile(file)}
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Ver</span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                            onClick={() => downloadFile(file)}
                          >
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Descargar</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* File Viewer Dialog */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFile?.title || selectedFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 p-4 bg-gray-50 rounded-md whitespace-pre-wrap">
            En versiones más avanzadas de Puffle, en este espacio se mostrará el contenido del archivo
          </div>
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              className="border-puffy-brown text-puffy-brown mr-2"
              onClick={() => setIsViewerOpen(false)}
            >
              Cerrar
            </Button>
            <Button
              className="bg-puffy-brown text-white hover:bg-puffy-brown-light"
              onClick={() => downloadFile(selectedFile)}
            >
              <Download className="mr-2 h-4 w-4" />
              <span>Descargar</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


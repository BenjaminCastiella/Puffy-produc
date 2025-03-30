"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, X, Eye, Trash2, PlusCircle, Download } from "lucide-react"
import { cn } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"
import { extractTextFromFile, feedTextToGemini, saveFileMetadata, getUploadedFiles } from "@/lib/file-processing"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DeleteConfirmationDialog } from "@/components/delete-confirmation-dialog"

export default function MaterialsPage() {
  const [files, setFiles] = useState<File[]>([])
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)
  const [fileContent, setFileContent] = useState("")
  const { toast } = useToast()

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [fileToDelete, setFileToDelete] = useState<string | null>(null)

  useEffect(() => {
    // Load uploaded files from localStorage on component mount
    const savedFiles = getUploadedFiles()
    setUploadedFiles(savedFiles)
  }, [])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files))
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const removeUploadedFile = (id: string) => {
    setFileToDelete(id)
    setIsDeleteDialogOpen(true)
  }

  const confirmDeleteFile = () => {
    if (fileToDelete) {
      const updatedFiles = uploadedFiles.filter((file) => file.id !== fileToDelete)
      setUploadedFiles(updatedFiles)
      localStorage.setItem("uploadedFiles", JSON.stringify(updatedFiles))
      setFileToDelete(null)
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) return

    setIsUploading(true)

    try {
      for (const file of files) {
        // Check file type
        if (
          ![
            "application/pdf",
            "text/plain",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(file.type)
        ) {
          toast({
            title: "Formato no soportado",
            description: `El archivo ${file.name} no es un formato soportado. Solo se permiten PDF, TXT y DOCX.`,
            variant: "destructive",
          })
          continue
        }

        // Extract text from file
        const extractedText = await extractTextFromFile(file)

        // Feed text to Gemini
        const aiSummary = await feedTextToGemini(extractedText, file.name)

        // Save file metadata
        saveFileMetadata(file, aiSummary)

        toast({
          title: "Archivo procesado",
          description: `${file.name} ha sido procesado y añadido a la base de conocimiento de Puffy.`,
        })
      }

      // Refresh uploaded files list
      setUploadedFiles(getUploadedFiles())
      // Clear selected files
      setFiles([])
    } catch (error) {
      console.error("Error uploading files:", error)
      toast({
        title: "Error al procesar archivos",
        description: "Ocurrió un error al procesar los archivos. Por favor, intenta nuevamente.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const viewFile = async (file: any) => {
    setSelectedFile(file)

    // In a real implementation, you would retrieve the actual file content
    // For this demo, we'll simulate file content
    setFileContent(`Este es el contenido simulado del archivo ${file.name}.
    
    Resumen generado por IA:
    ${file.summary}
    
    Este es un visor de archivos simulado. En una implementación real, 
    se mostraría el contenido real del archivo utilizando bibliotecas 
    como pdf.js para PDFs o mammoth para archivos DOCX.`)

    setIsViewerOpen(true)
  }

  const downloadFile = (file: any) => {
    // In a real implementation, you would download the actual file
    // For this demo, we'll create a text file with the simulated content
    const element = document.createElement("a")
    const fileContent = `Contenido simulado para ${file.name}
    
    Resumen generado por IA:
    ${file.summary}`

    const blob = new Blob([fileContent], { type: "text/plain" })
    element.href = URL.createObjectURL(blob)
    element.download = file.name
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-puffy-brown/10 bg-white sticky top-0 z-10">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold text-puffy-brown">Gestión de Materiales</h1>
          <div className="flex items-center gap-4">
            <Button variant="outline" className="border-puffy-brown text-puffy-brown">
              <Eye className="mr-2 h-4 w-4" />
              <span>Vista previa</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container px-4 py-6">
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="bg-puffy-cream/30 mb-6">
            <TabsTrigger
              value="upload"
              className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
            >
              <Upload className="h-4 w-4 mr-2" />
              Subir Material
            </TabsTrigger>
            <TabsTrigger
              value="manage"
              className="data-[state=active]:bg-puffy-pink data-[state=active]:text-puffy-brown-dark"
            >
              <FileText className="h-4 w-4 mr-2" />
              Materiales Subidos
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-6">
            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Agregar nuevo material</CardTitle>
                <CardDescription>
                  Sube archivos para que Puffy aprenda y los estudiantes puedan consultarlos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-puffy-brown">
                    Título del material
                  </Label>
                  <Input id="title" placeholder="Ej: Introducción a Java" className="border-puffy-brown/20" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-puffy-brown">
                    Descripción
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Breve descripción del contenido"
                    className="border-puffy-brown/20 min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-puffy-brown">
                    Categoría
                  </Label>
                  <Select>
                    <SelectTrigger className="border-puffy-brown/20">
                      <SelectValue placeholder="Selecciona una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="programming">Programación</SelectItem>
                      <SelectItem value="math">Matemáticas</SelectItem>
                      <SelectItem value="history">Historia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-puffy-brown">Archivos</Label>
                  <div
                    className={cn(
                      "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                      "border-puffy-brown/20 hover:border-puffy-brown/40",
                      "focus:outline-none focus:ring-2 focus:ring-puffy-brown focus:ring-offset-2",
                    )}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById("file-upload")?.click()}
                    tabIndex={0}
                    role="button"
                    aria-label="Subir archivos"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <Upload className="h-8 w-8 text-puffy-brown/60" />
                      <p className="text-sm font-medium text-puffy-brown">
                        Arrastra y suelta archivos aquí o haz clic para seleccionar
                      </p>
                      <p className="text-xs text-puffy-brown-dark">Soporta PDF, DOCX, TXT (máx. 10MB)</p>
                    </div>
                    <Input id="file-upload" type="file" multiple className="hidden" onChange={handleFileChange} />
                  </div>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-puffy-brown">Archivos seleccionados</Label>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-2 rounded-lg border border-puffy-brown/10"
                        >
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-puffy-brown" />
                            <span className="text-sm text-puffy-brown">{file.name}</span>
                            <Badge variant="outline" className="border-puffy-brown text-puffy-brown">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-puffy-brown hover:bg-puffy-cream hover:text-puffy-brown-dark"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="questions" className="text-puffy-brown">
                    Preguntas base para Puffy
                  </Label>
                  <Textarea
                    id="questions"
                    placeholder="Agrega preguntas que los estudiantes podrían hacer sobre este material, una por línea"
                    className="border-puffy-brown/20 min-h-[150px]"
                  />
                  <p className="text-xs text-puffy-brown-dark">
                    Estas preguntas ayudarán a Puffy a entender mejor el material y responder de forma más precisa.
                  </p>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" className="border-puffy-brown text-puffy-brown">
                  Cancelar
                </Button>
                <Button
                  className="bg-puffy-brown text-white hover:bg-puffy-brown-light"
                  onClick={handleUpload}
                  disabled={isUploading || files.length === 0}
                >
                  {isUploading ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      <span>Subir material</span>
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="manage" className="space-y-6">
            <Card className="border-puffy-brown/10">
              <CardHeader>
                <CardTitle className="text-puffy-brown">Materiales subidos</CardTitle>
                <CardDescription>Gestiona los materiales que has subido para tus estudiantes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {uploadedFiles.length === 0 ? (
                    <div className="text-center py-8 text-puffy-brown-dark">
                      No hay materiales subidos. Sube algunos materiales para que Puffy pueda aprender de ellos.
                    </div>
                  ) : (
                    uploadedFiles.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-3 rounded-lg border border-puffy-brown/10"
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
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-500 hover:bg-red-50 hover:text-red-600"
                            onClick={() => removeUploadedFile(file.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-puffy-brown text-white hover:bg-puffy-brown-light"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  <span>Agregar nuevo material</span>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* File Viewer Dialog */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
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
      <DeleteConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDeleteFile}
      />
    </div>
  )
}


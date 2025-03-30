import { GoogleGenerativeAI } from "@google/generative-ai"

// Function to extract text from uploaded files
export async function extractTextFromFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async (event) => {
      try {
        const result = event.target?.result

        if (typeof result === "string") {
          // For TXT files
          resolve(result)
        } else if (result instanceof ArrayBuffer) {
          // For binary files (PDF, DOCX)
          // In a real implementation, you would use libraries like pdf.js for PDFs
          // and mammoth for DOCX files to extract text
          // For this demo, we'll simulate text extraction
          const text = `Extracted content from ${file.name}. 
          This is a simulated extraction as browser-based extraction 
          of PDF and DOCX requires additional libraries.`
          resolve(text)
        } else {
          reject(new Error("Unsupported file format"))
        }
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error("Error reading file"))
    }

    if (file.type === "text/plain") {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}

// Function to feed extracted text to Gemini for learning
export async function feedTextToGemini(text: string, fileName: string): Promise<string> {
  try {
    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "")
    const model = genAI.getGenerativeModel({
      model: process.env.NEXT_PUBLIC_GEMINI_MODEL || "gemini-1.5-flash",
    })

    const prompt = `
      Please learn from the following educational content. 
      This content is from a file named "${fileName}" and will be used for 
      educational purposes in the Puffy platform:
      
      ${text}
      
      Summarize what you've learned from this content and how you can use it 
      to help students with the Socratic method.
    `

    const result = await model.generateContent(prompt)
    return result.response.text()
  } catch (error) {
    console.error("Error feeding text to Gemini:", error)
    return "Failed to process the document with AI."
  }
}

// Function to save file metadata to "database" (simulated with localStorage)
export function saveFileMetadata(file: File, aiSummary: string): void {
  const fileData = {
    id: Date.now().toString(),
    name: file.name,
    type: file.type,
    size: file.size,
    uploadDate: new Date().toISOString(),
    summary: aiSummary,
  }

  // In a real app, this would be a database call
  // For this demo, we'll use localStorage
  const existingFiles = JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
  existingFiles.push(fileData)
  localStorage.setItem("uploadedFiles", JSON.stringify(existingFiles))

  return
}

// Function to get all uploaded files
export function getUploadedFiles() {
  return JSON.parse(localStorage.getItem("uploadedFiles") || "[]")
}

// Function to get file by ID
export function getFileById(id: string) {
  const files = getUploadedFiles()
  return files.find((file: any) => file.id === id)
}


// Types for conversation history
export type Conversation = {
  id: string
  puffyType: string
  puffyName: string
  title: string
  date: string
  messages: {
    id: string
    content: string
    sender: "user" | "puffy"
    timestamp: Date
  }[]
}

// Initialize conversation history in localStorage if it doesn't exist
export function initializeConversationHistory() {
  if (typeof window === "undefined") return

  if (!localStorage.getItem("conversationHistory")) {
    localStorage.setItem("conversationHistory", JSON.stringify({}))
  }
}

// Get user conversation history
export function getUserConversations(userId: string, puffyType?: string): Conversation[] {
  if (typeof window === "undefined") return []

  const history = JSON.parse(localStorage.getItem("conversationHistory") || "{}")

  if (!history[userId]) {
    history[userId] = []
    localStorage.setItem("conversationHistory", JSON.stringify(history))
  }

  // If puffyType is provided, filter conversations by type
  if (puffyType) {
    return history[userId].filter((conv: Conversation) => conv.puffyType === puffyType)
  }

  return history[userId]
}

// Save a conversation
export function saveConversation(userId: string, conversation: Conversation): void {
  if (typeof window === "undefined") return

  const history = JSON.parse(localStorage.getItem("conversationHistory") || "{}")

  if (!history[userId]) {
    history[userId] = []
  }

  // Check if conversation already exists
  const existingIndex = history[userId].findIndex((c: Conversation) => c.id === conversation.id)

  if (existingIndex !== -1) {
    // Update existing conversation
    history[userId][existingIndex] = conversation
  } else {
    // Add new conversation
    history[userId].push(conversation)
  }

  localStorage.setItem("conversationHistory", JSON.stringify(history))
}

// Get a conversation by ID
export function getConversationById(userId: string, conversationId: string): Conversation | undefined {
  if (typeof window === "undefined") return undefined

  const conversations = getUserConversations(userId)
  return conversations.find((conversation) => conversation.id === conversationId)
}

// Delete a conversation
export function deleteConversation(userId: string, conversationId: string): void {
  if (typeof window === "undefined") return

  const history = JSON.parse(localStorage.getItem("conversationHistory") || "{}")

  if (history[userId]) {
    history[userId] = history[userId].filter((c: Conversation) => c.id !== conversationId)
    localStorage.setItem("conversationHistory", JSON.stringify(history))
  }
}


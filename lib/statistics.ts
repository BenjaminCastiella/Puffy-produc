// Types for statistics
export type UserStatistics = {
  userId: string
  puffySessions: number
  debatesParticipated: number
  debatesWon: number
  lastActive: string
  materialsViewed: string[] // IDs of materials viewed
}

export type SystemStatistics = {
  totalSessions: number
  totalDebates: number
  totalMaterials: number
  activeUsers: number
  sessionsPerDay: { date: string; count: number }[]
}

// Initialize statistics in localStorage if they don't exist
export function initializeStatistics() {
  if (!localStorage.getItem("userStatistics")) {
    localStorage.setItem("userStatistics", JSON.stringify({}))
  }

  if (!localStorage.getItem("systemStatistics")) {
    localStorage.setItem(
      "systemStatistics",
      JSON.stringify({
        totalSessions: 0,
        totalDebates: 0,
        totalMaterials: 0,
        activeUsers: 0,
        sessionsPerDay: [],
      }),
    )
  }
}

// Get user statistics
export function getUserStatistics(userId: string): UserStatistics {
  const stats = JSON.parse(localStorage.getItem("userStatistics") || "{}")

  if (!stats[userId]) {
    stats[userId] = {
      userId,
      puffySessions: 0,
      debatesParticipated: 0,
      debatesWon: 0,
      lastActive: new Date().toISOString(),
      materialsViewed: [],
    }
    localStorage.setItem("userStatistics", JSON.stringify(stats))
  }

  return stats[userId]
}

// Get system statistics
export function getSystemStatistics(): SystemStatistics {
  return JSON.parse(localStorage.getItem("systemStatistics") || "{}")
}

// Update user statistics
export function updateUserStatistics(userId: string, updates: Partial<UserStatistics>) {
  const stats = JSON.parse(localStorage.getItem("userStatistics") || "{}")

  if (!stats[userId]) {
    stats[userId] = {
      userId,
      puffySessions: 0,
      debatesParticipated: 0,
      debatesWon: 0,
      lastActive: new Date().toISOString(),
      materialsViewed: [],
    }
  }

  stats[userId] = {
    ...stats[userId],
    ...updates,
    lastActive: new Date().toISOString(),
  }

  localStorage.setItem("userStatistics", JSON.stringify(stats))
  return stats[userId]
}

// Update system statistics
export function updateSystemStatistics(updates: Partial<SystemStatistics>) {
  const stats = JSON.parse(localStorage.getItem("systemStatistics") || "{}")

  const updatedStats = {
    ...stats,
    ...updates,
  }

  localStorage.setItem("systemStatistics", JSON.stringify(updatedStats))
  return updatedStats
}

// Record a new Puffy session
export function recordPuffySession(userId: string) {
  // Update user statistics
  const userStats = getUserStatistics(userId)
  updateUserStatistics(userId, {
    puffySessions: userStats.puffySessions + 1,
  })

  // Update system statistics
  const systemStats = getSystemStatistics()

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0]

  // Find or create today's entry in sessionsPerDay
  const todayEntry = systemStats.sessionsPerDay.find((entry) => entry.date === today)

  if (todayEntry) {
    todayEntry.count += 1
  } else {
    systemStats.sessionsPerDay.push({ date: today, count: 1 })
  }

  // Keep only the last 30 days
  systemStats.sessionsPerDay = systemStats.sessionsPerDay
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 30)

  updateSystemStatistics({
    totalSessions: systemStats.totalSessions + 1,
    sessionsPerDay: systemStats.sessionsPerDay,
  })
}

// Record a debate
export function recordDebate(userId: string, won: boolean) {
  // Update user statistics
  const userStats = getUserStatistics(userId)
  updateUserStatistics(userId, {
    debatesParticipated: userStats.debatesParticipated + 1,
    debatesWon: won ? userStats.debatesWon + 1 : userStats.debatesWon,
  })

  // Update system statistics
  const systemStats = getSystemStatistics()
  updateSystemStatistics({
    totalDebates: systemStats.totalDebates + 1,
  })
}

// Record a material view
export function recordMaterialView(userId: string, materialId: string) {
  // Update user statistics
  const userStats = getUserStatistics(userId)

  // Only add if not already viewed
  if (!userStats.materialsViewed.includes(materialId)) {
    updateUserStatistics(userId, {
      materialsViewed: [...userStats.materialsViewed, materialId],
    })
  }
}

// Get active users count (users active in the last 7 days)
export function getActiveUsersCount(): number {
  const stats = JSON.parse(localStorage.getItem("userStatistics") || "{}")
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

  let count = 0
  for (const userId in stats) {
    const lastActive = new Date(stats[userId].lastActive)
    if (lastActive >= sevenDaysAgo) {
      count++
    }
  }

  return count
}

// Update active users count
export function updateActiveUsersCount() {
  const activeUsers = getActiveUsersCount()
  updateSystemStatistics({ activeUsers })
  return activeUsers
}


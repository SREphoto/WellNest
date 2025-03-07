// Sources/User.swift
struct User: Identifiable {
    let id: String
    let name: String
    var mood: String // Placeholder for Moodies/emojis (e.g., "Joyful", "Sad")
    var status: String? // Optional status (e.g., "Sick", "Help")
    var score: Int // 0-100 scale
    
    init(id: String = UUID().uuidString, name: String, mood: String = "Neutral", status: String? = nil, score: Int = 50) {
        self.id = id
        self.name = name
        self.mood = mood
        self.status = status
        self.score = score
    }
}

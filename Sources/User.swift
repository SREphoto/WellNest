import SwiftUI

struct User: Identifiable {
    let id: String
    let name: String
    var mood: String // Can be "Joyful", "Sad", "Crisis"
    var status: String?
    var score: Int // 0-100

    var moodIcon: String {
        switch mood {
        case "Joyful":
            return "person.crop.circle.fill.badge.plus"
        case "Sad":
            return "person.crop.circle.fill.badge.minus"
        case "Crisis":
            return "person.crop.circle.fill.badge.exclamationmark"
        default:
            return "person.crop.circle"
        }
    }
    
    init(id: String = UUID().uuidString, name: String, mood: String = "Neutral", status: String? = nil, score: Int = 50) {
        self.id = id
        self.name = name
        self.mood = mood
        self.status = status
        self.score = score
    }
}

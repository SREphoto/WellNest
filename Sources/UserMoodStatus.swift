import Foundation

struct UserMoodStatus: Identifiable {
    enum PrivacySetting: String, Codable {
        case allConnections = "ALL_CONNECTIONS"
        case selectedConnections = "SELECTED_CONNECTIONS"
        case `private` = "PRIVATE"
    }

    struct InferredSentiment: Codable {
        let score: Double
        let emotion: String
    }

    let id: UUID
    let userId: UUID
    let moodieType: String
    let actualScore: Int?
    let timestamp: Date
    let optionalContextText: String?
    var privacySetting: PrivacySetting = .allConnections
    let inferredSentiment: InferredSentiment?
}

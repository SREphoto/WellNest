import Foundation

struct UserAIProfile: Identifiable {
    // Represents the flexible structure of a JSONB field for recommendation preferences.
    struct RecommendationPreferences: Codable {
        let contentTypes: [String]
        let topics: [String]
    }

    let id: UUID
    let userId: UUID
    var aiOptInStatus: Bool = false
    var recommendationPrefs: RecommendationPreferences?
    var alertContactUserIds: [UUID]?
    var receiveAiAlerts: Bool = false
    var allowDataForAiTraining: Bool = false
}

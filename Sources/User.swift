import Foundation

struct User: Identifiable {
    enum Status: String, Codable {
        case active
        case pendingVerification = "pending_verification"
        case inactive
        case deleted
    }

    struct EmergencyContact: Codable {
        let name: String
        let phoneNumber: String
        let relationship: String
    }

    let id: UUID
    var email: String
    var passwordHash: String
    var salt: String
    var fullName: String
    var profilePictureUrl: URL?
    let createdAt: Date
    var updatedAt: Date
    var lastLoginAt: Date?
    var status: Status = .pendingVerification
    var devicePushTokens: [String]?
    var emergencyContactDetails: [EmergencyContact]?
    var userAiProfileId: UUID?
}

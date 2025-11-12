import Foundation

struct AuditLog: Identifiable {
    // Represents the flexible structure of a JSONB field for audit details.
    struct AuditDetails: Codable {
        let parameters: [String: String]?
        let beforeValue: String?
        let afterValue: String?
    }

    let id: UUID
    let timestamp: Date
    let actorId: UUID?
    let actionType: String
    let targetResource: String?
    let targetResourceId: UUID?
    let ipAddress: String?
    let userAgent: String?
    let successStatus: Bool
    let details: AuditDetails?
}

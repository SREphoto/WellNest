import Foundation

struct ConsentRecord: Identifiable {
    let id: UUID
    let userId: UUID
    let consentType: String
    var status: Bool
    let timestampGiven: Date
    var timestampRevoked: Date?
    let version: String
}

import Foundation

struct Connection: Identifiable {
    enum Status: String, Codable {
        case pending
        case accepted
        case rejected
        case blocked
    }

    let id: UUID
    let requesterUserId: UUID
    let recipientUserId: UUID
    var status: Status = .pending
    let createdAt: Date
    var updatedAt: Date
}

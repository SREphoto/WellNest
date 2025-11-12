import Foundation

struct Message: Identifiable {
    let id: UUID
    let senderId: UUID
    let content: String
    let timestamp: Date
}

import Foundation

struct Chat: Identifiable {
    let id: UUID
    let participants: [UUID]
}

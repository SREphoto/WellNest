// Sources/CircleManager.swift
class CircleManager {
    static let shared = CircleManager()
    private init() {}
    
    var users: [User] = [
        User(name: "Alice", mood: "Joyful", score: 100),
        User(name: "Bob", mood: "Sad", score: 20),
        User(name: "Charlie", mood: "Crisis", status: "Help", score: 0)
    ]
    
    func addUser(name: String) {
        let user = User(name: name)
        users.append(user)
    }
    
    func removeUser(id: String) {
        users.removeAll { $0.id == id }
    }
    
    func updateUserMood(id: String, mood: String, score: Int, status: String? = nil) {
        if let index = users.firstIndex(where: { $0.id == id }) {
            users[index].mood = mood
            users[index].score = score
            users[index].status = status
        }
    }
    
    func calculateAverageScore() -> Int {
        let total = users.reduce(0) { $0 + $1.score }
        return users.isEmpty ? 50 : total / users.count
    }
}

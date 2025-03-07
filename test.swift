let circleManager = CircleManager.shared
print("Initial users: \(circleManager.users.map { $0.name })")
print("Average score: \(circleManager.calculateAverageScore())")

circleManager.addUser(name: "Dave")
print("After adding Dave: \(circleManager.users.map { $0.name })")

if let user = circleManager.users.first(where: { $0.name == "Alice" }) {
    circleManager.updateUserMood(id: user.id, mood: "Happy", score: 85)
}
print("Updated average score: \(circleManager.calculateAverageScore())")

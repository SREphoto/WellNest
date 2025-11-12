import Foundation

let circleManager = CircleManager.shared
print("Initial users: \(circleManager.users.map { $0.fullName })")
print("Initial average score: \(circleManager.calculateAverageScore())")

circleManager.addUser(fullName: "Dave", email: "dave@example.com")
print("After adding Dave: \(circleManager.users.map { $0.fullName })")
print("Average score after adding Dave: \(circleManager.calculateAverageScore())")


if let user = circleManager.users.first(where: { $0.fullName == "Alice" }) {
    circleManager.updateUserMood(userId: user.id, moodieType: "Happy", score: 85, context: "Just got a promotion!")
}
print("Updated average score after Alice's mood change: \(circleManager.calculateAverageScore())")

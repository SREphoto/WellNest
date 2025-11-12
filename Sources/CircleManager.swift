import Foundation

class CircleManager {
    static let shared = CircleManager()
    
    var users: [User]
    var moodStatuses: [UserMoodStatus]

    private init() {
        // Create initial users
        let alice = User(id: UUID(), email: "alice@example.com", passwordHash: "hash", salt: "salt", fullName: "Alice", createdAt: Date(), updatedAt: Date())
        let bob = User(id: UUID(), email: "bob@example.com", passwordHash: "hash", salt: "salt", fullName: "Bob", createdAt: Date(), updatedAt: Date())
        let charlie = User(id: UUID(), email: "charlie@example.com", passwordHash: "hash", salt: "salt", fullName: "Charlie", createdAt: Date(), updatedAt: Date())

        self.users = [alice, bob, charlie]

        // Create initial mood statuses for the users
        self.moodStatuses = [
            UserMoodStatus(id: UUID(), userId: alice.id, moodieType: "JoyfulMoodie", actualScore: 100, timestamp: Date(), optionalContextText: "Feeling great today!", inferredSentiment: nil),
            UserMoodStatus(id: UUID(), userId: bob.id, moodieType: "SadMoodie", actualScore: 20, timestamp: Date(), optionalContextText: "A bit down.", inferredSentiment: nil),
            UserMoodStatus(id: UUID(), userId: charlie.id, moodieType: "CrisisMoodie", actualScore: 0, timestamp: Date(), optionalContextText: "Help", inferredSentiment: nil)
        ]
    }
    
    func addUser(fullName: String, email: String) {
        let user = User(id: UUID(), email: email, passwordHash: "default_hash", salt: "default_salt", fullName: fullName, createdAt: Date(), updatedAt: Date())
        users.append(user)

        // Add a default neutral mood status for the new user
        let initialStatus = UserMoodStatus(id: UUID(), userId: user.id, moodieType: "NeutralMoodie", actualScore: 50, timestamp: Date(), optionalContextText: "Just joined!", inferredSentiment: nil)
        moodStatuses.append(initialStatus)
    }
    
    func removeUser(id: UUID) {
        users.removeAll { $0.id == id }
        // Also remove the mood statuses associated with the user
        moodStatuses.removeAll { $0.userId == id }
    }
    
    func updateUserMood(userId: UUID, moodieType: String, score: Int, context: String? = nil) {
        // Ensure the user exists before adding a mood status
        guard users.contains(where: { $0.id == userId }) else {
            print("Error: User with ID \(userId) not found.")
            return
        }

        let newStatus = UserMoodStatus(
            id: UUID(),
            userId: userId,
            moodieType: moodieType,
            actualScore: score,
            timestamp: Date(),
            optionalContextText: context,
            inferredSentiment: nil
        )
        moodStatuses.append(newStatus)
    }
    
    func calculateAverageScore() -> Int {
        var latestScores: [UUID: Int] = [:]

        // Sort statuses by timestamp to easily find the latest one for each user
        let sortedStatuses = moodStatuses.sorted { $0.timestamp > $1.timestamp }

        // Get the most recent score for each user
        for status in sortedStatuses {
            if latestScores[status.userId] == nil {
                if let score = status.actualScore {
                    latestScores[status.userId] = score
                }
            }
        }

        let scores = Array(latestScores.values)
        guard !scores.isEmpty else { return 50 } // Default score if no statuses

        let total = scores.reduce(0, +)
        return total / scores.count
    }
}

import Foundation

struct BiometricData: Identifiable {
    // Represents the flexible structure of a JSONB field.
    struct BiometricValue: Codable {
        let type: String
        let value: Double
        let unit: String
    }

    let id: UUID
    let userId: UUID
    let dataType: String
    let value: BiometricValue
    let timestamp: Date
    let sourceDevice: String?
    let consentRecordId: UUID
}

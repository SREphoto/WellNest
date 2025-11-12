class UserAIProfile {
    constructor(id, userId, aiOptInStatus, recommendationPrefs, alertContactUserIds, receiveAiAlerts, allowDataForAiTraining) {
        this.id = id;
        this.userId = userId;
        this.aiOptInStatus = aiOptInStatus;
        this.recommendationPrefs = recommendationPrefs;
        this.alertContactUserIds = alertContactUserIds;
        this.receiveAiAlerts = receiveAiAlerts;
        this.allowDataForAiTraining = allowDataForAiTraining;
    }
}

module.exports = UserAIProfile;

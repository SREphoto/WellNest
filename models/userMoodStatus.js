class UserMoodStatus {
    constructor(id, userId, moodieType, actualScore, timestamp, optionalContextText, privacySetting, inferredSentiment) {
        this.id = id;
        this.userId = userId;
        this.moodieType = moodieType;
        this.actualScore = actualScore;
        this.timestamp = timestamp;
        this.optionalContextText = optionalContextText;
        this.privacySetting = privacySetting;
        this.inferredSentiment = inferredSentiment;
    }
}

module.exports = UserMoodStatus;

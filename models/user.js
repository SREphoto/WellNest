class User {
    constructor(id, email, passwordHash, salt, fullName, profilePictureUrl, createdAt, updatedAt, lastLoginAt, status, devicePushTokens, emergencyContactDetails, userAiProfileId) {
        this.id = id;
        this.email = email;
        this.passwordHash = passwordHash;
        this.salt = salt;
        this.fullName = fullName;
        this.profilePictureUrl = profilePictureUrl;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.lastLoginAt = lastLoginAt;
        this.status = status;
        this.devicePushTokens = devicePushTokens;
        this.emergencyContactDetails = emergencyContactDetails;
        this.userAiProfileId = userAiProfileId;
    }
}

module.exports = User;

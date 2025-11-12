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
        this.emergencyContactDetails = []; // Initialize as an empty array
        this.userAiProfileId = userAiProfileId;

        // Default privacy settings for a new user
        this.privacySettings = {
            profileVisibility: 'CONNECTIONS_ONLY', // Valid values: 'ALL_CONNECTIONS', 'CONNECTIONS_ONLY', 'PRIVATE'
            showEmail: false,
            showBio: true
        };
    }
}

module.exports = User;

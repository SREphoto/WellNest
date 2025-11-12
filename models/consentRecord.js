class ConsentRecord {
    constructor(id, userId, consentType, status, timestampGiven, timestampRevoked, version) {
        this.id = id;
        this.userId = userId;
        this.consentType = consentType;
        this.status = status;
        this.timestampGiven = timestampGiven;
        this.timestampRevoked = timestampRevoked;
        this.version = version;
    }
}

module.exports = ConsentRecord;

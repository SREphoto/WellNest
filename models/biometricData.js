class BiometricData {
    constructor(id, userId, dataType, value, timestamp, sourceDevice, consentRecordId) {
        this.id = id;
        this.userId = userId;
        this.dataType = dataType;
        this.value = value;
        this.timestamp = timestamp;
        this.sourceDevice = sourceDevice;
        this.consentRecordId = consentRecordId;
    }
}

module.exports = BiometricData;

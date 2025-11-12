class AuditLog {
    constructor(id, timestamp, actorId, actionType, targetResource, targetResourceId, ipAddress, userAgent, successStatus, details) {
        this.id = id;
        this.timestamp = timestamp;
        this.actorId = actorId;
        this.actionType = actionType;
        this.targetResource = targetResource;
        this.targetResourceId = targetResourceId;
        this.ipAddress = ipAddress;
        this.userAgent = userAgent;
        this.successStatus = successStatus;
        this.details = details;
    }
}

module.exports = AuditLog;

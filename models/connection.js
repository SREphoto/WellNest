class Connection {
    constructor(id, requesterUserId, recipientUserId, status, createdAt, updatedAt) {
        this.id = id;
        this.requesterUserId = requesterUserId;
        this.recipientUserId = recipientUserId;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Connection;

class Message {
    constructor(id, senderId, content, timestamp) {
        this.id = id;
        this.senderId = senderId;
        this.content = content;
        this.timestamp = timestamp;
    }
}

module.exports = Message;

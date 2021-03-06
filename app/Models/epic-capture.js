const uuidv4 = require('uuid/v4');

class EpicCapture {

    constructor(title, description, epic_priority) {
        this.epicId = uuidv4();
        this.createdAt = Date.now();
        this.title = title;
        this.description = description;
        this.epic_status = "to do";
        this.priority = epic_priority;
        this.estimated = null;
        this.backlogs = [];

        this.addBacklog = function (newBacklog) {
            newBacklog.inEpic = this.epicId;
            this.backlogs.push(newBacklog.backlogId);
        }

    }
}

module.exports = EpicCapture;
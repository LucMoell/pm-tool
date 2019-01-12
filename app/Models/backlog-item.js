const Task = require('./task');
const Project = require('./project');
const Roles = require('./roles');
const User = require('./user');
const Sprint = require('./sprint');
const Status = require('./status');
const Priority = require('./priority');

let backlogId = 1;

class BacklogItem {

    constructor(title, description, /*backlog_status,*/ backlog_item_priority, estimated) {
            this.backlogId = backlogId++;
            this.createdAt = Date.now();
            this.title = title;
            this.description = description;
            //this.backlog_status = backlog_status;
            this.priority = new Priority(backlog_item_priority);
            this.estimated = estimated;
            //Wie handlen von Sprint, Tasks und Project bei der Übergabe?
            this.tasks = [];
            this.isInSprint = false;
            

            this.addTask = function (newTask){
                this.tasks.push(newTask);
            }
        }
}

module.exports = BacklogItem;
const fs = require('fs');
const path = require('path');
const projectData = require('../logic');

var sprintNumber = 0;
//HTML ID finding
var scrumDiv = document.getElementById('scrumboard');

siteContent();

function sprintBack() {
  if ((sprintNumber - 1) < 0) {
    sprintNumber = (global.project.sprints.length - 1);
  }
  else {
    sprintNumber--;
  }
  var removeRow = document.getElementById('action_Row');
  scrumDiv.removeChild(removeRow);
  removeRow = document.getElementById('pageContentDiv');
  scrumDiv.removeChild(removeRow);
  siteContent();
}

function sprintForward() {
  if ((sprintNumber + 1) >= global.project.sprints.length) {
    sprintNumber = 0;
  }
  else {
    sprintNumber++;
  }
  var removeRow = document.getElementById('action_Row');
  scrumDiv.removeChild(removeRow);
  removeRow = document.getElementById('pageContentDiv');
  scrumDiv.removeChild(removeRow);
  siteContent();
}

function siteContent() {
  //Sprint switch buttons
  if (global.project.sprints.length > 1) {
    //Create Actionrow
    var actionrow = document.createElement('div');
    actionrow.className = 'row';
    actionrow.id = 'action_Row'
    //Create 4 Columns for the Actionrow
    var fillercol1 = document.createElement('div');
    fillercol1.className = 'col-md-3 container-headline';
    var fillercol2 = document.createElement('div');
    fillercol2.className = 'col-md-3 container-headline';
    var fillercol3 = document.createElement('div');
    fillercol3.className = 'col-md-3 container-headline';

    //Column for the Buttonaction
    var buttoncol = document.createElement('div');
    buttoncol.className = 'col-md-3 container-headline';

    //back Button
    var backIcon = document.createElement('i');
    backIcon.addEventListener("click",sprintBack);
    backIcon.className = 'fas fa-chevron-circle-left'

    //forward Button
    var forwardIcon = document.createElement('i');
    forwardIcon.addEventListener("click",sprintForward);
    forwardIcon.className = 'fas fa-chevron-circle-right'

    //Text for Sprint-Navigation
    var sprintContent = document.createTextNode('  Sprint ' + (global.project.sprints[sprintNumber].sprint_id) + ' ');
    var currentSprint = document.createElement('i');
    currentSprint.style.userSelect = "none";

    //Add alle Items
    //forwardButton.appendChild(forwardIcon);
    currentSprint.appendChild(sprintContent);
    buttoncol.appendChild(backIcon);
    buttoncol.appendChild(currentSprint);
    buttoncol.appendChild(forwardIcon);
    actionrow.appendChild(fillercol1);
    actionrow.appendChild(fillercol2);
    actionrow.appendChild(fillercol3);
    actionrow.appendChild(buttoncol);
    var headDiv = document.getElementById('head');
    scrumDiv.insertBefore(actionrow, headDiv);
  }


  //Loop for backlog array
  if (global.project.sprints.length > 0) {
    var contentWasWriten = false;
    var pageContentDiv = document.createElement('div');
    pageContentDiv.id = 'pageContentDiv';
    for (let i = 0; i < global.project.backlogs.length; i++) {
      //Get Array with alle Backlogs in Sprint
      sprintBacklogItemIds = global.project.sprints[sprintNumber].backlogItemIds

      var useBacklogItem = false;
      var sprintArrayID;

      for (let j = 0; j < sprintBacklogItemIds.length; j++) {
        if (global.project.backlogs[i].backlogId == sprintBacklogItemIds[j].backlogID) {
          useBacklogItem = true;
          sprintArrayID = j;
        }
      }
      //Is the current BacklogItem in the chosen sprint?
      if (useBacklogItem) {
        //Create new Row
        var newRowDiv = document.createElement("div");
        newRowDiv.className = 'row';
        //Create new Columns
        //Story Div
        var newStoryDiv = document.createElement('div');
        newStoryDiv.className = 'column col-md-3';
        //Backlog Div
        var newBacklogDiv = document.createElement('div');
        newBacklogDiv.className = 'column col-md-3';
        //Doing Div
        var newDoingDiv = document.createElement('div');
        newDoingDiv.className = 'column col-md-3';
        //Done Div
        var newDoneDiv = document.createElement('div');
        newDoneDiv.className = 'column col-md-3';

        //Create new ContentDiv
        var newStoryContentDiv = document.createElement('div');
        newStoryContentDiv.className = 'content';
        //Create textdiv and actionDiv
        var newTextDiv = document.createElement('div');
        var newActionDiv = document.createElement('div');
        //create action icons

            var editIcon = document.createElement('i');
            editIcon.className = "far fa-edit";
            //editIcon.addEventListener(function_here);
            var deleteIcon = document.createElement('i');
            deleteIcon.className = "far fa-trash-alt";
            //deleteIcon.addEventListener(function_here);

        //Set Content
        var newStoryContent = document.createTextNode(global.project.backlogs[i].title);

        //Add content to the div
        newTextDiv.appendChild(newStoryContent);
        newActionDiv.appendChild(editIcon);
        newActionDiv.appendChild(deleteIcon);
        newStoryContentDiv.appendChild(newTextDiv);
        newStoryContentDiv.appendChild(newActionDiv);
        newStoryDiv.appendChild(newStoryContentDiv);
        newRowDiv.appendChild(newStoryDiv);

        var tasks = global.project.backlogs[i].tasks;
        var sprintTasks = sprintBacklogItemIds[sprintArrayID].taskIds;

        for (let j = 0; j < tasks.length; j++) {
          if (sprintTasks.includes(tasks[j].taskId)) {
            //Task Content-Text
            var newTaskContent = document.createTextNode(tasks[j].title)
            //Content div
            var newContentDiv = document.createElement('div');
            newContentDiv.className = 'content';
            //Create textdiv and actionDiv
             var newTextDiv = document.createElement('div');
            var newActionDiv = document.createElement('div');
            //create action icons
            var editIcon = document.createElement('i');
            editIcon.className = "far fa-edit";
            //editIcon.addEventListener(function_here);
            var deleteIcon = document.createElement('i');
            deleteIcon.className = "far fa-trash-alt";
            //deleteIcon.addEventListener(function_here);
            var status = tasks[j].task_status;
            if (tasks[j].task_status == 0) {
              newTextDiv.appendChild(newTaskContent);
              newActionDiv.appendChild(editIcon);
              newActionDiv.appendChild(deleteIcon);
              newContentDiv.appendChild(newTextDiv);
              newContentDiv.appendChild(newActionDiv);
              newBacklogDiv.appendChild(newContentDiv);
              newRowDiv.appendChild(newBacklogDiv);
            }
            else if (tasks[j].task_status == 1) {
              newTextDiv.appendChild(newTaskContent);
              newActionDiv.appendChild(editIcon);
              newActionDiv.appendChild(deleteIcon);
              newContentDiv.appendChild(newTextDiv);
              newContentDiv.appendChild(newActionDiv);
              newDoingDiv.appendChild(newContentDiv);
              newRowDiv.appendChild(newDoingDiv);
            }
            else if (tasks[j].task_status == 2) {
              newTextDiv.appendChild(newTaskContent);
              newActionDiv.appendChild(editIcon);
              newActionDiv.appendChild(deleteIcon);
              newContentDiv.appendChild(newTextDiv);
              newContentDiv.appendChild(newActionDiv);
              newDoneDiv.appendChild(newContentDiv);
              newRowDiv.appendChild(newDoneDiv);
            }

          }
        }

        pageContentDiv.appendChild(newRowDiv);
        contentWasWriten = true;
      }
    }

    if (contentWasWriten == false) {
      var newErrorRowDiv = document.createElement('div');
      newErrorRowDiv.className = 'row';
      var newErrorDiv = document.createElement('div');
      newErrorDiv.className = 'column col-md-3';
      var errorMessage = document.createTextNode('This is an Empty Sprint. Add Backlog Items to it to use this view')


      newErrorDiv.appendChild(errorMessage);
      newErrorRowDiv.appendChild(newErrorDiv);
      pageContentDiv.appendChild(newErrorRowDiv);
      scrumDiv.appendChild(pageContentDiv);
    }
    else {
      scrumDiv.appendChild(pageContentDiv);
    }
  }
  else {
    var newErrorRowDiv = document.createElement('div');
    newErrorRowDiv.className = 'row';
    var newErrorDiv = document.createElement('div');
    newErrorDiv.className = 'column col-md-3';
    var errorMessage = document.createTextNode('There are no Sprints, please create a Sprint to use this view')


    newErrorDiv.appendChild(errorMessage);
    newErrorRowDiv.appendChild(newErrorDiv);
    scrumDiv.appendChild(newErrorRowDiv);
  }
}


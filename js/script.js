(function (ko) {
  function ChecklistViewModel() {
    var self = this;

    this.checklist = checklist;
    this.newTaskTitle = ko.observable("");
    this.tasks = ko.observableArray();
    this.completedTasks = ko.observableArray();

    this.addTask = () => {
      this.checklist.addTask(this.newTaskTitle());
      this.newTaskTitle("");
      this.tasks(this.checklist.tasks);
    };

    this.removeTask = (taskObject, event) => {
      self.checklist.removeTask(taskObject?.id);
      self.tasks(self.checklist.tasks);
    };

    this.checkTask = (taskObject, event) => {
      self.checklist.checkTask(taskObject?.id);
      self.tasks(self.checklist.tasks);
      self.completedTasks(self.checklist.completedTasks);
    };

    this.undoTask = (taskObject, event) => {
      self.checklist.undoTask(taskObject?.id);
      self.tasks(self.checklist.tasks);
      self.completedTasks(self.checklist.completedTasks);
    };
  }

  class Checklist {
    constructor() {
      this.tasks = [];
      this.completedTasks = [];
    }
    getIndexById(id, tasks) {
      return tasks.findIndex((elem) => elem.id === id);
    }
    addTask(taskTitle) {
      this.tasks.push({
        id: Date.now(),
        title: taskTitle,
      });
    }
    removeTask(id) {
      const currentIndex = this.getIndexById(id, this.tasks);
      if (currentIndex >= 0) {
        this.tasks.splice(currentIndex, 1);
      }
    }
    checkTask(id) {
      const currentIndex = this.getIndexById(id, this.tasks);
      if (currentIndex >= 0) {
        const task = this.tasks[currentIndex];
        this.tasks.splice(currentIndex, 1);
        this.completedTasks.push(task);
      }
    }
    undoTask(id) {
      const currentIndex = this.getIndexById(id, this.completedTasks);
      if (currentIndex >= 0) {
        const task = this.completedTasks[currentIndex];
        this.completedTasks.splice(currentIndex, 1);
        this.tasks.push(task);
      }
    }
  }

  const checklist = new Checklist();

  ko.applyBindings(
    new ChecklistViewModel(checklist),
    document.getElementById("todoList")
  );
})(ko);

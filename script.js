var person = {};
var tasks = [];
tasks.taskLog = function() {	
	for (var t=0; t<tasks.length; t++) {
		switch (tasks[t].taskType) {
		case 'Simple task':
			console.log('Task name : ' + tasks[t].title);
			console.log('Task status : ' + tasks[t].status);
			console.log('Task type : ' + tasks[t].taskType);
			break;
		case 'Home task':
			console.log('Task name : ' + tasks[t].title);
			console.log('Task status : ' + tasks[t].status);
			console.log('Task type : ' + tasks[t].taskType);
			console.log('Task description : ' + tasks[t].description);
			break;
		case 'Project task':
			console.log('Task name : ' + tasks[t].title);
			console.log('Task status : ' + tasks[t].status);
			console.log('Task type : ' + tasks[t].taskType);
			console.log('Task description : ' + tasks[t].description);
			console.log('Task dead line is : ' + tasks[t].deadLine);	
			break;
		default:
			console.log ('There are no any tasks yet');
		}				
	}
}

function User(name, surname) {
	this.name = name;
	this.surname = surname;
	this.type = 'user';
}

User.prototype.log = function() {
	person.name = this.name;
	person.surname = this.surname;
	person.type = this.type;
	console.log(this.name);
	console.log(this.surname);
	console.log(this.type);
}

function Student(name, surname, specialization) {
	User.apply(this, arguments);
	this.specialization = specialization;
	this.type = 'student';
	this.tasks = [];
}

Student.prototype = Object.create(User.prototype);
Student.prototype.constructor = Student;

Student.prototype.log = function() {
	User.prototype.log.apply(this, arguments);
	person.specialization = this.specialization;
	console.log('specialization : ' + this.specialization);
}

function Developer(name, surname, specialization, jobTitle) {
	Student.apply(this, arguments);
	this.jobTitle = jobTitle;
	this.type = 'developer';
}

Developer.prototype = Object.create(Student.prototype);
Developer.prototype.constructor = Developer;

Developer.prototype.log = function() {
	Student.prototype.log.apply(this, arguments);
	person.jobTitle = this.jobTitle;
	console.log('job title : ' + this.jobTitle);
}

function SimpleTask(taskType, title,  status) {
	this.taskType = taskType;
	this.title = title;
	this.status = status;
}

SimpleTask.prototype.saver = function() {
	tasks.push(this);
}

function HomeTask(taskType, title,  status, description) {
	SimpleTask.apply(this, arguments);
	this.description = description;	
}

HomeTask.prototype = Object.create(SimpleTask.prototype);
HomeTask.prototype.constructor = HomeTask;

function ProjectTask(taskType, title,  status, description, deadLine) {
	SimpleTask.apply(this, arguments);
	this.deadLine = deadLine;
	
}

ProjectTask.prototype = Object.create(HomeTask.prototype);
ProjectTask.prototype.constructor = ProjectTask;

var getData = document.getElementById('getter');
var creator = document.getElementsByClassName('add_task');

getData.addEventListener('click', getFields);
for (i=0; i<creator.length; i++) {
	creator[i].addEventListener('click', addTask);
}

function getFields() {
	var arr = [];
	arr[0] = document.getElementsByName('person_name')[0].value;
	arr[1] = document.getElementsByName('person_surname')[0].value;
	arr[2] = document.getElementsByName('specialization')[0].value;
	arr[3] = document.getElementsByName('job_title')[0].value;
	if (document.getElementsByName('person_type')[0].value == 'user') {	// створення юзера
		var user = new User(arr[0], arr[1]);
		getData.removeEventListener('click', getFields);
		user.log();
	} else if (document.getElementsByName('person_type')[0].value == 'student') { // створення студента
		var student = new Student (arr[0], arr[1], arr[2]);
		getData.removeEventListener('click', getFields);
		student.log();		
	} else {
		var developer = new Developer (arr[0], arr[1], arr[2], arr[3]);
		getData.removeEventListener('click', getFields);
		developer.log();		
	}
}

function addTask() {
	var parent = this.parentElement;
	var taskType = parent.getAttribute('data-type');
	var title = parent.getElementsByClassName('title')[0].value;
	var status;
	var checkbox = parent.querySelector('input[type=checkbox]');
	if (checkbox.checked) {
		status = true;
	} else { status = false;
	}
		 
	switch (parent.id) {
		case 'simple_task' :
			if (person.type == 'user' || person.type == 'student' || person.type == 'developer') {
				var task = new SimpleTask( taskType, title, status );
				task.saver();
				tasks.taskLog();
			}
			break;
		case 'home_task' :
			if (person.type == 'student' || person.type == 'developer') {
				var description = parent.getElementsByClassName('description')[0].value;
				var task = new HomeTask( taskType, title, status, description );
				task.saver();
				tasks.taskLog();
			} else if (person.type == 'user') {
				alert ('You do not have enough rights to create this type of task');
			}
			break;
		case 'project_task' :
			if (person.type == 'developer') {
				var description = parent.getElementsByClassName('description')[0].value;
				var deadLine = parent.getElementsByClassName('date')[0].value;
				var task = new ProjectTask( taskType, title, status, description, deadLine );
				task.saver();
				tasks.taskLog();
			} else if (person.type == 'user' || person.type == 'student') {
				alert ('You do not have enough rights to create this type of task');
			}
			break;	
		default:
			console.log ('Create user at first!');
	}	
}
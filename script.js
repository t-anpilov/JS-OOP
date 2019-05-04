var person = {};
var tasks = [];

function User(name, surname) {
	this.name = name;
	this.surname = surname;
	this.type = 'user';
}

User.prototype.log = function() {
	person.name = this.name;
	person.surname = this.surname;
	person.type = 'user';
	console.log(this.name);
	console.log(this.surname);
	console.log(this.type);
}

taskLog = function() {	
	for (var t=0; t<this.tasks.length; t++) {
		switch (this.tasks[t].taskType) {
		case 'Simple task':
			console.log('Task name : ' + this.title);
			console.log('Task status : ' + this.status);
			console.log('Task type : ' + this.taskType);
			break;
		case 'Home task':
			console.log('Task name : ' + this.title);
			console.log('Task status : ' + this.status);
			console.log('Task type : ' + this.taskType);
			console.log('Task description : ' + this.description);
			break;
		case 'Project task':
			console.log('Task name : ' + this.title);
			console.log('Task status : ' + this.status);
			console.log('Task type : ' + this.taskType);
			console.log('Task description : ' + this.description);
			console.log('Task dead line is : ' + this.deadLine);	
			break;
		default:
			console.log ('There are no any tasks yet')
		}				
	}
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
	console.log('job title : ' + this.jobTitle);
}

function SimpleTask(title,  status) {
	this.taskType = 'Simple task';
	this.title = title;
	this.status = status;
}

SimpleTask.prototype.saver = function() {
	var task = {};
	task.taskType = this.taskType;
	task.title = this.title;
	task.status = this.status;
	tasks.push(task);
}

function HomeTask(title,  status, description) {
	SimpleTask.apply(this, arguments);
	this.description = description;
	this.taskType = 'Home task';
}

HomeTask.prototype = Object.create(SimpleTask.prototype);
HomeTask.prototype.constructor = HomeTask;

HomeTask.prototype.saver = function() {
	SimpleTask.prototype.saver.apply(this, arguments);
	task.description = this.description;
	tasks.push(task);
}	

function ProjectTask(title,  status, description, deadLine) {
	SimpleTask.apply(this, arguments);
	this.deadLine = deadLine;
	this.taskType = 'Project task';
}

ProjectTask.prototype = Object.create(HomeTask.prototype);
ProjectTask.prototype.constructor = ProjectTask;

ProjectTask.prototype.saver = function() {
	HomeTask.prototype.saver.apply(this, arguments);
	task.deadLine = this.deadLine;
	tasks.push(task);
}	

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
		return user;
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
	if (person.type == 'user') {
		user.simpleTask( document.getElementsByClassName('title')[0].value, document.getElementsByClassName('status')[0].value );
		user.taskLog();
	}
}
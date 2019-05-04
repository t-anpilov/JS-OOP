var person = {};
var task = {};

function User(name, surname) {
	this.name = name;
	this.surname = surname;
	this.type = 'user';
	this.tasks = [];
}

User.prototype.simpleTask = function(title, status) {	
	task.taskType = 'Simple task';
	task.title = title;
	task.status = status;	
	this.tasks.push(task);
}

User.prototype.log = function() {
	person.name = this.name;
	person.surname = this.surname;
	person.type = 'user';
	console.log(this.name);
	console.log(this.surname);
	console.log(this.type);
}

User.prototype.taskLog = function() {	
	for (var t=0; t<this.tasks.length; t++) {
		switch (this.tasks[t].taskType) {
		case 'Simple task':
			showSimpleTask(this.tasks[t]);
			break;
		case 'Home task':
			showHomeTask(this.tasks[t]);
			break;
		case 'Project task':
			showProjectTask(this.tasks[t]);
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

Student.prototype.homeTask = function(title, status, description) {
	User.prototype.simpleTask.apply(this, arguments);
	task.taskType = 'Home task';
	task.description = description;	
}

function Developer(name, surname, specialization, jobTitle) {
	Student.apply(this, arguments);
	this.jobTitle = jobTitle;
	this.type = 'developer';
	this.tasks = [];
}

Developer.prototype = Object.create(Student.prototype);
Developer.prototype.constructor = Developer;

Developer.prototype.log = function() {
	Student.prototype.log.apply(this, arguments);
	console.log('job title : ' + this.jobTitle);
}

Developer.prototype.projectTask = function(title, status, description, deadLine) {
	Student.prototype.homeTask.apply(this, arguments);
	task.taskType = 'Project task';
	task.deadLine = deadLine;
	this.tasks.push(task);
}

function showSimpleTask(obj) {
	console.log('Task name : ' + obj.title);
	console.log('Task status : ' + obj.status);
	console.log('Task type : ' + obj.taskType);
}

function showHomeTask(obj) {
	console.log('Task name : ' + obj.title);
	console.log('Task status : ' + obj.status);
	console.log('Task type : ' + obj.taskType);
	console.log('Task description : ' + obj.description);	
}

function showProjectTask(obj) {
	console.log('Task name : ' + obj.title);
	console.log('Task status : ' + obj.status);
	console.log('Task type : ' + obj.taskType);
	console.log('Task description : ' + obj.description);
	console.log('Task dead line is : ' + obj.deadLine);	
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
		student.homeTask('some tit', false, 'qwtryeurytokluypiu');
		student.taskLog();
	} else {
		var developer = new Developer (arr[0], arr[1], arr[2], arr[3]);
		getData.removeEventListener('click', getFields);
		developer.log();
		developer.projectTask('another tit', true, '---', '21-05');
		developer.taskLog();
	}
}

function addTask() {
	if (person.type == 'user') {
		user.simpleTask( document.getElementsByClassName('title')[0].value, document.getElementsByClassName('status')[0].value );
		user.taskLog();
	}
}
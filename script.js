function User(name, surname) {
	this.name = name;
	this.surname = surname;
	this.type = 'user';
	this.tasks = [];
}

User.prototype.simpleTask = function(title) {
	var task = {};
	task.taskType = 'Simple task';
	task.title = title;
	task.status = false;	
	this.tasks.push(task);
}

User.prototype.log = function() {
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

Student.prototype.homeTask = function(title, description) {
	var task = {};
	task.taskType = 'Home task';
	task.title = title;
	task.status = false;	
	task.description = description;
	this.tasks.push(task);
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

Developer.prototype.projectTask = function(title, description, deadLine) {
	var task = {};
	task.taskType = 'Project task';
	task.title = title;
	task.status = false;	
	task.description = description;
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
getData.addEventListener('click', getFields);

function getFields() {
	var arr = [];
	arr[0] = document.getElementsByName('person_name')[0].value;
	arr[1] = document.getElementsByName('person_surname')[0].value;
	arr[2] = document.getElementsByName('specialization')[0].value;
	arr[3] = document.getElementsByName('job_title')[0].value;
	if (document.getElementsByName('person_type')[0].value == 'user') {	// створення юзера
		var user = new User(arr[0], arr[1]);
		user.log();
		user.simpleTask('website');  // перевірка методів
		user.simpleTask('wordpress');
		user.taskLog();
	} else if (document.getElementsByName('person_type')[0].value == 'student') { // створення студента
		var student = new Student (arr[0], arr[1], arr[2]);
		student.log();
		student.simpleTask('website'); // перевірка методів
		student.homeTask('application');
		student.taskLog();
	} else {
		var developer = new Developer (arr[0], arr[1], arr[2], arr[3]);
		developer.log();
		developer.simpleTask('website'); // перевірка методів
		developer.homeTask('application');
		developer.projectTask('BiGProject');
		developer.taskLog();
	}
} 
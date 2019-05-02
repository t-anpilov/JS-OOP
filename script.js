function User(name, surname) {
	this.name = name;
	this.surname = surname;
	this.type = 'user';
	this.tasks = [];
}

User.prototype.simpleTask = function(title) {
	var sTask = {};
	sTask.title = title;
	sTask.status = false;
	sTask.taskType = 'Simple task';
	this.tasks.push(sTask);
}

User.prototype.log = function() {
	console.log(this.name);
	console.log(this.surname);
	console.log(this.type);
}

User.prototype.taskLog = function() {	
	for (var t=0; t<this.tasks.length; t++) {
		console.log('Task name : ' + this.tasks[t].title);
		console.log('Task status : ' + this.tasks[t].status);
		console.log('Task type : ' + this.tasks[t].taskType);
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

Student.prototype.homeTask = function(title) {
	var hTask = {};
	hTask.title = title;
	hTask.status = false;
	hTask.taskType = 'Home task';
	this.tasks.push(hTask);
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

Developer.prototype.projectTask = function(title) {
	var pTask = {};
	pTask.title = title;
	pTask.status = false;
	pTask.taskType = 'Project task';
	this.tasks.push(pTask);
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
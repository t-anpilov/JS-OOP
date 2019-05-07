var person = {};
var container = document.getElementsByClassName('tasks_container')[0];

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
	alert( this.type + ' have been created already!' ) 
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

SimpleTask.prototype.show = function() {
	var item = document.createElement('div');	
	item.classList.add('task_item');
	var done = 'open';
	if (this.status) done = 'in progres';
	if (this.taskType == 'Home task') {
		var desc = this.description;
		item.innerHTML = this.taskType + ' : ' + this.title + ' , status: ' + done + ' ' + desc;
	} else if (this.taskType == 'Project task') {	
		var time = this.deadLine;
		item.innerHTML = this.taskType + ' : ' + this.title + ' , status: ' + done + ' ' + desc + ' ' + time;
	} else {
		item.innerHTML = this.taskType + ' : ' + this.title + ' , status: ' + done;	
	}
	
	var square = document.createElement('div');
	square.innerHTML = '&#215;';
	square.classList.add('close');
	item.appendChild(square);
	container.appendChild(item);
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

container.addEventListener('click', deleteTask);

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
	} else { status = false; }
		 
	switch (parent.id) {
		case 'simple_task' :
			if (person.type == 'user' || person.type == 'student' || person.type == 'developer') {
				if (title != '') {
					var task = new SimpleTask( taskType, title, status );
					task.show();
				} else { alert( 'Enter task\'s title'  ); }
			} else { alert( 'Create user at first!'  ); }
			break;
		case 'home_task' :
			if (person.type == 'student' || person.type == 'developer') {
				var description = parent.getElementsByClassName('description')[0].value;
				if (title != '' && description != '') {
					var task = new HomeTask( taskType, title, status, description );
					task.show();
				} else { alert( 'Fill all the fields' ); }
			} else if (person.type == 'user') {
				alert ('You do not have enough rights to create this type of task');
			} else { alert( 'Create user at first!'  ); }
			break;
		case 'project_task' :
			if (person.type == 'developer') {
				var description = parent.getElementsByClassName('description')[0].value;
				var deadLine = parent.getElementsByClassName('date')[0].value;
				if (title != '' && description != '' && deadLine != '') {
					var task = new ProjectTask( taskType, title, status, description, deadLine );
					task.show();
				} else { alert( 'Fill all the fields' ); }	
			} else if (person.type == 'user' || person.type == 'student') {
				alert ('You do not have enough rights to create this type of task');
			} else { alert( 'Create user at first!'  ); }
			break;
	}	
}

function deleteTask(event) {
	var target = event.target;
	if (!target.classList.contains('close')) return;
	 
	container.removeChild(target.parentElement);
}
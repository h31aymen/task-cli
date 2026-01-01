const fs = require('fs');
const path = require('path');

const TaskFile= "Tasks.json";
const pathFile= path.join(__dirname, TaskFile);


if(!fs.existsSync(pathFile)){
	fs.writeFileSync(pathFile, "[]");
}

function getStored(){
	return JSON.parse(fs.readFileSync(pathFile, 'utf-8'));
}

function addTask(task){
	if(!task){
		console.log("An error in the passed task");
		return ;
	}
	var data= getStored();
	var newId= generateId()
	var toAdd= {
		"id": newId,
		"description": task,
		"status": "todo",
		"createdAt":new Date().toISOString(),
		"updatedAt":new Date().toISOString()
	}
	data.push(toAdd);
	fs.writeFileSync(pathFile, JSON.stringify(data, null, 2));
	console.log(`Task added successfully (ID: ${newId})`)
}

function generateId(){
	const get= getStored();
	if(get.length == 0)return 1;
	return get[get.length-1]["id"] + 1;
}

function deleteTask(id){
	const up = getStored().filter(e => e.id != id);
	fs.writeFileSync(pathFile, JSON.stringify(up, null, 2));
}

function updateTask(id, task){
	var updated= getStored().map((e)=>{
		if (e.id == id) {
			e.description= task;
			e.updatedAt= new Date().toISOString();
			return e;
		}
		return e;
	});
	console.log(JSON.stringify(updated, null, 2))
	fs.writeFileSync(pathFile, JSON.stringify(updated, null, 2));
}

function markTo(id, state){
	if (!(["todo", "in-progress", "done"].includes(state)))console.log("!!! The state passed is not allowed !!!");
	var updated= getStored().map((e)=>{
		if (e.id == id) {
			e.status= state;
			e.updatedAt= new Date().toISOString();
			return e;
		}
		return e;
	});
	fs.writeFileSync(pathFile, JSON.stringify(updated, null, 2));
}


function getStoredBy(criteria){
	if(!criteria){
		console.log(JSON.stringify(getStored(), null, 2))
		return;
	}
	const get= getStored().filter((e)=> e.status===criteria);
	console.log(JSON.stringify(get, null, 2))
}

const args = process.argv.slice(2);

switch(args[0]){
	case 'add':
		addTask(args[1]);
		break;
	case 'update':
		updateTask(args[1], args[2]);
		break;
	case 'delete':
		deleteTask(args[1]);
		break;
	case 'list':
		getStoredBy(args[1]);
		break;
	case 'mark-in-progress':
		markTo(args[1], "progress");
		break;
	case 'mark-in-done':
		markTo(args[1], "done");
		break;
	default:
		console.log("The command prompted is not allowed, the allowed commands are: add, ");
		break;
}

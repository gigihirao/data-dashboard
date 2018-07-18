const sedes = {
	AQP: "AREQUIPA",
	CDMX: "CIDADE DO MÉXICO",
	LIM: "LIMA",
	SCL: "SANTIAGO",
};
var sede = window.location.hash.substr(1);
document.getElementById("nameSede").textContent = sedes[sede];

var select = document.getElementById("turmas");
for (var turma in data[sede]) {
	var option = document.createElement("option");
	option.value = turma;
	option.textContent = turma;
	select.appendChild(option);
}

var techPassingScore = 1800 * 70 / 100;
var hsePassingScore = 1200 * 70 / 100;


function changeTurma() {
	var sprints = data[sede][select.value]["ratings"];
	var jedi = [];
	var teacher = [];
	var numberSprint = [];
	for (var sprint in sprints) {
		var scoreJedi = sprints[sprint]["jedi"];
		jedi.push(scoreJedi);
		var scoreTeacher = sprints[sprint]["teacher"];
		teacher.push(scoreTeacher);
		var sprintNumber = sprints[sprint]["sprint"];
		numberSprint.push("sprint " + sprintNumber);
	}

	var ctx = document.getElementsByClassName("line-chart");
	var chartGraph = new Chart(ctx, {
		type: 'line',
		data: {
			labels: numberSprint,
			datasets: [
				{
					label: "TEACHER",
					data: teacher,
					borderWidth: 6,
					borderColor: 'rgba(255,0,158)',
					backgroundColor: 'transparent',
				},
				{
					label: "JEDI",
					data: jedi,
					borderWidth: 6,
					borderColor: '#CCCCCC',
					backgroundColor: 'transparent',
				},
			]
		}
	});

	//NPS
	var npsAverage = document.getElementById("nps-average-value");
	var nps = data[sede][select.value]["ratings"];
	var sum = nps.reduce(function (total, sprint) {
		return sprint["nps"]["promoters"] - sprint["nps"]["detractors"] + total;
	}, 0);
	var mean = sum / nps.length;
	npsAverage.textContent = "NPS MÉDIO:  " + mean + "%";

	//non active students
	var nonActiveCtx = document.getElementById("non-active-students").getContext("2d");
	var studentsTotal = data[sede][select.value]["students"].length;
	var nonActiveTotal = data[sede][select.value]["students"].reduce(function (total, student) {
		return total + !student["active"];
	}, 0);
	var nonActiveData = [studentsTotal - nonActiveTotal, nonActiveTotal];
	new Chart(nonActiveCtx, {
		type: "pie",
		data: {
			labels: ["Alunas Ativas", "Alunas não Ativas"],
			datasets: [{
				data: nonActiveData,
				backgroundColor: ["rgba(86,248,154)", "#CCCCCC"],
			}]
		},
	});

	//tech
	var passingTechStudentsCtx = document.getElementById("passing-students-tech").getContext("2d");
	var passingStudentsTotal = data[sede][select.value]["students"].reduce(function (total, student) {
		var average = student["sprints"].reduce(function (total, sprint) {
			return total + sprint["score"]["tech"];
		}, 0) / student["sprints"].length;
		return total + (average >= techPassingScore);
	}, 0);
	new Chart(passingTechStudentsCtx, {
		type: "pie",
		data: {
			labels: ["Alunas acima da média Tech", "Alunas abaixo da média Tech"],
			datasets: [{
				data: [passingStudentsTotal, studentsTotal - passingStudentsTotal],
				backgroundColor: ["rgba(86,248,154)", "#CCCCCC"],
			}]
		},
	});

	//hse
	var passingHseStudentsCtx = document.getElementById("passing-students-hse").getContext("2d");
	var passingStudentsTotalHse = data[sede][select.value]["students"].reduce(function (total, student) {
		var average = student["sprints"].reduce(function (total, sprint) {
			return total + sprint["score"]["hse"];
		}, 0) / student["sprints"].length;
		return total + (average >= hsePassingScore);
	}, 0);
	new Chart(passingHseStudentsCtx, {
		type: "pie",
		data: {
			labels: ["Alunas acima da média HSE", "Alunas abaixo da média HSE"],
			datasets: [{
				data: [passingStudentsTotalHse, studentsTotal - passingStudentsTotalHse],
				backgroundColor: ["rgba(86,248,154)", "#CCCCCC"],
			}]
		},
	});
	//APRESENTANDO ALUNAS NA TELA
	var studentsInfo = document.getElementById("students-info");
	var students = data[sede][select.value]["students"];
	studentsInfo.innerHTML = "";
	for (var student in students) {

		var div = document.createElement("div");
		div.setAttribute("class", "students");
		//		Nome da Aluna
		var p = document.createElement("p");
		p.setAttribute("class", "nameStudent");
		var name = data[sede][select.value]["students"][student]["name"];
		console.log(name);
		p.innerHTML = name;
		div.appendChild(p);
		//		Foto da Aluna
		var img = document.createElement("img");
		var photo = data[sede][select.value]["students"][student]["photo"];
		img.setAttribute("class", "imgStudent");
		img.src = photo;
		div.appendChild(img);
		//		Alunas ativas
		var ativo = document.createElement("p");
		var active = data[sede][select.value]["students"][student]["active"];
		if (active == true) {
			ativo.setAttribute("class", "studentTrue");
			ativo.innerHTML = "Aluna Ativa"
			div.appendChild(ativo);
		} else {
			ativo.setAttribute("class", "studentFalse");
			ativo.innerHTML = "Aluna Inativa"
			div.appendChild(ativo);
		}
		//			Sprint
		var sprintsStudents = students[student]["sprints"];
		for (var sprintStudent in sprintsStudents) {
			var tech = sprintsStudents[sprintStudent]["score"]["tech"];
			var hse = sprintsStudents[sprintStudent]["score"]["hse"];
			var p1 = document.createElement("p");
			var p2 = document.createElement("p");
			var h4 = document.createElement("h4");
			var sp = parseInt(sprintStudent) + 1;
			h4.innerHTML = "Sprint " + sp;
			p1.innerHTML = "Nota Tech: " + tech;
			p2.innerHTML = "Nota HSE: " + hse;
			div.appendChild(h4);
			div.appendChild(p1);
			div.appendChild(p2);
		}
		studentsInfo.appendChild(div);
	}
}

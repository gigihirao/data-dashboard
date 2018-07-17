const sedes = {
	AQP: "AQUERIPA",
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
	// select.value --> turma selecionada
	// criar os graficos aqui dentro
	// var ctx = document.getElementsByClassName("line-chart");
	// //type, data, option
	// var chartGraph = new Chart(ctx, {
	// 	type: 'line',
	// 	data: {
	// 		labels: [sprint1, sprint2],
	// 	}

	// });

	var npsAverage = document.getElementById("nps-average-value");
	var nps = data[sede][select.value]["ratings"];
	var sum = nps.reduce(function(total, sprint){
		return sprint["nps"]["promoters"] - sprint["nps"]["detractors"] + total;
	}, 0);

	var mean = sum / nps.length;
	npsAverage.textContent = mean;

	//non active students
	var nonActiveCtx = document.getElementById("non-active-students").getContext("2d");
	var studentsTotal = data[sede][select.value]["students"].length;
	var nonActiveTotal = data[sede][select.value]["students"].reduce(function(total, student){
		return total + !student["active"];
	}, 0);
	var nonActiveData = [studentsTotal - nonActiveTotal, nonActiveTotal];
	new Chart(nonActiveCtx, {
		type: "pie",
		data: {
			labels: ["Active", "Non-Active"],
			datasets: [{
				data: nonActiveData,
				backgroundColor: ["green", "pink"],
			}]
		},
	});

	//tech
	var passingTechStudentsCtx = document.getElementById("passing-students-tech").getContext("2d");
	var passingStudentsTotal = data[sede][select.value]["students"].reduce(function(total, student){
		var average = student["sprints"].reduce(function(total, sprint){
			return total + sprint["score"]["tech"];
		}, 0) / student["sprints"].length;
		return total + (average >= techPassingScore);
	}, 0);
	new Chart(passingTechStudentsCtx, {
		type: "pie",
		data: {
			labels: ["Passing Tech", "Non-Passing Tech"],
			datasets: [{
				data: [passingStudentsTotal, studentsTotal - passingStudentsTotal],
				backgroundColor: ["green", "pink"],
			}]
		},
	});

	//hse
	var passingHseStudentsCtx = document.getElementById("passing-students-hse").getContext("2d");
	var passingStudentsTotalHse = data[sede][select.value]["students"].reduce(function(total, student){
		var average = student["sprints"].reduce(function(total, sprint){
			return total + sprint["score"]["hse"];
		}, 0) / student["sprints"].length;
		return total + (average >= hsePassingScore);
	}, 0);
	new Chart(passingHseStudentsCtx, {
		type: "pie",
		data: {
			labels: ["Passing HSE", "Non-Passing HSE"],
			datasets: [{
				data: [passingStudentsTotalHse, studentsTotal - passingStudentsTotalHse],
				backgroundColor: ["green", "pink"],
			}]
		},
	});
}

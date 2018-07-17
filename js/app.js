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


function changeTurma() {
//	var teacher = select.value[students][ratings][teacher];
//	console.log(teacher);
	// select.value --> turma selecionada
	// criar os graficos aqui dentro
	var ctx = document.getElementsByClassName("line-chart");
	//type, data, option
	var chartGraph = new Chart(ctx, {
		type: 'line',
		data: {
			title: {
				text: 'notas blá blá'
			},
			labels: [`sprint 1`, `sprint 2`, 'sprint 3', 'sprint 4', 'sprint 5'],
			datasets: [
				{
					label: "TEACHER",
					data: [3.5, 5, 3.5, 2.2, 3],
					borderWidth: 6,
					borderColor: 'rgba(255,0,158)',
					backgroundColor: 'transparent',
				},
				{
					label: "JEDI",
					data: [2.5, 4, 3, 4, 2.5],
					borderWidth: 6,
					borderColor: 'rgba(86,248,154)',
					backgroundColor: 'transparent',
				},
			]
		}
	});
}

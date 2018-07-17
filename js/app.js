var sede = window.location.hash;
var tituloSede = document.getElementById("nameSede");


if (sede == "#AQP") {
	tituloSede.innerHTML = "AREQUIPA";
	classes(AQP);
}
if (sede == "#CDMX") {
	tituloSede.innerHTML = "CIDADE DO MÉXICO";
	classes(CDMX);
}
if (sede == "#LIM") {
	tituloSede.innerHTML = "LIMA";
	classes(LIM);
}
if (sede == "#SCL") {
	tituloSede.innerHTML = "SANTIAGO";
	classes(SCL);
}

var ctx = document.getElementsByClassName("line-chart");
//type, data, option
var chartGraph = new Chart(ctx, {
	type: 'line',
	data: {
		labels: [sprint 1, sprint 2],
	}

});

function classes(sede) {

}

const sedes = {
	AQP: "AQUERIPA",
	CDMX: "CIDADE DO MÉXICO",
	LIM: "LIMA",
	SCL: "SANTIAGO",
};
var sede = window.location.hash.substr(1);

var select = document.getElementById("turmas");
for (var turma in data[sede]) {
	var option = document.createElement("option");
	option.value = turma;
	option.textContent = turma;
	select.appendChild(option);
}

const sedes = {
	AQP: "AQUERIPA",
	CDMX: "CIDADE DO MÉXICO",
	LIM: "LIMA",
	SCL: "SANTIAGO",
};
var sede = window.location.hash.substr(1);

var select = document.getElementById("turmas");
for (var turma in data[sede]){
	var option = document.createElement("option");
	option.value = turma;
	option.textContent = turma;
	select.appendChild(option);
}
const sedes = {
	AQP: "AQUERIPA",
	CDMX: "CIDADE DO MÉXICO",
	LIM: "LIMA",
	SCL: "SANTIAGO",
};
var sede = window.location.hash.substr(1);
document.getElementById("nameSede").textContent = sedes[sede];

var select = document.getElementById("turmas");
for (var turma in data[sede]){
	var option = document.createElement("option");
	option.value = turma;
	option.textContent = turma;
	select.appendChild(option);
}

function changeTurma(){
	// select.value --> turma selecionada
	// criar os graficos aqui dentro

}
//var arequipa = document.getElementById("arequipa").textContent;
//var mexico = document.getElementById("mexico").textContent;
//var lima = document.getElementById("lima").textContent;
//var santiago = document.getElementById("santiago").textContent;

//
//
//var sede = arequipa.addEventListener('click', classes(sede));
//mexico.addEventListener('click', teste.innerHTML = "Cidade do Mexico");
//lima.addEventListener('click', classes(lima));
//santiago.addEventListener('click', classes(santiago));


function classes(sede) {
	window.location.href = "turma.html";
	var nameSede = sede.textContent;
	var tituloSede = document.querySelector('#nameSede');
	tituloSede.innerHTML = nameSede;
	console.log(tituloSede);
	console.log(nameSede);

	if (nameSede == "AREQUIPA") {
		//		chamar a turma no data com graficos

	}
	if (nameSede == "CIDADE DO MÉXICO") {
		//		chamar a turma no data com graficos

	}
	if (nameSede == "LIMA") {
		//		chamar a turma no data com graficos

	}
	if (nameSede == "SANTIAGO") {

		//		chamar a turma no data com graficos
	}

}

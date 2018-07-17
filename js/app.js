	var sede = window.location.hash;
	var tituloSede = document.getElementById("nameSede")

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

	function classes(sede) {

	}

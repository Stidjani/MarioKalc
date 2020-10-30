//Execute when document loads
document.addEventListener("DOMContentLoaded", function(event) {
	populateCharacterSection(characters);
	populateVehicleSection(vehicles);
	populateTireSection(tires);
	populateGliderSection(gliders);
	setupCharacterModal();
	setupVehicleModal();
	setupTireModal();
	setupGliderModal();
});

//Global Variables
const characters = Papa.parse(strCharacters, {header: true}).data;
const vehicles = Papa.parse(strVehicles, {header: true}).data;
const tires = Papa.parse(strTires, {header: true}).data;
const gliders = Papa.parse(strGliders, {header: true}).data;

/*----------------------------------------------------------------
Creates character cards for each character and inserts card's html
into the Characters section.
------------------------------------------------------------------*/
function populateCharacterSection(characters) {
	for (let i = 0; i < characters.length; i++) {
		createCard(characters[i], "character", "sectionCharacters");
	}
}

/*----------------------------------------------------------------
Creates vehicle cards for each character and inserts card's html
into the appropriate vehicle sub-section.
------------------------------------------------------------------*/
function populateVehicleSection(vehicles) {
	for (let i = 0; i < vehicles.length; i++) {
		if (vehicles[i].type === "Kart") {
			createCard(vehicles[i], "vehicle", "subKarts");
		} else if (vehicles[i].type === "Bike" ) {
			createCard(vehicles[i], "vehicle", "subBikes");
		} else {
			createCard(vehicles[i], "vehicle", "subATVs");
		}
	}
}

/*----------------------------------------------------------------
Creates tire cards for each tire and inserts card's html
into the Tires section.
------------------------------------------------------------------*/
function populateTireSection(tires) {
	for (let i = 0; i < tires.length; i++) {
		createCard(tires[i], "tire", "sectionTires");
	}
}

/*----------------------------------------------------------------
Creates glider cards for each glider and inserts card's html
into the Gliders section.
------------------------------------------------------------------*/
function populateGliderSection(gliders) {
	for (let i = 0; i < gliders.length; i++) {
		createCard(gliders[i], "glider", "sectionGliders");
	}
}


/*----------------------------------------------------------------
Creates an individual card of type character, vehicle, or parts. 
Inserts card on the page in the specified destination.
------------------------------------------------------------------*/
function createCard(obj, type, destinationId) {
	const label = obj.name;
	const imgUrl = obj.img;
	const charId = obj.id;
	const htmlStr = "<div id='" + charId + "' class='card " + type + "'><img src='" + imgUrl 
		+ "'><p class='cardLabel'>" + label + "</p></div>";
	const destination = document.getElementById(destinationId);
	destination.insertAdjacentHTML('beforeEnd', htmlStr);
}

/*----------------------------------------------------------------
Adds event handlers to display and close the character modal
------------------------------------------------------------------*/
function setupCharacterModal() {
	//Display modal when character card is clicked
	const charCards = document.getElementsByClassName("card character");
	for (let i = 0; i < charCards.length; i++) {
		const charId = charCards[i].id;
		charCards[i].addEventListener("click", function() {
			document.getElementById("charInfoModal").style.display = "block";
			populateCharacterModal(charId);
		});
	}
	//Close modal when "x" is clicked
	const btnClose = document.getElementById("closeCharModal");
	btnClose.addEventListener("click", function() {
		document.getElementById("charInfoModal").style.display = "none";
	});
}

/*----------------------------------------------------------------
Adds event handlers to display and close the vehicle modal
------------------------------------------------------------------*/
function setupVehicleModal() {
	//Display modal when vehicle card is clicked
	const vehicleCards = document.getElementsByClassName("card vehicle");
	for (let i = 0; i < vehicleCards.length; i++) {
		const vehicleId = vehicleCards[i].id;
		vehicleCards[i].addEventListener("click", function() {
			document.getElementById("vehicleInfoModal").style.display = "block";
			populateVehicleModal(vehicleId);
		});
	}
	//Close modal when "x" is clicked
	const btnClose = document.getElementById("closeVehicleModal");
	btnClose.addEventListener("click", function() {
		document.getElementById("vehicleInfoModal").style.display = "none";
	});
}

/*----------------------------------------------------------------
Adds event handlers to display and close the tire modal
------------------------------------------------------------------*/
function setupTireModal() {
	//Display modal when tire card is clicked
	const tireCards = document.getElementsByClassName("card tire");
	for (let i = 0; i < tireCards.length; i++) {
		const tireId = tireCards[i].id;
		tireCards[i].addEventListener("click", function() {
			document.getElementById("tireInfoModal").style.display = "block";
			populateTireModal(tireId);
		});
	}
	//Close modal when "x" is clicked
	const btnClose = document.getElementById("closeTireModal");
	btnClose.addEventListener("click", function() {
		document.getElementById("tireInfoModal").style.display = "none";
	});
}

/*----------------------------------------------------------------
Adds event handlers to display and close the glider modal
------------------------------------------------------------------*/
function setupGliderModal() {
	//Display modal when glider card is clicked
	const gliderCards = document.getElementsByClassName("card glider");
	for (let i = 0; i < gliderCards.length; i++) {
		const gliderId = gliderCards[i].id;
		gliderCards[i].addEventListener("click", function() {
			document.getElementById("gliderInfoModal").style.display = "block";
			populateGliderModal(gliderId);
		});
	}
	//Close modal when "x" is clicked
	const btnClose = document.getElementById("closeGliderModal");
	btnClose.addEventListener("click", function() {
		document.getElementById("gliderInfoModal").style.display = "none";
	});
}

/*----------------------------------------------------------------
Populates the character modal with a character's stats. Takes 
the character id as input and is used as a click event handler 
when an individual card is clicked.
------------------------------------------------------------------*/
function populateCharacterModal(id) {
	let char = null;
	//Get character object
	for (let i = 0; i < characters.length; i++) {
		if (parseInt(characters[i].id) === parseInt(id)) {
			char = characters[i];
		}
	}
	document.getElementById("modalCharImg").src = char.img;
	document.getElementById("modalCharName").innerHTML = char.name;
	document.getElementById("modalCharAvail").innerHTML = char.availability;
	document.getElementById("modalCharClass").innerHTML = char.class;
	document.getElementById("modalCharWeight").innerHTML = char.weight;
	document.getElementById("modalCharSpeed").innerHTML = char.speed;
	document.getElementById("modalCharAccel").innerHTML = char.accel;
	document.getElementById("modalCharHandling").innerHTML = char.handling;
	document.getElementById("modalCharTraction").innerHTML = char.traction;
	document.getElementById("modalCharTurbo").innerHTML = char.turbo;
}

/*----------------------------------------------------------------
Populates the vehicle modal with a vehicle's stats. Takes 
the vehicle id as input and is used as a click event handler 
when an individual card is clicked.
------------------------------------------------------------------*/
function populateVehicleModal(id) {
	let vehicle = null;
	//Get vehicle object
	for (let i = 0; i < vehicles.length; i++) {
		if (parseInt(vehicles[i].id) === parseInt(id)) {
			vehicle = vehicles[i];
		}
	}
	document.getElementById("modalVehicleImg").src = vehicle.img;
	document.getElementById("modalVehicleName").innerHTML = vehicle.name;
	document.getElementById("modalVehicleType").innerHTML = vehicle.type;
	document.getElementById("modalVehicleWeight").innerHTML = vehicle.weight;
	document.getElementById("modalVehicleSpeed").innerHTML = vehicle.speed;
	document.getElementById("modalVehicleAccel").innerHTML = vehicle.accel;
	document.getElementById("modalVehicleHandling").innerHTML = vehicle.handling;
	document.getElementById("modalVehicleTraction").innerHTML = vehicle.traction;
	document.getElementById("modalVehicleTurbo").innerHTML = vehicle.turbo;
}

/*----------------------------------------------------------------
Populates the tire modal with a tire's stats. Takes 
the tire's id as input and is used as a click event handler 
when an individual card is clicked.
------------------------------------------------------------------*/
function populateTireModal(id) {
	let tire = null;
	//Get tire object
	for (let i = 0; i < tires.length; i++) {
		if (parseInt(tires[i].id) === parseInt(id)) {
			tire = tires[i];
		}
	}
	document.getElementById("modalTireImg").src = tire.img;
	document.getElementById("modalTireName").innerHTML = tire.name;
	document.getElementById("modalTireWeight").innerHTML = tire.weight;
	document.getElementById("modalTireSpeed").innerHTML = tire.speed;
	document.getElementById("modalTireAccel").innerHTML = tire.accel;
	document.getElementById("modalTireHandling").innerHTML = tire.handling;
	document.getElementById("modalTireTraction").innerHTML = tire.traction;
	document.getElementById("modalTireTurbo").innerHTML = tire.turbo;
}

/*----------------------------------------------------------------
Populates the glider modal with a tire's stats. Takes 
the tire's id as input and is used as a click event handler 
when an individual card is clicked.
------------------------------------------------------------------*/
function populateGliderModal(id) {
	let glider = null;
	//Get glider object
	for (let i = 0; i < gliders.length; i++) {
		if (parseInt(gliders[i].id) === parseInt(id)) {
			glider = gliders[i];
		}
	}
	document.getElementById("modalGliderImg").src = glider.img;
	document.getElementById("modalGliderName").innerHTML = glider.name;
	document.getElementById("modalGliderWeight").innerHTML = glider.weight;
	document.getElementById("modalGliderSpeed").innerHTML = glider.speed;
	document.getElementById("modalGliderAccel").innerHTML = glider.accel;
	document.getElementById("modalGliderHandling").innerHTML = glider.handling;
	document.getElementById("modalGliderTraction").innerHTML = glider.traction;
	document.getElementById("modalGliderTurbo").innerHTML = glider.turbo;
}
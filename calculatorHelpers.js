//Data objects
const characters = Papa.parse(strCharacters, {header: true}).data;
const vehicles = Papa.parse(strVehicles, {header: true}).data;
const tires = Papa.parse(strTires, {header: true}).data;
const gliders = Papa.parse(strGliders, {header: true}).data;

console.log("in calculatorHelpers.js");

/*
 SPEED METHODS
*/

/*------------------------------------------------------------------------------
Get the character's info object. Takes character id as input as a parameter
------------------------------------------------------------------------------*/
function getCharacterInfo(characterId) {
  for (let i = 0; i < characters.length; i++) {
    if (parseInt(characters[i].id) === parseInt(characterId)) {
      return characters[i];
    }
  }
}

/*------------------------------------------------------------------------------
Get an array of vehicles with the top speed
------------------------------------------------------------------------------*/
function getTopSpeedVehicles() {
  let max = -1000; //some speeds are negative so set to super low minimum
  //Get max speed
  for (let i = 0; i < vehicles.length; i++) {
    let speed = parseFloat(vehicles[i].speed);
    if (speed > max) {
      max = speed;
    }
  }
  //Create array of fastest vehicles
  let topSpeedVehicles = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (parseFloat(vehicles[i].speed) === max) {
      topSpeedVehicles.push(vehicles[i]);
    }
  }
  return topSpeedVehicles;
}

/*------------------------------------------------------------------------------
Get an array of tires with the top speed
------------------------------------------------------------------------------*/
function getTopSpeedTires() {
  let max = -1000; //some speeds are negative so set to super low minimum
  //Get max speed
  for (let i = 0; i < tires.length; i++) {
    let speed = parseFloat(tires[i].speed);
    if (speed > max) {
      max = speed;
    }
  }
  //Create array of fastest tires
  let topSpeedTires = [];
  for (let i = 0; i < tires.length; i++) {
    if (parseFloat(tires[i].speed) === max) {
      topSpeedTires.push(tires[i]);
    }
  }
  return topSpeedTires;
}

/*------------------------------------------------------------------------------
Get an array of gliders with the top speed
------------------------------------------------------------------------------*/
function getTopSpeedGliders() {
  let max = -1000; //some speeds are negative so set to super low minimum
  //Get max speed
  for (let i = 0; i < gliders.length; i++) {
    let speed = parseFloat(gliders[i].speed);
    if (speed > max) {
      max = speed;
    }
  }
  //Create array of fastest gliders
  let topSpeedGliders = [];
  for (let i = 0; i < gliders.length; i++) {
    if (parseFloat(gliders[i].speed) === max) {
      topSpeedGliders.push(gliders[i]);
    }
  }
  return topSpeedGliders;
}

/*------------------------------------------------------------------------------
Get an array of karts with the top speed. Used when user chooses to restrict
results to a specific vehicle type.
------------------------------------------------------------------------------*/
function getTopSpeedKarts() {
  let max = -1000; //some speeds are negative so set to super low minimum
  //Get max speed
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Kart") {
      let speed = parseFloat(vehicles[i].speed);
      if (speed > max) {
        max = speed;
      }
    }
  }
  //Create array of fastest karts
  let topSpeedKarts = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Kart" && parseFloat(vehicles[i].speed) === max) {
      topSpeedKarts.push(vehicles[i]);
    }
  }
  return topSpeedKarts;
}

/*------------------------------------------------------------------------------
Get an array of bikes with the top speed. Used when user chooses to restrict
results to a specific vehicle type.
------------------------------------------------------------------------------*/
function getTopSpeedBikes() {
  let max = -1000; //some speeds are negative so set to super low minimum
  //Get max speed
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Bike") {
      let speed = parseFloat(vehicles[i].speed);
      if (speed > max) {
        max = speed;
      }
    }
  }
  //Create array of fastest bikes
  let topSpeedBikes = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Bike" && parseFloat(vehicles[i].speed) === max) {
      topSpeedBikes.push(vehicles[i]);
    }
  }
  return topSpeedBikes;
}

/*------------------------------------------------------------------------------
Get an array of ATVs with the top speed. Used when user chooses to restrict
results to a specific vehicle type.
------------------------------------------------------------------------------*/
function getTopSpeedATVs() {
  let max = -1000; //some speeds are negative so set to super low minimum
  //Get max speed
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "ATV") {
      let speed = parseFloat(vehicles[i].speed);
      if (speed > max) {
        max = speed;
      }
    }
  }
  //Create array of fastest ATVs
  let topSpeedATVs = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "ATV" && parseFloat(vehicles[i].speed) === max) {
      topSpeedATVs.push(vehicles[i]);
    }
  }
  return topSpeedATVs;
}

/*
 ACCELERATION METHODS
*/

/*------------------------------------------------------------------------------
Get an array of vehicles with the top acceleration
------------------------------------------------------------------------------*/
function getTopAccelVehicles() {
  let max = -1000; //acceleration can be negative so set to super low minimum
  //Get max acceleration
  for (let i = 0; i < vehicles.length; i++) {
    let accel = parseFloat(vehicles[i].accel);
    if (accel > max) {
      max = accel;
    }
  }
  //Create array of highest acceleration vehicles
  let topAccelVehicles = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (parseFloat(vehicles[i].accel) === max) {
      topAccelVehicles.push(vehicles[i]);
    }
  }
  return topAccelVehicles;
}

/*------------------------------------------------------------------------------
Get an array of tires with the top acceleration
------------------------------------------------------------------------------*/
function getTopAccelTires() {
  let max = -1000; //acceleration can be negative so set to super low minimum
  //Get max acceleration
  for (let i = 0; i < tires.length; i++) {
    let accel = parseFloat(tires[i].accel);
    if (accel > max) {
      max = accel;
    }
  }
  //Create array of highest acceleration tires
  let topAccelTires = [];
  for (let i = 0; i < tires.length; i++) {
    if (parseFloat(tires[i].accel) === max) {
      topAccelTires.push(tires[i]);
    }
  }
  return topAccelTires;
}

/*------------------------------------------------------------------------------
Get an array of gliders with the top acceleration
------------------------------------------------------------------------------*/
function getTopAccelGliders() {
  let max = -1000; //acceleration can be negative so set to super low minimum
  //Get max acceleration
  for (let i = 0; i < gliders.length; i++) {
    let accel = parseFloat(gliders[i].accel);
    if (accel > max) {
      max = accel;
    }
  }
  //Create array of highest acceleration gliders
  let topAccelGliders = [];
  for (let i = 0; i < gliders.length; i++) {
    if (parseFloat(gliders[i].accel) === max) {
      topAccelGliders.push(gliders[i]);
    }
  }
  return topAccelGliders;
}

/*------------------------------------------------------------------------------
Get an array of karts with the top acceleration. Used when user chooses to
restrict results to a specific vehicle type.
------------------------------------------------------------------------------*/
function getTopAccelKarts() {
  let max = -1000; //acceleration can be negative so set to super low minimum
  //Get max acceleration
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Kart") {
      let accel = parseFloat(vehicles[i].accel);
      if (accel > max) {
        max = accel;
      }
    }
  }
  //Create array of highest acceleration karts
  let topAccelKarts = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Kart" && parseFloat(vehicles[i].accel) === max) {
      topAccelKarts.push(vehicles[i]);
    }
  }
  return topAccelKarts;
}

/*------------------------------------------------------------------------------
Get an array of bikes with the top acceleration. Used when user chooses to
restrict results to a specific vehicle type.
------------------------------------------------------------------------------*/
function getTopAccelBikes() {
  let max = -1000; //acceleration can be negative so set to super low minimum
  //Get max acceleration
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Bike") {
      let accel = parseFloat(vehicles[i].accel);
      if (accel > max) {
        max = accel;
      }
    }
  }
  //Create array of highest acceleration bikes
  let topAccelBikes = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "Bike" && parseFloat(vehicles[i].accel) === max) {
      topAccelBikes.push(vehicles[i]);
    }
  }
  return topAccelBikes;
}

/*------------------------------------------------------------------------------
Get an array of ATVs with the top acceleration. Used when user chooses to
restrict results to a specific vehicle type.
------------------------------------------------------------------------------*/
function getTopAccelATVs() {
  let max = -1000; //acceleration can be negative so set to super low minimum
  //Get max accel
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "ATV") {
      let accel = parseFloat(vehicles[i].accel);
      if (accel > max) {
        max = accel;
      }
    }
  }
  //Create array of highest acceleration ATVs
  let topAccelATVs = [];
  for (let i = 0; i < vehicles.length; i++) {
    if (vehicles[i].type === "ATV" && parseFloat(vehicles[i].accel) === max) {
      topAccelATVs.push(vehicles[i]);
    }
  }
  return topAccelATVs;
}

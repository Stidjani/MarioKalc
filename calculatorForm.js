//Execute when document loads
document.addEventListener("DOMContentLoaded", function(event) {
  setupDisplayFormBtns();
  populateCharacterMenu();
  setFormBtns();
  btnPrev.addEventListener("click", goToPreviousStep);
  btnNext.addEventListener("click", goToNextStep);
  toggleDivVehicleTypes(document.querySelector('input[name="rbRestriction"]:checked').value);
});

/*------------------------------------------------------------------------------
Variables and function definitions
------------------------------------------------------------------------------*/

function setupDisplayFormBtns() {
  const btns = document.getElementsByClassName("btnShowCalcForm");
  for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
      document.getElementById("calcForm").style.display = "block";
    });
  }
}

function showResults() {
  //todo: refine this ui stuff
    progBarSteps[2].classList.add("completed");
    form.style.display = "none";
    document.getElementById("results").style.display = "block";

  console.log("Top Speed Parts");
  console.log(getTopSpeedVehicles());
  console.log(getTopSpeedTires());
  console.log(getTopSpeedGliders());
  console.log("Top Accel Parts");
  console.log(getTopAccelVehicles());
  console.log(getTopAccelTires());
  console.log(getTopAccelGliders());
  //Get user inputs-------------------------------------------------------------
  const charId = parseInt(document.getElementById("ddlCharacters").value); //character
  const optimizeVar = document.querySelector('input[name="rbListOptVar"]:checked').value; //optimizing var (speed or accel)
  let restrictVehicles = false; //should we restrict results based on vehicle type?
  let vehicleType = null; //selected vehicle type (null if none selected)
  if (document.querySelector("input[name='rbRestriction']:checked").value == "1") {
    restrictVehicles = true;
    vehicleType = document.getElementById("ddlVehicleTypes").value;
  }

  /*Calculations----------------------------------------------------------------
    Use methods from calculationHelpers.js to get the names of vehicles, tires,
    and gliders that will maximize a character's speed/acceleration. Store
    speed/acceleration of vehicles, tires, & gliders along the way to display
    calculations in results. This way, users will understand how these results
    were generated. */

  const char = getCharacterInfo(charId);
  const charName = char.name;
  let charStat = 0;
  let topVehicles = [];
  let topTires = [];
  let topGliders = [];
  let maxStat = 0;
  let maxStatRestr = null;
  let vehicleStat = -1000;
  let tireStat = -1000;
  let gliderStat = -1000

  //Base character stats
  if (optimizeVar === "speed") {
    charStat = char.speed;
  }
  else {
    charStat = char.accel;
  }

  if (restrictVehicles == false) {
    console.log("optimizeVar: " + optimizeVar);
    console.log("type optimizeVar: " + typeof(optimizeVar));
    if (optimizeVar === "speed") {
      //Max (unrestricted) vehicle speed
      topVehicles = getTopSpeedVehicles();
      vehicleStat = topVehicles[0].speed; //all vehicles in this arr have same speed
      //Max tire speed
      topTires = getTopSpeedTires();
      tireStat = topTires[0].speed;
      //Max glider speed
      topGliders = getTopSpeedGliders();
      gliderStat = topGliders[0].speed;
    } else {
      //Max (unrestricted) vehicle acceleration
      topVehicles = getTopAccelVehicles();
      vehicleStat = topVehicles[0].accel;
      //Max tire acceleration
      topTires = getTopAccelTires();
      tireStat = topTires[0].accel;
      //Max glider acceleration
      topGliders = getTopAccelGliders();
      gliderStat = topGliders[0].accel;
    }
  } else {
      //Max (restricted) vehicle speed
      if (optimizeVar === "speed") {
          if (vehicleType === "Kart") {
            topVehicles = getTopSpeedKarts();
          } else if (vehicleType === "Bike") {
            topVehicles = getTopSpeedBikes();
          } else {
            topVehicles = getTopSpeedATVs();
          }
          vehicleStat = topVehicles[0].speed;
          topTires = getTopSpeedTires();
          tireStat = topTires[0].speed;
          topGliders = getTopSpeedGliders();
          gliderStat = topGliders[0].speed;
      }
      //Max (restricted) vehicle acceleration
      else {
          if (vehicleType === "Kart") {
            topVehicles = getTopAccelKarts();
          } else if (vehicleType === "Bike") {
            topVehicles = getTopAccelBikes();
          } else {
            topVehicles = getTopAccelATVs();
          }
          vehicleStat = topVehicles[0].accel; //max (restricted) vehicle accel
          topTires = getTopSpeedTires();
          tireStat = topTires[0].accel;
          topGliders = getTopSpeedGliders();
          gliderStat = topGliders[0].accel;
      }
      maxStatRestr = parseFloat(charStat) + parseFloat(vehicleStat) + parseFloat(tireStat) + parseFloat(gliderStat);
  }
  maxStat = parseFloat(charStat) + parseFloat(vehicleStat) + parseFloat(tireStat) + parseFloat(gliderStat);
  console.log("maxStat: " + maxStat);
  console.log(topVehicles);

  //Populate results in form -------------------------------------------------------
  //Add character's name
  let elems = document.getElementsByClassName("charName");
  console.log(elems);
  console.log("charName: " + charName);
  for (let i = 0; i < elems.length; i++ ) {
    elems[i].innerHTML = charName;
  }

  //Add optimizing variable
  elems = document.getElementsByClassName("optimizeVar");
  for (let i = 0; i < elems.length; i++ ) {
    console.log("in elems class='optimizeVar'");
    elems[i].innerHTML = optimizeVar;
  }

  //Add max stat
  elems = document.getElementsByClassName("maxStat");
  for (let i = 0; i < elems.length; i++ ) {
    elems[i].innerHTML = maxStat;
  }

  //Add vehicle / tire / glider stats
  elems = document.getElementsByClassName("vehicleStat");
  for (let i = 0; i < elems.length; i++ ) {
    elems[i].innerHTML = vehicleStat;
  }
  elems = document.getElementsByClassName("tireStat");
  for (let i = 0; i < elems.length; i++ ) {
    elems[i].innerHTML = tireStat;
  }
  elems = document.getElementsByClassName("gliderStat");
  for (let i = 0; i < elems.length; i++ ) {
    elems[i].innerHTML = gliderStat;
  }

  //Add vehicle / tire / glider names
  let strVehicles = "";
  for (let i = 0; i < topVehicles.length; i++) {
    strVehicles += topVehicles[i].name;
    if (i < topVehicles.length - 2) {
      strVehicles += ", "
    } else if (i === topVehicles.length - 2) {
      strVehicles += ", or";
    }
  }
  document.getElementById("resultsVehicles").innerHTML = strVehicles;

  let strTires = "";
  for (let i = 0; i < topTires.length; i++) {
    strTires += topTires[i].name;
    if (i < topTires.length - 2) {
      strTires += ","
    } else if (i === topTires.length - 2){
      strTires += ", or";
    }
  }
  document.getElementById("resultsTires").innerHTML = strTires;

  let strGliders = "";
  for (let i = 0; i < topGliders.length; i++) {
    strGliders += topGliders[i].name;
    if (i < topGliders.length - 2) {
      strGliders += ","
    } else if (i === topGliders.length - 2){
      strGliders += ", or";
    }
  }
  document.getElementById("resultsGliders").innerHTML = strGliders;

  if (restrictVehicles === true) {
    elems = document.getElementsByClassName("maxStatRestr");
    for (let i = 0; i < elems.length; i++ ) {
      elems[i].innerHTML = maxStatRestr;
    }
    elems = document.getElementsByClassName("vehicleType");
    for (let i = 0; i < elems.length; i++ ) {
      elems[i].innerHTML = vehicleType;
    }
    document.getElementById("resultsVehicleHeader").innerHTML = vehicleType;
    document.getElementById("resultsDescRestr").style.display = "block";
    document.getElementById("resultsDesc").style.display = "none";
  } else {
    document.getElementById("resultsDescRestr").style.display = "none";
    document.getElementById("resultsDesc").style.display = "block";
  }
}

//Global Vars
const steps = 3;
let current = 0;

//DOM Elems
let btnPrev = document.getElementById("btnPrev");
let btnNext = document.getElementById("btnNext");
let btnSubmit = document.getElementById("btnSubmit");
let progBarSteps = Array.prototype.slice.call(document.querySelectorAll(".step"));
let formWrapper = document.getElementById("formWrapper");
let form = document.getElementById("form");
let divVehicleTypes = document.getElementById("divVehicleTypes");

//todo: remove
// btnSubmit.addEventListener("click", function() {
//   progBarSteps[2].classList.add("completed");
//   form.style.display = "none";
//   document.getElementById("results").style.display = "block";
// });

/* -----------------------------------------------------------------------------
Populate the characters drop down menu with list of characters from
data object (in characters.js)
------------------------------------------------------------------------------*/
function populateCharacterMenu() {
  const characters = Papa.parse(strCharacters, {header: true}).data;
  let selectMenu = document.getElementById("ddlCharacters");
  for (let i = 0; i < characters.length; i++) {
    let option = document.createElement("option");
    option.value = characters[i].id;
    option.text = characters[i].name;
    selectMenu.add(option);
  }
}

/* -----------------------------------------------------------------------------
Display the correct form buttons based on step
------------------------------------------------------------------------------*/
function setFormBtns() {
  if (current === 0) {
    //show next btn only
    btnPrev.style.display = "none";
    btnSubmit.style.display = "none";
    btnNext.style.display = "block";
    btnNext.classList.add("single");
  }
  else if (current === steps - 1) {
    //show submit btn (instead of next btn)
    btnPrev.style.display = "block"
    btnNext.style.display = "none";
    btnNext.classList.remove("single");
    btnSubmit.style.display = "block";
  }
  else {
    //show prev & next btns
    btnPrev.style.display = "block";
    btnNext.style.display = "block";
    btnNext.classList.remove("single");
    btnSubmit.style.display = "none";
  }
}

/*------------------------------------------------------------------------------
Event handler: Move to form's previous step
------------------------------------------------------------------------------*/
function goToPreviousStep() {
  if (current - 1 >= 0) {
    let prevProgBarStep = progBarSteps[current-1];
    prevProgBarStep.classList.remove("completed"); //remove 'completed' styling from prev step
    slideForm(1);
    current--;
    setFormBtns();
    //todo: remove later
    progBarSteps[2].classList.remove("completed");
    form.style.display = "block";
    document.getElementById("results").style.display = "none";
  }
}

/*------------------------------------------------------------------------------
Event handler: Move to form's next step
------------------------------------------------------------------------------*/
function goToNextStep() {
  if (current + 1 < steps) {
    let currProgBarStep = progBarSteps[current]; //add 'completed' styling to current step
    currProgBarStep.classList.add("completed");
    slideForm(-1);
    current++;
    setFormBtns();
  }
}

/*------------------------------------------------------------------------------
Slides the form's text content left or right depending on the direct parameter.
The direc param takes either -1 (slides left/next) or +1 (slides right/prev)
------------------------------------------------------------------------------*/
function slideForm(direc) {
  const formWidth = parseFloat(window.getComputedStyle(formWrapper).getPropertyValue("width"));
  const currLeft = parseFloat(form.style.left);
  let newLeft = currLeft + (direc * formWidth);
  form.style.left = newLeft + "px";
}

/* -----------------------------------------------------------------------------
Event handler for radio button options controlling advanced vehicle type
options on step 3 of form
------------------------------------------------------------------------------*/
function rbRestrictionsChange(val) {
  toggleDivVehicleTypes(val);
}

/* -----------------------------------------------------------------------------
Toggle visibility of advanced vehicle type options on step 3 of form
------------------------------------------------------------------------------*/
function toggleDivVehicleTypes(val) {
  if (val == 1) {
    divVehicleTypes.style.display = "block";
  }
  else {
    divVehicleTypes.style.display = "none";
  }
}


/*
  console.log("chosen character: " + selectedCharId);
  console.log("optimizing var: " + selectedOptVar);
  console.log("restrictVehicles: " + restrictVehicles);
  console.log("vehicle type: " + vehicleType);

  //Speed calculations----------------------------------------------------------
  console.log("Calculations-------------------------");
  let charSpeed = getCharacterSpeed(selectedCharId);
  console.log("Character speed: " + charSpeed);
  let vehicles = getTopSpeedVehicles();
  console.log(vehicles);
  let tires = getTopSpeedTires();
  console.log(tires);
  let gliders = getTopSpeedGliders();
  console.log(gliders);
  let vehicleSpeed = parseFloat(vehicles[0].speed);
  let tireSpeed = parseFloat(tires[0].speed);
  let gliderSpeed = parseFloat(gliders[0].speed);
  let maxSpeed = charSpeed + vehicleSpeed + tireSpeed + gliderSpeed;
  console.log("Base Speed: " + charSpeed);
  console.log("Max Speed: " + maxSpeed);
  console.log("vehicleSpeed = " + vehicleSpeed);
  console.log("tireSpeed = " + tireSpeed);
  console.log("gliderSpeed = " + gliderSpeed);

  //Restricted Vehicles Speed
  // console.log("Restricted Kart Calculations -------------");
  // charSpeed = getCharacterSpeed(selectedCharId);
  // console.log("Character speed: " + charSpeed);
  // altVehicles = getTopSpeedKarts();
  // console.log(altVehicles);
  // tires = getTopSpeedTires();
  // console.log(tires);
  // gliders = getTopSpeedGliders();
  // console.log(gliders);
  // altVehicleSpeed = parseFloat(altVehicles[0].speed);
  // tireSpeed = parseFloat(tires[0].speed);
  // gliderSpeed = parseFloat(gliders[0].speed);
  // maxSpeed = charSpeed + altVehicleSpeed + tireSpeed + gliderSpeed;
  // console.log("Base Speed: " + charSpeed);
  // console.log("Max Speed: " + maxSpeed);
  // console.log("kartSpeed = " + altVehicleSpeed);
  // console.log("tireSpeed = " + tireSpeed);
  // console.log("gliderSpeed = " + gliderSpeed);

  // console.log("Restricted Bike Calculations -------------");
  // charSpeed = getCharacterSpeed(selectedCharId);
  // console.log("Character speed: " + charSpeed);
  // altVehicles = getTopSpeedBikes();
  // console.log(altVehicles);
  // tires = getTopSpeedTires();
  // console.log(tires);
  // gliders = getTopSpeedGliders();
  // console.log(gliders);
  // altVehicleSpeed = parseFloat(altVehicles[0].speed);
  // tireSpeed = parseFloat(tires[0].speed);
  // gliderSpeed = parseFloat(gliders[0].speed);
  // maxSpeed = charSpeed + altVehicleSpeed + tireSpeed + gliderSpeed;
  // console.log("Base Speed: " + charSpeed);
  // console.log("Max Speed: " + maxSpeed);
  // console.log("bikeSpeed = " + altVehicleSpeed);
  // console.log("tireSpeed = " + tireSpeed);
  // console.log("gliderSpeed = " + gliderSpeed);

  console.log("Restricted ATV Calculations -------------");
  charSpeed = getCharacterSpeed(selectedCharId);
  console.log("Character speed: " + charSpeed);
  altVehicles = getTopSpeedATVs();
  console.log(altVehicles);
  tires = getTopSpeedTires();
  console.log(tires);
  gliders = getTopSpeedGliders();
  console.log(gliders);
  altVehicleSpeed = parseFloat(altVehicles[0].speed);
  tireSpeed = parseFloat(tires[0].speed);
  gliderSpeed = parseFloat(gliders[0].speed);
  maxSpeed = charSpeed + altVehicleSpeed + tireSpeed + gliderSpeed;
  console.log("Base Speed: " + charSpeed);
  console.log("Max Speed: " + maxSpeed);
  console.log("bikeSpeed = " + altVehicleSpeed);
  console.log("tireSpeed = " + tireSpeed);
  console.log("gliderSpeed = " + gliderSpeed);

  //Acceleration calculations----------------------------------------------------------
  console.log("Calculations-------------------------");
  charAccel = getCharacterAccel(selectedCharId);
  console.log("Character accel: " + charAccel);
  vehicles = getTopAccelVehicles();
  console.log(vehicles);
  tires = getTopAccelTires();
  console.log(tires);
  gliders = getTopAccelGliders();
  console.log(gliders);
  vehicleAccel = parseFloat(vehicles[0].accel);
  tireAccel = parseFloat(tires[0].accel);
  gliderAccel = parseFloat(gliders[0].accel);
  maxAccel = charAccel + vehicleAccel + tireAccel + gliderAccel;
  console.log("Base Accel: " + charAccel);
  console.log("Max Accel: " + maxAccel);
  console.log("vehicleAccel = " + vehicleAccel);
  console.log("tireAccel = " + tireAccel);
  console.log("gliderAccel = " + gliderAccel);
*/

// Write your helper functions here!
require('isomorphic-fetch');


function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML =
        `<h2>Mission Destination</h2>
    <ol>
        <li>Name: ${name}</li>
        <li>Diameter: ${diameter}</li>
        <li>Star: ${star}</li>
        <li>Distance from Earth: ${distance}</li>
        <li>Number of Moons: ${moons}</li>
    </ol>
    <img src="${imageUrl}">
    `;
}


function validateInput(testInput) {
    const testNum = Number(testInput);
    if (testInput === "") {
        return "Empty";
    } else if (!isNaN(testNum)) {
        return "Is a Number";
    } else if (isNaN(testNum)) {
        return "Not a Number";
   }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const pilotStatus = document.getElementById("pilotStatus");
    const copilotStatus = document.getElementById("copilotStatus");
    const fuelStatus = document.getElementById("fuelStatus");
    const cargoStatus = document.getElementById("cargoStatus");
    const launchStatus = document.getElementById("launchStatus");

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields must be filled");
    } else if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Input for pilot/co-pilot can't be a number");
    } else if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Input for fuel/cargo must be a number");
    } else {
        list.style.visibility = "visible";
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

        if (fuelLevel < 10000 && cargoLevel <= 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
          } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
            list.style.visibility = "visible";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            launchStatus.style.color = "#C7254E";
          } else if (fuelLevel < 10000 && cargoLevel > 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.style.color = "rgb(199, 37, 78)";
          } else {
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.style.color = "rgb(65, 159, 106)";
            launchStatus.innerHTML = "Shuttle is Ready for Launch";
          }
        }
    }


async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
        return response.json();
        });

    return planetsReturned;
}

function pickPlanet(planets) {
    let randPlanet = Math.floor(Math.random() * planets.length);
    return planets[randPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;

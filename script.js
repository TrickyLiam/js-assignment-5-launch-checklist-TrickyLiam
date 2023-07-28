// Write your JavaScript code here!

//import { myFetch } from "./scriptHelper";

window.addEventListener("load", function() {

    const launchForm = document.querySelector("form");
    const htmlList = document.getElementById("faultyItems");
    htmlList.style.visibility = "hidden";

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
    listedPlanetsResponse.then(function (result) {
        listedPlanets = result;
        //console.log(listedPlanets);
    }).then(function () {
        //console.log(listedPlanets);
        // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let newPlanet = pickPlanet(listedPlanets);
        addDestinationInfo(document, newPlanet.name, newPlanet.diameter, newPlanet.star, newPlanet.distance, newPlanet.moons, newPlanet.image);
    });

    launchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const pilotName = document.querySelector("input[name=pilotName]").value;
        const copilotName = document.querySelector("input[name=copilotName]").value;
        const fuelLevel = document.querySelector("input[name=fuelLevel]").value;
        const cargoMass = document.querySelector("input[name=cargoMass]").value;
        formSubmission(document,htmlList,pilotName,copilotName,fuelLevel,cargoMass);
    });  
    
});
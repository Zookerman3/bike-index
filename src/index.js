import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SearchBikes from './search-bikes';


function getLocation(city) {
  SearchBikes.getLocation(city)
    .then(function (response) {
      if (response.bikes) {
        printElements(response, city);
      } else {
        printError(response);
      }
    });
}


function printElements(response) {
  let unixTimestamp = response.bikes[0].date_stolen;
  
  let date = new Date(unixTimestamp * 1000);
  let dateStolen = date.toLocaleDateString("en-US");
  let serialNum = response.bikes[0].serial;
  let today = new Date();
  let unixDate = Math.floor(new Date(today).getTime() / 1000);
  
  // let ul = document.getElementById("show-response");
  for (let x = 0; x < response.bikes.length; x++) {
    const bikeContainer = document.getElementById("bike-response");
    let bikeResponse = document.createElement("div");
    bikeResponse.setAttribute("class", "bikes");
    let pDescription = document.createElement('p');
    let pColor = document.createElement('p');
    let pDate = document.createElement('p');
    let pSerialNumber = document.createElement('p');
    let pbikeImage = document.createElement("img");

    let description = response.bikes[x].description;
    let bikeImageURL = response.bikes[x].thumb;
    response.bikes.forEach(element => {
      if (element.date_stolen > (unixDate - 604800000)) {
        pColor.innerText = "Color: " + response.bikes[x].frame_colors;
        pDate.innerText = "Date Stolen: " + dateStolen;
        pSerialNumber.innerText = "Serial Number: " + serialNum;
        pbikeImage.src = bikeImageURL;
        if (description === null) {
          description = "There is no decription for this bike.";
          pDescription.innerText = description;
        } else { pDescription.innerText = "Description: " + description; }

        bikeContainer.append(bikeResponse);
        bikeResponse.append(pDescription);
        bikeResponse.append(pColor);
        bikeResponse.append(pDate);
        bikeResponse.append(pSerialNumber);
        bikeResponse.append(pbikeImage);
      }
    });
  }
}

function printError(error, city) {
  document.querySelector('#showResponse').innerText = `There was an error accessing the weather data for ${city}: 
  ${error}.`;
}

function handleFormSubmission(event) {
  document.getElementById("show-response").innerHTML = "";
  event.preventDefault();
  let city = document.querySelector('#location').value;
  if (city === "") {
    alert("Flipping add a freaking city.");
  } else {
    getLocation(city);
  }
  document.querySelector('#location').value = null;
}

window.addEventListener("load", function () {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});
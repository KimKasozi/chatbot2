const getLocationButton = document.getElementById("getLocationButton");
const coordinatesElement = document.getElementById("coordinates");

getLocationButton.addEventListener("click", getLocation);

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    coordinatesElement.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Display the coordinates on the page
  coordinatesElement.innerHTML = `Latitude: ${latitude}, Longitude: ${longitude}`;

  // Make an HTTP POST request to your server.js file
  const url = "http://localhost:3000/location";
  const data = { latitude, longitude };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        console.log("Coordinates sent to server.js successfully.");
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      coordinatesElement.innerHTML = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      coordinatesElement.innerHTML = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      coordinatesElement.innerHTML = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
      coordinatesElement.innerHTML = "An unknown error occurred.";
      break;
  }
}

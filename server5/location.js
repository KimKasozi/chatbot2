// const x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }
  
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Make an HTTP POST request to your Node.js server
    const url = 'http://localhost:3000/location';
    const data = { latitude, longitude };
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      if (response.ok) {
        console.log('Latitude and longitude sent to the server successfully.');
      } else {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
  
  
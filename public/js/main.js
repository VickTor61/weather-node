

const form = document.querySelector("form");
let inputData = document.querySelector("input");


//texts paragraphs

const msg1 = document.getElementById("message-1");
const msg2 = document.getElementById("message-2")


const apiCall = (address) => {

    msg1.textContent = "Loading...";
    msg2.textContent = ""

    fetch(`http://localhost:3000/weather?search=${address}`).then((response) => {
  response.json().then((data) => {
    if (data.error) {
      msg1.textContent = data.error
    } else {
      msg1.textContent = data.Location;
      msg2.textContent = data.Data
    }
  });
});
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userLocation = inputData.value;

    apiCall(userLocation);
    
})
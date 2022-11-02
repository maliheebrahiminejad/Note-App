const vehicles = ["mustang", "f-150", "expedition"];

// old way
const car = vehicles[0];
const truck = vehicles[1];
const suv = vehicles[2];

// Here is the new way of assigning array items to a variable:
// With destructuring:
const vehicles2 = ["mustang", "f-150", "expedition"];

const [car2, truck2, suv3] = vehicles2;
// If we only want the car and suv we can simply leave out the truck but keep the comma:
const vehicles3 = ['mustang', 'f-150', 'expedition'];

const [car3,, suv3] = vehicles3

// object
const vehicleOne = {
  brand: "Ford",
  model: "Mustang",
  type: "car",
  year: 2021,
  color: "red",
};

myVehicle(vehicleOne);

// old way
function myVehicle(vehicle) {
  const message =
    "My " +
    vehicle.type +
    " is a " +
    vehicle.color +
    " " +
    vehicle.brand +
    " " +
    vehicle.model +
    ".";
}
//   Here is the new way of using an object inside a function:
// With destructuring:
const vehicleOne2 = {
  brand: "Ford",
  model: "Mustang",
  type: "car",
  year: 2021,
  color: "red",
};

myVehicle(vehicleOne);

function myVehicle({ type, color, brand, model }) {
  const message =
    "My " + type + " is a " + color + " " + brand + " " + model + ".";
}

// We can even destructure deeply nested objects by referencing the nested object then using a colon and 
// curly braces to again destructure the items needed from the nested object:
const vehicleOne3 = {
  brand: "Ford",
  model: "Mustang",
  type: "car",
  year: 2021,
  color: "red",
  registration: {
    city: "Houston",
    state: "Texas",
    country: "USA",
  },
};

myVehicle(vehicleOne);

function myVehicle({ model, registration: { state } }) {
  const message = "My " + model + " is registered in " + state + ".";
}

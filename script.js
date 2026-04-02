function filterCars(cars, price, fuel, type) {
  return cars.filter(car => {
    return (
     (price !== null ? car.priceRange === price : true) &&
(fuel !== null ? car.fuelType === fuel : true) &&
(type !== null ? car.carType === type : true)
    );
  });
}

let selected = {
  price: null,
  fuel: null,
  type: null,
};

function selectOption(category, value) {
  if (["price", "fuel", "type"].includes(category)) {
    selected[category] = value;
  }
}

async function getRecommendation() {
  try {
    const res = await fetch('car.json');
    if (!res.ok) throw new Error("Failed to fetch data");

    const cars = await res.json();

    const results = filterCars(cars, selected.price, selected.fuel, selected.type);

    if (results.length === 0) {
      document.getElementById("result").innerText = "No cars found.";
      return;
    }

    const randomCar = results[Math.floor(Math.random() * results.length)];

    document.getElementById("result").innerText =
      `We recommend: ${randomCar.model}`;
  } catch (err) {
    console.error(err);
    document.getElementById("result").innerText = "Error loading recommendations.";
  }
}
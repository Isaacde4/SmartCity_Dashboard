const cityData = {
    accra: {
        airQuality: 82,
        greenSpace: 28,
        populationGrowth: 3.1,
        trafficLevel: "High"
    },
    kumasi: {
        airQuality: 75,
        greenSpace: 34,
        populationGrowth: 2.8,
        trafficLevel: "Medium"
    },
    stuttgart: {
        airQuality: 42,
        greenSpace: 45,
        populationGrowth: 1.2,
        trafficLevel: "Low"
    }
};

function animateValue(element, start, end, unit = "") {
    let current = start;
    const step = (end - start) / 40;

    const interval = setInterval(() => {
        current += step;
        if ((step > 0 && current >= end) || (step < 0 && current <= end)) {
            element.textContent = end + unit;
            clearInterval(interval);
        } else {
            element.textContent = Math.round(current) + unit;
        }
    }, 20);
}

function setStatusColor(element, value, type) {
    element.classList.remove("good", "medium", "bad");

    if (type === "aqi") {
        if (value <= 50) element.classList.add("good");
        else if (value <= 100) element.classList.add("medium");
        else element.classList.add("bad");
    }

    if (type === "green") {
        if (value >= 40) element.classList.add("good");
        else if (value >= 25) element.classList.add("medium");
        else element.classList.add("bad");
    }
}

function updateDashboard(city) {
    const data = cityData[city];

    const aqi = document.getElementById("airQuality");
    const green = document.getElementById("greenSpace");
    const growth = document.getElementById("populationGrowth");
    const traffic = document.getElementById("trafficLevel");

    animateValue(aqi, 0, data.airQuality);
    animateValue(green, 0, data.greenSpace, "%");
    animateValue(growth, 0, data.populationGrowth, "%");

    traffic.textContent = data.trafficLevel;

    setStatusColor(aqi, data.airQuality, "aqi");
    setStatusColor(green, data.greenSpace, "green");
}

window.onload = () => {
    const select = document.getElementById("citySelect");
    updateDashboard(select.value);

    select.addEventListener("change", () => {
        updateDashboard(select.value);
    });
};

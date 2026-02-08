window.onload = () => {
    const data = {
        airQuality: 72,        // AQI
        greenSpace: 34,        // %
        populationGrowth: 2.6, // %
        trafficLevel: "High"
    };

    document.getElementById("airQuality").textContent = data.airQuality;
    document.getElementById("greenSpace").textContent = data.greenSpace + "%";
    document.getElementById("populationGrowth").textContent = data.populationGrowth + "%";
    document.getElementById("trafficLevel").textContent = data.trafficLevel;
};

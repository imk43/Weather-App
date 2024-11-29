const API_KEY = "10f304d89eb83f0ca48b4544a847803b";

async function getWeather() {
    const city = document.getElementById("city").value;
    const output = document.getElementById("output");
    
    if (!city) {
        output.innerHTML = "Please enter a city!";
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`);

        const data = await response.json();

        if (data.cod === "404") {
            output.innerHTML = "City not found!";
        } else {
            const { temp } = data.main;
            const { description, icon } = data.weather[0];
            output.innerHTML = `
                <h3>${data.name}</h3>
                <p>${temp}°C - ${description}</p>
                <img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather icon" />
            `;
        }
    } catch (error) {
        output.innerHTML = "Error fetching data!";
        console.error(error);
    }
}

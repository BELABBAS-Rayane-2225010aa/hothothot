class TemperatureTracker {
    constructor() {
        this.temperatures = [];
        this.interval = null;
        this.currentIndex = 0;
        this.tabView = document.getElementById('tab');
        this.messageView = document.getElementById("msg");
    }

    generateRandomTemperatures() {
        for (let i = 0; i < 200; i++) {
            this.temperatures.push(Math.floor(Math.random() * (40 - (-10)) + (-10)));
        }
    }

    startInterval() {
        this.interval = setInterval(() => {
            this.displayTemperature();
        }, 2000);
    }

    stopInterval() {
        clearInterval(this.interval);
    }

    displayTemperature() {
        if (this.currentIndex >= this.temperatures.length) {
            this.stopInterval();
        } else {
            const temperature = this.temperatures[this.currentIndex];
            this.displayMessage(temperature);
            this.displayTemperatureValue(temperature);

        }
    }

    displayMessage(temperature) {
        if (temperature < 0) {
            this.tabView.className = "bleu";
            this.messageView.innerHTML = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
        } else if (temperature < 20) {
            this.tabView.className = "vert";
            this.messageView.innerHTML = "";
        } else if (temperature < 30) {
            this.tabView.className = "orange";
            this.messageView.innerHTML = "";
        } else {
            this.tabView.className = "rouge";
            this.messageView.innerHTML = "Caliente ! Vamos a la playa, ho hoho hoho !!";
        }
    }

    displayTemperatureValue(temperature) {
        this.tabView.innerHTML = temperature + "<abbr title='Celsius'> °C</abbr>";
    }

}

const temperatureTracker = new TemperatureTracker();
temperatureTracker.generateRandomTemperatures();
temperatureTracker.startInterval();

function switchOnglet(onglet) {
    const relevantSection = document.getElementById(onglet === 1 ? "1" : "histrique-tab");
    const otherSection = document.getElementById(onglet === 1 ? "histrique-tab" : "1");
    relevantSection.style.display = "block";
    otherSection.style.display = "none";
}
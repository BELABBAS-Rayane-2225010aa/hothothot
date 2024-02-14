class TemperatureTracker {
    constructor() {
        this.temperatures = [];
        this.interval = null;
        this.currentIndex = 0;
        this.lengthTab = [];
        this.tabView = document.getElementById('tab');
        this.messageView = document.getElementById("msg");
        this.chartView = document.getElementById("myChart");
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
            this.updateChart();
            this.currentIndex++;
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

    updateChart() {
        const template = document.querySelector("#histo-template");
        const section = document.querySelector("#histrique-tab");
        const clone = document.importNode(template.content, true);
        const td = clone.querySelectorAll("td");
        td[0].textContent = this.temperatures[this.currentIndex];
        td[0].className = this.tabView.className;
        section.appendChild(clone);

        if (this.currentIndex % 20 === 0 && this.currentIndex != 0) {
            const template2 = document.querySelector("#histo-line");
            const clone2 = document.importNode(template2.content, true);
            section.appendChild(clone2);
        }

        this.lengthTab.push(this.currentIndex + 1);
        const tabLabel = this.lengthTab.length > 20 ? this.lengthTab.slice(this.lengthTab.length - 20) : this.lengthTab;

        const myChart = new Chart(this.chartView, {
            type: "line",
            data: {
                labels: tabLabel,
                datasets: [{
                    backgroundColor: "rgba(0,0,255,0.0)",
                    borderColor: "rgba(0,0,255,0.5)",
                    data: this.temperatures.slice(tabLabel[0])
                }]
            },
            options: { legend: { display: false }, responsive: true, maintainAspectRatio: true }
        });
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
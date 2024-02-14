export class Historique {
    constructor() {
        this.temperature = [];
        this.timestamp = [];
        this.lengthTab = [0];
        this.currentIndex = 0;
        this.histo = document.getElementById("histo");
        this.chartView = document.getElementById("myChart");
        this.myChart = new Chart(this.chartView, {
            type: "line",
            data: {
                labels: this.lengthTab,
                datasets: [{
                    backgroundColor: "rgba(0,0,255,0.0)",
                    borderColor: "rgba(0,0,255,0.5)",
                    data: this.temperature
                }]
            },
            options: { legend: { display: false },animation: false, maintainAspectRatio: true}
        });
    }

    update(data) {
        this.temperature.push(data.Valeur);
        this.timestamp.push(data.Timestamp);
        this.displayTemperature();
        this.updateChart();
        this.currentIndex++;
    }

    displayTemperature() {
        let i = this.temperature.length - 1;
        let temperature = this.temperature[i];
        let timestamp = this.timestamp[i];
        let datetime = new Date(timestamp*1000);
        this.histo.innerHTML += "<br\>"+temperature+"°<abbr title='Celsius'>C</abbr> "+datetime.toLocaleString();
    }
    updateChart() {
        const tabLabel = this.lengthTab.length > 20 ? this.lengthTab.slice(-20) : this.lengthTab;
        const tabData = this.temperature.slice(-20).map((value, index) => value); // Map to last 20 values

        this.myChart.data.labels = tabLabel;
        this.myChart.data.datasets[0].data = tabData;
        this.myChart.update();
        this.lengthTab.push(this.currentIndex + 1);
    }

}
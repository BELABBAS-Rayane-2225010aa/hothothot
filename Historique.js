export class Historique {
    constructor() {
      this.temperature = [];
      this.timestamp = [];
      this.histo = document.getElementById("histo");
    }

    update(data) {
        this.temperature.push(data.Valeur);
        this.timestamp.push(data.Timestamp);
        this.displayTemperature();
    }

    displayTemperature() {
        let i = this.temperature.length - 1;
        let temperature = this.temperature[i];
        let timestamp = this.timestamp[i];
        let datetime = new Date(timestamp*1000);  
        console.log(timestamp);
        console.log(datetime);

        this.histo.innerHTML += "<br\>"+temperature+"°<abbr title='Celsius'>C</abbr> "+datetime.toLocaleString();
    }
}
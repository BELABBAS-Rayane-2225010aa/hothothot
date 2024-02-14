export class LiveTracker {
    constructor() {
        this.temperature = 0;
        this.timestamp = 0;
        this.notifcation = document.getElementById("msg");
        this.liveDisplay = document.getElementById("tab");
    }

    update(data) {
        this.temperature = data.Valeur;
        this.timestamp = data.Timestamp;
        /*if(data.Nom === "exterieur"){
            this.displayTempExt();
        } else {
            this.displayTempInt();
        }*/
        this.displayTempInt();
        //TODO : display Max et Min
    }

    displayTemperature() {
        if (this.temperature < 0) {
            this.liveDisplay.className = "blue";
            this.notifcation.innerHTML = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
        } else if (this.temperature < 20) {
            this.liveDisplay.className = "green";
            this.notifcation.innerHTML = "";
        } else if (this.temperature < 30) {
            this.liveDisplay.className = "orange";
            this.notifcation.innerHTML = "";
        } else {
            this.liveDisplay.className = "red";
            this.notifcation.innerHTML = "Caliente ! Vamos a la playa, ho hoho hoho !!";
        }
        this.liveDisplay.innerHTML = this.temperature + "<abbr title='Celsius'>°C</abbr>";
    }

    displayTempExt() {
        if (this.temperature > 35) {
            this.liveDisplay.className = "rouge";
            this.notifcation.innerHTML = "Alerte : Hot Hot Hot !";
        } else if (this.temperature < 0) {
            this.liveDisplay.className = "bleu";
            this.notifcation.innerHTML = "Alerte : Banquise en vue !";
        } else {
            this.liveDisplay.className = "neutre";
            this.notifcation.innerHTML = "Température extérieure normale.";
        }
        this.liveDisplay.innerHTML = this.temperature + "<abbr title='Celsius'>°C</abbr>";
    }

    displayTempInt() {
        if (this.temperature < 0) {
            this.liveDisplay.className = "blue";
            this.notifcation.innerHTML = "Canalisations gelées, appelez SOS plombier et mettez un bonnet !";
        } else if (this.temperature < 12) {
            this.liveDisplay.className = "green";
            this.notifcation.innerHTML = "Montez le chauffage ou mettez un gros pull !";
        } else if (this.temperature > 22) {
            this.liveDisplay.className = "orange";
            this.notifcation.innerHTML = "Baissez le chauffage !";
        } else if (this.temperature > 50) {
            this.liveDisplay.className = "red";
            this.notifcation.innerHTML = "Appelez les pompiers ou arrêtez votre barbecue !";
        }
        this.liveDisplay.innerHTML = this.temperature + "<abbr title='Celsius'>°C</abbr>";
    }
}
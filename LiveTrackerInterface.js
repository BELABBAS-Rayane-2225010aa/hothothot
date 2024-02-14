export class LiveTrackerInterface {
    constructor(notifcation, liveDisplay, liveMinMax) {
        this.temperature = 0;
        this.timestamp = 0;
        this.minTemperature=1000;
        this.maxTemperature=-1000;
        this.notifcation = notifcation;
        this.liveDisplay = liveDisplay;
        this.liveMinMax = liveMinMax;
    }

    /**
     * Met à jour la température et l'affichage
     * @param {*} data 
     */
    update(data) {};

    /**
     * Affiche la température récupérée par les capteurs
     * en fonction de la température, change la couleur de l'affichage
     * et affiche un message d'alerte
     */
    displayTemperature() {
        // Comportement par défaut si la méthode n'est pas surchargée
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
    };

    /**
     * Affiche la température minimale et maximale de la journée
     */
    dayTemperature(){
        this.liveMinMax.innerHTML= "Ajourd'hui: min: "+this.minTemperature+" max: "+this.maxTemperature;
    }

    /**
     * Met à jour les températures minimale et maximale
     * @param {*} temperature 
     */
    dayMinMax(temperature){
        if (temperature>this.maxTemperature){this.maxTemperature=temperature;}
        if (temperature<this.minTemperature){this.minTemperature=temperature;}
    }
}
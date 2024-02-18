export class LiveTracker {
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
    update(data) {
        this.temperature = data.Valeur;
        this.timestamp = data.Timestamp;
        this.displayTemperature();
        this.dayMinMax(this.temperature);
        this.dayTemperature();
    }

    /**
     * Affiche la température récupérée par les capteurs
     * en fonction de la température, change la couleur de l'affichage
     * et affiche un message d'alerte
     */
    displayTemperature() {
        this.liveDisplay.innerHTML = this.temperature;
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
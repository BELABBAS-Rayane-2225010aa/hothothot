import {LiveTrackerInterface} from "./LiveTrackerInterface.js";

export class LiveTrackerInt extends LiveTrackerInterface{
    constructor(notifcation, liveDisplay, liveMinMax) {
        super(notifcation, liveDisplay, liveMinMax);
    }

    /**
     * @inheritDoc
     */
    update(data) {
        this.temperature = data.Valeur;
        this.timestamp = data.Timestamp;
        this.displayTemperature();
        this.dayMinMax(this.temperature);
        this.dayTemperature();
    }

    /**
     * @inheritDoc
     */
    displayTemperature() {
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
        this.liveDisplay.innerHTML = this.temperature;
    }
}
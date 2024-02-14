import {LiveTrackerInterface} from "./LiveTrackerInterface.js";

export class LiveTrackerExt extends LiveTrackerInterface{
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
        if (this.temperature > 35) {
            this.liveDisplay.className = "red";
            this.notifcation.innerHTML = "Hot Hot Hot !";
        } else if (this.temperature < 0) {
            this.liveDisplay.className = "blue";
            this.notifcation.innerHTML = "Banquise en vue !";
        } else {
            this.liveDisplay.className = "green";
            this.notifcation.innerHTML = "Température extérieure normale.";
        }
        this.liveDisplay.innerHTML = this.temperature + "<abbr title='Celsius'>°C</abbr>";
    }

    
}
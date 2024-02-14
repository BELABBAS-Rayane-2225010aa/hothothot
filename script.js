import { Observable } from "./Observable.js";
import { LiveTracker } from "./LiveTracker.js";
import { Historique } from "./Historique.js";

let observer = new Observable();
let liveTemperatureTracker = new LiveTracker();
let histo = new Historique();

observer.subscribe(liveTemperatureTracker);
observer.subscribe(histo);

setInterval(() => {
    /*fetch("https://hothothot.dog/api/capteurs/exterieur",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST"
        })
        .then(function(response) {
            return response.json().then(function(response) {
                var data = response.capteurs[0];
                console.log(data);
                observer.notify(response.capteurs[0]);
            })
        })*/
    let data = {
        Valeur: Math.floor(Math.random() * (40 - (-10)) + (-10)),
        Timestamp: new Date().toISOString()
    };
    observer.notify(data);
    }, 2000);

const tabs = document.querySelectorAll('[role="tab"]');
const tabList = document.querySelector('[role="tablist"]');

tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabs);
});

function changeTabs(e) {
    const target = e.target;
    const parent = target.parentNode;
    const grandparent = parent.parentNode;

    // Remove all current selected tabs
    parent
        .querySelectorAll('[aria-selected="true"]')
        .forEach((t) => t.setAttribute("aria-selected", false));

    // Set this tab as selected
    target.setAttribute("aria-selected", true);

    // Hide all tab panels
    grandparent
        .querySelectorAll('[role="tabpanel"]')
        .forEach((p) => p.setAttribute("hidden", true));

    // Show the selected panel
    grandparent.parentNode
        .querySelector(`#${target.getAttribute("aria-controls")}`)
        .removeAttribute("hidden");
}
import { Observable } from "../Controllers/Observable.js";
import { LiveTrackerExt } from "../Controllers/LiveControllers/LiveTrackerExt.js";
import { LiveTrackerInt } from "../Controllers/LiveControllers/LiveTrackerInt.js";
import { ChartHistory } from "../Controllers/ChartHistory.js";

let tempSensorExt = new Observable();

const notificationExt = document.getElementById("msgExt");
const liveDisplayExt = document.getElementById("tabExt");
const liveMinMaxExt = document.getElementById("minMaxExt");
let liveTempTrackerExt = new LiveTrackerExt(notificationExt, liveDisplayExt, liveMinMaxExt);
const histoExt = document.getElementById("extHisto");
const chartViewExt = document.getElementById("extChart");
let tempHistoryExt = new ChartHistory(histoExt, chartViewExt);

tempSensorExt.subscribe(liveTempTrackerExt);
tempSensorExt.subscribe(tempHistoryExt);

let tempSensorInt = new Observable();

const notificationInt = document.getElementById("msgInt");
const liveDisplayInt = document.getElementById("tabInt");
const liveMinMaxInt = document.getElementById("minMaxInt");
let liveTempTrackerInt = new LiveTrackerInt(notificationInt, liveDisplayInt, liveMinMaxInt);
const histoInt = document.getElementById("intHisto");
const chartViewInt = document.getElementById("intChart");
let tempHistoryInt = new ChartHistory(histoInt, chartViewInt);

tempSensorInt.subscribe(liveTempTrackerInt);
tempSensorInt.subscribe(tempHistoryInt);

var socket = new WebSocket('wss://ws.hothothot.dog:9502');

socket.addEventListener("error", (event) => {
    console.log("WebSocket error: ", event);
});

socket.onopen = function(event) {
    console.log("Connexion établie");

    //Envoi d'un message au serveur (obligatoire)
    socket.send("coucou !");

    // au retour...
    socket.onmessage = function(event) {
        console.log("Message reçu : " + event);
        console.log(event.data); // renvoie : {"HotHotHot":"Api v1.0","capteurs":[{"type":"Thermique","Nom":"interieur","Valeur":"26.6","Timestamp":1708256846},{"type":"Thermique","Nom":"exterieur","Valeur":"15.9","Timestamp":1708256847}]}
        let data = JSON.parse(event.data);
        //tempSensorInt.notify(data.capteurs[0]);
        tempSensorExt.notify(data.capteurs[1]);
        console.log(JSON.parse(event.data)); // renvoie un objet comme data de l'api ajax avec les deux capteurs
        // console.log(JSON.parse(event)); marche pas
    }
};

setInterval(() => {
    // récupération des données de température extérieure
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
                data.Valeur = Math.floor(Math.random() * (40 - (-10)) + (-10));
                console.log(data);
                tempSensorExt.notify(response.capteurs[0]);
            })
        })*/
    // récupération des données de température intérieure
    fetch("https://hothothot.dog/api/capteurs/interieur",
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
                data.Valeur = Math.floor(Math.random() * (40 - (-10)) + (-10));
                //console.log("intérieur :",data);
                tempSensorInt.notify(response.capteurs[0]);
            })
        })
    }, 2000); // récupération tout les 2 secondes


// Mise en place des onglets
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
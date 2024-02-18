import { Observable } from "../Controllers/Observable.js";
import { LiveTracker } from "../Controllers/LiveControllers/LiveTracker.js";
import { ChartHistory } from "../Controllers/ChartHistory.js";

let tempSensorExt = new Observable();

const notificationExt = document.getElementById("msgExt");
const liveDisplayExt = document.getElementById("tabExt");
const liveMinMaxExt = document.getElementById("minMaxExt");
let liveTempTrackerExt = new LiveTracker(notificationExt, liveDisplayExt, liveMinMaxExt);
const histoExt = document.getElementById("extHisto");
const chartViewExt = document.getElementById("extChart");
let tempHistoryExt = new ChartHistory(histoExt, chartViewExt);
if(localStorage.getItem("dataChartExt") !== null && localStorage.getItem("dataHistoExt") !== null) {
    let chartData = JSON.parse(localStorage.getItem("dataChartExt"));
    let histoData = JSON.parse(localStorage.getItem("dataHistoExt"));
    tempHistoryExt.loadData(chartData, histoData);
    console.log("localStorage ChartExt initialisé");
} else {
    console.log("localStorage ChartExt vide");
}

tempSensorExt.subscribe(liveTempTrackerExt);
tempSensorExt.subscribe(tempHistoryExt);

let tempSensorInt = new Observable();

const notificationInt = document.getElementById("msgInt");
const liveDisplayInt = document.getElementById("tabInt");
const liveMinMaxInt = document.getElementById("minMaxInt");
let liveTempTrackerInt = new LiveTracker(notificationInt, liveDisplayInt, liveMinMaxInt);
const histoInt = document.getElementById("intHisto");
const chartViewInt = document.getElementById("intChart");
let tempHistoryInt = new ChartHistory(histoInt, chartViewInt);
if(localStorage.getItem("dataChartInt") !== null && localStorage.getItem("dataHistoInt") !== null) {
    let chartData = JSON.parse(localStorage.getItem("dataChartInt"));
    let histoData = JSON.parse(localStorage.getItem("dataHistoInt"));
    tempHistoryInt.loadData(chartData, histoData);
    console.log("localStorage ChartInt initialisé");
} else {
    console.log("localStorage ChartInt vide");
}

tempSensorInt.subscribe(liveTempTrackerInt);
tempSensorInt.subscribe(tempHistoryInt);

if(localStorage.getItem("data") !== null) {
    let data = JSON.parse(localStorage.getItem("data"));
    liveTempTrackerInt.update(data.capteurs[0]);
    liveTempTrackerExt.update(data.capteurs[1]);
    displayMsg()
    console.log("localStorage initialisé");
} else {
    console.log("localStorage vide");
}

let socket = new WebSocket('wss://ws.hothothot.dog:9502');

socket.onopen = function(event) {
    console.log("Connexion établie");

    //Envoi d'un message au serveur (obligatoire)
    socket.send("coucou !");

    // au retour...
    socket.onmessage = function(event) {
        console.log("Message reçu : " + event.data);
        localStorage.setItem("data", event.data);
        let data = JSON.parse(event.data);
        //var json = JSON.stringify(data);
        
        tempSensorInt.notify(data.capteurs[0]);
        tempSensorExt.notify(data.capteurs[1]);
        displayMsg()
    }
};

setInterval(() => {
    // récupération des données de température extérieure
    fetch("https://hothothot.dog/api/capteurs/exterieur",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST"
        })
        .then(function(response) {
            return response.json().then(function(response) {
                let storage = JSON.parse(localStorage.getItem("data"))
                if(storage == undefined){
                    localStorage.setItem("data", JSON.stringify(response));
                } else {
                    storage.capteurs[1] = response.capteurs[0];
                    localStorage.setItem("data", JSON.stringify(storage));
                }
                tempSensorExt.notify(response.capteurs[0]);
            })
        })
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
                let storage = JSON.parse(localStorage.getItem("data"))
                if(storage == undefined){
                    localStorage.setItem("data", JSON.stringify(response));
                } else {
                    storage.capteurs[0] = response.capteurs[0];
                    localStorage.setItem("data", JSON.stringify(storage));
                }
                tempSensorInt.notify(response.capteurs[0]);
            })
        })
    displayMsg()
    }, 5000); // récupération tout les 5 secondes

function displayMsg(){
    console.log("displayMsg");
    let TempExt = document.getElementById('tabExt').innerHTML;
    let TempInt = document.getElementById('tabInt').innerHTML;

    if(parseInt(TempExt) > 35) {
        document.getElementById('tabExt').className = "red";
        document.getElementById('msgExt').innerHTML = "alerte : Hot Hot Hot !";
    } else if(parseInt(TempExt) < 0) {
        document.getElementById('tabExt').className = "blue";
        document.getElementById('msgExt').innerHTML = "alerte : Banquise en vue !";
    } else {
        document.getElementById('tabExt').className = "green";
        document.getElementById('msgExt').innerHTML = "alerte : Température extérieure normale.";
    }
    if(parseInt(TempInt) > 50) {
        document.getElementById('tabInt').className = "red";
        document.getElementById('msgInt').innerHTML = "alerte : Appelez les pompiers ou arrêtez votre barbecue !";
    } else if(parseInt(TempInt) > 22) {
        document.getElementById('tabInt').className = "orange";
        document.getElementById('msgInt').innerHTML = "alerte : Baissez le chauffage !";
    } else if(parseInt(TempInt) < 12) {
        document.getElementById('tabInt').className = "green";
        document.getElementById('msgInt').innerHTML = "alerte : montez le chauffage ou mettez un gros pull !";
    } else if(parseInt(TempInt) < 0) {
        document.getElementById('tabInt').className = "blue";
        document.getElementById('msgInt').innerHTML = "alerte : canalisations gelées, appelez SOS plombier et mettez un bonnet !";
    } else {
        document.getElementById('tabInt').className = "green";
        document.getElementById('msgInt').innerHTML = "alerte : Température extérieure normale.";
    }
}

/*if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('sw.js').then(function(reg) {
        // enregistrement ok
        console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch(function(error) {
        // echec de l'enregistrement
        console.log('Registration failed with ' + error);
    });
}*/

let button = document.querySelector('#notifications');
button.addEventListener('click', function(e) {
    Notification.requestPermission().then(function(result) {
        if(result === 'granted') {
            notification();
        }
    });
});

// Système de notification
function notification() {
    let TempExt = document.getElementById('tabExt').innerHTML;
    let TempInt = document.getElementById('tabInt').innerHTML;
    let notifTitle = "";
    let notifBody = "";
    let notifImg = "";
    let options = {};
    let notif = {};
    if(parseInt(TempExt) > 35) {

        notifTitle = "alerte : Hot Hot Hot !";
        notifBody = 'Température extérieur : ' + TempExt + '.';
        notifImg = '/www/hothothot/assets/images/android-chrome-192x192.png';
        options = {
            body: notifBody,
            icon: notifImg
        }
        notif = new Notification(notifTitle, options);
    }
    if(parseInt(TempExt) < 0) {

        notifTitle = "alerte : Banquise en vue !";
        notifBody = 'Température extérieur : ' + TempExt + '.';
        notifImg = '/www/hothothot/assets/images/android-chrome-192x192.png';
        options = {
            body: notifBody,
            icon: notifImg
        }
        notif = new Notification(notifTitle, options);
    }
    if(parseInt(TempInt) > 50) {

        notifTitle = "alerte : Appelez les pompiers ou arrêtez votre barbecue !";
        notifBody = 'Température intérieur : ' + TempInt + '.';
        notifImg = '/www/hothothot/assets/images/android-chrome-192x192.png';
        options = {
            body: notifBody,
            icon: notifImg
        }
        notif = new Notification(notifTitle, options);
    }
    if(parseInt(TempInt) > 22) {

        notifTitle = "alerte : Baissez le chauffage !";
        notifBody = 'Température intérieur : ' + TempInt + '.';
        notifImg = '/www/hothothot/assets/images/android-chrome-192x192.png';
        options = {
            body: notifBody,
            icon: notifImg
        }
        notif = new Notification(notifTitle, options);
    }
    if(parseInt(TempInt) < 12) {

        notifTitle = "alerte : montez le chauffage ou mettez un gros pull !";
        notifBody = 'Température intérieur : ' + TempInt + '.';
        notifImg = '/www/hothothot/assets/images/android-chrome-192x192.png';
        options = {
            body: notifBody,
            icon: notifImg
        }
        notif = new Notification(notifTitle, options);
    }
    if(parseInt(TempInt) < 0) {

        notifTitle = "alerte : canalisations gelées, appelez SOS plombier et mettez un bonnet !";
        notifBody = 'Température intérieur : ' + TempInt + '.';
        notifImg = '/www/hothothot/assets/images/android-chrome-192x192.png';
        options = {
            body: notifBody,
            icon: notifImg
        }
        notif = new Notification(notifTitle, options);
    }
    setTimeout(notification, 20000);
}

// Mise en place de l'installation de l'application
let deferredPrompt;
const addBtn = document.querySelector('.add-button');
addBtn.style.display = 'none';

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;

    console.log('beforeinstallprompt event triggered');

    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';


    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();

        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});

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
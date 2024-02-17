/**
 * Fichier de service worker
 * A laisser à la racine du projet
*/

var CACHE = 'hothothot';

// On installe le service worker
self.addEventListener('install', function(evt) {  
  evt.waitUntil(caches.open(CACHE).then(function (cache) {  
            cache.addAll([
                // Ajout des fichiers à mettre en cache
                //TODO : verifier quels fichiers sont à mettre en cache
                "/index.html",
                "/sw.js",
      ]);  
  }));  
});

// On fetch, use cache but update the entry with the latest contents  
// from the server.  
self.addEventListener('fetch', function(evt) {  
    console.log('The service worker is serving the asset.');  
    // You can use `respondWith()` to answer ASAP...  
    evt.respondWith(fromCache(evt.request));  
    // ...and `waitUntil()` to prevent the worker to be killed until  
    // the cache is updated.
    evt.waitUntil(  
        update(evt.request)  
            // Finally, send a message to the client to inform it about the  
            // resource is up to date.
            .then(refresh)  
    );  
});  

// Open the cache where the assets were stored and search for the requested  
// resource. Notice that in case of no matching, the promise still resolves  
// but it does with `undefined` as value.  
function fromCache(request) {  
    console.log('match cache request');  
    return caches.open(CACHE).then(function (cache) {  
        return cache.match(request);  
    });  
}  


// Update consists in opening the cache, performing a network request and  
// storing the new response data.  
function update(request) {  
    console.log('update cache');  
    return caches.open(CACHE).then(function (cache) {  
        return fetch(request).then(function (response) {  
            return cache.put(request, response.clone()).then(function () {  
                return response;  
            });  
        });  
    });  
}  

// Sends a message to the clients.  
function refresh(response) {  

    return self.clients.matchAll().then(function (clients) {  
        clients.forEach(function (client) {  
        // Encode which resource has been updated. By including the  
        // [ETag](https://en.wikipedia.org/wiki/HTTP_ETag) the client can 
        // check if the content has changed. 
        
                var message = {  
                type: 'refresh',  
                url: response.url,  
                // Notice not all servers return the ETag header. If this is not  
                // provided you should use other cache headers or rely on your own 
                // means to check if the content has changed.
                eTag: response.headers.get('ETag')  
            };  
            // Tell the client about the update.  
            client.postMessage(JSON.stringify(message));  
        });  
    });  
}


// Système de notification
function randomNotification() {  
    var randomNumber = getRandomInt(5);  
	  console.log(randomNumber);  
	 if(randomNumber >= 2) {  
	  
		 var notifTitle = "Chaud, non ?";  
		 var notifBody = 'Température : ' + randomNumber + '.';  
		 var notifImg = '/assets/images/android-chrome-192x192.png';  
		 var options = {  
            body: notifBody,  
            icon: notifImg  
        } 
        var notif = new Notification(notifTitle, options);   
    }  
    setTimeout(randomNotification, 30000);  
}

//TODO : ajouter dans la page de demande de notification
/**
	var button = document.getElementById("notifications");  
	button.addEventListener('click', function(e) {  
	    Notification.requestPermission().then(function(result) {  
	        if(result === 'granted') {  
	            randomNotification();  
	  }  
	    });  
	});
 */

//On génére un nombre aléatoire pour la démo  
function getRandomInt(max) {  
    return Math.floor(Math.random() * Math.floor(max));
}

//partie javascript pour l'ajout à l'écran d'accueil
let deferredPrompt;  
const addBtn = document.querySelector('.add-button');  
addBtn.style.display = 'none';  

window.addEventListener('beforeinstallprompt', (e) => {  
    // Prevent Chrome 67 and earlier from automatically showing the prompt  
      e.preventDefault();  
      // Stash the event so it can be triggered later.  
      deferredPrompt = e;  
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

//TODO : ajouter dans la page de demande d'ajout à l'écran d'accueil
//<button class="add-button">Ajouter</button>
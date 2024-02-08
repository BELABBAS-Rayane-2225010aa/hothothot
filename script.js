let tab = [];
for (let i=0; i<20;++i){
    tab.push(Math.floor(Math.random() * ((40) - (-10)) + (-10)));
}
console.log(tab);

let histo = document.getElementById("histo");
let p = document.getElementById("temp");
let commentaire = document.getElementById("advertTemp");

let i = 0;
let intervalId = setInterval(getTempExt,5000);

function printNumber(){
    if(i>=tab.length){
        clearInterval(intervalId);
    }
    else{
        p.innerHTML = tab[i]+"°<abbr title='Celsius'>C</abbr>";
        p.classList = "";
        if(tab[i] <= 0 ){
            //commentaire.classList.remove('hidden');
            commentaire.innerHTML = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
            p.classList.add("blue");
        } else if (tab[i] <= 20){
            //commentaire.classList.add('hidden');
            commentaire.innerHTML = "";
            p.classList.add("green");
        } else if (tab[i] <= 30){
            //commentaire.classList.add('hidden');
            commentaire.innerHTML = "";
            p.classList.add("orange");
        } else if (tab[i] <= 40){
            //commentaire.classList.remove('hidden');
            commentaire.innerHTML = "Caliente ! Vamos a la playa, ho hoho hoho !!";
            p.classList.add("red");
        }
        histo.innerHTML += "<br\>"+tab[i]+"°<abbr title='Celsius'>C</abbr>";
        ++i;
    }
}

function showTemp(){
    commentaire.classList.remove('hidden')
    p.style.display = "block";
    histo.classList.add('hidden');
}

function showHisto(){
    commentaire.classList.add('hidden')
    p.style.display = "none";
    histo.classList.remove('hidden');
}

function getTempExt(){
    fetch("https://hothothot.dog/api/capteurs/exterieur",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST"
	})
	.then(function(response) {
		//S'il s'agit de JSON nous pouvons l'exploiter à l'aide de json()
		return response.json().then(function(O_json) {
            console.log(O_json.capteurs[0]);  
			console.log(O_json.capteurs[0].Valeur);
            console.log(O_json.capteurs[0].Timestamp);
            let temperature = O_json.capteurs[0].Valeur;
            let timestamp = O_json.capteurs[0].Timestamp;
            var datetime = new Date(timestamp*1000);  

            p.innerHTML = temperature+"°<abbr title='Celsius'>C</abbr>";
            p.classList = "";
            if(temperature <= 0 ){
                //commentaire.classList.remove('hidden');
                commentaire.innerHTML = "Brrrrrrr, un peu froid ce matin, mets ta cagoule !";
                p.classList.add("blue");
            } else if (temperature <= 20){
                //commentaire.classList.add('hidden');
                commentaire.innerHTML = "";
                p.classList.add("green");
            } else if (temperature <= 30){
                //commentaire.classList.add('hidden');
                commentaire.innerHTML = "";
                p.classList.add("orange");
            } else if (temperature <= 40){
                //commentaire.classList.remove('hidden');
                commentaire.innerHTML = "Caliente ! Vamos a la playa, ho hoho hoho !!";
                p.classList.add("red");
            }
            histo.innerHTML += "<br\>"+temperature+"°<abbr title='Celsius'>C</abbr> "+datetime.toLocaleString();
            ++i;
		});
	})
}

let template = document.getElementById('myTemplate');
let templateContent = document.importNode(template.content, true);
document.body.appendChild(templateContent);


let comm = document.createElement('p');
comm.setAttribute('slot', 'commentaire');
comm.textContent = 'Mon commentaire';

let data = document.createElement('p');
data.setAttribute('slot', 'data');
data.textContent = 'Ma data';

let historique = document.createElement('p');
historique.setAttribute('slot', 'historique');
historique.textContent = 'Mon historique';

templateContent.appendChild(comm);
templateContent.appendChild(data);
templateContent.appendChild(historique);

document.body.appendChild(templateContent);
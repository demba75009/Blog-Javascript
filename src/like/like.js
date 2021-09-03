//on importe les bibliothéques

import "./like.css";
import { like,openModal } from "../modal";
//on récupére un reférence au DOM HTML

const div1 = document.querySelector(".ListeUser");
const back = document.querySelector(".fleche");
// const title = document.querySelector(".title")

// title.addEventListener("click",(e)=>{

// e.stopPropagation()
// location.assign("index.html")


// })
//on crée la fonction Display qui va nous permettre de récupérer la liste des Posts liker via une requete(Promise)

const Display = async () => {
  const Promess = await fetch("https://restapi.fr/api/Like");
    //on converti la liste au fromat Json pour qu'elle soit lisible en JS

  const Like = await Promess.json();

  try {
        //on crée une fonction qui va itérer toute les Posts récupérer..

    const LikeList = Like.map((Like, I) => {
            //on instancie la fonction qui va mettre en place les Posts

      return CreateLike(Like, I);
    });
    // on initialiser la div1 puis on lui injecte la liste des Posts

    if(Like.length > 0)
    div1.innerHTML = "";

    else
    div1.innerHTML=`<h2 class = "text-danger text-center"> Aucun Post Liker</h2>`
    
    div1.append(...LikeList);
  } catch (e) {
    console.log(e);
  }
};

//cette fonction va disliker les postes
const Dislike2 = (Like) => {


  const DisLike1 = fetch(`https://restapi.fr/api/Like`, {
    method: "DELETE",
  });
  
  DisLike1.then((res) => {
    console.log(res);
    like("Article Disliké ! :(");
    Display();
  }).catch((err) => console.log(err));
  
};

//On crée la fonction qui va mettre en place la listes des postes liker

const CreateLike = (Like, I) => {
  const section = document.createElement("section");

  section.classList.add("post", "text-center");
  const Dislike = document.createElement("button");

  Dislike.innerHTML = `<i class="fas fa-heart-broken"></i>`;
  Dislike.classList.add("btn-outline-danger","dislike")


  Dislike.addEventListener("click", (e) => {
    e.stopPropagation();
    
    Dislike2(Like);
  });

  section.innerHTML = `
  <hr></hr>

<img src = ${Like.photo} />


 <h1>${Like.nom}   ${Like.prenom}</h1>

 <h2>${Like.categorie}</h2>

 <p> ${Like.publication}</p>


`;

  section.append(Dislike);
  return section;
};

//on retourne a la page précédente

back.addEventListener("click", (e) => {
  e.stopPropagation();
  location.assign("index.html");
});

back.classList.add("btn-outline-warning", "back");

//on instancie la fonction d'affichage
Display();

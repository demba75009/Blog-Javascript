//on importe les bibliothéques

import "./form.css";
import * as axios from "axios";
//on récupére un reférence au DOM HTML

const form = document.querySelector("form");

const back = document.querySelector(".back");

//on crée une constante qui va récuperer l'url
let url;
//on crée un event listener qui va permettre de retourner a la page précedentes
back.addEventListener("click", (e) => {
  history.back(1);
});

//on crée un event listener qui va permettre de valider le form 
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //on recupere les données des inputs du form
  const PostData = new FormData(form);

  //on transforme ces inputs en un objet
  const Post = Object.fromEntries(PostData);
//on convertir cet objet aux fromat json
  const post = JSON.stringify(Post);

  //on crée un let pour pourvoir effectuer des promess en fonction de l'action ajouter ou modifier
  let Promess;

  if (url) {
    //on mofifie l'article
    Promess = fetch("https://restapi.fr/api/Post", {
      method: "PATCH",

      body: post,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    //on ajoute l'article
    Promess = fetch("https://restapi.fr/api/Post", {
      method: "POST",

      body: post,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  Promess.then((res) => console.log(res)).catch((err) => console.log(err));
//on retourn a index.html
  location.assign("index.html");
});

//on crée une fonction qui va récupere l'url et afficher le form avec les infos du post sélectionner
const EditForm = () => {
  url = new URL(location.href).searchParams.get("id");

  return DisplayEdit(url);
};

//on crée une fonction qui va recupere le post en question
const DisplayEdit = async (url) => {
  const Post = await fetch(`https://restapi.fr/api/Post/${url}`);

  try {
    const response = await Post.json();

    console.log(response);
//on return la foction fiilform
    return fillform(response);
  } catch (e) {
    console.log(e);
  }
};

// cette foction va récupere les inputs du post sélectionner
const fillform = (response) => {
  const nom = document.querySelector('input[name="nom"]');
  const prenom = document.querySelector('input[name="prenom"]');
  const photo = document.querySelector('input[name="photo"]');
  const categorie = document.querySelector('input[name="categorie"]');

  const publication = document.querySelector('textarea[name="publication"]');

  categorie.value = response.categorie || "";
  nom.value = response.nom || "";

  prenom.value = response.prenom || "";
  photo.value = response.photo || "";
  publication.value = response.publication || "";
};

//on instancie la fonction EditForm
EditForm();
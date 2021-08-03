//on importe les bibliothéques
import "./style.css";
import { like, openModal } from "./modal";

//on récupére un reférence au DOM HTML
const div = document.querySelector(".ListeUser");

const categorie = document.querySelector(".menu");

const ajouter = document.querySelector(".lien");

const Like = document.querySelector(".like");

/*
on crée un event listener sur la const Like pour  pouvoir naviguer au lien like.html
*/
Like.addEventListener("click", (e) => {
  location.assign("like.html");
});

/*
on ajoute une class au lien "ajouter" pour pouvoir la personnaliser puis on va naviguer sur "form.html"
*/
ajouter.classList.add("btn-outline-primary");

ajouter.addEventListener("click", (e) => {
  location.assign("form.html");
});

//on crée la fonction Display qui va nous permettre de récupérer la liste des Posts via une requete(Promise)

const Display = async () => {
  const Post = await fetch("https://restapi.fr/api/Post");
  //on utilise le try catch pour gérer la response et le cas d'erreur
  try {
    //on converti la liste au fromat Json pour qu'elle soit lisible en JS
    const response = await Post.json();

    console.log(response);
    //on crée une fonction qui va itérer toute les Posts récupérer..
    const Postnode = response.map((r, i) => {
      //on instancie la fonction qui va mettre en place les Posts
      return CreatePost(r, i);
    });
    /*
On crée une fonction qui va mettre en places de catégories.
elle va utiliser un accumulateur qui va classer les catégories et leur quantité 
*/
    const categories12 = response.reduce((acc, res) => {
      if (acc[res.categorie]) {
        acc[res.categorie]++;
      } else {
        acc[res.categorie] = 1;
      }
      return acc;
    }, {});

    /*une fois cela effectuer, on crée une constante qui va transformez le tout 
      en un tableau avec deux arguments,(nom,quantité)
    */
    const categoriesArr = Object.keys(categories12).map((category) => {
      return [category, categories12[category]];
    });
    //on instancie la fonction qui va mettre en place le Menu

    CreateMenu(categoriesArr);
    // on initialiser la div puis on lui injecte la liste des Posts
    div.innerHTML = "";

    div.append(...Postnode);
  } catch (e) {
    console.log(e);
  }
};

//On crée la fonction qui va mettre en place le menu
const CreateMenu = (categoriesArr) => {
  //on crée la catégorie qui prend tout les posts
  const Tout = document.createElement("li");

  Tout.innerHTML = "Tout";

  Tout.addEventListener("click", (e) => {
    Display();
  });

  //on crée un const qui va recuperer et iérer toute les catégorie récuperer
  const liElements = categoriesArr.map((categoryElem) => {
    const li = document.createElement("li");
    li.innerHTML = `         
  ${categoryElem[0]}  <strong>${categoryElem[1]}</strong> `;

    li.addEventListener("click", async (e) => {
      const Cat = await fetch(
        `https://restapi.fr/api/Post?categorie=${categoryElem[0]}`
      );

      try {
        const response = await Cat.json();

        console.log(response);

        const Postnode = response.map((r, i) => {
          return CreatePost(r, i);
        });

        div.innerHTML = "";

        div.append(...Postnode);
      } catch (e) {
        console.log(e);
      }
    });

    return li;
  });
  //on initialise et lui injecte la liste de toute les categories
  categorie.innerHTML = "";
  categorie.append(Tout, ...liElements);
};

//on crée une fonction qui va nous pemettre de mettre en place les Posts

const CreatePost = (response, i) => {
  const section = document.createElement("section");
  //on crée un bouton like
  const Like = document.createElement("button");

  Like.innerHTML = `<i class="far fa-heart"></i>`;
  //on lui ajoute des classes pour la mise en place
  Like.classList.add("btn-outline-primary");
  Like.classList.add("success");

  //on active un eventlistener pour que l utilisateur puisse liker
  section.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    //on instancie la fonction pour ajouter des likes
    AddLike(response, i);
    //on modifie les  classes
    Like.classList.remove("btn-outline-primary");

    Like.classList.add("bg-primary");
  });
  //on active un eventlistener pour que l utilisateur puisse liker

  Like.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    //on instancie la fonction pour ajouter des likes

    AddLike(response, i);
    //on modifie les  classes

    Like.classList.remove("btn-outline-primary");

    Like.classList.add("bg-primary");
  });

  //on active un eventlistener pour que l utilisateur puisse Disliker
  Like.addEventListener("click", (e) => {
    e.stopPropagation();
    //on modifie les  classes

    Like.classList.remove("bg-primary");

    Like.classList.add("btn-outline-primary");

    //on instancie la fonction pour Dislikes

    Dislike2(response);
  });

  //on crée un button qui va permettre de suprimer un Post
  const Supprimer = document.createElement("button");

  Supprimer.innerHTML = `<i class="fas fa-trash-alt"></i>`;

  Supprimer.classList.add("btn-outline-danger");
  Supprimer.classList.add("Supprimer");
  //on active un eventlistener pour que l utilisateur puisse supprimer un Post

  Supprimer.addEventListener("click", async (e) => {
    //on lui envoie un message pour confirmer sa demande
    const result = await openModal(
      "Etes vous sûr de vouloir supprimer votre Post ?"
    );

    e.stopPropagation();
    //si confirmation
    if (result === true) SupprimerPost(response);
  });
  //on crée un button qui va permettre de modifier un Post

  const Editer = document.createElement("button");

  Editer.innerHTML = `<i class="fas fa-pen"></i>`;
  Editer.classList.add("btn-outline-warning");
  Editer.classList.add("Editer");
  //on active un eventlistener pour que l utilisateur puisse modifier un Post

  Editer.addEventListener("click", (e) => {
    e.stopPropagation();
    //on le renvoie vers le form pour effecuter le modification
    location.assign(`form.html?id=${response._id}`);
  });
  //on effectue la mise en place des post
  section.innerHTML = `
<img src = ${response.photo} />
 <h1>${response.nom}   ${response.prenom}</h1>
 <h2>${response.categorie}</h2>
 <p> ${response.publication}</p>
`;

  //on injecte les buttons crée au dessus
  section.append(Like, Editer, Supprimer);

  return section;
};

//cette focntion va récuperer les Posts liker

const FetchLike = async () => {
  const likes = await fetch("https://restapi.fr/api/Like");

  const like = await likes.json();

  console.log(like);
};

//cette fonction va disliker un post
const Dislike2 = (Like) => {
  const DisLike1 = fetch(`https://restapi.fr/api/Like`, {
    method: "DELETE",
  });

  DisLike1.then((res) => {
    console.log(res);
    //on effectue une confirmation comme quoi le post est disliker
    like("Post Disliké ! :(");
    Display();
  }).catch((err) => console.log(err));
};
//cette fonction va ajouter un like au post
const AddLike = (response, i) => {
  const PostLike = JSON.stringify(response);

  const LikePost = fetch("https://restapi.fr/api/Like", {
    method: "POST",
    body: PostLike,
    headers: {
      "Content-Type": "application/json",
    },
  });

  LikePost.then((res) => {
    console.log(res);

    like("Post Liker ! :)");
  }).catch((err) => console.log(err));
};

//cette fonction va supprimer un post
const SupprimerPost = (response) => {
  const Supp = fetch(`https://restapi.fr/api/Post/${response._id}`, {
    method: "DELETE",
  });

  Supp.then((res) => {
    console.log(res);
    Display();
  }).catch((err) => console.log(err));
};

// on instancie les fonctions
Display();

FetchLike();

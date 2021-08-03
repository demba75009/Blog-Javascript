import "./like.css";
import { like } from "../modal";
const div = document.querySelector("div");
const back = document.querySelector("button");

const Display = async () => {
  const Promess = await fetch("https://restapi.fr/api/Like");

  const Like = await Promess.json();

  try {
    const LikeList = Like.map((Like, I) => {
      return CreateLike(Like, I);
    });

    div.innerHTML = "";

    div.append(...LikeList);
  } catch (e) {
    console.log(e);
  }
};

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

const CreateLike = (Like, I) => {
  const section = document.createElement("section");

  section.classList.add("post", "text-center");
  const Dislike = document.createElement("button");

  Dislike.innerHTML = "Dislike";

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

back.addEventListener("click", (e) => {
  e.stopPropagation();
  location.assign("index.html");
});

back.classList.add("btn-outline-warning", "back");

Display();

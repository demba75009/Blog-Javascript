import "./like.css";

const div = document.querySelector("div");
const back = document.querySelector("button");

const Display = async () => {
  const Promess = await fetch("https://restapi.fr/api/Like");

  const Like = await Promess.json();

  try {
    const LikeList = Like.map((L, I) => {
      return CreateLike(L, I);
    });

    div.innerHTML = "";

    div.append(...LikeList);
  } catch (e) {
    console.log(e);
  }
};

const CreateLike = (Like, I) => {
  const section = document.createElement("section");

  const Dislike = document.createElement("button");

  Dislike.innerHTML = "Dislike";

  Dislike.addEventListener("click", (e) => {
    e.stopPropagation();

    const DisLike1 = fetch(`https://restapi.fr/api/Like`, {
      method: "DELETE",
    });

    DisLike1.then((res) => console.log(res)).catch((err) => console.log(err));
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

Display();

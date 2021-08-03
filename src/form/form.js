import "./form.css";
import * as axios from "axios";

const form = document.querySelector("form");

const back = document.querySelector(".back");

let url;

back.addEventListener("click", (e) => {
  history.back(1);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const PostData = new FormData(form);

  const Post = Object.fromEntries(PostData);

  const post = JSON.stringify(Post);

  let Promess;

  if (url) {
    Promess = fetch("https://restapi.fr/api/Post", {
      method: "PATCH",

      body: post,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    Promess = fetch("https://restapi.fr/api/Post", {
      method: "POST",

      body: post,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  Promess.then((res) => console.log(res)).catch((err) => console.log(err));
  location.assign("index.html");
});

const EditForm = () => {
  url = new URL(location.href).searchParams.get("id");

  return DisplayEdit(url);
};

const DisplayEdit = async (url) => {
  const Post = await fetch(`https://restapi.fr/api/Post/${url}`);

  try {
    const response = await Post.json();

    console.log(response);

    return fillform(response);
  } catch (e) {
    console.log(e);
  }
};

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

EditForm();
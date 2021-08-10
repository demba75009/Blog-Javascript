import "./style.css";

const ajouter = document.querySelector(".lien");

const Like = document.querySelector(".like");

/*
on crée un event listener sur la const Like pour  pouvoir naviguer au lien like.html
*/
Like.addEventListener("click", (e) => {
  location.assign("like.html");
});

Like.classList.add('text-success')
/*
on ajoute une class au lien "ajouter" pour pouvoir la personnaliser puis on va naviguer sur "form.html"
*/
ajouter.classList.add("btn-outline-primary");

ajouter.addEventListener("click", (e) => {
  location.assign("form.html");
});

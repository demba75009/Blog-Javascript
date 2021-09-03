import "./style.css";

const ajouter = document.querySelector(".lien");

const Like = document.querySelector(".like");

const h5 = document.querySelector("h5");
const title = document.querySelector(".title")
const changeShow = document.querySelector(".changeShow")

const etat = document.querySelector(".etat")

let complike;
let show = false;



changeShow.addEventListener("click",e=>{
e.stopPropagation();
show = !show;

if(show)

  etat.classList.add("show")

else
etat.classList.remove("show")


})



title.addEventListener("click",(e)=>{

e.stopPropagation()
location.assign("index.html")


})

h5.classList.add("text-center");
//on crée la fonction Display qui va nous permettre de récupérer la liste des Posts via une requete(Promise)



/*
on crée un event listener sur la const Like pour  pouvoir naviguer au lien like.html
*/
Like.addEventListener("click", (e) => {
  location.assign("like.html");
});

Like.classList.add('text-success',"btn-outline-dark")
/*
on ajoute une class au lien "ajouter" pour pouvoir la personnaliser puis on va naviguer sur "form.html"
*/
ajouter.classList.add("btn-outline-dark");

ajouter.addEventListener("click", (e) => {
  location.assign("form.html");
});

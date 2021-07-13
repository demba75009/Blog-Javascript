import "./style.css";

const div = document.querySelector(".ListeUser");

const categorie = document.querySelector(".menu");

const ajouter = document.querySelector("a");

ajouter.addEventListener("click", (e) => {
  location.assign("form.html");
});

const Display = async () => {
  const Post = await fetch("https://restapi.fr/api/Post");

  try {
    const response = await Post.json();

    console.log(response);

    const Postnode = response.map((r, i) => {
      return CreatePost(r, i);
    });

    const categories12 = response.reduce((acc, res) => {
      if (acc[res.categorie]) {
        acc[res.categorie]++;
      } else {
        acc[res.categorie] = 1;
      }
      return acc;
    }, {});

    const categoriesArr = Object.keys(categories12).map((category) => {
      return [category, categories12[category]];
    });

    CreateMenu(categoriesArr);

    div.innerHTML = "";

    div.append(...Postnode);
  } catch (e) {
    console.log(e);
  }
};

const CreateMenu = (categoriesArr) => {
  const Tout = document.createElement("li");

  Tout.innerHTML = "Tout";

  Tout.addEventListener("click", (e) => {
    Display();
  });

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

  categorie.innerHTML = "";
  categorie.append(Tout, ...liElements);
};

const CreatePost = (response, i) => {
  const section = document.createElement("section");

  const Supprimer = document.createElement("button");

  Supprimer.innerHTML = "Supprimer";

  Supprimer.addEventListener("click", (e) => {
    e.stopPropagation();

    const Supp = fetch(`https://restapi.fr/api/Post/${response._id}`, {
      method: "DELETE",
    });

    Supp.then((res) => console.log(res)).catch((err) => console.log(err));

    Display();
  });

  const Editer = document.createElement("button");

  Editer.innerHTML = "Editer";

  Editer.addEventListener("click", (e) => {
    e.stopPropagation();

    location.assign(`form.html?id=${response._id}`);
  });

  section.innerHTML = `

<img src = ${response.photo} />


 <h1>${response.nom}   ${response.prenom}</h1>

 <h2>${response.categorie}</h2>

 <p> ${response.publication}</p>


`;

  section.append(Editer, Supprimer);

  return section;
};

Display();

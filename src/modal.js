import "./style.css";
const body = document.querySelector("body");
let calc;
let modal;
let Cancel;
let Ok;
const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
};

const createModal = (question) => {
  modal = document.createElement("div");

  modal.innerHTML = ` ${question} 
  </br>
 `;
  modal.classList.add("text-danger","bg-dark","text-center");

  Cancel = document.createElement("button");
  Cancel.innerText = "Cancel";
  Cancel.classList.add("btn-outline-success","ok");

  Ok = document.createElement("button");
  Ok.innerText = "OK";
  Ok.classList.add("btn-outline-danger", "ok");

  modal.append(Cancel, Ok);
};

const  Like = (commentaire) =>{

modal = document.createElement("div");
modal.innerHTML = `</br>${commentaire}
</br> </br>`;
modal.classList.add("text-success","bg-dark","text-center");

const Confirm = document.createElement("button")
Confirm.innerText="OK";
Confirm.classList.add("btn-outline-success", "ok");

modal.append(Confirm)

calc.addEventListener("click", (e) => {
  calc.remove();
});

}

export function  like(commentaire) {
  createCalc()
Like(commentaire);
  calc.append(modal)
  body.append(calc)
}


export function openModal(question) {
  createCalc();
  createModal(question);
  calc.append(modal);
  body.append(calc);

  return new Promise((resolve, reject) => {
    calc.addEventListener("click", (e) => {
      resolve(false);
      calc.remove();
    });

    Cancel.addEventListener("click", () => {
      resolve(false);
      calc.remove();
    });

    Ok.addEventListener("click", () => {
      resolve(true);
      calc.remove();
    });
  });
}

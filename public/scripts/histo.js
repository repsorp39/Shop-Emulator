const btnCopies = document.querySelectorAll(".bi-copy");
const cartId = document.querySelectorAll(".cart-id");
const btnChecked = document.querySelectorAll(".bi-check-square");

const btnMoreInfo = document.querySelectorAll(".btn-more-info");
const historicSection = document.querySelector(".historic");
const searchSection = document.querySelector(".search-section");
const btnClose = document.querySelector(".bi-x-circle-fill");

const btnGetInfo = document.getElementById("get-cart-info");
const infoForm = document.querySelector(".more-info");
const histoResult = document.getElementById("histo-result");

for (let i = 0; i < btnCopies.length; i++) {
  btnCopies[i].addEventListener("click", async () => {
    await navigator.clipboard.writeText(cartId[i].innerText);
    btnChecked[i].classList.remove("d-none");
    btnCopies[i].classList.add("d-none");

    setTimeout(() => {
      btnChecked[i].classList.add("d-none");
      btnCopies[i].classList.remove("d-none");
    }, 1000);
  });
}

for (let i = 0; i < btnMoreInfo.length; i++) {
  btnMoreInfo[i].addEventListener("click", (e) => {
    historicSection.classList.add("hide-it");
    searchSection.classList.remove("d-none");

    btnClose.addEventListener("click", () => {
      historicSection.classList.remove("hide-it");
      searchSection.classList.add("d-none");
    });

    window.addEventListener("click", (e) => {
      if (
        e.target.className !== "btn-more-info" &&
        e.target.className !== "more-info" &&
        e.target?.parentElement?.className !== "more-info"
      ) {
        historicSection.classList.remove("hide-it");
        searchSection.classList.add("d-none");
      }
    });
  });
}

infoForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = e.target["cart-id"].value;

  const res = await fetch(`/search-cart/${id}`);

  if (res.ok) {
    const prod = await res.json();
    const prodId = prod.map((prod) => prod.productId);
    let data = [];

    for (const id of prodId) {
      const res = await (await fetch(`/prod/${id}`)).json();
      data.push(res);
    }

    if (data.length > 0) {
      histoResult.innerHTML ="";
      const p = document.createElement("p");
      p.className = 'text-yellow';
      p.innerText = `In the cart matching with this order id, you bought ${data.length} different(s) product(s):`;
      const ul = document.createElement("ul");

      for (let i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        li.innerText = `${data[i].name}:\n\tPrice:${data[i].price}$ ,Categorie:${data[i].categorie} ,number Bought:${prod[i].numberBought} `;
        ul.appendChild(li);
      }
      histoResult.appendChild(p);
      histoResult.appendChild(ul);
    }
  } else {
    histoResult.innerHTML = "";
    histoResult.innerHTML = "<span class='text-red'>No cart matching! Please put a valid order identifier</span>"
  };
});

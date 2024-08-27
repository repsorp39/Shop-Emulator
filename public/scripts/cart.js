const btnAddCart = document.querySelectorAll(".add-to-cart");
const sectionConfirmAdd = document.querySelectorAll(".number-sec");
const btnCancel = document.querySelectorAll(".cancel");
const btnPlus = document.querySelectorAll(".bi-plus");
const btnMinus = document.querySelectorAll(".bi-dash");
const numberInCart = document.querySelectorAll(".number-product");
const btnConfirmShop = document.querySelectorAll(".confirm-shop");
const checkedBtn = document.querySelectorAll(".bi-check-circle-fill");

for (let i = 0; i < btnAddCart.length; i++) {
  btnAddCart[i].addEventListener("click", () => {
    btnAddCart[i].classList.add("d-none");
    sectionConfirmAdd[i].classList.remove("d-none");
    cancelCart(btnCancel[i], sectionConfirmAdd[i], btnAddCart[i]);
    updateProductNumber(
      btnPlus[i],
      btnMinus[i],
      numberInCart[i],
      btnConfirmShop[i]
    );
    validateShoping(
        btnAddCart[i],
        btnConfirmShop[i],
        numberInCart[i],
        checkedBtn[i],
        sectionConfirmAdd[i]);
  });
}

//to hide or unhide panel control for cart
function cancelCart(btnCancel, sectionConfirmAdd, btnAdd) {
  btnCancel.addEventListener("click", () => {
    btnAdd.classList.remove("d-none");
    sectionConfirmAdd.classList.add("d-none");
  });
}

//to update dynamically number of product
function updateProductNumber(btnPlus, btnMinus, currentNumber, btnConfirm) {
  let val = parseInt(currentNumber.innerText);

  btnPlus.addEventListener("click", () => {
    val++;
    if (btnConfirm.classList.contains("disable-btn"))
      btnConfirm.classList.remove("disable-btn");
     currentNumber.innerText = val.toString().padStart(2, "0");
  });
  btnMinus.addEventListener("click", () => {
    val > 0 ? val-- : val;
    if (val >= 0) {
      currentNumber.innerText = val.toString().padStart(2, "0");
    }
    if (val === 0 && !btnConfirm.classList.contains("disable-btn"))
      btnConfirm.classList.add("disable-btn");
  });
}

function validateShoping(btnAdd, btnConfirm, numberInCart,checkedBtn ,confirmSec) {
  btnConfirm.addEventListener("click", async () => {
    let numberBought = parseInt(numberInCart.innerText);
    const data = {
      productId: btnAdd.dataset.id,
      numberBought,
    };
    if (numberBought > 0) {
      const res = await fetch("/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.ok){
         checkedBtn.classList.remove("d-none");
         confirmSec.classList.add("d-none");
      }
      else {
        if (confirm("You should login first to perform this action.Continue?")) {
          window.location = "/login";
        }
      }
    }
  });
}

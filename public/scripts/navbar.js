const btnBurger = document.querySelector('.bi-list');
const btnClosed = document.querySelector('.bi-x');
const header = document.querySelector('header');

btnBurger.addEventListener('click' , () =>{
 
    setTimeout(()=>{
        header.classList.remove('hide-navbar');
        btnBurger.classList.add('d-none');
        btnClosed.classList.remove('d-none');
    } ,100)
})

btnClosed.addEventListener('click' , () =>{
    
    setTimeout(()=>{
        header.classList.add('hide-navbar');
    btnClosed.classList.add('d-none');
    btnBurger.classList.remove('d-none');
    } ,100)
 })
//handle user Registration
const loginForm = document.querySelector(".form-sec");
const pwdInput = document.getElementById("password");
const pseudoInput = document.getElementById("pseudo");
const fError = document.querySelector(".error");
const loader = document.querySelector("img[alt='loader']");

loginForm.addEventListener('submit' , async (ev)=>{
    ev.preventDefault();
    const pseudo = pseudoInput.value;
    const pwd = pwdInput.value;

    if(pseudo.trim() === "" || pwd.trim() ==="") {
        fError.innerText = "Pseudo and password required!";
        return;
    }

 try{ 
       loader.classList.remove('d-none');
       const res = await fetch("/login" ,
                {
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify({pseudo , password:pwd})}
                )
                if(!res.ok){
                    const data = await res.json();
                    fError.innerText = data.message;
                    loader.classList.add('d-none');
                   return;
                }
                console.log("Connecté");
                window.location.reload();
       
 }catch(err){
    loader.classList.add('d-none');
    console.log("Error occurs:" + err.message);
 }
     

})

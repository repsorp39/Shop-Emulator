//handle user Registration
const registerForm = document.querySelector(".form-sec");
const pwdInput = document.getElementById("password");
const pseudoInput = document.getElementById("pseudo");
const fError = document.querySelector(".error");
const pseudoRegex = new RegExp("[A-Za-z0-9_èà@ é]{3,12}");
const loader = document.querySelector("img[alt='loader']");


registerForm.addEventListener('submit' , async (ev)=>{
    ev.preventDefault();
    const pseudo = pseudoInput.value;
    const pwd = pwdInput.value;

    if(pseudo.trim() === "" || !pwd) {
        fError.innerText = "Pseudo and password required!";
        return;
    }

    if(!pseudoRegex.test(pseudo)){
        fError.innerText = "Pseudo too short!";
        return;
    }
    if(pwd.length < 7){
        fError.innerText = "Password too short! 8 char min: ";
        return;
    }
    fError.innerText = "";

 try{
    loader.classList.remove('d-none');
    let res = await fetch("/register" ,
        {
            method:"POST",
            headers:{
            "Content-Type":"application/json"
            },
            body:JSON.stringify({pseudo , password:pwd})}
        )
        if(res.ok){      
            //now connect him
           res = await fetch("/login" ,
                {
                    method:"POST",
                    headers:{
                    "Content-Type":"application/json"
                    },
                    body:JSON.stringify({pseudo , password:pwd})}
                )

                if(res.ok){
                    console.log("Connecté");
                    window.location.reload();
                }
        }
        else{
            loader.classList.add('d-none');
           if(res.status === 409) fError.innerText = "This pseudo is already taken!"
        }
 }catch(err){
    loader.classList.add('d-none');
    console.log(err);
 }
     

})

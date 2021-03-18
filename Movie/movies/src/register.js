import { showHome } from "./home.js";

let main;
let section;

async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    let rePass = formData.get('repeatPassword');
    if (!email || !password){
        return alert('All fields are requered!');
    }else if (password != rePass){
        return alert('Passwords don\'t match !');
    }

    let url = 'http://localhost:3030/users/register';
    const response = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    })

    if (response.ok) {
        const data = await response.json();
        sessionStorage.setItem('authToken', data.accessToken);
        sessionStorage.setItem('userId', data._id);
        sessionStorage.setItem('email', data.email);

        [...document.querySelectorAll('nav .user')].forEach(link=> link.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(link=> link.style.display = 'none');
        document.getElementById('welcome').textContent = "Welcome, " + email;


        showHome();

    }else{
        const error = await response.json();
        return alert(error.message);
    }

    e.target.reset();


};

export function setUpRegister(mainTarget, sectionTarget){
    main = mainTarget ;
    section = sectionTarget;
    let loginForm = document.getElementById('form-sign-up');

    loginForm.querySelector('form').addEventListener('submit', onSubmit) 
}


export async function showRegister(){
    main.innerHTML = "";    
    main.appendChild(section);


}
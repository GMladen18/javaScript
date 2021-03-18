import { showHome } from "./home.js";

let main;
let section;

async function onSubmit(e){
    e.preventDefault();
    let formData = new FormData(e.target);
    let email = formData.get('email');
    let password = formData.get('password');
    if (!email || !password){
        return alert('All fields are requered!')
    }
    let url = 'http://localhost:3030/users/login';
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
        alert(error.message);
    }
    e.target.reset();


};

export function setUpLogin(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
    let loginForm = document.getElementById('form-login');

    loginForm.querySelector('form').addEventListener('submit', onSubmit) 

}


export async function showLogin() {
    main.innerHTML = "";
    main.appendChild(section);
    
    
}

export async function logOut(){
    let authToken = sessionStorage.getItem('authToken');
    const url = 'http://localhost:3030/users/login';
    const response = await fetch(url, {
        method: 'get',
        headers: {
            'X-Authorization': authToken
        }
    });

    if (response.ok){
        sessionStorage.clear();
        
        [...document.querySelectorAll('nav .user')].forEach(link=> link.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(link=> link.style.display = 'block');
    
        showHome();
    }
    
}
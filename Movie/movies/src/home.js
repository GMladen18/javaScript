import { showDetails } from './details.js';
import { crtElement } from './dom.js'

async function getMovies() {
    let url = 'http://localhost:3030/data/movies'
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


function createMovie(movie){
    const element = crtElement('div', { className: "card mb-4" },
        crtElement('img', { className: "card-img-top", src: movie.img, width: "400" }),
        crtElement('div', { className: "card-body" },
            crtElement('h4', { className: "card-title" }, `${movie.title}`)),
        crtElement('div', { className: "card-footer" },
            crtElement('button', { id: `${movie._id}`, type: "button", className: "btn btn-info movieDetailsLink" }, "Details"))
    )


    return element;
}

let main;
let section;
let container;


export function setUpHome(mainTarget, sectionTarget) {
    const email = sessionStorage.getItem('email');

    if (email){
        [...document.querySelectorAll('nav .user')].forEach(link=> link.style.display = 'block');
        [...document.querySelectorAll('nav .guest')].forEach(link=> link.style.display = 'none');
        document.getElementById('welcome').textContent = "Welcome, " + email;
    }else{
        [...document.querySelectorAll('nav .user')].forEach(link=> link.style.display = 'none');
        [...document.querySelectorAll('nav .guest')].forEach(link=> link.style.display = 'block');
       
    }

    main = mainTarget;
    section = sectionTarget;
    container = section.querySelector('.card-deck.d-flex.justify-content-center')

    container.addEventListener('click', (e)=>{
        e.preventDefault();
        if (e.target.classList.contains('movieDetailsLink')){
            showDetails(e.target.id);
        }
    })
}


export async function showHome() {
    container.innerHTML = "Loading ..."
    main.innerHTML = "";
    main.appendChild(section);

    const movies = await getMovies();
    const cards = movies.map(createMovie);
    
    const fragment = document.createDocumentFragment();
    cards.forEach(c => fragment.appendChild(c));
    
    container.innerHTML = '';
    container.appendChild(fragment);


}
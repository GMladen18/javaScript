import { crtElement } from "./dom.js";
import { showEdit } from "./edit.js";
import {showHome} from './home.js'

async function getLikesByMovieId(id){
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`;
    const response = await fetch(url);
    const data = await response.json();

    return data;

}

async function getOwnLikesById(id){
    const userId = sessionStorage.getItem('userId');
    const url = `http://localhost:3030/data/likes?where=movieId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22 `;
    const response = await fetch(url);
    const data = await response.json();

    return data;

}



async function getMovieById(id) {
    const url = 'http://localhost:3030/data/movies/' + id;
    const response = await fetch(url);
    const data = await response.json();

    return data;
}

async function onDelete(e , id){
    e.preventDefault();
    let confirmed = confirm('Are you sure you want to delete this movie?');
    if (confirmed){
        let url = 'http://localhost:3030/data/movies/' + id;

        const response = await fetch(url, {
            method: 'delete',
            headers: {
                'X-Authorization': sessionStorage.getItem('authToken')
            }
        })
        if (response.ok){
            alert('You deleted the movie!');
            showHome();
        }else {
            let error =await response.json();
            alert(error.message)
        }
        
    }
}


function createMovie(movie, like , ownLike) {
    const userId = sessionStorage.getItem('userId');
    let element;
    let likeSpan;

    let container = crtElement('div', { className: "container" }, crtElement('h1', {}, `${movie.title}`));

    element =
        crtElement('div', { className: "row bg-light text-dark" },
            crtElement('div', { className: "col-md-8" },
                crtElement('img', { className: "big-image img-thumbnail ", src: `${movie.img}` })))

    let controls = crtElement('div', { className: "col-md-4 text-center" },
        crtElement('h3', { className: "my-3" }, "Movie Description"),
        crtElement('p', {}, `${movie.description}`))

    if (userId) {
        if (userId == movie._ownerId) {
            controls.appendChild(crtElement('a', { className: "btn btn-danger", href: "#" , onclick:(e)=>onDelete(e, movie._id)}, "Delete"))
            controls.appendChild(crtElement('a', { className: "btn btn-warning", href: "#" , onclick: (e)=> showEdit(e, movie)}, "Edit"))

        } else if (ownLike==0) {
            controls.appendChild(crtElement('a', { className: "btn btn-primary", href: "#", onclick: likeMovie}, "Like"))
        }

        likeSpan = crtElement('span', { className: "enrolled-span" }, like + ' like' + (like == 1 ? '' :'s' ))
        controls.appendChild(likeSpan);
    }

    async function likeMovie(event){
        const response = await fetch('http://localhost:3030/data/likes', {
            method : 'post',
            headers: {
                'Content-Type': 'application/json' ,
                'X-Authorization': sessionStorage.getItem('authToken')
            },

            body: JSON.stringify({movieId: movie._id})
        })
        if (response.ok){
            event.target.remove(); 
            like++;
            likeSpan.textContent = like + ' like' + (like == 1 ? '' :'s' )
        }
        const data = response.json();
        console.log(data)
        
    }

    element.appendChild(controls);
    container.appendChild(element);
    return container;
}


let main;
let section;

export function setUpDetails(mainTarget, sectionTarget) {
    main = mainTarget;
    section = sectionTarget;
}


export async function showDetails(id) {
    section.innerHTML = "";
    main.innerHTML = "";
    main.appendChild(section);
    const [movie, like , ownLike] = await Promise.all([getMovieById(id), getLikesByMovieId(id),getOwnLikesById(id)]);
   

    const card = createMovie(movie ,like , ownLike);
    section.appendChild(card);


}
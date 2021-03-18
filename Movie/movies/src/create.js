import {showDetails} from './details.js'


async function onSubmit(e){
    e.preventDefault();
    const form = new FormData(e.target);
    
    const movie = {
         title : form.get('title'),
         description : form.get('description'),
         img: form.get('imageUrl')
    }

    if (movie.title == '' || movie.description== '' || movie.img == ''){
        alert('All fields are requered!')
    }
    const url = 'http://localhost:3030/data/movies';
    const response = await fetch(url, {
        method : 'post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': sessionStorage.getItem('authToken'),
        } ,
        body: JSON.stringify(movie)
    });

    if (response.ok){
        const movie = await response.json();
        showDetails(movie._id);
    }else{
        let error = await response.json();
        return alert(error.message);
    }
    e.target.reset();


}


let main;
let section;

export function setUpCreate(mainTarget, sectionTarget){
    main = mainTarget ;
    section = sectionTarget;

    const form = section.querySelector('form');
    form.addEventListener('submit' , onSubmit);

}


export async function showCreate(){
    main.innerHTML = "";    
    main.appendChild(section);


}
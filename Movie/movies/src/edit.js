import {showDetails} from './details.js'


let main;
let section;

export function setUpEdit(mainTarget, sectionTarget){
    main = mainTarget ;
    section = sectionTarget;

    


}


export async function showEdit(e , movie){
    e.preventDefault();
    main.innerHTML = "";    
    main.appendChild(section);


    let id = movie._id;
    let title = document.getElementById('titleEdit');
    let description = document.getElementById('descriptionEdit');
    let img = document.getElementById('imageEdit');
    title.value = movie.title;
    description.value = movie.description;
    img.value = movie.img;
    document.getElementById('formEdit').addEventListener('submit', async (e)=>{
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
        let confirmed = confirm('Are you sure you want to change content of this movie?');
        if (confirmed){
            const url = 'http://localhost:3030/data/movies/' + id;
            const response = await fetch(url, {
                method : 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': sessionStorage.getItem('authToken'),
                } ,
                body: JSON.stringify(movie)
            });
            if (response.ok){
                showDetails(id);
            }
        }
    })


}
import {crtElement} from './dom.js'
import {setUpHome, showHome} from './home.js'
import {setUpDetails} from './details.js'
import {setUpLogin, showLogin, logOut} from './login.js'
import {setUpRegister, showRegister} from './register.js'
import {setUpCreate, showCreate} from './create.js'
import {setUpEdit} from './edit.js'


let main = document.getElementById('main');

let links = {
    "homeLink":showHome,
    "logoutLink":logOut,
    "loginLink":showLogin,
    "registeLink":showRegister,
    "createLink":showCreate,
}

setUpSection("home-page",setUpHome);
setUpSection("add-movie",setUpCreate);
setUpSection("movie-details",setUpDetails);
setUpSection("edit-movie",setUpEdit);
setUpSection("form-login",setUpLogin);
setUpSection("form-sign-up",setUpRegister);

setUpNav();

showHome();

function setUpSection(sectionId, setup){
    const currentSection = document.getElementById(sectionId);
    setup(main, currentSection);
}


function setUpNav(){
    document.querySelector('nav').addEventListener('click', (e)=>{
        if (e.target.tagName == 'A'){
            let view = links[e.target.id];
            if(typeof view == 'function'){
                view();
            }
        }
    })
    document.getElementById('createLink').addEventListener('click', (e)=>{
        e.preventDefault();
        showCreate();
    })
}
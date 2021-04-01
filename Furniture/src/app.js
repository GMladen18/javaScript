import page from '../node_modules/page/page.mjs'
import { render } from '../node_modules/lit-html/lit-html.js'


import { dashboardPage } from './views/dashboard.js'
import { createPage } from './views/create.js'
import { detailsPage } from './views/details.js'
import { editPage } from './views/edit.js'
import { registerPage } from './views/register.js'
import { loginPage } from './views/login.js'
import {logout} from './api/data.js'
import { myFurniturePage } from './views/my-furniture.js'

const container = document.querySelector('.container');
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await logout();
    changeNavigation()
    page.redirect('/')
});


page('/', middleWare, dashboardPage)
page('/create', middleWare, createPage)
page('/details/:id', middleWare, detailsPage)
page('/edit/:id', middleWare, editPage)
page('/login', middleWare, loginPage)
page('/register', middleWare, registerPage)
page('/my-furniture', middleWare, myFurniturePage)


changeNavigation()
page.start();

function middleWare(ctx, next) {
    ctx.render = (content) => render(content, container);
    ctx.changeNavigation = changeNavigation
    next();
}

function changeNavigation() {
    const user = sessionStorage.getItem('userId');
    if (user != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    }else{
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}





import {html} from '../../node_modules/lit-html/lit-html.js'

import {register} from '../api/data.js'


const registerTemplate = (onSubmit , isValidEmail, isValidPassword , isValidRePassword) => html`
 <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit= ${onSubmit} >
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class=${"form-control" + (isValidEmail ? ' is-invalid': '') } id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class=${"form-control" + (isValidPassword ? ' is-invalid': '') }  id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class=${"form-control" + (isValidRePassword ? ' is-invalid': ' ') }  id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
`;

export async function registerPage(ctx){
    ctx.render(registerTemplate(onSubmit));

    async function onSubmit(event){
        event.preventDefault();
        let formData = new FormData(event.target);
        const email = formData.get('email').trim();
        const password = formData.get('password').trim();
        const rePass = formData.get('rePass').trim();

        if (email == '' || password == '' || rePass == ''){
            ctx.render(registerTemplate(onSubmit , email == '', password == '' ,rePass == ''));
            return alert('All fields are required!')
        }
        if (password != rePass){
            ctx.render(registerTemplate(onSubmit , false, true , true));
            return alert('Passwords don\'t match!');
        }
        await register(email , password)
        ctx.changeNavigation()
        ctx.page.redirect('/')
    }
}

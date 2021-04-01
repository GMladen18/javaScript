import { html } from '../../node_modules/lit-html/lit-html.js'
import { editItem, getItemById } from '../api/data.js'

const editTemplate = (item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${onSubmit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class=${"form-control" + (isMake ?   ' is-valid' :' is-invalid' )} id="new-make" type="text" name="make" value= ${item.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class=${"form-control" + (isModel ?   ' is-valid' :' is-invalid' )} id="new-model" type="text" name="model"  value= ${item.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class=${"form-control" + (isYear ?   ' is-valid' :' is-invalid' )} id="new-year" type="number" name="year"  value= ${item.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class=${"form-control" + (isDescription ?   ' is-valid' :' is-invalid' )} id="new-description" type="text" name="description"  value= ${item.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class=${"form-control" + (isPrice ?   ' is-valid' :' is-invalid' )} id="new-price" type="number" name="price"  value= ${item.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class=${"form-control" + (isImage ?   ' is-valid' :' is-invalid' )} id="new-image" type="text" name="img"  value= ${item.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material"  value= ${item.material}> 
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>
`;


export async function editPage(ctx) {
    const id = ctx.params.id
    const item = await getItemById(id);
    
    ctx.render(editTemplate(item ,onSubmit, true , true , true ,true , true , true));
    async function onSubmit(event) {
        event.preventDefault();
        let isMake = true;
        let isModel = true;
        let isYear = true;
        let isDescription = true;
        let isPrice = true;
        let isImage = true;
        const formData = new FormData(event.target)
        const make = formData.get('make').trim();
        const model = formData.get('model').trim();
        const year = Number(formData.get('year'));
        const description = formData.get('description').trim();
        const price = Number(formData.get('price'));
        const img = formData.get('img').trim();
        const material = formData.get('material').trim();
        if (make != ''|| model !='' || year != ''|| description != '' || price != '' || img!=''){
            if (make.length < 4){
                isMake = false;
                ctx.render(editTemplate(item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage));

                return alert('The make must be at least more than four charecters')
            }
            if (model.length < 4){
                isModel = false;
                ctx.render(editTemplate(item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage));

                return alert('The model must be at least more than four charecters')
            }
            if (2021 > year && year < 1950){
                isYear = false;
                ctx.render(editTemplate(item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage));
                return alert('The year must be between 2021 and 1950')
            }
            if (description.length < 10){
                isDescription = false;
                ctx.render(editTemplate(item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage));
                return alert('The discription must be at least more than ten charecters')

            }
            if (price < 0){
                isPrice = false;
                ctx.render(editTemplate(item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage));
                return alert('The price can\'t be lower than zero')

            }
            if (!img){
                isImage = false;
                ctx.render(editTemplate(item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage));
                return alert('The image is required')

            }
            ctx.render(editTemplate(item ,onSubmit, isMake, isModel, isYear, isDescription, isPrice, isImage));
            await editItem(id , {
                make: make, model: model, year: year,
                description: description, price: price, img: img, material: material
            })
            ctx.page.redirect('/');
    }else {
        return alert('All fields are required')
    }
}


}
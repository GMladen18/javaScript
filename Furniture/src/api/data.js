import * as api from './api.js'

const host = 'http://localhost:3030';
api.settings.host = host;

export const login = api.login; 
export const register = api.register; 
export const logout = api.logout; 



// buissness logic ;)

async function getAllItems(){
    return await api.get(host + '/data/catalog');
}

async function getItemById(id){
    return await api.get(host + '/data/catalog/' + id);
}

async function getItemsByUserId(){
    const userId = sessionStorage.getItem('userId');
    return await api.get(host + `/data/catalog?where=_ownerId%3D%22${userId}%22`)
}

async function createItem(body){
    return await api.post(host + '/data/catalog', body)
}

async function editItem(id , body){
    return await api.put(host + '/data/catalog/' + id, body)
}

async function deleteItem(id){
    return await api.del(host + '/data/catalog/' + id);
}





export {
    getAllItems,
    getItemById,
    getItemsByUserId,
    deleteItem,
    createItem, 
    editItem
}
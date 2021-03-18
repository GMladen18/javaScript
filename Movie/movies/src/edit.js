
let main;
let section;

export function setUpEdit(mainTarget, sectionTarget){
    main = mainTarget ;
    section = sectionTarget;

    


}


export async function showEdit(){
    main.innerHTML = "";    
    main.appendChild(section);


}
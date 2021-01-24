 function  openModelBoxForOptions(modal,positionX,positionY){
    let css = "left:" +(positionX + 12)+"px; top: "+(positionY - 17)+"px; display: block";
    modal.style.cssText = css;
   
    /*window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };*/
}

function  openModelBoxForForm(modal){
    let css = "display: block";
    modal.style.cssText = css;
   

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
} 


    
function    closeModelBox(modal){
    //let modal = document.getElementById('modalNewColumn');
    modal.style.display = 'none';
}

    

export{openModelBoxForForm, openModelBoxForOptions, closeModelBox} ;
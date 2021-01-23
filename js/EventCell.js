function eventCellType(element){
    let cellType = element.getAttribute('type');

    if(cellType == 'number'){
        eventCellNumber(element);
    }else if(cellType == 'string'){
        eventCellString(element);
    }else if(cellType == 'email'){
        eventCellUrl(element);
    }else if(cellType == 'url'){
        eventCellUrl(element);
    }
}

function eventCellNumber(element){
    element.style.textAlign = 'right';
}

function eventCellString(element){
    element.style.textAlign = 'left';   
}

function eventCellEmail(element){    
}

function eventCellUrl(element){
    let link = element.innerHTML;    
    window.open(link,'_blank'); 
}






export {eventCellType};
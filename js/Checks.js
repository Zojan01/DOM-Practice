function checkerCellType(element){
    let cellType = element.getAttribute('type');
    
    if(cellType === 'number'){
        checkCellNumber(element);
    }else if(cellType === 'string'){
        
        
    }else if(cellType === 'email'){
        checkCellEmail(element);
    }else if(cellType === 'url'){
        checkCellUrl(element);
    }
};

function checkCellNumber(element){
    let number = Number(element.innerText);

    if(isNaN(number) != false){
        window.alert('Cell of type number, please enter a data of type number');
        element.innerHTML = '';
    }
};


function checkCellEmail(element){
    let regularExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let email = String(element.innerText).trim();

    if(regularExp.test(email) != true){
        window.alert('Cell of type email, please enter a data of type email');
        element.innerHTML = '';
    }

};

function checkCellUrl(element){
    let regularExp = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    let  url = element.innerText.trim();

    if(regularExp.test(url) != true){
        window.alert('Cell of type url, please enter a data of type url with http://');
        element.innerHTML = '';
    }
};

export{checkerCellType};




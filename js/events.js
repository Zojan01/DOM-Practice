
const dragOperation = {
    columDragNumber : 0,
    columDropNumber : 0,
    rowDragNumer : 0,
    rowDropNumber : 0
}



function adderEventCell(element){
    element.onclick = function(){editOnDoubleClick(element)};

    element.onblur  = function(){element.contentEditable = false};

    element.addEventListener('keyup', function(event){
        if(event.key === 'Enter'){
            element.contentEditable = false;
        };
    });
}

function adderEventHeader(element){
    element.draggable="true";
    
    element.ondragstart = function(event){
        event.target.style.opacity = 0.5;   
        columDragNumber = getColumnNumber(event.target.id);
    }

    element.ondragover = function(event){
        event.preventDefault();
        
    }

    element.ondragend = function(event){
        event.target.style.opacity = '1      ';   

    }

    element.ondrop = function(event){
        event.preventDefault();
        columDropNumber = getColumnNumber(event.target.id);
        moveColumn();   
   }            
}

function adderEventRow(element){
    
    element.onclick = function(event){
       
        if (event.ctrlKey) { 
            //alert ("Ctrl key is pressed."); 
            element.draggable = true;
            console.log('is dragable'); 
        }   
        else { 
            //alert ("Ctrl key is not pressed."); 
        } 
    }

    element.ondragstart = function(event){
        
        event.target.style.opacity = 0.5;

    }

    element.ondragover = function(event){
        event.preventDefault();
    }

    element.ondragend = function(event){
        event.target.style.opacity = 1;
    }
    
    element.ondrop = function(event){
        event.preventDefault(); 
   }            
}


function getColumnNumber(columIdDrag){ 
    var headers = document.querySelectorAll('table tr:first-child th');
    columnNumber = 0;

    for(x = 0; x < headers.length; x++){

        if(headers[x].id === columIdDrag){
            columnNumber = x;
            break;
        }    

    }
    return columnNumber;
}

function moveColumn(){
    var allRows = document.querySelectorAll('table tr');    
    
    allRows.forEach(element => {
        element.insertBefore(element.children[columDragNumber], element.children[columDropNumber]);
    })


}

export const events = {

    dragOperation,
    adderEventCell,
    adderEventHeader,
    adderEventRow,
}
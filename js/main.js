const dragger = {
    columDragNumber: 0,
    columDropNumber: 0,
    rowDragTarget: Node,
    rowDropTarget: Node,
}

let deleteListRow = [];

function createColumn(name,type){  
    var table = document.getElementById('tbl');       
    var allColumns = document.querySelectorAll('table tr:first-child th');
    
    
    if(allColumns.length === 0){
        table.insertRow(0)
        firstColumnHeader();
        lastColumnHeader();
    };   

    
    var rowsTable = document.querySelectorAll('#tbl tr');
    var rowNumber = 0; 
    rowsTable.forEach( element => {
        cell = document.createElement('td')
        
        if(rowNumber === 0){
            cell = document.createElement('th');
            cell.innerHTML = name;
            cell.setAttribute('id', name+'Header')
            cell.setAttribute('type',type);
            adderEventHeader(cell);
        }else{
            adderEventCell(cell);
        }

        
        element.insertBefore(cell, element.lastChild);
        rowNumber++
    });
}

function newColumn(){

    cellTypeSeleted =  document.querySelector('input[name = "typeCell"]:checked');
    inputHeaderText = document.querySelector('#inputHeader');
    

    if(inputHeaderText.value != '' && cellTypeSeleted != null){
            createColumn(inputHeaderText.value, cellTypeSeleted.value )
    }else{
            alert('check for all campos esten llenos');
    }
}
function newRow(){
    var allColumns = document.querySelectorAll('table tr:first-child th');
    var table = document.getElementById('tbl');
    var cell = document.createElement('th');
   

    if(allColumns.length === 0){
        alert("have to created a header first... dont you think?");
    }else{
        var row = table.insertRow(1);
        adderEventRow(row);
    }
    
    
    var count = 0;
    allColumns.forEach(element => {

        cell = row.insertCell();
        if(count === 0){
            var checkBox = document.createElement('input');
            checkBox.type = 'checkbox';
            checkBox.onchange = function(event){addToDeleteListRow(event.target)};
            checkBox.setAttribute('name','checkBox')
            cell.appendChild(checkBox);
            
        }else{
            if(count != 0){
                cell.setAttribute('type',allColumns[count].getAttribute('type'))
            };
            adderEventCell(cell);
            
        }   

        if(count === allColumns.length - 1){
           // cell.appendChild(icon); 
        }
        count++;
    });

}


function firstColumnHeader(){
    var row = document.querySelector('table tr:first-child');

    var cell = document.createElement('th');
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';

    checkBox.onchange = function(event){
        pressAllCheckBox(event.target);
    }
    cell.appendChild(checkBox);
    row.appendChild(cell);
}

function lastColumnHeader(){
    var row = document.querySelector('table tr:first-child');
    
    var cell = document.createElement('th');
    var icon = document.createElement('img');
    icon.src="../download.png";
    icon.width="25"; 
    icon.width="25";

    cell.appendChild(icon);
    row.appendChild(cell);
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
        dragger.columDragNumber = getColumnNumber(event.target.id);
    }

    element.ondragover = function(event){
        event.preventDefault();
        
    }

    element.ondragend = function(event){
        event.target.style.opacity = '1      ';   

    }

    element.ondrop = function(event){
        event.preventDefault();
        dragger.columDropNumber = getColumnNumber(event.target.id);
        moveColumn();   
   }            
}

function adderEventRow(element){
    
    element.onclick = function(event){
       
        if (event.ctrlKey) { 
            ("Ctrl key is pressed."); 
            element.draggable = true; 
        }   
        else { 
            console.log("Ctrl key is not pressed."); 
        }       
    }

    element.ondragstart = function(event){
        event.target.style.opacity = 0.5;
        dragger.rowDragTarget = event.target;      
    }

    element.ondragover = function(event){
        event.preventDefault();
    }

    element.ondragend = function(event){
        event.target.style.opacity = 1;
    }
    
    element.ondrop = function(event){
        event.preventDefault(); 
        dragger.rowDropTarget = event.target.parentNode;
        moveRow();
   }            
}

function editOnDoubleClick(element){
    element.contentEditable = true;
    setTimeout(function() {
        if(document.activeElement !== element){
            element.contentEditable = false;
        }
    }, 300);
}

//--------
function openModelBox(){
    var modal = document.getElementById('modalNewColumn');
    modal.style.display = 'block';


    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

function closeModelBox(){
    var modal = document.getElementById('modalNewColumn');
    modal.style.display = 'none';
}


//Puedo hacerlo de dos formas que las columnas se cambia por la que se cambio o que me mueva ante la columna jj , vamos a darle se que puedo;!!!!
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
    var allRows = document.querySelectorAll('#tbl tr');
    
    allRows.forEach(element => {
        element.insertBefore(element.children[dragger.columDragNumber], element.children[dragger.columDropNumber]);
    })


}

function moveRow(){
    var table = document.getElementById('tbl');
    table.children[0].insertBefore(dragger.rowDragTarget , dragger.rowDropTarget);
}       


function pressAllCheckBox(element){
    
    var rows = document.querySelectorAll('#tbl tr');
    var state;
    btnDelete = document.getElementById('btnDeleteRow');
    
    if(element.checked){
        state = true;
        btnDelete.style.display = 'inline-block';
    }else{
        state = false;
        btnDelete.style.display = 'none';        
    }
    count = 0;
    rows.forEach(element => {
        cell = element.children[0];
        checkBox = cell.children[0];
        checkBox.checked = state;

        if(state === true && count != 0){
            deleteListRow.push(element);
        }else{
            deleteListRow  = [];
        }
        count++;      
    });

}

function addToDeleteListRow(elemet){
    btnDelete = document.getElementById('btnDeleteRow');

    if(elemet.checked){
        btnDelete.style.display = 'inline-block';
        deleteListRow.push(elemet.parentNode.parentNode);
    }else{
        if(someCheckBoxSelected() == false){btnDelete.style.display = 'none'; };
         
        deleteListRow = deleteListRow.filter( (row) => {return row !== elemet.parentNode.parentNode}); 
    }
    
    
}


function deleteRow(){

    var table = document.querySelector('#tbl');
    deleteListRow.forEach(element => table.children[0].removeChild(element));
    deleteListRow = [];

}

function someCheckBoxSelected(){
    var checkBoxSeleted =  document.querySelector('input[name = "checkBox"]:checked');
    
    if(checkBoxSeleted == null){
        return false;
    }else{
        return true;
    }
}

function getTableJson(){
    
    var headers = document.querySelectorAll('table tr:first-child th');
    var rows = document.querySelectorAll('table tr');


    var tableJson = {
        headers: [],
        rows: []
    };

    for(s=0; s<headers.length; s++){
        var header = {};
        if(s !== 0 || s !== headers.length){
            header.id = headers[s].id;
            header.value = headers[s].innerText;
            header.type = headers[s].getAttribute('type');
            header.position = s;
        };

        tableJson.headers.push(header);
    }
    


    for(s=0; s < rows.length ; s++){
        
        var row = {};
            row.id = s;
            row.cells = [];
        var count = 0;
        rows[s].childNodes.forEach(element =>{
            
            

            if(count !== 0 || count !== rows[s].length){
                var cell = {};
                cell.value = element.innerText;
                cell.type = element.getAttribute('type');
                cell.position = count;
                row.cells.push(cell);
            }   

            count++
        });
        tableJson.rows.push(row);
    }

    return tableJson;
}


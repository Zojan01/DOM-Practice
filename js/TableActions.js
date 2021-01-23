import {checkerCellType} from './Checks.js';
import {eventCellType} from './EventCell.js'
import {getJsonTable,setJsonTable} from './Storage.js';
import {openModelBoxForOptions} from './ModelBox.js';

const dragger = {   
    columDragNumber: null,
    columDropNumber: null,
    columnNumberSort: null,
    rowDragTarget: Node,
    rowDropTarget: Node,
    actualPage: 0
}
let rowsShowed = [];
let deleteListRow = [];


function  newRow(table){
    let headers = table.children[0].children[0].childNodes;
    let row;

    if(headers.length === 0){
        alert("have to created a header first... don't you think?");
    }else{
        row = table.insertRow(1);
        adderEventRow(row);
    }
    
    let count = 0;
    headers.forEach(element => {

        let cell = row.insertCell();      
        if(count === 0){

            cell.appendChild( newCheckBox() );
        
        }else if(count === headers.length - 1){
            let i = newOptionBtn();
            console.log(newOptionBtn() )
            cell.appendChild( newOptionBtn() );

        }else{

            cell.setAttribute('type',headers[count].getAttribute('type'));
            adderEventCell(cell);
        }   
        count++;
    });

    saveJsonTable(tableToJson(table));
    buttonsPaginate(table);
    paginatedTable(table, 1);
    
}

function  newColumn(table,name,type){  

    try{
        table.children[0].children[0];
    }catch{
        table.insertRow(0);
        firstColumnHeader(table);
        lastColumnHeader(table);
    }

    let rowsTable = table.children[0].childNodes;
    let rowNumber = 0; 
    rowsTable.forEach( element => {
        let cell = document.createElement('td');
        
        if(rowNumber === 0){
            cell = document.createElement('th');
            cell.innerHTML = name;
            cell.setAttribute('id', name+'Header');
            cell.setAttribute('type',type);
            cell.setAttribute('asc','null');
            adderEventHeader(cell);
        }else{
            cell.setAttribute('type',type);
            cell.contentEditable = false;
            adderEventCell(cell);
        }   
        
        element.insertBefore(cell, element.lastChild);
        rowNumber++;
    });

    saveJsonTable(tableToJson(table));
    
}

function firstColumnHeader(table){
    let row = table.children[0].children[0];
    let cell = document.createElement('th');
    let checkBox = document.createElement('input');
    
    checkBox.type = 'checkbox';
    checkBox.onchange = function(event){
        pressAllCheckBox(event.target);
    };
    cell.appendChild(checkBox);
    row.appendChild(cell);
}

function lastColumnHeader(table){
    let row = table.children[0].children[0];
    let cell = document.createElement('th');
    let icon = document.createElement('img');

    icon.src="../download.png";
    icon.width="25"; 
    icon.width="25";

    cell.appendChild(icon);
    row.appendChild(cell);
}  

function newCheckBox(){
    let checkBox = document.createElement('input');

    checkBox.type = 'checkbox';
    checkBox.onchange = function(event){addToDeleteListRow(event.target);};
    checkBox.setAttribute('name','checkBox');
    return checkBox;
}

function newOptionBtn(){
    let icon = document.createElement('img');
    icon.src="../download.png";
    icon.width="25"; 
    icon.width="25";  
    eventOption(icon)
    return icon;
}  

function eventOption(btn){
    let modal = document.getElementById('modalOptionCell');

    btn.onclick = function(event){   
        let row = this.target = event.target.parentNode.parentNode; 
        openModelBoxForOptions(modal, event.clientX, event.clientY);

        console.log(modal.children[0]); 

        modal.children[0].onclick = function(){ 
            deleteRow(row);     
            modal.style = 'none';
            
        };

    }
    
    
    
}

function someCheckBoxSelected(){
    let checkBoxSeleted =  document.querySelector('input[name = "checkBox"]:checked');
    
    if(checkBoxSeleted == null){
        return false;
    }else{
        return true;
    }
}

function pressAllCheckBox(element){

    let rows = element.parentNode.parentNode.parentNode.childNodes;
    let state;
    let btnDelete = document.getElementById('btnDeleteRow');
    
    if(element.checked){
        state = true;
        btnDelete.style.display = 'inline-block';
    }else{
        state = false;
        btnDelete.style.display = 'none';        
    }

    let count = 0;
    rows.forEach(element => {

        let cell = element.children[0];
        let checkBox = cell.children[0];
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

    let btnDelete = document.getElementById('btnDeleteRow');
    let rowSelected = elemet.parentNode.parentNode;

    if(elemet.checked){
        btnDelete.style.display = 'inline-block';
        deleteListRow.push(rowSelected);
    }else{
        if(someCheckBoxSelected() == false){btnDelete.style.display = 'none'; };

        deleteListRow.filter( (row) => {return row !== rowSelected}); 
    }  
}


function deleteRows(table){
    
    let checkBoxHeader = table.children[0].childNodes[0].children[0].children[0];
    delete  deleteListRow.forEach(element => table.children[0].removeChild(element));

    deleteListRow = [];
    checkBoxHeader.checked = false;
    saveJsonTable(tableToJson(table));
    paginatedTable(table, dragger.actualPage);
    buttonsPaginate(table);
}       
function deleteRow(element){
    let table = element.parentNode.parentNode;
    element.parentNode.removeChild(element);
    paginatedTable(table,dragger.actualPage);
    buttonsPaginate(table);
}





function adderEventCell(element){

    element.onclick = function(event){
        editOnDoubleClick(event.target);

        if (event.ctrlKey) { 
            eventCellType(event.target);
        }  
    };

    element.onblur  = function(){
        element.contentEditable = false;
    };

    element.addEventListener('keyup', function(event){
        if(event.key === 'Enter'){
            element.contentEditable = false;
            checkerCellType(event.target);
            let table = event.target.parentNode.parentNode.parentNode;
            saveJsonTable(tableToJson(table));
        };
    });    
}

function  adderEventHeader(element){
    element.draggable="true";
    
    element.onclick = function(event){
        let table = event.target.parentNode.parentNode.parentNode;
        console.log('asc ='+event.target.getAttribute('asc'));
        sortColumn(table,getColumnNumber(event.target.id),Number(event.target.getAttribute('asc')));
    };

    element.ondragstart = function(event){
        event.target.style.opacity = 0.5;   
        dragger.columDragNumber = getColumnNumber(event.target.id);
    };

    element.ondragover = function(event){
        event.preventDefault();
    };

    element.ondragend = function(event){
        event.target.style.opacity = '1      ';   
    };

    element.ondrop = function(event){
        let table = event.target.parentNode.parentNode.parentNode
        event.preventDefault();
        dragger.columDropNumber =getColumnNumber(event.target.id);
        moveColumn(table);
        saveJsonTable(tableToJson(table));   
    };            
}

function adderEventRow(element){
    
    element.onclick = function(event){
        
        if (event.ctrlKey) { 
            element.draggable = true; 
        }

    };

    element.ondragstart = function(event){
        event.target.style.opacity = 0.5;
        dragger.rowDragTarget = event.target;      
    };

    element.ondragover = function(event){
        event.preventDefault();
    };

    element.ondragend = function(event){
        event.target.style.opacity = 1;
    };
    
    element.ondrop = function(event){
        let table = event.target.parentNode.parentNode.parentNode
        event.preventDefault(); 
        dragger.rowDropTarget = event.target.parentNode;
        moveRow(table);
        saveJsonTable(tableToJson(table));
    };            
}

function editOnDoubleClick(element){
    element.contentEditable = true;
    setTimeout(function() {
        if(document.activeElement !== element){
            element.contentEditable = false;
            let table = element.parentNode.parentNode.parentNode;
            saveJsonTable(tableToJson(table));
        }}, 300);
}


function getColumnNumber(columIdDrag){ 
    let headers = document.querySelectorAll('table tr:first-child th');
    let columnNumber = 0;

    for(var x = 0; x < headers.length; x++){

        if(headers[x].id === columIdDrag){
            columnNumber = x;
            break;
        }    

    }
    return columnNumber;
}


function moveColumn(table){
    
    let allRows = table.children[0].childNodes;
    

    allRows.forEach(element => {
        element.insertBefore(element.children[dragger.columDragNumber], element.children[dragger.columDropNumber]);
    });
}

function moveRow(table){
    
    table.children[0].insertBefore(dragger.rowDragTarget , dragger.rowDropTarget);
}


function sortColumn(table, positionColum, isAsc){
   
    let tableJson = JSON.parse(getJsonTable()); 

    if(isAsc === 1){
        
        tableJson.rows.sort(function(a,b){
            var cellA = a.cells[positionColum].value;
            var cellB = b.cells[positionColum].value;            
            return  cellA === cellB ? 0: cellA < cellB ? 1 : -1;
        });
        tableJson.headers[positionColum -1].asc = 0;
    
        
    }else if(isAsc === 0){

        tableJson.rows.sort(function(a,b){
            var cellA = a.cells[positionColum].value;
            var cellB = b.cells[positionColum].value;

            return  cellA === cellB ? 0: cellA > cellB ? 1 : -1;
        });
        tableJson.headers[positionColum -1].asc = 1;

    } else{

        tableJson.rows.sort(function(a,b){
            var cellA = a.cells[positionColum].value;
            var cellB = b.cells[positionColum].value;
            
            return  cellA === cellB ? 0: cellA > cellB ? 1 : -1;
        });
        tableJson.headers[positionColum -1].asc = 1;
    }
    
    saveJsonTable(tableJson);


    table.removeChild(table.children[0]);
    
    jsonToTable(table,tableJson);
    paginatedTable(table,1);
};



function tableToJson(table){

    let headers = table.children[0].children[0].childNodes;
    let rows = table.children[0].childNodes;

    let tableJson = {
        headers: [],
        rows: []
    };

    for(var s = 0; s < headers.length; s++){
        let header = {};
        if(s !== 0 && s !== headers.length - 1){
            header.id = headers[s].id;
            header.value = headers[s].innerText;
            header.type = headers[s].getAttribute('type');
            header.asc = headers[s].getAttribute('asc');
            header.position = s;
            tableJson.headers.push(header);
        };
    }
    


    for(s = 0; s < rows.length ; s++){
        
        let row = {};
        row.id = s;
        row.cells = [];

        let count = 0;
        rows[s].childNodes.forEach(element =>{
            
            let cell = {};
            cell.value = element.innerText;
            cell.type = element.getAttribute('type');
            cell.position = count;
            row.cells.push(cell);
            
            count++;
        });

        if(s !== 0){tableJson.rows.push(row)};
        
    }
    return tableJson;
}

function jsonToTable(table, jsonTable){
    let rowHeader = table.insertRow();

    firstColumnHeader(table);
    lastColumnHeader(table);

    let count = 0;
    jsonTable.headers.map(header => {
            
        let newHeader = document.createElement('th');
        newHeader.innerHTML = header.value;
        newHeader.setAttribute('id', header.id);
        newHeader.setAttribute('type',header.type);
        newHeader.setAttribute('asc',header.asc)
        adderEventHeader(newHeader);
        
        rowHeader.insertBefore(newHeader, rowHeader.lastChild);
        count++;
    });


    jsonTable.rows.map(row => {

        let newRow = table.insertRow();
        newRow.style.display = 'none';
        adderEventRow(newRow);

        let count = 0;
        row.cells.map(cell => {
            
            let newCell = newRow.insertCell();
            
            if(count === 0 ){
                newCell.appendChild( newCheckBox() );
            }else if(row.cells.length -1 === count){
                newCell.appendChild( newOptionBtn() );
            }else{
                newCell.innerHTML = cell.value;
                newCell.setAttribute('type',cell.type);
                newCell.contentEditable = false;
                adderEventCell(newCell);
            }

            count++;
        });
    });

    

}

function saveJsonTable(json){      
    json = JSON.stringify(json);    
    setJsonTable(json);
}


function filter(table,inputText){
    let rows = table.children[0];

    if(inputText.length > 3){


        rows.childNodes.forEach(row => {

            let includeValue = false;
            for(let s = 0; s < row.childNodes.length; s++){
                
                let cell =  row.children[s].innerText; 
                if(cell.toLowerCase().includes(inputText)){
                    includeValue = true;
                    break
                }    
            };
            
            if(includeValue === true){row.style.display = "" }
            else if(row == rows.children[0]){ }
            else{row.style.display = "none"};
        })
    }

    if(inputText.length === 1){
        
      paginatedTable(table,1);
      
    }
}


function buttonsPaginate(table){

    let rowsCount  = table.children[0].childNodes.length;
    let buttonsPaginateCount = Math.ceil((rowsCount) / 10);

    console.log(buttonsPaginateCount);

    let divPaginated = document.querySelector('.pagination');
    let btnNext = document.createElement('a');
    let btnPrevius = document.createElement('a');


    while (divPaginated.firstChild){
        divPaginated.removeChild(divPaginated.firstChild);
    }
    btnNext.href= '#';
    btnPrevius.href= '#';
    btnNext.innerHTML = 'Next';
    btnPrevius.innerHTML = 'Previus';

    btnNext.onclick = function(){ (dragger.actualPage + 1 > buttonsPaginateCount )? alert('there are no more Next pages'):
                                    paginatedTable(table, dragger.actualPage +1)}

    btnPrevius.onclick = function(){ (dragger.actualPage -1 < 1)? alert('there are no more Previus page') :
                                        paginatedTable(table, dragger.actualPage -1 ) }

    divPaginated.appendChild(btnNext);
    divPaginated.appendChild(btnPrevius);
    

    for(let s = 0; s < buttonsPaginateCount; s++){
        let btn = document.createElement('a');
        btn.innerHTML = s+1;
        btn.href= '#';
        btn.onclick  = function(event){
            paginatedTable(table, event.target.innerHTML);
        }
        divPaginated.insertBefore(btn, divPaginated.lastElementChild);
    }
    document.body.appendChild(divPaginated);
}

function paginatedTable(table, page){
    
    dragger.actualPage = Number(page);
    let rows = table.children[0].childNodes;
    let numberRowForPage = 10;  
    
    console.log(page);

    try{
    rowsShowed.map(row =>  row.style.display = 'none');
    rowsShowed = [];
    }catch{}
    
    for(var s  = page; s < rows.length; s++){
    
        if(s <= numberRowForPage * page && s > (numberRowForPage) * (page-1)){
            rows[s].style.display = '';
            rowsShowed.push(rows[s]);
        }   
    }      
}







export {adderEventCell, adderEventHeader, adderEventRow, jsonToTable , deleteRows, newRow, newColumn,
        tableToJson,firstColumnHeader, lastColumnHeader, newCheckBox, paginatedTable, buttonsPaginate,filter}

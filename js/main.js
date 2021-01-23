import { closeModelBox, openModelBoxForForm } from './ModelBox.js';
import {jsonToTable, paginatedTable, buttonsPaginate,deleteRows,newRow,newColumn,filter} from './TableActions.js';
import {getJsonTable} from './Storage.js';


var btnNewRow = document.getElementById('btnNewRow');
var btnNewColum = document.getElementById('btnNewColumn');
var btnDelete = document.getElementById('btnDeleteRow');
var btnOpenModalB = document.getElementById('btnModalB');
var btnCloseModalB = document.getElementById('btnClose');
var inputSearch = document.getElementById('inputSearch');

btnNewRow.onclick = function(event){
    let table = document.getElementById('tbl'); 
    newRow(table);     
};

btnNewColum.onclick = function(event){
    let table = document.getElementById('tbl'); 
    let cellTypeSeleted =  document.querySelector('input[name = "typeCell"]:checked');
    let inputHeaderText = document.querySelector('#inputHeader');
    
    if(inputHeaderText.value != '' && cellTypeSeleted != null){
            newColumn(table,inputHeaderText.value, cellTypeSeleted.value );
            
    }else{
            alert('check for all campos esten llenos');
    }        
};

btnDelete.onclick = function(event){
    let table = document.getElementById('tbl');  
    deleteRows(table);   
    btnDelete.style.display = 'none';
};

btnOpenModalB.onclick = function(event){
    var modal = document.getElementById('modalNewColumn');
    openModelBoxForForm(modal, event.clientX, event.clientY); 
};

btnCloseModalB.onclick = function(event){
    var modal = document.getElementById('modalNewColumn');
    closeModelBox(modal); 
};

function documentLoaded(){
    let tableJson = JSON.parse( getJsonTable() );
    let table = document.getElementById('tbl');

    if(tableJson != null){
        jsonToTable(table,tableJson);
        paginatedTable(table,1);
        buttonsPaginate(table);
    }else{
        alert('there is not table to charge');
    }
    
}


inputSearch.onkeydown = function(event){
    let table = document.getElementById('tbl'); 
    let inputText = event.target.value;
    filter(table,inputText);
}

if (document.addEventListener){
    window.addEventListener('load',documentLoaded(),false);
} else {
    window.attachEvent('onload',console.log('calgado'));
}

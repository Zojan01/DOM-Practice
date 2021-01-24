
function getJsonTable(){
   return localStorage.getItem('jsonTable');
}

function setJsonTable(json){
    localStorage.setItem('jsonTable',json);
}

export {getJsonTable,setJsonTable};
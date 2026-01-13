var insert=document.querySelector('#insert')
document.addEventListener('keydown', function(event){
    
    insert.innerHTML=`<table><tr> <th>Key</th> <th>KeyCode</th>  <th>KeyValue</th></tr> <td>${event.key===' '? 'Space' : event.key}</td> <td>${event.keyCode}</td><td>${event.code}</td></table>`;
});
console.log("hello");

//Carregamento de conteúdo
var ajax = new XMLHttpRequest();

ajax.open("GET", "./data.json", true);

ajax.send();

ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
        var data = ajax.responseText;
        var data_jason = JSON.parse(data);
        var content = document.getElementById("content");
    }
}

//Template do Card do Estabelecimento

let deferredInstallPrompt = null;
const botaoInstalar = document.getElementById('btnInstalar');

let initializeUI = function(){

    botaoInstalar.removeAttribute('hidden');
    botaoInstalar.addEventListener('click', function(){

        deferredInstallPrompt.prompt();
        deferredInstallPrompt.userChoice.then((choice) => {

            if(choice.outcome === 'accepted'){
                console.log("Usuário aceitou a instalação")
            }else{
                console.log("Usuário não aceitou a instalação");
            }
        });
    });
}

window.addEventListener('beforeinstallprompt', gravarEvento);

function gravarEvento(evt){
    deferredInstallPrompt = evt;
}

//Carregamento de conteúdo
var ajax = new XMLHttpRequest();

ajax.open("GET", "./data.json", true);

ajax.send();

ajax.onreadystatechange = function(){
    if(ajax.readyState == 4 && ajax.status == 200){
        var data = ajax.responseText;
        var data_jason = JSON.parse(data);
        var content = document.getElementById("content");
        var modal =  document.getElementById("modal")

        if(data_jason.length ==  0){
            content.innerHTML = '<div class="col-12"><div class="alert alert-warning" role="alert">Ainda não há palestras cadastradas</div></div>';
        }else{
            var html_content = "";
    
            for(var i=0; i<data_jason.length; i++){
                html_content += '<div class="row"><h2>'+data_jason[i].categoria+'</h2></div>'

                for(var j=0; j<data_jason[i].itens.length; j++){
                    html_content += card_item(data_jason[i].itens[j].nome, data_jason[i].itens[j].imagem, data_jason[i].itens[j].descricao, data_jason[i].itens[j].dia, data_jason[i].itens[j].hora, data_jason[i].itens[j].sala)
                }
            } 
            content.innerHTML = html_content;
        }
    }    
}

//Template dos cards
var card_item = function(nome, imagem, descricao){

    return '<div class="col-12 col-md-6">'+
                '<div class="card">'+
                '<img class="card-img-top" src="'+imagem+'" alt="...">'+
                '<div class="card-body">'+
                '<h5>'+nome+'</h5>'+
                '<p class="card-text description">'+descricao+'</p>'+
                '<div class="col text-center">'+
                '<button type="button" class="btn btn-link" data-toggle="modal" data-target="'+nome+'">Detalhes</button>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
}
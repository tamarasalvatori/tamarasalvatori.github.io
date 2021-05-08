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

        if(data_jason.length ==  0){
            content.innerHTML = '<div class="col-12"><div class="alert alert-warning" role="alert">Ainda não há palestras cadastradas</div></div>';
        }else{
            var html_content = "";
    
            for(var i=0; i<data_jason.length; i++){
                html_content += '<div class="row"><h2>'+data_jason[i].categoria+'</h2></div>'

                for(var j=0; j<data_jason[i].itens.length; j++){
                    html_content += card_item(data_jason[i].itens[j].nome, data_jason[i].itens[j].imagem, data_jason[i].itens[j].descricao, data_jason[i].itens[j].link)
                }
            } 
            content.innerHTML = html_content;
        }
    }    
}

//Template dos cards
var card_item = function(nome, imagem, descricao, link){

    return '<div class="col-12 col-md-6">'+
                '<div class="card">'+
                '<img class="card-img-top" src="'+imagem+'" alt="...">'+
                '<div class="card-body">'+
                '<h5>'+nome+'</h5>'+
                '<p class="card-text description">'+descricao+'</p>'+
                '<div class="col text-center">'+
                '<a class="btn btn-link" href="'+link+'" role="button">Currículo Lattes</a>'+
                '</div>'+
                '</div>'+
                '</div>'+
                '</div>';
}

//Cache conteúdo dinâmico
var cache_cards = function(data_json){

    if('caches' in window){

        caches.delete('eeefis-conteudo').then(function(){
            console.log('Deletando cache de conteúdo antigo');

            if(data_json.length > 0){
                var files = ['dados.json'];

                //Entrando na categoria
                for(var i = 0; i < data_json.length; i++){

                    //Entrando no item
                    for(var j = 0; j < data_json[i].itens.length; j++){
                        if(files.indexOf(data_json[i].itens[j].imagem) == -1){
                            files.push(data_json[i].itens[j].imagem);
                        }
                    }
                }

                caches.open('eeefis-conteudo').then(function (cache){
                    cache.addAll(files).then(function(){
                        console.log("Arquivos de conteúdo cacheados!");
                    });
                });
            }
        });
    }
}
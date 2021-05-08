'use strict';

const CACHE_NAME = "programacao_eeefis_2022";

const FILES_TO_CACHE = [
    
    "../images/icons/favicon.ico",
    "../images/bg5.jpg",
    "../imagem/offline.png",
    "../images/atom_logo.png",
    "../css/styles.css",
    "../css/bootstrap.min.css",
    "../css/bootstrap.min.css.map",
    "../js/bootstrap.min.js",
    "../js/bootstrap.min.js.map",
    "../js/jquery-3.2.1.min.js",
    "../js/popper.min.js",
    "../js/popper.min.js.map",
    "../offline.html"
];

self.addEventListener('install', (evt) => {
    console.log("[ServiceWorker] Instalando...");
    
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("[ServiceWorker] Fazendo cache dos arquivos da aplicação...");
            return cache.addAll(FILES_TO_CACHE);
        })
    )
})

self.addEventListener('activate', (evt) => {
    console.log("[ServiceWorker] Ativando...");

    evt.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                console.log("[ServiceWorker] Removendo cache antigo...");
                if(key !== CACHE_NAME){
                    return caches.delete(key);
                }
            }))
        })
    );
    self.clients.claim();
})

self.addEventListener('fetch', (evt) => {
    if(evt.request.mode !== 'navigate'){
        return; 
    }
    evt.respondWith(
        fetch(evt.request).catch(() => {
            return caches.open(CACHE_NAME).then((cache) => {
                return cache.match('offline.html');
            })
        })
    )
});
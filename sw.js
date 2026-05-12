const CACHE_NAME = 'festajunina-cache-v8';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './images/logo.webp',
    './images/banner.webp',
    './images/banner2.webp',
    './images/whats.webp',
    './images/64.png',
    './images/512.png'
];
//Instala o Service Worker e coloc os arquivoc no Cache
self.addEventListener('install', (event)=>{
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache)=>{
            console.log('Sabor Junino🌽');
            return cache.addAll(ASSETS);
        })
    );
});
//Faz as requisições olharem o cache primeiro 
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);

        })
    );
});
//Remove caches antigo quando atualizar
self.addEventListener('activate', (event)=> {
    event.waitUntil(
        caches.keys().then((keys)=>{
            return Promise.all(
                keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
            );
        })
    );
});
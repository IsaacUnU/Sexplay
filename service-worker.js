self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open("picante-v1").then((cache) => {
            return cache.addAll([
                "/",  // Asegura que la raíz también se guarda en caché
                "/index.html",
                "/manifest.json",
                "/icon-192.png",
                "/icon-512.png"
            ]);
        })
        .catch((error) => console.error("Error al cachear archivos", error))
    );
    self.skipWaiting(); // Asegura que se actualiza el Service Worker sin esperar
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

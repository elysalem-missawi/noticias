const API_KEY = '36eee36013a34c8bbb562c33a4c4e141'; // Reemplaza con tu clave de API de NewsAPI

async function obtenerYMostrarNoticias() {
    try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=36eee36013a34c8bbb562c33a4c4e141');
        
        if (!response.ok) {
            throw new Error(`Error al obtener noticias: ${response.status}`);
        }

        const data = await response.json();
        const noticias = data.articles;

        if (noticias && noticias.length > 0) {
            mostrarNoticias(noticias, 'ultimas-noticias-container');
        } else {
            document.getElementById('ultimas-noticias-container').innerHTML = '<p>No se encontraron noticias de deportes.</p>';
        }
    } catch (error) {
        console.error('Error al obtener noticias:', error);
        document.getElementById('ultimas-noticias-container').innerHTML = '<p>Error al cargar las noticias.</p>';
    }
}

function mostrarNoticias(noticias, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    let html = '';

    noticias.forEach(noticia => {
        html += `
            <article class="noticia">
                <img src="${noticia.urlToImage || 'img/deporte-default.jpg'}" alt="${noticia.title}">
                <h3>${noticia.title}</h3>
                <p>${noticia.description || 'Sin resumen disponible.'}</p>
                <a href="${noticia.url}" target="_blank">Leer más</a>
            </article>
        `;
    });

    contenedor.innerHTML = html;
}

obtenerYMostrarNoticias();

const contenedor = document.getElementById('contenedor-noticias');
      
        // Función de fecha
        function actualizarFecha() {
          const fechaElemento = document.querySelector('.fecha');
          const fechaActual = new Date();
      
          const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
          const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      
          const diaSemana = diasSemana[fechaActual.getDay()];
          const dia = fechaActual.getDate();
          const mes = meses[fechaActual.getMonth()];
          const anio = fechaActual.getFullYear();
          if (fechaElemento) fechaElemento.textContent = `${diaSemana}, ${dia} de ${mes} de ${anio}`;
        }
      
        actualizarFecha();
        setInterval(actualizarFecha, 60000);

document.addEventListener('DOMContentLoaded', function() {
  // Detecta la sección de noticias destacadas y últimas noticias en cualquier página
  let dataFile = '';
  if (window.location.pathname.includes('economia')) {
    dataFile = 'economia-data.json';
  } else if (window.location.pathname.includes('noticias')) {
    dataFile = 'noticias-data.json';
  } else {
    dataFile = 'noticias-data.json'; // Por defecto para index y otras
  }

  fetch(dataFile)
    .then(res => res.json())
    .then(data => {
      if (data.noticiasDestacadas) renderNoticiasDestacadas(data.noticiasDestacadas);
      if (data.ultimasNoticias) renderUltimasNoticias(data.ultimasNoticias);
      if (data.categorias) renderCategorias(data.categorias);
      if (data.analisisOpinion) renderAnalisisOpinion(data.analisisOpinion);
      if (data.indicadores) renderIndicadores(data.indicadores);
      if (data.expertos) renderExpertos(data.expertos);
    });

  // API SOLO para internacional.html
  if (window.location.pathname.includes('internacional')) {
    const contenedor = document.getElementById('contenedor-noticias');
    if (contenedor) {
      fetch('https://api.currentsapi.services/v1/latest-news?category=world&language=es&apiKey=WjB-X2hqUgV-0f5-_O6K-N-FmlmvWfPGsdPtZGND-kmPVX9a')
        .then(response => response.json())
        .then(data => {
          if (!data.news || data.news.length === 0) {
            contenedor.innerHTML = '<p>No hay noticias internacionales disponibles.</p>';
            return;
          }
          contenedor.innerHTML = '';
          data.news.slice(0, 4).forEach(noticia => {
            const article = document.createElement('article');
            article.classList.add('noticia-destacada');
            article.innerHTML = `
              <img src="${noticia.image || 'img/default.jpg'}" alt="Noticia">
              <h3>${noticia.title}</h3>
              <p>${noticia.description || 'Sin descripción disponible.'}</p>
              <a href="${noticia.url}" target="_blank">Leer más</a>
            `;
            contenedor.appendChild(article);
          });
        })
        .catch(error => {
          contenedor.innerHTML = '<p>Error al cargar las noticias internacionales.</p>';
        });
    }
  }

  function renderNoticiasDestacadas(noticias) {
    const seccion = document.querySelector('.noticias-destacadas');
    if (!seccion) return;
    seccion.innerHTML = '<h2>Noticias Destacadas</h2>' + noticias.map(n => `
      <article class="noticia-destacada">
        <img src="${n.imagen}" alt="${n.titulo}">
        <h3>${n.titulo}</h3>
        <p>${n.descripcion}</p>
        <a href="${n.enlace}">Leer más</a>
      </article>
    `).join('');
  }

  function renderUltimasNoticias(noticias) {
    const seccion = document.querySelector('.ultimas-noticias');
    if (!seccion) return;
    seccion.innerHTML = '<h2>Últimas Noticias</h2>' + noticias.map(n => `
      <article class="noticia">
        <img src="${n.imagen}" alt="${n.titulo}">
        <h3>${n.titulo}</h3>
        <p>${n.descripcion}</p>
        <a href="${n.enlace}">Leer más</a>
      </article>
    `).join('');
  }

  function renderCategorias(categorias) {
    const seccion = document.querySelector('.categorias');
    if (!seccion) return;
    seccion.innerHTML = '<h2>Categorías</h2><ul>' + categorias.map(c => `<li><a href="#">${c}</a></li>`).join('') + '</ul>';
  }

  function renderAnalisisOpinion(analisis) {
    const seccion = document.querySelector('.analisis-opinion');
    if (!seccion) return;
    seccion.innerHTML = '<h2>Análisis y Opinión</h2>' + analisis.map(a => `
      <article class="articulo-opinion">
        <h3>${a.titulo}</h3>
        <p>Autor: ${a.autor}</p>
        <p>${a.resumen}</p>
        <a href="${a.enlace}">Leer más</a>
      </article>
    `).join('');
  }

  function renderIndicadores(indicadores) {
    const seccion = document.querySelector('.indicadores-economicos .indicadores-lista');
    if (!seccion) return;
    seccion.innerHTML = indicadores.map(i => `
      <div class="indicador">
        <span class="nombre">${i.nombre}</span>
        <span class="valor">${i.valor}</span>
      </div>
    `).join('');
  }

  function renderExpertos(expertos) {
    const seccion = document.querySelector('.expertos-opinan .expertos-lista');
    if (!seccion) return;
    seccion.innerHTML = expertos.map(e => `
      <div class="experto">
        <img src="${e.imagen}" alt="Experto ${e.nombre}">
        <div>
          <p class="nombre">${e.nombre}</p>
          <p class="cita">“${e.cita}”</p>
        </div>
      </div>
    `).join('');
  }
});
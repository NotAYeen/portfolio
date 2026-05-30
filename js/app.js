const portfolioData = {
  "repositorio_proyectos": [
    {
      "id": "win-detail-moda",
      "categoria": "MOBILE COMPILATION",
      "nombre": "App Móvil Corporativa — Alta Costura",
      "tecnologias": ["Flutter", "Dart"],
      "entornos": ["iOS", "Android"],
      "estado": "ACTIVE",
      "descripcion": "Solución de software móvil integral desarrollada a pedido para digitalizar y centralizar por completo el flujo técnico y operativo de una casa de modas.",
      "caracteristicas_tecnicas": [
        "Calculadora Métrica: Algoritmo integrado de alta precisión para el patronaje industrial automatizado.",
        "Extractor Cromático Inteligente: Módulo basado en la teoría del color que procesa imágenes seleccionadas por el usuario para segmentar paletas de colores funcionales.",
        "CRM de Confección: Base de datos interna optimizada para almacenar fichas técnicas detalladas de las prendas vinculadas al registro de clientes.",
        "Interfaz Adaptativa: Soporte nativo para Modo Noche (Dark Mode).",
        "API de Enlace Directo: Módulo de comunicación inmediata integrado en el núcleo para llamadas y mensajería instantánea hacia el cliente."
      ]
    },
    {
      "id": "win-detail-face",
      "categoria": "COMPUTER VISION",
      "nombre": "Sistema BioCrop — Recorte Facial Autónomo",
      "tecnologias": ["Python", "OpenCV", "CustomTkinter"],
      "entornos": ["PC OS"],
      "estado": "DEPLOYED",
      "descripcion": "Software de visión artificial enfocado en la eliminación del 100% de las tareas manuales y repetitivas en el procesamiento masivo de imágenes de personal para bases de datos.",
      "caracteristicas_tecnicas": [
        "Detección Biométrica: Análisis lógico de pixeles para la localización exacta de rostros en fotografías corporativas.",
        "Normalización Autónoma: Recorte, redimensionamiento y ajuste milimétrico automático de las imágenes según los estándares rígidos de las bases de datos de destino."
      ]
    },
    {
      "id": "win-detail-cover",
      "categoria": "GAME ENGINE WORK",
      "nombre": "The Cover Artist: 128-Bit Legacy",
      "tecnologias": ["Godot Engine"],
      "entornos": ["PC"],
      "estado": "DEV",
      "descripcion": "Videojuego de simulación interactiva enfocado en la preservación metodológica y gráfica del diseño de portadas de la era clásica de los 128 bits.",
      "caracteristicas_tecnicas": [
        "Gestión de Assets: Arquitectura interna optimizada en Godot para la manipulación dinámica y edición de portadas retro.",
        "Mecánicas Orientadas al Usuario: Flujo lógico diseñado para emular las herramientas de creación clásicas de la era de PlayStation 2."
      ]
    },
    {
      "id": "win-detail-school",
      "categoria": "WEB UX REFORM",
      "nombre": "Rediseño de Portal Web Institucional",
      "tecnologias": ["HTML5", "CSS3", "Vanilla JS"],
      "entornos": ["Web"],
      "estado": "LIVE",
      "descripcion": "Modernización y reforma estructural completa de la plataforma oficial de una institución de educación media superior (CONALEP) para optimizar la experiencia de usuario.",
      "caracteristicas_tecnicas": [
        "Optimización de Interfaz: Maquetación responsiva a código limpio, eliminando dependencias pesadas para maximizar la velocidad de carga.",
        "Arquitectura de la Información: Reestructuración lógica para reducir los pasos críticos en el acceso a trámites, formatos de asesoría y consultas estudiantiles."
      ]
    },
    {
      "id": "win-detail-cafe",
      "categoria": "QR INTERACTION",
      "nombre": "App de Pedidos & Fidelización QR",
      "tecnologias": ["Flutter", "Mobile Architecture"],
      "entornos": ["Android", "iOS"],
      "estado": "ARCHIVED",
      "descripcion": "Sistema móvil integral para comedores escolares diseñado con el objetivo de mitigar tiempos de espera y automatizar programas de lealtad.",
      "caracteristicas_tecnicas": [
        "Comandas Digitales: Procesamiento y envío de órdenes en tiempo real desde terminales móviles hacia la cocina.",
        "Fidelización QR Dinámica: Generación y escaneo de códigos integrados para la asignación automatizada de puntos de lealtad al usuario."
      ]
    }
  ],
  "servicios_infraestructura": [
    {
      "area": "Control de Accesos & BDD",
      "icono": "ph-lock-key",
      "servicios": [
        "Manipulación e instalación lógica de hardware de torniquetes automatizados para control perimetral.",
        "Administración y enlace de infraestructura perimetral con bases de datos relacionales para el monitoreo de entradas y salidas en tiempo real."
      ]
    },
    {
      "area": "Mantenimiento Técnico",
      "icono": "ph-wrench",
      "servicios": [
        "Diagnóstico físico y lógico integral de infraestructura corporativa y escolar.",
        "Optimización masiva de rendimiento en laboratorios informáticos completos y salones de cómputo.",
        "Despliegues controlados y actualización segura de sistemas operativos Microsoft Windows y entornos basados en Linux."
      ]
    },
    {
      "area": "Ciberseguridad & Forense",
      "icono": "ph-shield-check",
      "servicios": [
        "Localización, aislamiento y remoción forzada de agentes patógenos y virus complejos en almacenamiento local.",
        "Extracción crítica forense y restauración de archivos lógicos perdidos o eliminados en dispositivos dañados."
      ]
    },
    {
      "area": "Arquitectura de Soluciones",
      "icono": "ph-cpu",
      "servicios": [
        "Análisis y diseño de alternativas tecnológicas no convencionales adaptadas estrictamente al presupuesto y necesidades extremas de optimización."
      ]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
    initTickers();
    startClock();
    renderProjects();
    renderServices();
    initScrollAnimations();
    initModals();
    initAntonHover();
});

async function initTickers() {
    const dateOpts = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    const dateStr = new Date().toLocaleDateString('en-US', dateOpts).toUpperCase();
    
    // Initial render
    renderTickers(dateStr, "FETCHING LOC...", "FETCHING WX...");
    
    try {
        const ipRes = await fetch('https://ipinfo.io/json');
        const ipData = await ipRes.json();
        const [lat, lon] = ipData.loc.split(',');
        
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        const weatherData = await weatherRes.json();
        
        const locStr = `${ipData.city || 'UNKNOWN'}, ${ipData.country || 'SYS'}`.toUpperCase();
        const wxStr = `${weatherData.current_weather.temperature}°C // WIND ${weatherData.current_weather.windspeed}KM/H`;
        
        renderTickers(dateStr, locStr, wxStr);
    } catch (e) {
        renderTickers(dateStr, "LOC: ENCRYPTED", "WX: UNAVAILABLE");
    }
}

function renderTickers(dateStr, locStr, wxStr) {
    const text1 = `<span>BOOT SEQUENCE INITIATED</span> <span><i class='ph-fill ph-squares-four'></i></span> <span>LOC: ${locStr}</span> <span><i class='ph-fill ph-squares-four'></i></span> <span>${dateStr}</span> <span><i class='ph-fill ph-squares-four'></i></span> <span>システム開始</span> <span><i class='ph-fill ph-squares-four'></i></span> `;
    const text2 = `<span>CAPACITY: 100%</span> <span><i class='ph-fill ph-checkerboard'></i></span> <span>WX: ${wxStr}</span> <span><i class='ph-fill ph-checkerboard'></i></span> <span>GHOSTLINE CORE</span> <span><i class='ph-fill ph-checkerboard'></i></span> <span>実験室</span> <span><i class='ph-fill ph-checkerboard'></i></span> `;
    
    const el1 = document.getElementById('ticker-1');
    const el2 = document.getElementById('ticker-2');
    if (el1) el1.innerHTML = text1.repeat(4);
    if (el2) el2.innerHTML = text2.repeat(4);
}

function startClock() {
    const clockEl = document.getElementById('sys-clock');
    if (!clockEl) return;
    setInterval(() => {
        const now = new Date();
        clockEl.textContent = now.toLocaleTimeString('en-US');
    }, 1000);
}

function initAntonHover() {
    const letters = document.querySelectorAll('.anton-letter');
    letters.forEach(span => {
        span.addEventListener('mousemove', (e) => {
            const rect = span.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            span.style.setProperty('--x', `${x}px`);
            span.style.setProperty('--y', `${y}px`);
            span.style.setProperty('--r', '150%');
        });
        
        span.addEventListener('mouseleave', () => {
            span.style.setProperty('--r', '0px');
        });
    });
}

const hoverPalette = ['var(--c-teal)', 'var(--c-coral)', '#E2B714', '#809BCE', '#B8E0D2'];

function renderProjects() {
    const container = document.getElementById('projects-container');
    portfolioData.repositorio_proyectos.forEach((proj, index) => {
        const item = document.createElement('div');
        item.className = 'blueprint-item clickable';
        item.dataset.type = 'project';
        item.dataset.index = index;
        item.style.setProperty('--hover-bg', hoverPalette[index % hoverPalette.length]);

        item.innerHTML = `
            <div class="bp-meta">
                <span>[${proj.id.toUpperCase()}]</span>
                <span style="color: currentColor; opacity: 0.8;">${proj.estado}</span>
            </div>
            <h3 class="bp-title">${proj.nombre}</h3>
            <p class="bp-desc">${proj.categoria} // ${proj.tecnologias.join(', ')}</p>
        `;
        container.appendChild(item);
    });
}

function renderServices() {
    const container = document.getElementById('services-container');
    portfolioData.servicios_infraestructura.forEach((srv, index) => {
        const item = document.createElement('div');
        item.className = 'blueprint-item clickable';
        item.dataset.type = 'services';
        item.dataset.index = index;
        item.style.setProperty('--hover-bg', hoverPalette[(index + 2) % hoverPalette.length]);

        item.innerHTML = `
            <div class="bp-meta">
                <span><i class="ph-bold ${srv.icono}"></i> ${srv.area.toUpperCase()}</span>
            </div>
            <p class="bp-desc">${srv.servicios[0].substring(0, 80)}...</p>
        `;
        container.appendChild(item);
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.blueprint-item').forEach((el, index) => {
        el.style.transitionDelay = `${(index % 4) * 0.1}s`;
        observer.observe(el);
    });
}

function initModals() {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    const body = document.getElementById('modal-body');

    document.body.addEventListener('click', (e) => {
        const card = e.target.closest('.clickable');
        if (!card) return;

        const type = card.dataset.type;

        if (type === 'project') {
            const proj = portfolioData.repositorio_proyectos[card.dataset.index];
            body.innerHTML = `
                <div class="jigsaw-grid">
                    <div class="jigsaw-panel jigsaw-red">
                        <h2 style="font-family: var(--font-heading); font-weight:900; font-size: 3rem; line-height: 1.1;">${proj.nombre}</h2>
                        <div style="display:flex; justify-content:space-between; font-weight:bold; margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px dashed currentColor;">
                            <span>${proj.categoria}</span>
                            <span>${proj.estado}</span>
                            <span>${proj.entornos.join(', ')}</span>
                        </div>
                    </div>
                    <div class="jigsaw-panel jigsaw-blue">
                        <h3 style="font-family: var(--font-heading); font-weight:900; font-size: 1.5rem; margin-bottom: 1rem;">// TECH_STACK</h3>
                        <div style="font-weight: bold; margin-bottom: 2rem;">${proj.tecnologias.join(' / ')}</div>
                        <div style="font-weight: bold; font-size: 1rem; line-height: 1.6; opacity: 0.9;">
                            ${proj.descripcion}
                        </div>
                    </div>
                    <div class="jigsaw-panel jigsaw-beige">
                        <h3 style="font-family: var(--font-heading); font-weight:900; font-size: 1.5rem; margin-bottom: 1rem;">// FEATURES</h3>
                        <ul style="list-style:none; display:flex; flex-direction:column; gap:1rem;">
                            ${proj.caracteristicas_tecnicas.map(f => `<li style="padding-left:1.5rem; position:relative; font-weight:bold; line-height: 1.4;"><span style="position:absolute; left:0; font-weight:900;">></span>${f}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        } else if (type === 'services') {
            const srv = portfolioData.servicios_infraestructura[card.dataset.index];
            body.innerHTML = `
                <div class="jigsaw-grid">
                    <div class="jigsaw-panel jigsaw-red">
                        <h2 style="font-family: var(--font-heading); font-weight:900; font-size: 3rem; line-height: 1.1;"><i class="ph-bold ${srv.icono}"></i> ${srv.area}</h2>
                        <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 2px dashed currentColor; font-weight:bold;">
                            <span>INFRASTRUCTURE PROTOCOL // ROOT ACCESS</span>
                        </div>
                    </div>
                    <div class="jigsaw-panel jigsaw-blue" style="grid-column: 1 / 3; border-radius: 10px 10px 40px 40px;">
                        <ul style="list-style:none; display:flex; flex-direction:column; gap:1.5rem; font-size:1.1rem; font-weight: bold;">
                            ${srv.servicios.map(s => `<li style="padding-left:1.5rem; position:relative;"><span style="position:absolute; left:0; font-weight:900;">></span>${s}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        }

        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    });

    const closeModal = () => {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
}

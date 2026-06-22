const portfolioData = {
  "repositorio_proyectos": [
    {
      "id": "win-detail-web",
      "categoria": "CASO DE ÉXITO: SITIOS WEB",
      "nombre": "Diseño de Páginas Web",
      "tecnologias": ["Web"],
      "entornos": ["Negocios", "Marcas"],
      "estado": "DISPONIBLE",
      "descripcion": "Diseñamos páginas web modernas, atractivas y ultra rápidas para darle presencia profesional a tu negocio en internet.",
      "caracteristicas_tecnicas": [
        "Diseño que vende: Páginas claras que guían a tus clientes directamente a comprar o contactarte.",
        "Aparece en Google: Optimizamos tu sitio para que sea fácil de encontrar cuando busquen tus servicios.",
        "Se adapta a todo: Tu página se verá perfecta tanto en celulares como en computadoras."
      ]
    },
    {
      "id": "win-detail-moda",
      "categoria": "CASO DE ÉXITO: APP MÓVIL",
      "nombre": "Aplicaciones Móviles a Medida",
      "tecnologias": ["Android", "iOS"],
      "entornos": ["Negocios", "Empresas"],
      "estado": "DISPONIBLE",
      "descripcion": "Desarrollamos aplicaciones móviles personalizadas para llevar el control, organización y ventas de tu negocio directamente al celular de tus clientes.",
      "caracteristicas_tecnicas": [
        "Digitaliza tus procesos: Pasa del papel y lápiz a herramientas automáticas en tu teléfono.",
        "Atención 24/7: Tus clientes pueden ver tus servicios, productos o agendar citas en cualquier momento desde la App.",
        "Fidelización: Mantén a tus clientes conectados a tu negocio con un solo toque en sus celulares."
      ]
    },
    {
      "id": "win-detail-auto",
      "categoria": "SOLUCIONES CORPORATIVAS",
      "nombre": "Sistemas Inteligentes de Negocio",
      "tecnologias": ["Software"],
      "entornos": ["Oficinas", "PC"],
      "estado": "DISPONIBLE",
      "descripcion": "Si tu personal pierde horas haciendo trabajo manual y repetitivo, necesitas un sistema inteligente que lo haga por ti.",
      "caracteristicas_tecnicas": [
        "Trabajadores incansables: Los programas de software automatizado trabajan 24/7 sin distracciones ni errores.",
        "Procesos súper rápidos: Lo que a un humano le toma horas hacer, el programa lo termina en segundos.",
        "Organización perfecta: Deja de perder facturas y correos, el sistema captura y ordena toda la información."
      ]
    }
  ],
  "servicios_infraestructura": [
    {
      "area": "Mantenimiento de PC",
      "icono": "ph-wrench",
      "servicios": [
        "Reparación de computadoras lentas o que no encienden para que vuelvan a funcionar como nuevas.",
        "Actualización de piezas (hardware) para darle más años de vida útil a tu equipo actual.",
        "Instalación limpia de Windows y todos los programas básicos que necesitas para tu oficina o escuela."
      ],
      "tecnologias": ["Hardware", "Windows"]
    },
    {
      "area": "Vacuna Antivirus",
      "icono": "ph-shield-check",
      "servicios": [
        "Limpieza profunda de virus y programas espía que ponen en riesgo tu información y vuelven lenta tu máquina.",
        "Rescate de archivos ocultos o borrados en memorias USB dañadas o discos duros.",
        "Instalación de protección definitiva para que navegues por internet con tranquilidad."
      ],
      "tecnologias": ["Seguridad", "Software"]
    },
    {
      "area": "Redes Wi-Fi",
      "icono": "ph-wifi-high",
      "servicios": [
        "Mejora de señal de internet para que el Wi-Fi llegue a todas las habitaciones y rincones sin cortes.",
        "Diseño de redes para oficinas, conectando de forma segura múltiples computadoras, impresoras y cajas registradoras."
      ],
      "tecnologias": ["Redes", "Routers"]
    },
    {
      "area": "Control de Accesos",
      "icono": "ph-lock-key",
      "servicios": [
        "Instalación de torniquetes y cerraduras electrónicas que abren con huella digital, rostro o tarjeta.",
        "Configuración del sistema para llevar el registro exacto y automático de asistencia de tus empleados."
      ],
      "tecnologias": ["Torniquetes", "Biometría"]
    },
    {
      "area": "Cámaras de Seguridad",
      "icono": "ph-video-camera",
      "servicios": [
        "Instalación de cámaras de videovigilancia de alta definición (CCTV).",
        "Configuración remota para que vigiles tu negocio o casa en vivo desde tu celular en cualquier lugar."
      ],
      "tecnologias": ["CCTV", "Seguridad"]
    },
    {
      "area": "Bases de Datos Seguras",
      "icono": "ph-database",
      "servicios": [
        "Diseño de bases de datos blindadas para organizar tu inventario, ventas y datos de clientes.",
        "Sistemas de respaldo automático en la nube para que jamás pierdas la información vital de tu negocio ante accidentes."
      ],
      "tecnologias": ["Nube", "Bases de Datos"]
    }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
    initTickers();
    // startClock();
    // renderProjects();
    // renderServices();
    // initScrollAnimations();
    // initModals();
    // initAntonHover();
    // initBadgeHover();
    // initTriangleSpin();
    initAccordionModals();
    initColorblindMode();
    initStarfield();
    initTaskii();
    initBootSequence();
});

function initAccordionModals() {
    const cols = document.querySelectorAll('.clickable-col');
    cols.forEach(col => {
        col.addEventListener('click', (e) => {
            if (e.target.closest('#side-badge')) return;
            const id = col.id;
            if (id === 'col-ghostline') openFilteredServicesModal('red');
            else if (id === 'col-mobile') openFilteredProjectsModal('mobile');
            else if (id === 'col-bdd') openFilteredServicesModal('bdd');
        });
    });

    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    
    const closeModal = () => {
        overlay.classList.remove('active');
        document.querySelectorAll('.ticker-content').forEach(t => t.style.animationPlayState = 'running');
    };
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay && overlay.classList.contains('active')) {
            closeModal();
        }
    });
}

function openFilteredProjectsModal(filterType) {
    if (typeof portfolioData === 'undefined') return;
    let title = "PÁGINAS WEB Y APPS";
    let items = portfolioData.repositorio_proyectos;
    openSplitModal(title, items, 'project');
}

function initColorblindMode() {
    const btn = document.getElementById('btn-colorblind');
    if (!btn) return;

    // Load preference
    const isColorblind = localStorage.getItem('colorblind-mode') === 'true';
    if (isColorblind) {
        document.body.classList.add('colorblind-mode');
    }

    btn.addEventListener('click', () => {
        document.body.classList.toggle('colorblind-mode');
        const isActive = document.body.classList.contains('colorblind-mode');
        localStorage.setItem('colorblind-mode', isActive);
    });
}

function openFilteredServicesModal(filterType) {
    if (typeof portfolioData === 'undefined') return;
    let title = "SERVICIOS";
    let items = portfolioData.servicios_infraestructura;
    if (filterType === 'bdd') {
        title = "SEGURIDAD Y CONTROL";
        items = items.filter(s => s.area.includes("Accesos") || s.area.includes("Cámaras") || s.area.includes("Bases"));
    } else if (filterType === 'red') {
        title = "SOPORTE Y MANTENIMIENTO";
        items = items.filter(s => !s.area.includes("Accesos") && !s.area.includes("Cámaras") && !s.area.includes("Bases"));
    }
    openSplitModal(title, items, 'service');
}

function openSplitModal(title, items, type) {
    const body = document.getElementById('modal-body');
    body.innerHTML = `
        <div class="cinematic-layout" id="cinematic-layout">
            <div class="cinematic-nav-pane">
                <div class="cinematic-nav-header">${title}</div>
                <div class="cinematic-nav-list" id="modal-nav-list"></div>
            </div>
            <div class="cinematic-detail-pane" id="modal-detail-pane">
                <div style="display:flex; height:100%; align-items:center; justify-content:center; opacity:0.6; font-size:1.5rem; font-family:var(--font-heading);">
                    Cargando información...
                </div>
            </div>
            <button class="mobile-back-btn" id="mobile-back-btn">← VOLVER A LA LISTA</button>
        </div>
    `;

    const navList = document.getElementById('modal-nav-list');
    const detailPane = document.getElementById('modal-detail-pane');

    items.forEach((item, index) => {
        const navItem = document.createElement('div');
        navItem.className = 'cinematic-nav-item';
        
        let navTitle = type === 'project' ? item.nombre : item.area;
        let navMeta = type === 'project' ? `[${item.id.toUpperCase()}]` : `PROTOCOLO: ${item.icono.replace('ph-','')}`;
        
        navItem.innerHTML = `
            <div class="cinematic-nav-meta">${navMeta}</div>
            <div class="cinematic-nav-title">${navTitle}</div>
        `;
        
        navItem.addEventListener('click', () => {
            document.querySelectorAll('.cinematic-nav-item').forEach(el => el.classList.remove('active'));
            navItem.classList.add('active');
            renderDetailPane(item, type, detailPane);
            const layout = document.getElementById('cinematic-layout');
            if (layout) layout.classList.add('viewing-detail');
        });
        
        navList.appendChild(navItem);
    });

    document.getElementById('mobile-back-btn').addEventListener('click', () => {
        const layout = document.getElementById('cinematic-layout');
        if (layout) layout.classList.remove('viewing-detail');
    });

    document.getElementById('modal-overlay').classList.add('active');
    
    if(items.length > 0 && window.innerWidth > 900) {
        navList.firstChild.click();
    }
}

function renderDetailPane(item, type, container) {
    container.style.transition = 'opacity 0.2s ease, filter 0.2s ease';
    container.style.opacity = '0';
    container.style.filter = 'blur(10px)';
    
    setTimeout(() => {
        let html = '';
        if (type === 'project') {
            html = `
                <div class="cinematic-content spotlight-card animate-fade-up" style="padding: 2rem; border-radius: 12px;">
                    <div class="c-header-block">
                        <div class="c-tags">
                            <span class="c-tag">ESTADO: ${item.estado}</span>
                            <span class="c-tag">ENTORNO: ${item.entornos[0]}</span>
                            <span class="c-tag" style="border-color:var(--c-teal); color:var(--c-teal);">[ ${item.categoria} ]</span>
                        </div>
                        <h1 class="c-giant-title">${item.nombre}</h1>
                        <p class="c-description" style="font-family: var(--font-heading);">${item.descripcion}</p>
                    </div>
                    
                    <div class="c-grid">
                        <div class="c-section">
                            <h3 class="c-section-title">// ETIQUETAS</h3>
                            <div class="c-tech-list">
                                ${item.tecnologias.map(t => `<span class="c-tech-badge">${t}</span>`).join('')}
                            </div>
                        </div>
                        <div class="c-section">
                            <h3 class="c-section-title">// ESPECIFICACIONES</h3>
                            <ul class="c-specs-list">
                                ${item.caracteristicas_tecnicas.map(f => `<li>${f}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>
            `;
        } else {
            html = `
                <div class="cinematic-content spotlight-card animate-fade-up" style="padding: 2rem; border-radius: 12px;">
                    <div class="c-header-block">
                        <div class="c-tags"><span class="c-tag">PROTOCOLO ACTIVO</span></div>
                        <h1 class="c-giant-title"><i class="ph-bold ${item.icono}"></i> ${item.area}</h1>
                    </div>
                    
                    <div class="c-grid">
                        <div class="c-section">
                            <h3 class="c-section-title">// SERVICIOS</h3>
                            <ul class="c-specs-list">
                                ${item.servicios.map((s, i) => `<li><strong style="color:var(--c-teal);">[T_0${i+1}]</strong> ${s}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="c-section">
                            <h3 class="c-section-title">// ETIQUETAS</h3>
                            <div class="c-tech-list">
                                ${item.tecnologias.map(t => `<span class="c-tech-badge">${t}</span>`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        container.innerHTML = html;
        container.style.filter = 'none';
        container.style.transition = 'opacity 0.1s ease';
        container.style.opacity = '1';
        
        // Trigger scramble on giant title
        container.querySelectorAll('.scramble-target').forEach(el => scrambleText(el));
    }, 200);
}

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
        span.addEventListener('pointermove', (e) => {
            const rect = span.getBoundingClientRect();
            span.style.setProperty('--x', e.clientX - rect.left);
            span.style.setProperty('--y', e.clientY - rect.top);
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
            <div class="blueprint-content">
                <div class="bp-meta">
                    <span>[${proj.id.toUpperCase()}]</span>
                    <span style="color: currentColor; opacity: 0.8;">${proj.estado}</span>
                </div>
                <h3 class="bp-title">${proj.nombre}</h3>
                <p class="bp-desc">${proj.categoria} // ${proj.tecnologias.join(', ')}</p>
            </div>
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
            <div class="blueprint-content">
                <div class="bp-meta">
                    <span><i class="ph-bold ${srv.icono}"></i> ${srv.area.toUpperCase()}</span>
                </div>
                <p class="bp-desc">${srv.servicios[0].substring(0, 80)}...</p>
            </div>
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
                setTimeout(() => {
                    entry.target.style.transitionDelay = '0s';
                }, 800);
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
            
            // Calculate text lengths to dynamically distribute flex-grow
            const textBlueLen = proj.descripcion.length + proj.tecnologias.join(' ').length;
            const textBeigeLen = proj.caracteristicas_tecnicas.length;
            
            body.innerHTML = `
                <div class="jigsaw-grid">
                    <div class="jigsaw-panel jigsaw-red">
                        <h2 class="modal-title">${proj.nombre}</h2>
                        <div class="modal-tags">
                            <span>${proj.categoria}</span>
                            <span>${proj.estado}</span>
                            <span>${proj.entornos.join(', ')}</span>
                        </div>
                    </div>
                    <div class="jigsaw-panel jigsaw-blue" style="flex: ${textBlueLen} 1 300px;">
                        <h3 class="modal-subtitle">// TECH_STACK</h3>
                        <div style="font-weight: bold; margin-bottom: 2rem;">${proj.tecnologias.join(' / ')}</div>
                        <div style="font-weight: bold; font-size: 1rem; line-height: 1.6; opacity: 0.9;">
                            ${proj.descripcion}
                        </div>
                    </div>
                    <div class="jigsaw-panel jigsaw-beige" style="flex: ${textBeigeLen} 1 300px;">
                        <h3 class="modal-subtitle">// FEATURES</h3>
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
                        <h2 class="modal-title"><i class="ph-bold ${srv.icono}"></i> ${srv.area}</h2>
                        <div class="modal-tags">
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

function initBadgeHover() {
    const badge = document.getElementById('side-badge');
    if (!badge) return;
    const colorLayer = badge.querySelector('.badge-color');
    badge.addEventListener('mousemove', e => {
        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        colorLayer.style.setProperty('--x', `${x}px`);
        colorLayer.style.setProperty('--y', `${y}px`);
        colorLayer.style.setProperty('--r', '150px');
    });
    badge.addEventListener('mouseleave', () => {
        colorLayer.style.setProperty('--r', '0px');
    });
}

function initProfileHover() {
    const col = document.getElementById('col-profile');
    if (!col) return;
    
    col.addEventListener('mousemove', (e) => {
        const rect = col.getBoundingClientRect();
        col.style.setProperty('--x', `${e.clientX - rect.left}px`);
        col.style.setProperty('--y', `${e.clientY - rect.top}px`);
    });
    
    col.addEventListener('mouseenter', () => col.style.setProperty('--r', '150%'));
    col.addEventListener('mouseleave', () => col.style.setProperty('--r', '0px'));
}

function initSpotlightHover() {
    document.addEventListener('mousemove', (e) => {
        const cards = document.querySelectorAll('.spotlight-card');
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
        });
    });
}

function initTriangleSpin() {
    const triangle = document.querySelector('.concentric-triangle');
    if (!triangle) return;
    const polygons = triangle.querySelectorAll('polygon');
    
    let isHovered = false;
    let angles = [0, 0, 0, 0, 0];
    let speeds = [0.5, -0.9, 1.4, -2.1, 3.2]; 
    let reqId;
    let lastTime;

    triangle.addEventListener('mouseenter', () => {
        isHovered = true;
        cancelAnimationFrame(reqId);
        
        polygons.forEach(p => p.style.transition = 'stroke 0.4s ease');
        
        lastTime = performance.now();
        function loop(time) {
            let dt = time - lastTime;
            lastTime = time;
            
            if (dt > 100) dt = 16;
            
            for(let i=0; i<5; i++) {
                angles[i] += speeds[i] * 0.12 * dt;
                polygons[i].style.transform = `rotate(${angles[i]}deg)`;
            }
            if(isHovered) reqId = requestAnimationFrame(loop);
        }
        reqId = requestAnimationFrame(loop);
    });

    triangle.addEventListener('mouseleave', () => {
        isHovered = false;
        cancelAnimationFrame(reqId);
        
        for(let i=0; i<5; i++) {
            let current = angles[i];
            let target = Math.round(current / 360) * 360;
            angles[i] = target;
            polygons[i].style.transition = 'stroke 0.4s ease, transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
            polygons[i].style.transform = `rotate(${target}deg)`;
        }
    });
}


function initStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let stars = [];
    let shootingStars = [];
    const numStars = 700; // Increased density
    
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    // Create stars
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 1.5 + 0.5,
            baseAlpha: Math.random() * 0.5 + 0.1,
            twinkleSpeed: Math.random() * 0.03 + 0.01,
            twinklePhase: Math.random() * Math.PI * 2,
            parallaxFactor: Math.random() * 0.6 + 0.1, // Para dar sensacion de profundidad 3D
            color: Math.random() > 0.85 ? '#C1AB85' : (Math.random() > 0.5 ? '#3E6868' : '#ffffff') 
        });
    }

    // Mouse tracking for parallax
    window.addEventListener('mousemove', (e) => {
        targetMouseX = (e.clientX - width / 2) * 0.15;
        targetMouseY = (e.clientY - height / 2) * 0.15;
    });

    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        // Easing for smooth parallax
        mouseX += (targetMouseX - mouseX) * 0.05;
        mouseY += (targetMouseY - mouseY) * 0.05;
        
        stars.forEach(star => {
            // Twinkle logic
            star.twinklePhase += star.twinkleSpeed;
            let alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.4;
            if (alpha < 0.1) alpha = 0.1;
            if (alpha > 1) alpha = 1;
            
            // Parallax offset
            let px = star.x - mouseX * star.parallaxFactor;
            let py = star.y - mouseY * star.parallaxFactor;
            
            // Wrap around screen edges
            if (px < 0) px += width;
            if (px > width) px -= width;
            if (py < 0) py += height;
            if (py > height) py -= height;
            
            ctx.fillStyle = star.color;
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(px, py, star.size, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // --- Shooting Stars Logic ---
        // Randomly spawn a shooting star (approx 1 per second at 60fps)
        if (Math.random() < 0.015) {
            shootingStars.push({
                x: Math.random() * width,
                y: 0, // start from top
                length: Math.random() * 80 + 20,
                speedX: Math.random() * 10 + 10, // move fast diagonally
                speedY: Math.random() * 10 + 10,
                life: 1.0 // opacity life
            });
        }
        
        // Animate and draw shooting stars
        for (let i = shootingStars.length - 1; i >= 0; i--) {
            let ss = shootingStars[i];
            
            // Draw
            ctx.beginPath();
            ctx.moveTo(ss.x, ss.y);
            ctx.lineTo(ss.x - ss.length, ss.y - ss.length * (ss.speedY / ss.speedX));
            ctx.strokeStyle = `rgba(255, 255, 255, ${ss.life})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
            
            // Move
            ss.x += ss.speedX;
            ss.y += ss.speedY;
            ss.life -= 0.02; // fade out quickly
            
            // Remove if dead or out of bounds
            if (ss.life <= 0 || ss.x > width + ss.length || ss.y > height + ss.length) {
                shootingStars.splice(i, 1);
            }
        }
        
        ctx.globalAlpha = 1; // reset alpha
        requestAnimationFrame(animate);
    }
    
    // Ensure body styling doesn't override canvas
    document.body.style.backgroundImage = 'none';
    const noiseSvg = document.querySelector('.noise-overlay');
    if (noiseSvg) noiseSvg.style.display = 'none';

    animate();
}

function initKojimaCredits() {
    const s1 = "color: #3E6868; font-size: 10px; font-weight: bold; font-family: monospace; display: block; margin-top: 10px;";
    const s2 = "color: #C1AB85; font-size: 18px; font-weight: 900; font-family: 'Arial Black', sans-serif; display: block; text-transform: uppercase; letter-spacing: 2px;";
    
    console.log("%cCREATED BY", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cDIRECTED BY", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cPRODUCED BY", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cSTARRING", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cWRITTEN BY", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cGAME DESIGN BY", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cLEVEL DESIGN BY", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cPROGRAMMED AND ARCHITECTED BY", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cGUEST STARRING", s1);
    console.log("%cNotAYeen", s2);
    console.log("%cA NotAYeen PRODUCTION", s1);
}

function initSpotlightHover() {
    const attachSpotlight = (containerId) => {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.addEventListener("pointermove", (ev) => {
            const items = container.querySelectorAll(".blueprint-item");
            items.forEach((item) => {
                const rect = item.getBoundingClientRect();
                item.style.setProperty("--x", ev.clientX - rect.left);
                item.style.setProperty("--y", ev.clientY - rect.top);
            });
        });
    };
    attachSpotlight('projects-container');
    attachSpotlight('services-container');
}

function initTerminal() {
    const term = document.getElementById('terminal-window');
    const termClose = document.getElementById('term-close');
    const termInput = document.getElementById('term-input');
    const termOutput = document.getElementById('term-output');
    const termHeader = document.getElementById('term-header');

    if (!term) return;

    const toggleTerminal = () => {
        term.classList.toggle('hidden');
        if (!term.classList.contains('hidden')) termInput.focus();
    };

    if (termClose) termClose.addEventListener('click', toggleTerminal);

    const sideBadge = document.getElementById('side-badge');
    if (sideBadge) sideBadge.addEventListener('click', toggleTerminal);
    
    const smallTermBtn = document.getElementById('small-term-btn');
    if (smallTermBtn) smallTermBtn.addEventListener('click', toggleTerminal);

    let keyBuffer = '';
    document.addEventListener('keydown', (e) => {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.key.toLowerCase() === 'p') {
            e.preventDefault();
            toggleTerminal();
        }
        if (e.key.length === 1) {
            keyBuffer += e.key.toLowerCase();
            if (keyBuffer.length > 3) keyBuffer = keyBuffer.slice(-3);
            if (keyBuffer === 'cmd') {
                toggleTerminal();
                keyBuffer = '';
            }
        }
    });

    let isDragging = false, startX, startY, initialX, initialY;
    termHeader.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX; startY = e.clientY;
        const rect = term.getBoundingClientRect();
        initialX = rect.left; initialY = rect.top;
        term.style.bottom = 'auto'; term.style.right = 'auto';
        term.style.left = initialX + 'px'; term.style.top = initialY + 'px';
    });
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        term.style.left = (initialX + (e.clientX - startX)) + 'px';
        term.style.top = (initialY + (e.clientY - startY)) + 'px';
    });
    document.addEventListener('mouseup', () => isDragging = false);

    const printMsg = (msg, colorClass = '') => {
        const div = document.createElement('div');
        if (colorClass) div.classList.add(colorClass);
        div.innerHTML = msg;
        termOutput.appendChild(div);
        termOutput.parentElement.scrollTop = termOutput.parentElement.scrollHeight;
    };

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = termInput.value.trim();
            if (!val) return;
            printMsg(`<span class="term-prompt">user@system:~$</span> ${val}`);
            termInput.value = '';

            const cmd = val.toLowerCase();
            switch (cmd) {
                case 'help':
                    printMsg('Comandos disponibles:', 'term-color-teal');
                    printMsg('  help, whoami, skills, projects, services, echo, iwannabehacker, clear');
                    break;
                case 'whoami': printMsg('Identidad: Desarrollador', 'term-color-coral'); break;
                case 'skills': printMsg('Python, JS, Godot, Flutter', 'term-color-teal'); break;
                case 'projects': printMsg('Modales activos. Verifica la interfaz.', 'term-color-teal'); break;
                case 'services': printMsg('Servicios de arquitectura funcionales.', 'term-color-teal'); break;
                case 'clear': termOutput.innerHTML = ''; break;
                case 'iwannabehacker':
                    let c=0;
                    const it = setInterval(() => {
                        printMsg(Math.random().toString(36).substring(2), 'term-color-teal');
                        if(++c>20) { clearInterval(it); printMsg('ACCESO DENEGADO', 'term-color-coral'); }
                    },50);
                    break;
                default: printMsg(`Comando no encontrado: ${val}`, 'term-color-coral');
            }
        }
    });
}

// Utility Functions
function scrambleText(element) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";
    let iterations = 0;
    const originalText = element.dataset.originalValue || element.innerText;
    element.dataset.originalValue = originalText;
    
    clearInterval(element.scrambleInterval);
    
    element.scrambleInterval = setInterval(() => {
        element.innerText = originalText.split("")
            .map((letter, index) => {
                if(index < iterations) return originalText[index];
                if(letter === ' ') return ' ';
                return letters[Math.floor(Math.random() * letters.length)];
            })
            .join("");
        
        if(iterations >= originalText.length) clearInterval(element.scrambleInterval);
        
        iterations += 1 / 3;
    }, 30);
}

// ============================================
// TASKII CHATBOT LOGIC
// ============================================

const taskiiBrain = {
    start: {
        msg: "¡Hola! Soy Taskii, el asistente virtual de ANTON. ¿En qué área buscas soluciones hoy?",
        options: [
            { text: "🖥️ Soporte Técnico", next: "soporte" },
            { text: "🌐 Páginas Web o Apps", next: "web" },
            { text: "🔒 Seguridad y Control", next: "seguridad" }
        ]
    },
    // SOPORTE
    soporte: {
        msg: "Entendido. ¿El problema es físico (hardware), de programas (software/virus), o de conexión (internet)?",
        options: [
            { text: "Físico (No enciende, ruido raro, lenta)", next: "hardware_detalle" },
            { text: "Programas (Virus, Windows, Office)", next: "software_detalle" },
            { text: "Redes (Wi-Fi, Cableado)", next: "red_detalle" }
        ]
    },
    hardware_detalle: {
        msg: "¿Es una PC de Escritorio o una Laptop?",
        options: [
            { text: "PC de Escritorio", next: "contact_hardware_pc" },
            { text: "Laptop", next: "contact_hardware_lap" }
        ]
    },
    software_detalle: {
        msg: "¿Necesitas instalar programas nuevos o limpiar el equipo de lentitud/virus?",
        options: [
            { text: "Instalar Programas / Windows", next: "contact_software_inst" },
            { text: "Limpieza y Antivirus", next: "contact_software_clean" }
        ]
    },
    red_detalle: {
        msg: "¿El problema es en tu casa o en una oficina/negocio?",
        options: [
            { text: "Casa", next: "contact_red_casa" },
            { text: "Oficina/Negocio", next: "contact_red_oficina" }
        ]
    },
    // WEB
    web: {
        msg: "¡Excelente! ¿Buscas crear un proyecto desde cero o modernizar uno existente?",
        options: [
            { text: "Proyecto Nuevo (Desde cero)", next: "web_nuevo" },
            { text: "Renovar / Arreglar uno existente", next: "contact_web_fix" },
            { text: "App Móvil (Android/iOS)", next: "contact_app" }
        ]
    },
    web_nuevo: {
        msg: "¿Qué tipo de página necesitas?",
        options: [
            { text: "Página Informativa (Portafolio, Servicios)", next: "contact_web_info" },
            { text: "Tienda Online (E-commerce)", next: "contact_web_store" },
            { text: "Sistema a Medida (Administración)", next: "contact_web_sys" }
        ]
    },
    // SEGURIDAD
    seguridad: {
        msg: "La seguridad es vital. ¿Qué necesitas implementar en tu negocio?",
        options: [
            { text: "Cámaras de Vigilancia", next: "cam_detalle" },
            { text: "Control de Accesos (Huella/Torniquetes)", next: "contact_acc" },
            { text: "Bases de Datos Seguras", next: "contact_db" }
        ]
    },
    cam_detalle: {
        msg: "¿Cuántas cámaras estimas que necesitas?",
        options: [
            { text: "De 1 a 4 cámaras", next: "contact_cam_small" },
            { text: "5 o más cámaras", next: "contact_cam_large" }
        ]
    },
    // TERMINALES DE CONTACTO (Con Input de Texto)
    contact_hardware_pc: { 
        msg: "Perfecto. Por favor, describe brevemente qué le sucede a la PC de escritorio (ej. hace ruidos, pantalla azul, no enciende).", 
        options: [], 
        input: { placeholder: "Escribe aquí los detalles del problema y alguna forma de contacto, no te preocupes tus datos estan seguros", action: "mailto:anton@ejemplo.com?subject=Soporte%20PC%20Escritorio" } 
    },
    contact_hardware_lap: { 
        msg: "Entendido. ¿Me podrías detallar la falla de tu Laptop y si sabes el modelo?", 
        options: [], 
        input: { placeholder: "Ej. Es una HP y calienta mucho...", action: "mailto:anton@ejemplo.com?subject=Soporte%20Laptop" } 
    },
    contact_software_inst: { 
        msg: "Claro, ¿qué programas específicos o versión de Windows necesitas que instalemos?", 
        options: [], 
        input: { placeholder: "Ej. Necesito Office y Windows 11...", action: "mailto:anton@ejemplo.com?subject=Instalacion%20Software" } 
    },
    contact_software_clean: { 
        msg: "Dejaremos tu equipo rápido. ¿Notas que se abren ventanas solas o solo va muy lenta?", 
        options: [], 
        input: { placeholder: "Ej. Tarda 10 minutos en iniciar...", action: "mailto:anton@ejemplo.com?subject=Limpieza%20Virus" } 
    },
    contact_red_casa: { 
        msg: "Mejoraremos el WiFi. ¿En qué áreas de tu casa no llega bien la señal?", 
        options: [], 
        input: { placeholder: "Ej. En el segundo piso no hay internet...", action: "mailto:anton@ejemplo.com?subject=Red%20Casa" } 
    },
    contact_red_oficina: { 
        msg: "Evaluaremos tu red. ¿Cuántos equipos aproximados se conectan en tu oficina?", 
        options: [], 
        input: { placeholder: "Ej. Somos 15 computadoras...", action: "mailto:anton@ejemplo.com?subject=Red%20Oficina" } 
    },
    
    contact_web_fix: { 
        msg: "Genial. ¿Qué es lo que más te gustaría cambiar o mejorar de tu proyecto actual?", 
        options: [], 
        input: { placeholder: "Ej. Se ve muy vieja y carga lento...", action: "mailto:anton@ejemplo.com?subject=Renovacion%20Web" } 
    },
    contact_app: { 
        msg: "Una app móvil requiere planificación. ¿Para qué servirá principalmente la app?", 
        options: [], 
        input: { placeholder: "Ej. Para que mis clientes agenden citas...", action: "mailto:anton@ejemplo.com?subject=App%20Movil" } 
    },
    contact_web_info: { 
        msg: "Una web informativa es clave. ¿De qué trata tu negocio o emprendimiento?", 
        options: [], 
        input: { placeholder: "Ej. Soy abogado y quiero mostrar mis servicios...", action: "mailto:anton@ejemplo.com?subject=Web%20Informativa" } 
    },
    contact_web_store: { 
        msg: "Vender en línea revolucionará tu negocio. ¿Qué tipo de productos vendes?", 
        options: [], 
        input: { placeholder: "Ej. Vendo ropa y zapatos...", action: "mailto:anton@ejemplo.com?subject=Tienda%20Online" } 
    },
    contact_web_sys: { 
        msg: "Los sistemas automatizan tu trabajo. ¿Qué proceso manual quieres reemplazar?", 
        options: [], 
        input: { placeholder: "Ej. Llevo el inventario en libretas...", action: "mailto:anton@ejemplo.com?subject=Sistema%20A%20Medida" } 
    },
    
    contact_cam_small: { 
        msg: "Un kit básico es perfecto. ¿Es para interior o exterior?", 
        options: [], 
        input: { placeholder: "Ej. Son 2 para afuera y 1 adentro...", action: "mailto:anton@ejemplo.com?subject=Camaras%20Basico" } 
    },
    contact_cam_large: { 
        msg: "Proyectos grandes requieren visita técnica. ¿Dónde se ubican las instalaciones?", 
        options: [], 
        input: { placeholder: "Ej. Es una bodega en el centro...", action: "mailto:anton@ejemplo.com?subject=Camaras%20Avanzado" } 
    },
    contact_acc: { 
        msg: "El control de accesos es vital. ¿Quieres abrir con huella, tarjeta o clave?", 
        options: [], 
        input: { placeholder: "Ej. Huella para 20 empleados...", action: "mailto:anton@ejemplo.com?subject=Control%20Accesos" } 
    },
    contact_db: { 
        msg: "Tus datos estarán blindados. ¿Qué tipo de información necesitas almacenar?", 
        options: [], 
        input: { placeholder: "Ej. Datos de clientes e historial médico...", action: "mailto:anton@ejemplo.com?subject=Bases%20de%20Datos" } 
    }
};

let taskiiHistory = [];
let taskiiPathText = [];

function initTaskii() {
    const btnChat = document.getElementById('btn-chat');
    const overlay = document.getElementById('chat-overlay');
    const closeBtn = document.getElementById('chat-close');
    const msgsContainer = document.getElementById('chat-messages');

    if (!btnChat || !overlay) return;

    btnChat.addEventListener('click', () => {
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        if (msgsContainer.children.length === 0) {
            taskiiHistory = [];
            taskiiPathText = [];
            renderTaskiiStep('start');
        }
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

function scrambleTextTaskii(element, originalText) {
    const chars = '!<>-_\\\\/[]{}—=+*^?#_';
    let frame = 0;
    const queue = [];
    for (let i = 0; i < originalText.length; i++) {
        const char = originalText[i];
        if (char === ' ') {
            queue.push({ char, start: 0, end: 0 });
            continue;
        }
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ char, start, end });
    }

    let frameReq;
    const update = () => {
        let output = '';
        let complete = 0;
        for (let i = 0; i < queue.length; i++) {
            let { char, start, end } = queue[i];
            if (frame >= end) {
                complete++;
                output += char;
            } else if (frame >= start) {
                output += chars[Math.floor(Math.random() * chars.length)];
            } else {
                output += '';
            }
        }
        element.textContent = output;
        if (complete === queue.length) {
            cancelAnimationFrame(frameReq);
        } else {
            frameReq = requestAnimationFrame(update);
            frame++;
        }
    };
    update();
}

function renderTaskiiStep(stepId, userText = null, isBack = false) {
    const msgsContainer = document.getElementById('chat-messages');
    const optsContainer = document.getElementById('chat-options');
    
    // Disable current options to prevent double clicking
    optsContainer.innerHTML = '';

    if (userText) {
        const userDiv = document.createElement('div');
        userDiv.className = 'chat-msg user-msg';
        userDiv.textContent = userText;
        msgsContainer.appendChild(userDiv);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
    }

    const stepData = taskiiBrain[stepId];
    
    // Add bot message with delay for typing feel
    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-msg bot-msg';
        msgsContainer.appendChild(botDiv);
        
        scrambleTextTaskii(botDiv, stepData.msg);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;

        // Add options after message finishes scrambling (approx 1000ms)
        setTimeout(() => {
            optsContainer.innerHTML = '';
            
            if (stepData.options) {
                stepData.options.forEach(opt => {
                    const btn = document.createElement('button');
                    btn.className = 'chat-option-btn';
                    btn.textContent = opt.text;
                    btn.addEventListener('click', () => {
                        if (opt.next) {
                            taskiiHistory.push(stepId);
                            taskiiPathText.push(opt.text);
                            renderTaskiiStep(opt.next, opt.text);
                        } else if (opt.link) {
                            window.location.href = opt.link;
                        }
                    });
                    optsContainer.appendChild(btn);
                });
            }
            
            // Render Input if exists
            if (stepData.input) {
                const wrapper = document.createElement('div');
                wrapper.style.display = 'flex';
                wrapper.style.flexDirection = 'column';
                wrapper.style.gap = '0.5rem';

                const textarea = document.createElement('textarea');
                textarea.placeholder = stepData.input.placeholder;
                textarea.style.width = '100%';
                textarea.style.minHeight = '80px';
                textarea.style.padding = '0.8rem';
                textarea.style.background = 'rgba(0,0,0,0.5)';
                textarea.style.border = '1px solid rgba(193,171,133,0.3)';
                textarea.style.color = '#fff';
                textarea.style.borderRadius = '5px';
                textarea.style.fontFamily = 'inherit';
                textarea.style.resize = 'vertical';
                textarea.style.outline = 'none';

                const sendBtn = document.createElement('button');
                sendBtn.className = 'chat-option-btn';
                sendBtn.textContent = '📩 Enviar Descripción';
                sendBtn.style.background = 'var(--c-teal)';
                sendBtn.style.color = '#000';
                sendBtn.style.fontWeight = 'bold';

                sendBtn.addEventListener('click', async () => {
                    const userDesc = textarea.value.trim() || "(El usuario no proporcionó detalles adicionales. Revisa la ruta de navegación para ver su problema).";

                    // Extract subject from the mailto action for context
                    const subjectMatch = stepData.input.action.match(/subject=([^&]*)/);
                    const subject = subjectMatch ? decodeURIComponent(subjectMatch[1]) : "Consulta Taskii";

                    sendBtn.textContent = '⏳ Transmitiendo Datos...';
                    sendBtn.style.opacity = '0.7';
                    sendBtn.disabled = true;

                    try {
                        const response = await fetch("https://formspree.io/f/mojoagyg", {
                            method: "POST",
                            headers: {
                                "Accept": "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                _subject: subject, // Formspree uses _subject for email subject
                                Ruta_de_Dialogo: taskiiPathText.join(" ➔ "),
                                Mensaje: userDesc,
                                Origen: "Asistente Virtual Taskii"
                            })
                        });

                        if (response.ok) {
                            // Add user message to chat
                            const uDiv = document.createElement('div');
                            uDiv.className = 'chat-msg user-msg';
                            uDiv.textContent = userDesc !== "(El usuario no proporcionó detalles adicionales. Revisa la ruta de navegación para ver su problema)." ? userDesc : "(Datos de diagnóstico enviados)";
                            msgsContainer.appendChild(uDiv);
                            
                            optsContainer.innerHTML = '';
                            
                            setTimeout(() => {
                                const bDiv = document.createElement('div');
                                bDiv.className = 'chat-msg bot-msg';
                                msgsContainer.appendChild(bDiv);
                                scrambleTextTaskii(bDiv, "¡Datos transmitidos con éxito! Anton ha recibido tu consulta directamente en su bandeja y se comunicará pronto.");
                                msgsContainer.scrollTop = msgsContainer.scrollHeight;
                                
                                setTimeout(() => {
                                    const restartBtn = document.createElement('button');
                                    restartBtn.className = 'chat-option-btn';
                                    restartBtn.textContent = '🔄 Nueva Consulta';
                                    restartBtn.addEventListener('click', () => {
                                        taskiiHistory = [];
                                        taskiiPathText = [];
                                        msgsContainer.innerHTML = '';
                                        renderTaskiiStep('start');
                                    });
                                    optsContainer.appendChild(restartBtn);
                                    msgsContainer.scrollTop = msgsContainer.scrollHeight;
                                }, 1200);
                            }, 500);
                        } else {
                            throw new Error("Respuesta no OK de Formspree");
                        }
                    } catch (error) {
                        sendBtn.textContent = '❌ Fallo de Conexión. Reintentar';
                        sendBtn.style.opacity = '1';
                        sendBtn.style.background = 'var(--c-coral)';
                        sendBtn.disabled = false;
                    }
                });

                wrapper.appendChild(textarea);
                wrapper.appendChild(sendBtn);
                optsContainer.appendChild(wrapper);
            }
            
            // Add Global Back Button if not start
            if (stepId !== 'start') {
                const backBtn = document.createElement('button');
                backBtn.className = 'chat-option-btn';
                backBtn.style.borderStyle = 'dashed';
                backBtn.style.opacity = '0.7';
                backBtn.style.marginTop = 'auto';
                backBtn.textContent = '🔙 Corregir / Volver';
                backBtn.addEventListener('click', () => {
                    const prevStep = taskiiHistory.pop() || 'start';
                    taskiiPathText.pop();
                    renderTaskiiStep(prevStep, '🔙 Volver', true);
                });
                optsContainer.appendChild(backBtn);
            }
            
            msgsContainer.scrollTop = msgsContainer.scrollHeight;
        }, 1200);
    }, userText ? 600 : 0);
}

// ============================================
// BIOS BOOT SEQUENCE
// ============================================
function initBootSequence() {
    const biosDiv = document.getElementById('bios-boot');
    const content = document.getElementById('bios-content');
    
    // Check if session storage has 'booted' flag so it doesn't run every refresh
    if (!biosDiv || !content || sessionStorage.getItem('hasBooted')) {
        if(biosDiv) biosDiv.remove();
        return;
    }

    // Set flag
    sessionStorage.setItem('hasBooted', 'true');
    
    const biosLines = [
        "ANTON BIOS Date 06/21/26 18:30:22 Ver 08.00.15",
        "CPU: ANTON Neural Net Processor @ 3.20GHz",
        "Speed: 3.20 GHz",
        "",
        "Initializing USB Controllers .. Done.",
        "262144MB RAM OK",
        "",
        "Auto-Detecting Pri Master .. NVMe SSD",
        "Pri Master: 3.14.15 ANTON-OS_DRIVE_0",
        "",
        "Loading Anton_OS kernel...",
        "Mounting secure file systems... [ OK ]",
        "Starting interface daemons... [ OK ]",
        "Establishing secure connection... [ OK ]",
        "",
        "System ready. Welcome to the portal."
    ];

    let delay = 0;
    biosLines.forEach((line, index) => {
        setTimeout(() => {
            content.textContent += line + "\n";
            biosDiv.scrollTop = biosDiv.scrollHeight;
        }, delay);
        // Random typing/loading delay for each line
        delay += Math.random() * 80 + 30; 
        
        // Add a fake pause at "Loading Anton_OS kernel..."
        if(index === 10) delay += 400;
    });

    // Remove the overlay after everything prints + a short pause
    setTimeout(() => {
        biosDiv.classList.add('hidden');
        setTimeout(() => biosDiv.remove(), 800); // Wait for CSS transition to finish
    }, delay + 600);
}

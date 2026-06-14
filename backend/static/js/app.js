document.addEventListener("DOMContentLoaded", function() {
    
    // --- 1. Lógica del Menú Lateral ---
    const toggleBtn = document.getElementById("toggleSidebar");
    const sidebar = document.querySelector(".sidebar");

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener("click", () => {
            sidebar.classList.toggle("collapsed");
        });
    }

    // --- 2. Lógica de Paginación ---
    const cards = Array.from(document.querySelectorAll('.recipe-card-link'));
    const itemsPerPage = 9;
    let currentPage = 1;
    const totalPages = Math.ceil(cards.length / itemsPerPage);

    function showPage(page) {
        // Ocultar todas las tarjetas
        cards.forEach(card => card.style.display = 'none');
        
        // Mostrar solo las tarjetas del rango correspondiente
        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        cards.slice(start, end).forEach(card => card.style.display = 'block');
        
        // Actualizar clase 'active' en los botones de números (1, 2, etc.)
        document.querySelectorAll('.page-item[data-page]').forEach(el => {
            el.classList.toggle('active', parseInt(el.dataset.page) === page);
        });

        // Habilitar/Deshabilitar botones Anterior/Siguiente
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        if (prevBtn) prevBtn.classList.toggle('disabled', page === 1);
        if (nextBtn) nextBtn.classList.toggle('disabled', page === totalPages);
    }

    // Eventos para botones numéricos (1, 2)
    document.querySelectorAll('.page-item[data-page]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = parseInt(button.dataset.page);
            showPage(currentPage);
        });
    });

    // Evento Anterior
    document.getElementById('prev-btn').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            showPage(currentPage);
        }
    });

    // Evento Siguiente
    document.getElementById('next-btn').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage < totalPages) {
            currentPage++;
            showPage(currentPage);
        }
    });

    // Inicializar mostrando la página 1
    showPage(1);

    // --- 3. Lógica para desplegar/ocultar filtros ---
    document.querySelectorAll('.toggle-filter').forEach(btn => {
        btn.addEventListener('click', function() {
            const targetId = this.getAttribute('data-target');
            const content = document.getElementById(targetId);
            
            content.classList.toggle('hidden');
            
            // Si está oculto, rotamos 0deg (mirando a la derecha), si está visible, 90deg (mirando abajo)
            this.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
        });
    });
});
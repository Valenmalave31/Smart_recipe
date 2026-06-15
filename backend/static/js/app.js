document.addEventListener("DOMContentLoaded", function() {
    
    //Lógica del Menú Lateral
    try {
        const toggleBtn = document.getElementById("toggleSidebar");
        const sidebar = document.querySelector(".sidebar");

        if (toggleBtn && sidebar) {
            toggleBtn.addEventListener("click", () => {
                sidebar.classList.toggle("collapsed");
            });
        }
    } catch (e) { console.error("Error en Menú Lateral:", e); }

    // Lógica de Paginación
    try {
        const cards = Array.from(document.querySelectorAll('.recipe-card-link'));
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');

        if (cards.length > 0 && prevBtn && nextBtn) {
            const itemsPerPage = 9;
            let currentPage = 1;
            const totalPages = Math.ceil(cards.length / itemsPerPage);

            function showPage(page) {
                cards.forEach(card => card.style.display = 'none');
                const start = (page - 1) * itemsPerPage;
                const end = start + itemsPerPage;
                cards.slice(start, end).forEach(card => card.style.display = 'block');
                
                document.querySelectorAll('.page-item[data-page]').forEach(el => {
                    el.classList.toggle('active', parseInt(el.dataset.page) === page);
                });

                prevBtn.classList.toggle('disabled', page === 1);
                nextBtn.classList.toggle('disabled', page === totalPages);
            }

            document.querySelectorAll('.page-item[data-page]').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    currentPage = parseInt(button.dataset.page);
                    showPage(currentPage);
                });
            });

            prevBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage > 1) { currentPage--; showPage(currentPage); }
            });

            nextBtn.addEventListener('click', (e) => {
                e.preventDefault();
                if (currentPage < totalPages) { currentPage++; showPage(currentPage); }
            });

            showPage(1);
        }
    } catch (e) { console.error("Error en Paginación:", e); }

    //Lógica para desplegar/ocultar filtros
    try {
        document.querySelectorAll('.toggle-filter').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetId = this.getAttribute('data-target');
                const content = document.getElementById(targetId);
                if (content) {
                    content.classList.toggle('hidden');
                    this.style.transform = content.classList.contains('hidden') ? 'rotate(0deg)' : 'rotate(90deg)';
                }
            });
        });
    } catch (e) { console.error("Error en Filtros:", e); }

    //Lógica para habilitar/deshabilitar Subetiqueta 
    try {
        const etiquetaSelect = document.getElementById('etiqueta-select');
        const subetiquetaSelect = document.getElementById('subetiqueta-select');

        if (etiquetaSelect && subetiquetaSelect) {
            etiquetaSelect.addEventListener('change', function() {
                if (this.value === 'Postres') {
                    subetiquetaSelect.disabled = false;
                } else {
                    subetiquetaSelect.disabled = true;
                    subetiquetaSelect.value = ""; 
                }
            });
        }
    } catch (e) { console.error("Error en Subetiquetas:", e); }
});

    //Lógica para Agregar e Eliminar Ingredientes 
    try {
        const ingredientsBody = document.getElementById('ingredients-body');
        const addBtn = document.getElementById('add-ingredient-btn');

        if (addBtn && ingredientsBody) {
            addBtn.addEventListener('click', function() {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td><input type="text" class="form-control" name="ingrediente[]" placeholder="Ej. Harina"></td>
                    <td><input type="text" class="form-control" name="cantidad[]" placeholder="0"></td>
                    <td>
                        <select class="form-select" name="unidad[]">
                            <option value="g">g</option>
                            <option value="kg">kg</option>
                            <option value="ml">ml</option>
                            <option value="taza">taza</option>
                            <option value="unidad">unidad</option>
                            <option value="cucharada">cucharada</option>
                            <option value="pizca">pizca</option>
                        </select>
                    </td>
                    <td class="text-center">
                        <button type="button" class="btn btn-link text-danger remove-ingredient" style="padding: 0;">
                            <i class="bi bi-trash fs-4"></i>
                        </button>
                    </td>
                `;
                ingredientsBody.appendChild(tr);
            });

            // Lógica de eliminación (funciona para el icono / botón)
            ingredientsBody.addEventListener('click', function(e) {
                const btn = e.target.closest('.remove-ingredient');
                if (btn) {
                    btn.closest('tr').remove();
                }
            });
        }
    } catch (e) { console.error("Error en Ingredientes:", e); }

    // Lógica para Preparación (Pasos) con metodo para poder reordenar
    try {
        const stepsContainer = document.getElementById('steps-container');
        const addStepBtn = document.getElementById('add-step-btn');
        let stepCount = 0;

        // Inicializamos SortableJS
        if (stepsContainer) {
            new Sortable(stepsContainer, {
                animation: 150,
                handle: '.bi-grip-vertical', 
                onEnd: function() {
                    renumberSteps(); //reorganiza numeración
                }
            });
        }

        function renumberSteps() {
            const steps = stepsContainer.querySelectorAll('.step-row');
            steps.forEach((row, index) => {
                row.querySelector('.step-number').textContent = index + 1;
            });
            stepCount = steps.length;
        }

        if (addStepBtn && stepsContainer) {
            addStepBtn.addEventListener('click', function() {
                stepCount++;
                const div = document.createElement('div');
                div.className = 'step-row d-flex align-items-center mb-3';
                div.innerHTML = `
                    <i class="bi bi-grip-vertical text-muted me-2" style="cursor: grab;"></i>
                    <div class="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3 step-number" style="width: 30px; height: 30px; flex-shrink: 0;">${stepCount}</div>
                    <input type="text" class="form-control me-3" name="pasos[]" placeholder="Describe el paso...">
                    <button type="button" class="btn btn-link text-danger remove-step p-0">
                        <i class="bi bi-trash fs-5"></i>
                    </button>
                `;
                stepsContainer.appendChild(div);
            });

            stepsContainer.addEventListener('click', function(e) {
                if (e.target.closest('.remove-step')) {
                    e.target.closest('.step-row').remove();
                    renumberSteps();
                }
            });
        }
    } catch (e) { console.error("Error en Pasos:", e); }

    //Lógica de tiempo y dificultad 
    try {
        const horasInput = document.getElementById('horas');
        const minInput = document.getElementById('minutos');
        const totalInput = document.getElementById('tiempo-total');

        function calcularTiempo() {
            const h = parseInt(horasInput.value) || 0;
            const m = parseInt(minInput.value) || 0;
            totalInput.value = (h * 60) + m;
        }

        [horasInput, minInput].forEach(input => {
            input.addEventListener('input', calcularTiempo);
        });

        calcularTiempo();

    } catch (e) { console.error("Error en Tiempo/Dificultad:", e); }
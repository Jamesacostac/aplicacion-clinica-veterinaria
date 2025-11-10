// Data Storage (Simulated Database)
let data = {
    duenos: [
        { id: 1, nombre: "Ana García López", telefono: "555-0101", direccion: "Calle Principal 123", email: "ana@email.com" },
        { id: 2, nombre: "Carlos Rodríguez Pérez", telefono: "555-0102", direccion: "Avenida Central 456", email: "carlos@email.com" },
        { id: 3, nombre: "María Martínez Sánchez", telefono: "555-0103", direccion: "Calle Secundaria 789", email: "maria@email.com" },
        { id: 4, nombre: "Juan Fernández López", telefono: "555-0104", direccion: "Avenida Norte 321", email: "juan@email.com" },
        { id: 5, nombre: "Rosa Gómez Jiménez", telefono: "555-0105", direccion: "Calle Sur 654", email: "rosa@email.com" }
    ],
    veterinarios: [
        { id: 1, nombre: "Dr. Miguel Sánchez", cedula: "12345", especialidad: "Cirugía" },
        { id: 2, nombre: "Dra. Laura Martínez", cedula: "54321", especialidad: "Dermatología" },
        { id: 3, nombre: "Dr. Carlos López", cedula: "11111", especialidad: "Medicina General" },
        { id: 4, nombre: "Dra. Ana Rodríguez", cedula: "22222", especialidad: "Oftalmología" }
    ],
    mascotas: [
        { id: 1, nombre: "Max", especie: "Perro", raza: "Pastor Alemán", peso: 25, dueno_id: 1 },
        { id: 2, nombre: "Miau", especie: "Gato", raza: "Persa", peso: 4, dueno_id: 2 },
        { id: 3, nombre: "Buddy", especie: "Perro", raza: "Golden Retriever", peso: 30, dueno_id: 3 },
        { id: 4, nombre: "Luna", especie: "Gato", raza: "Siamés", peso: 3.5, dueno_id: 4 },
        { id: 5, nombre: "Rocky", especie: "Perro", raza: "Rottweiler", peso: 35, dueno_id: 5 },
        { id: 6, nombre: "Bella", especie: "Conejo", raza: "Holandés", peso: 2, dueno_id: 1 }
    ],
    consultas: [
        { id: 1, fecha: "2024-10-15", mascota_id: 1, vet_id: 1, motivo: "Revisión general", diagnostico: "Saludable" },
        { id: 2, fecha: "2024-10-18", mascota_id: 2, vet_id: 2, motivo: "Infección de oído", diagnostico: "Otitis" },
        { id: 3, fecha: "2024-10-20", mascota_id: 3, vet_id: 1, motivo: "Vacunación", diagnostico: "Completada" },
        { id: 4, fecha: "2024-10-22", mascota_id: 4, vet_id: 2, motivo: "Corte de uñas", diagnostico: "Realizado" },
        { id: 5, fecha: "2024-10-25", mascota_id: 5, vet_id: 3, motivo: "Dolor articular", diagnostico: "Artritis leve" }
    ],
    vacunas: [
        { id: 1, nombre: "Rabia", descripcion: "Previene la enfermedad de la rabia" },
        { id: 2, nombre: "Parvovirus", descripcion: "Previene el parvovirus canino" },
        { id: 3, nombre: "Leucemia felina", descripcion: "Previene la leucemia en gatos" },
        { id: 4, nombre: "Moquillo", descripcion: "Previene el moquillo canino" },
        { id: 5, nombre: "Rinotraqueítis", descripcion: "Previene rinotraqueítis en gatos" },
        { id: 6, nombre: "Calicivirus", descripcion: "Previene calicivirus felino" }
    ]
};

let currentPage = 'duenos';
let currentModal = null;
let editingId = null;

// Navigation
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    
    // Show selected page
    document.getElementById(page + '-page').style.display = 'block';
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    event.target.closest('.nav-link').classList.add('active');
    
    currentPage = page;
    loadData(page);
}

// Load and display data
function loadData(page) {
    const listId = page + '-list';
    const emptyId = page + '-empty';
    const list = document.getElementById(listId);
    
    let items = data[page] || [];
    
    if (items.length === 0) {
        list.style.display = 'none';
        document.getElementById(emptyId).style.display = 'block';
        return;
    }
    
    list.style.display = 'block';
    document.getElementById(emptyId).style.display = 'none';
    
    list.innerHTML = items.map(item => createCard(page, item)).join('');
}

// Create card HTML
function createCard(type, item) {
    let content = '';
    
    if (type === 'duenos') {
        content = `
            <div class="card-field"><span class="card-field-label">Teléfono:</span> ${item.telefono}</div>
            <div class="card-field"><span class="card-field-label">Dirección:</span> ${item.direccion || 'N/A'}</div>
            <div class="card-field"><span class="card-field-label">Email:</span> ${item.email || 'N/A'}</div>
        `;
    } else if (type === 'veterinarios') {
        content = `
            <div class="card-field"><span class="card-field-label">Cédula:</span> ${item.cedula}</div>
            <div class="card-field"><span class="card-field-label">Especialidad:</span> ${item.especialidad}</div>
        `;
    } else if (type === 'mascotas') {
        const dueno = data.duenos.find(d => d.id === item.dueno_id);
        content = `
            <div class="card-field"><span class="card-field-label">Especie:</span> ${item.especie}</div>
            <div class="card-field"><span class="card-field-label">Raza:</span> ${item.raza}</div>
            <div class="card-field"><span class="card-field-label">Peso:</span> ${item.peso} kg</div>
            <div class="card-field"><span class="card-field-label">Dueño:</span> ${dueno?.nombre || 'N/A'}</div>
        `;
    } else if (type === 'consultas') {
        const mascota = data.mascotas.find(m => m.id === item.mascota_id);
        const vet = data.veterinarios.find(v => v.id === item.vet_id);
        content = `
            <div class="card-field"><span class="card-field-label">Fecha:</span> ${item.fecha}</div>
            <div class="card-field"><span class="card-field-label">Mascota:</span> ${mascota?.nombre || 'N/A'}</div>
            <div class="card-field"><span class="card-field-label">Veterinario:</span> ${vet?.nombre || 'N/A'}</div>
            <div class="card-field"><span class="card-field-label">Motivo:</span> ${item.motivo}</div>
            <div class="card-field"><span class="card-field-label">Diagnóstico:</span> ${item.diagnostico}</div>
        `;
    } else if (type === 'vacunas') {
        content = `
            <div class="card-field"><span class="card-field-label">Descripción:</span> ${item.descripcion}</div>
        `;
    }
    
    return `
        <div class="card">
            <div class="card-header">
                <h3 class="card-title">${item.nombre}</h3>
                <div class="card-actions">
                    <button class="btn btn-secondary btn-small" onclick="editItem('${type}', ${item.id})">✏️</button>
                    <button class="btn btn-danger btn-small" onclick="deleteItem('${type}', ${item.id})">🗑️</button>
                </div>
            </div>
            <div class="card-content">
                ${content}
            </div>
        </div>
    `;
}

// Modal functions
function openModal(type) {
    currentModal = type;
    editingId = null;
    document.getElementById('modal-title').textContent = 'Nuevo ' + capitalizeFirst(type);
    generateFormFields(type);
    document.getElementById('modal').classList.add('active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('active');
    currentModal = null;
    editingId = null;
}

function editItem(type, id) {
    currentModal = type;
    editingId = id;
    const item = data[type].find(i => i.id === id);
    document.getElementById('modal-title').textContent = 'Editar ' + capitalizeFirst(type);
    generateFormFields(type, item);
    document.getElementById('modal').classList.add('active');
}

function deleteItem(type, id) {
    if (confirm('¿Estás seguro de que deseas eliminar este elemento?')) {
        data[type] = data[type].filter(item => item.id !== id);
        loadData(type);
    }
}

// Form generation
function generateFormFields(type, item = null) {
    let fields = '';
    
    if (type === 'duenos') {
        fields = `
            <div class="form-group">
                <label class="form-label">Nombre completo *</label>
                <input type="text" class="form-input" id="nombre" value="${item?.nombre || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Teléfono *</label>
                <input type="tel" class="form-input" id="telefono" value="${item?.telefono || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Dirección</label>
                <input type="text" class="form-input" id="direccion" value="${item?.direccion || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Email</label>
                <input type="email" class="form-input" id="email" value="${item?.email || ''}">
            </div>
        `;
    } else if (type === 'veterinarios') {
        fields = `
            <div class="form-group">
                <label class="form-label">Nombre completo *</label>
                <input type="text" class="form-input" id="nombre" value="${item?.nombre || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Cédula profesional *</label>
                <input type="text" class="form-input" id="cedula" value="${item?.cedula || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Especialidad</label>
                <input type="text" class="form-input" id="especialidad" value="${item?.especialidad || ''}">
            </div>
        `;
    } else if (type === 'mascotas') {
        fields = `
            <div class="form-group">
                <label class="form-label">Nombre *</label>
                <input type="text" class="form-input" id="nombre" value="${item?.nombre || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Especie *</label>
                <input type="text" class="form-input" id="especie" value="${item?.especie || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Raza</label>
                <input type="text" class="form-input" id="raza" value="${item?.raza || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">Peso (kg)</label>
                <input type="number" class="form-input" id="peso" value="${item?.peso || ''}" step="0.1">
            </div>
            <div class="form-group">
                <label class="form-label">Dueño *</label>
                <select class="form-input" id="dueno_id" required>
                    <option value="">Seleccionar dueño</option>
                    ${data.duenos.map(d => `<option value="${d.id}" ${item?.dueno_id === d.id ? 'selected' : ''}>${d.nombre}</option>`).join('')}
                </select>
            </div>
        `;
    } else if (type === 'consultas') {
        fields = `
            <div class="form-group">
                <label class="form-label">Fecha *</label>
                <input type="date" class="form-input" id="fecha" value="${item?.fecha || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Mascota *</label>
                <select class="form-input" id="mascota_id" required>
                    <option value="">Seleccionar mascota</option>
                    ${data.mascotas.map(m => `<option value="${m.id}" ${item?.mascota_id === m.id ? 'selected' : ''}>${m.nombre}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Veterinario *</label>
                <select class="form-input" id="vet_id" required>
                    <option value="">Seleccionar veterinario</option>
                    ${data.veterinarios.map(v => `<option value="${v.id}" ${item?.vet_id === v.id ? 'selected' : ''}>${v.nombre}</option>`).join('')}
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Motivo *</label>
                <input type="text" class="form-input" id="motivo" value="${item?.motivo || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Diagnóstico</label>
                <input type="text" class="form-input" id="diagnostico" value="${item?.diagnostico || ''}">
            </div>
        `;
    } else if (type === 'vacunas') {
        fields = `
            <div class="form-group">
                <label class="form-label">Nombre *</label>
                <input type="text" class="form-input" id="nombre" value="${item?.nombre || ''}" required>
            </div>
            <div class="form-group">
                <label class="form-label">Descripción</label>
                <input type="text" class="form-input" id="descripcion" value="${item?.descripcion || ''}">
            </div>
        `;
    }
    
    document.getElementById('form-fields').innerHTML = fields;
}

// Form submission
function handleSubmit(event) {
    event.preventDefault();
    
    const fields = document.querySelectorAll('.form-input');
    const data_obj = {};
    
    fields.forEach(field => {
        data_obj[field.id] = field.value;
    });
    
    if (editingId) {
        const index = data[currentModal].findIndex(i => i.id === editingId);
        data[currentModal][index] = { ...data[currentModal][index], ...data_obj };
    } else {
        const newId = Math.max(...data[currentModal].map(i => i.id), 0) + 1;
        data[currentModal].push({ id: newId, ...data_obj });
    }
    
    loadData(currentModal);
    closeModal();
}

// Utility functions
function capitalizeFirst(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Initialize
window.addEventListener('load', () => {
    loadData('duenos');
});

// Close modal when clicking outside
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal')) {
        closeModal();
    }
});

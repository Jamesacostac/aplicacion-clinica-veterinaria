const API_URL = 'http://localhost:3000/api';

// ============ VERIFICAR CONEXIÓN ============
async function verificarConexion() {
    try {
        const response = await fetch(`${API_URL}/duenos`);
        if (response.ok) {
            document.getElementById('statusConexion').textContent = '🟢 Conectado a SQL Server';
            document.getElementById('statusConexion').className = 'connection-status connected';
            cargarTodosDatos();
        } else {
            mostrarError();
        }
    } catch (error) {
        mostrarError();
    }
}

function mostrarError() {
    document.getElementById('statusConexion').textContent = '🔴 No conectado a SQL Server';
    document.getElementById('statusConexion').className = 'connection-status disconnected';
}

// ============ FUNCIONES DE TAB ============
function switchTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    const buttons = document.querySelectorAll('.tab-button');
    buttons.forEach(button => button.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    cargarTodosDatos();
}

// ============ AGREGAR DUEÑO ============
async function agregarDueno(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreDueno').value;
    const telefono = document.getElementById('telefonoDueno').value;
    const email = document.getElementById('emailDueno').value;
    const direccion = document.getElementById('direccionDueno').value;
    
    try {
        const response = await fetch(`${API_URL}/duenos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, email, direccion })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeDuenos', '✅ Dueño agregado a SQL Server', 'success');
            event.target.reset();
            cargarDuenos();
        } else {
            mostrarMensaje('mensajeDuenos', '❌ Error: ' + data.error, 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeDuenos', '❌ Error de conexión', 'error');
    }
}

// ============ AGREGAR MASCOTA ============
async function agregarMascota(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreMascota').value;
    const especie = document.getElementById('especieMascota').value;
    const raza = document.getElementById('razaMascota').value;
    const fecha_nac = document.getElementById('fechaNacMascota').value;
    const id_dueño = parseInt(document.getElementById('duenioMascota').value);
    
    try {
        const response = await fetch(`${API_URL}/mascotas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, especie, raza, fecha_nac, id_dueño })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeMascotas', '✅ Mascota agregada a SQL Server', 'success');
            event.target.reset();
            cargarMascotas();
        } else {
            mostrarMensaje('mensajeMascotas', '❌ Error: ' + data.error, 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeMascotas', '❌ Error de conexión', 'error');
    }
}

// ============ AGREGAR VETERINARIO ============
async function agregarVeterinario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreVet').value;
    const especialidad = document.getElementById('especialidadVet').value;
    const telefono = document.getElementById('telefonoVet').value;
    
    try {
        const response = await fetch(`${API_URL}/veterinarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, especialidad, telefono })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeVeterinarios', '✅ Veterinario agregado a SQL Server', 'success');
            event.target.reset();
            cargarVeterinarios();
        } else {
            mostrarMensaje('mensajeVeterinarios', '❌ Error: ' + data.error, 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeVeterinarios', '❌ Error de conexión', 'error');
    }
}

// ============ AGREGAR CONSULTA ============
async function agregarConsulta(event) {
    event.preventDefault();
    
    const id_mascota = parseInt(document.getElementById('mascotaConsulta').value);
    const id_vet = parseInt(document.getElementById('veterinarioConsulta').value);
    const fecha = document.getElementById('fechaConsulta').value;
    const motivo = document.getElementById('motivoConsulta').value;
    const diagnostico = document.getElementById('diagnosticoConsulta').value;
    
    try {
        const response = await fetch(`${API_URL}/consultas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fecha, motivo, diagnostico, id_mascota, id_vet })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeConsultas', '✅ Consulta agregada a SQL Server', 'success');
            event.target.reset();
            cargarConsultas();
        } else {
            mostrarMensaje('mensajeConsultas', '❌ Error: ' + data.error, 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeConsultas', '❌ Error de conexión', 'error');
    }
}

// ============ AGREGAR TIPO DE VACUNA ============
async function agregarTipoVacuna(event) {
    event.preventDefault();
    
    const nombre_vacuna = document.getElementById('nombreVacuna').value;
    const descripcion = document.getElementById('descripcionVacuna').value;
    
    try {
        const response = await fetch(`${API_URL}/tipos-vacunas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre_vacuna, descripcion })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeVacunas', '✅ Tipo de vacuna agregado a SQL Server', 'success');
            event.target.reset();
            cargarTiposVacunas();
        } else {
            mostrarMensaje('mensajeVacunas', '❌ Error: ' + data.error, 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeVacunas', '❌ Error de conexión', 'error');
    }
}

// ============ AGREGAR REGISTRO DE VACUNA ============
async function agregarRegistroVacuna(event) {
    event.preventDefault();
    
    const id_mascota = parseInt(document.getElementById('mascotaVacuna').value);
    const id_tipo_vacuna = parseInt(document.getElementById('tipoVacuna').value);
    const fecha_aplicacion = document.getElementById('fechaVacuna').value;
    
    try {
        const response = await fetch(`${API_URL}/registros-vacunas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_mascota, id_tipo_vacuna, fecha_aplicacion })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeVacunas', '✅ Vacuna registrada en SQL Server', 'success');
            event.target.reset();
            cargarRegistrosVacunas();
        } else {
            mostrarMensaje('mensajeVacunas', '❌ Error: ' + data.error, 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeVacunas', '❌ Error de conexión', 'error');
    }
}

// ============ CARGAR DATOS ============
async function cargarDuenos() {
    try {
        const response = await fetch(`${API_URL}/duenos`);
        const duenos = await response.json();
        
        let html = '';
        duenos.forEach(d => {
            html += `
                <tr>
                    <td>${d.id_dueño}</td>
                    <td>${d.nombre}</td>
                    <td>${d.telefono}</td>
                    <td>${d.email || '-'}</td>
                    <td>${d.direccion}</td>
                </tr>
            `;
        });
        
        document.getElementById('tablaDuenos').querySelector('tbody').innerHTML = html || '<tr><td colspan="5" style="text-align: center; color: #999;">No hay dueños registrados</td></tr>';
        
        // Actualizar select
        let selectHtml = '<option value="">-- Seleccione un dueño --</option>';
        duenos.forEach(d => {
            selectHtml += `<option value="${d.id_dueño}">${d.nombre}</option>`;
        });
        document.getElementById('duenioMascota').innerHTML = selectHtml;
        
        document.getElementById('countDuenos').textContent = duenos.length;
    } catch (error) {
        console.error('Error cargando dueños:', error);
    }
}

async function cargarMascotas() {
    try {
        const response = await fetch(`${API_URL}/mascotas`);
        const mascotas = await response.json();
        const duenos = await fetch(`${API_URL}/duenos`).then(r => r.json());
        
        let html = '';
        mascotas.forEach(m => {
            const dueno = duenos.find(d => d.id_dueño === m.id_dueño);
            html += `
                <tr>
                    <td>${m.id_mascota}</td>
                    <td>${m.nombre}</td>
                    <td>${m.especie}</td>
                    <td>${m.raza || '-'}</td>
                    <td>${m.fecha_nac}</td>
                    <td>${dueno ? dueno.nombre : '-'}</td>
                </tr>
            `;
        });
        
        document.getElementById('tablaMascotas').querySelector('tbody').innerHTML = html || '<tr><td colspan="6" style="text-align: center; color: #999;">No hay mascotas registradas</td></tr>';
        
        // Actualizar selects
        let selectHtml = '<option value="">-- Seleccione una mascota --</option>';
        mascotas.forEach(m => {
            selectHtml += `<option value="${m.id_mascota}">${m.nombre}</option>`;
        });
        document.getElementById('mascotaConsulta').innerHTML = selectHtml;
        document.getElementById('mascotaVacuna').innerHTML = selectHtml;
        
        // Tabla recientes
        let htmlRecientes = '';
        mascotas.slice(-5).reverse().forEach(m => {
            const dueno = duenos.find(d => d.id_dueño === m.id_dueño);
            htmlRecientes += `
                <tr>
                    <td>${m.nombre}</td>
                    <td>${m.especie}</td>
                    <td>${m.raza || '-'}</td>
                    <td>${dueno ? dueno.nombre : '-'}</td>
                </tr>
            `;
        });
        document.getElementById('tablaMascotasRecientes').querySelector('tbody').innerHTML = htmlRecientes || '<tr><td colspan="4" style="text-align: center; color: #999;">No hay mascotas registradas</td></tr>';
        
        document.getElementById('countMascotas').textContent = mascotas.length;
    } catch (error) {
        console.error('Error cargando mascotas:', error);
    }
}

async function cargarVeterinarios() {
    try {
        const response = await fetch(`${API_URL}/veterinarios`);
        const veterinarios = await response.json();
        
        let html = '';
        veterinarios.forEach(v => {
            html += `
                <tr>
                    <td>${v.id_vet}</td>
                    <td>${v.nombre}</td>
                    <td>${v.especialidad}</td>
                    <td>${v.telefono}</td>
                </tr>
            `;
        });
        
        document.getElementById('tablaVeterinarios').querySelector('tbody').innerHTML = html || '<tr><td colspan="4" style="text-align: center; color: #999;">No hay veterinarios registrados</td></tr>';
        
        // Actualizar select
        let selectHtml = '<option value="">-- Seleccione un veterinario --</option>';
        veterinarios.forEach(v => {
            selectHtml += `<option value="${v.id_vet}">${v.nombre}</option>`;
        });
        document.getElementById('veterinarioConsulta').innerHTML = selectHtml;
        
        document.getElementById('countVeterinarios').textContent = veterinarios.length;
    } catch (error) {
        console.error('Error cargando veterinarios:', error);
    }
}

async function cargarConsultas() {
    try {
        const response = await fetch(`${API_URL}/consultas`);
        const consultas = await response.json();
        const mascotas = await fetch(`${API_URL}/mascotas`).then(r => r.json());
        const veterinarios = await fetch(`${API_URL}/veterinarios`).then(r => r.json());
        
        let html = '';
        consultas.forEach(c => {
            const mascota = mascotas.find(m => m.id_mascota === c.id_mascota);
            const vet = veterinarios.find(v => v.id_vet === c.id_vet);
            html += `
                <tr>
                    <td>${c.id_consulta}</td>
                    <td>${mascota ? mascota.nombre : '-'}</td>
                    <td>${vet ? vet.nombre : '-'}</td>
                    <td>${c.fecha}</td>
                    <td>${c.motivo.substring(0, 30)}...</td>
                </tr>
            `;
        });
        
        document.getElementById('tablaConsultas').querySelector('tbody').innerHTML = html || '<tr><td colspan="5" style="text-align: center; color: #999;">No hay consultas registradas</td></tr>';
        
        document.getElementById('countConsultas').textContent = consultas.length;
    } catch (error) {
        console.error('Error cargando consultas:', error);
    }
}

async function cargarTiposVacunas() {
    try {
        const response = await fetch(`${API_URL}/tipos-vacunas`);
        const vacunas = await response.json();
        
        let selectHtml = '<option value="">-- Seleccione una vacuna --</option>';
        vacunas.forEach(v => {
            selectHtml += `<option value="${v.id_tipo_vacuna}">${v.nombre_vacuna}</option>`;
        });
        document.getElementById('tipoVacuna').innerHTML = selectHtml;
    } catch (error) {
        console.error('Error cargando tipos de vacunas:', error);
    }
}

async function cargarRegistrosVacunas() {
    try {
        const response = await fetch(`${API_URL}/registros-vacunas`);
        const registros = await response.json();
        const mascotas = await fetch(`${API_URL}/mascotas`).then(r => r.json());
        const vacunas = await fetch(`${API_URL}/tipos-vacunas`).then(r => r.json());
        
        let html = '';
        registros.forEach(r => {
            const mascota = mascotas.find(m => m.id_mascota === r.id_mascota);
            const vacuna = vacunas.find(v => v.id_tipo_vacuna === r.id_tipo_vacuna);
            html += `
                <tr>
                    <td>${r.id_registro_vacuna}</td>
                    <td>${mascota ? mascota.nombre : '-'}</td>
                    <td>${vacuna ? vacuna.nombre_vacuna : '-'}</td>
                    <td>${r.fecha_aplicacion}</td>
                </tr>
            `;
        });
        
        document.getElementById('tablaVacunas').querySelector('tbody').innerHTML = html || '<tr><td colspan="4" style="text-align: center; color: #999;">No hay vacunas registradas</td></tr>';
    } catch (error) {
        console.error('Error cargando registros de vacunas:', error);
    }
}

async function cargarTodosDatos() {
    cargarDuenos();
    cargarMascotas();
    cargarVeterinarios();
    cargarConsultas();
    cargarTiposVacunas();
    cargarRegistrosVacunas();
}

// ============ MOSTRAR MENSAJE ============
function mostrarMensaje(elementId, mensaje, tipo) {
    const elemento = document.getElementById(elementId);
    elemento.textContent = mensaje;
    elemento.className = `message ${tipo}`;
    setTimeout(() => {
        elemento.className = 'message';
    }, 3000);
}

// ============ INICIALIZAR ============
document.addEventListener('DOMContentLoaded', function() {
    verificarConexion();
    setInterval(verificarConexion, 5000); // Verificar cada 5 segundos
});

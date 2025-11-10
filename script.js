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
            mostrarErrorConexion(`Error del servidor: ${response.status}`);
        }
    } catch (error) {
        mostrarErrorConexion(`No se puede conectar al servidor: ${error.message}`);
    }
}

function mostrarErrorConexion(mensaje) {
    document.getElementById('statusConexion').textContent = '🔴 ' + mensaje;
    document.getElementById('statusConexion').className = 'connection-status disconnected';
}

// ============ FUNCIONES DE TAB ============
function switchTab(tabName, event) {
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
    
    const nombre = document.getElementById('nombreDueno').value.trim();
    const telefono = document.getElementById('telefonoDueno').value.trim();
    const email = document.getElementById('emailDueno').value.trim();
    const direccion = document.getElementById('direccionDueno').value.trim();
    
    // Validación
    if (!nombre || !telefono || !direccion) {
        mostrarMensaje('mensajeDuenos', '❌ Complete todos los campos obligatorios', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/duenos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, telefono, email, direccion })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeDuenos', '✅ Dueño agregado correctamente', 'success');
            event.target.reset();
            cargarDuenos();
        } else {
            mostrarMensaje('mensajeDuenos', '❌ Error: ' + (data.error || 'Desconocido'), 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeDuenos', '❌ Error de conexión con el servidor', 'error');
    }
}

// ============ AGREGAR MASCOTA ============
async function agregarMascota(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreMascota').value.trim();
    const especie = document.getElementById('especieMascota').value;
    const raza = document.getElementById('razaMascota').value.trim();
    const fecha_nac = document.getElementById('fechaNacMascota').value;
    const id_dueño = parseInt(document.getElementById('duenioMascota').value);
    
    // Validación
    if (!nombre || !especie || !fecha_nac || !id_dueño) {
        mostrarMensaje('mensajeMascotas', '❌ Complete todos los campos obligatorios', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/mascotas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, especie, raza, fecha_nac, id_dueño })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeMascotas', '✅ Mascota agregada correctamente', 'success');
            event.target.reset();
            cargarMascotas();
        } else {
            mostrarMensaje('mensajeMascotas', '❌ Error: ' + (data.error || 'Desconocido'), 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeMascotas', '❌ Error de conexión con el servidor', 'error');
    }
}

// ============ AGREGAR VETERINARIO ============
async function agregarVeterinario(event) {
    event.preventDefault();
    
    const nombre = document.getElementById('nombreVet').value.trim();
    const especialidad = document.getElementById('especialidadVet').value;
    const telefono = document.getElementById('telefonoVet').value.trim();
    
    // Validación
    if (!nombre || !especialidad || !telefono) {
        mostrarMensaje('mensajeVeterinarios', '❌ Complete todos los campos obligatorios', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/veterinarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, especialidad, telefono })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeVeterinarios', '✅ Veterinario agregado correctamente', 'success');
            event.target.reset();
            cargarVeterinarios();
        } else {
            mostrarMensaje('mensajeVeterinarios', '❌ Error: ' + (data.error || 'Desconocido'), 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeVeterinarios', '❌ Error de conexión con el servidor', 'error');
    }
}

// ============ AGREGAR CONSULTA ============
async function agregarConsulta(event) {
    event.preventDefault();
    
    const id_mascota = parseInt(document.getElementById('mascotaConsulta').value);
    const id_vet = parseInt(document.getElementById('veterinarioConsulta').value);
    const fecha = document.getElementById('fechaConsulta').value;
    const motivo = document.getElementById('motivoConsulta').value.trim();
    const diagnostico = document.getElementById('diagnosticoConsulta').value.trim();
    
    // Validación
    if (!id_mascota || !id_vet || !fecha || !motivo) {
        mostrarMensaje('mensajeConsultas', '❌ Complete todos los campos obligatorios', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/consultas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fecha, motivo, diagnostico, id_mascota, id_vet })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeConsultas', '✅ Consulta agregada correctamente', 'success');
            event.target.reset();
            cargarConsultas();
        } else {
            mostrarMensaje('mensajeConsultas', '❌ Error: ' + (data.error || 'Desconocido'), 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeConsultas', '❌ Error de conexión con el servidor', 'error');
    }
}

// ============ AGREGAR TIPO DE VACUNA ============
async function agregarTipoVacuna(event) {
    event.preventDefault();
    
    const nombre_vacuna = document.getElementById('nombreVacuna').value.trim();
    const descripcion = document.getElementById('descripcionVacuna').value.trim();
    
    // Validación
    if (!nombre_vacuna) {
        mostrarMensaje('mensajeVacunas', '❌ El nombre de la vacuna es obligatorio', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/tipos-vacunas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre_vacuna, descripcion })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeVacunas', '✅ Tipo de vacuna agregado correctamente', 'success');
            event.target.reset();
            cargarTiposVacunas();
        } else {
            mostrarMensaje('mensajeVacunas', '❌ Error: ' + (data.error || 'Desconocido'), 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeVacunas', '❌ Error de conexión con el servidor', 'error');
    }
}

// ============ AGREGAR REGISTRO DE VACUNA ============
async function agregarRegistroVacuna(event) {
    event.preventDefault();
    
    const id_mascota = parseInt(document.getElementById('mascotaVacuna').value);
    const id_tipo_vacuna = parseInt(document.getElementById('tipoVacuna').value);
    const fecha_aplicacion = document.getElementById('fechaVacuna').value;
    
    // Validación
    if (!id_mascota || !id_tipo_vacuna || !fecha_aplicacion) {
        mostrarMensaje('mensajeVacunas', '❌ Complete todos los campos obligatorios', 'error');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/registros-vacunas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_mascota, id_tipo_vacuna, fecha_aplicacion })
        });
        
        const data = await response.json();
        
        if (data.success) {
            mostrarMensaje('mensajeVacunas', '✅ Vacuna registrada correctamente', 'success');
            event.target.reset();
            cargarRegistrosVacunas();
        } else {
            mostrarMensaje('mensajeVacunas', '❌ Error: ' + (data.error || 'Desconocido'), 'error');
        }
    } catch (error) {
        mostrarMensaje('mensajeVacunas', '❌ Error de conexión con el servidor', 'error');
    }
}

//

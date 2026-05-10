// --- CONFIGURACIÓN DE DATOS REALES ---
const MEDS = [
    { n: "Apoquel 5.4mg", p: 125000 }, { n: "Bravecto (Canino)", p: 148000 },
    { n: "Simparica Trio", p: 115000 }, { n: "Meloxicam Oral", p: 38000 },
    { n: "Amoxicilina + Clav", p: 45000 }, { n: "Nexgard Specter", p: 132000 },
    { n: "Enrofloxacina Vet", p: 29000 }, { n: "Vitamina Complejo B", p: 15000 }
];

const NOMBRES = ["Thor", "Luna", "Coco", "Mia", "Simba", "Nala", "Rocky", "Kira", "Toby", "Lola"];

let DB = {
    pacientes: JSON.parse(localStorage.getItem('v_pac')) || [],
    consultas: JSON.parse(localStorage.getItem('v_con')) || [],
    facturas: JSON.parse(localStorage.getItem('v_fac')) || []
};

// --- UTILIDADES ---
const formatCOP = (n) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(n);

function calcularEdad(fecha) {
    const nac = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - nac.getFullYear();
    if (hoy.getMonth() < nac.getMonth()) edad--;
    return `${edad} años`;
}

// --- GENERADOR DE 45 PACIENTES Y 675 CONSULTAS ---
(function seed() {
    if (DB.pacientes.length === 0) {
        for (let i = 1; i <= 45; i++) {
            const email = `correo${i}@vet.com`;
            const idPet = i.toString();
            
            DB.pacientes.push({
                id: idPet,
                nombre: NOMBRES[i % 10] + " " + i,
                especie: i % 2 === 0 ? "Canino" : "Felino",
                raza: i % 2 === 0 ? "Pastor Alemán" : "Siamés",
                peso: (i % 20 + 5) + "kg",
                nacimiento: `201${i % 9}-05-10`,
                emailDueno: email
            });

            for (let j = 1; j <= 15; j++) {
                const idC = Math.random().toString(36).substr(2, 9);
                const valor = 60000 + (j * 1000);
                DB.consultas.push({
                    id: idC, idMascota: idPet, fecha: `2025-0${(j%9)+1}-15`,
                    motivo: "Control Preventivo", diag: "Paciente en excelente estado.",
                    med: MEDS[j % 8].n, costo: valor
                });
                DB.facturas.push({ idConsulta: idC, emailDueno: email, valor: valor, estado: "PAGADA" });
            }
        }
        localStorage.setItem('v_pac', JSON.stringify(DB.pacientes));
        localStorage.setItem('v_con', JSON.stringify(DB.consultas));
        localStorage.setItem('v_fac', JSON.stringify(DB.facturas));
    }
})();

// --- LÓGICA DE NAVEGACIÓN ---
function handleLogin() {
    const e = document.getElementById('login-email').value;
    const r = document.getElementById('login-role').value;
    if(!e.includes('@')) return alert("Correo inválido");
    sessionStorage.setItem('u_mail', e);
    sessionStorage.setItem('u_role', r);
    document.getElementById('login-screen').classList.add('hidden');
    document.getElementById('app').classList.remove('hidden');
    init();
}

function init() {
    const r = sessionStorage.getItem('u_role');
    const e = sessionStorage.getItem('u_mail');
    document.getElementById('welcome-msg').innerText = `Hola, ${e.split('@')[0]}`;
    document.getElementById('role-badge').innerText = r === 'doctor' ? 'Médico Veterinario' : 'Propietario';
    
    const menu = document.getElementById('nav-menu');
    const items = r === 'doctor' ? ['Panel Médico', 'Inventario'] : ['Mis Mascotas', 'Historial y Facturas'];
    menu.innerHTML = items.map(i => `<button onclick="navegar('${i}')" class="w-full text-left p-4 rounded-2xl hover:bg-blue-50 font-medium text-slate-500 hover:text-blue-600 transition">${i}</button>`).join('');
    
    navegar(r === 'doctor' ? 'Panel Médico' : 'Mis Mascotas');
}

function navegar(v) {
    const cont = document.getElementById('dynamic-content');
    const mail = sessionStorage.getItem('u_mail');
    cont.innerHTML = "";

    if (v === 'Panel Médico') {
        cont.innerHTML = `
            <div class="card col-span-full bg-blue-600 text-white flex justify-between items-center">
                <div><h2 class="text-2xl font-bold">Resumen Clínico</h2><p>45 Pacientes Registrados</p></div>
                <button onclick="nuevaConsulta()" class="bg-white text-blue-600 px-6 py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition">+ Nueva Consulta</button>
            </div>
            <h3 class="col-span-full font-bold text-xl mt-6">Últimas Consultas</h3>
            ${DB.consultas.slice(-12).reverse().map(c => {
                const p = DB.pacientes.find(x => x.id === c.idMascota);
                return `<div class="card cursor-pointer" onclick="verDetalle('${c.id}')">
                    <p class="badge-age mb-2 inline-block">${c.fecha}</p>
                    <h4 class="font-bold">${p.nombre}</h4>
                    <p class="text-xs text-slate-500">${c.motivo}</p>
                </div>`;
            }).join('')}
        `;
    }

    if (v === 'Inventario') {
        cont.innerHTML = `<div class="card col-span-full">
            <h3 class="font-bold text-xl mb-6">Medicamentos en Stock</h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                ${MEDS.map(m => `<div class="p-4 bg-slate-50 rounded-3xl border border-slate-100">
                    <p class="font-bold text-sm text-slate-700">${m.n}</p>
                    <p class="text-blue-600 font-bold mt-1">${formatCOP(m.p)}</p>
                </div>`).join('')}
            </div>
        </div>`;
    }

    if (v === 'Mis Mascotas') {
        const misP = DB.pacientes.filter(x => x.emailDueno === mail);
        cont.innerHTML = misP.map(p => `
            <div class="card border-b-8 border-blue-500">
                <div class="text-4xl mb-4">🐾</div>
                <h4 class="font-bold text-2xl">${p.nombre}</h4>
                <div class="space-y-1 mt-4 text-sm">
                    <p><b>Edad:</b> ${calcularEdad(p.nacimiento)}</p>
                    <p><b>Peso:</b> ${p.peso}</p>
                    <p><b>Raza:</b> ${p.raza}</p>
                </div>
            </div>
        `).join('');
    }

    if (v === 'Historial y Facturas') {
        const misF = DB.facturas.filter(x => x.emailDueno === mail);
        cont.innerHTML = misF.reverse().map(f => `
            <div class="card flex justify-between items-center ${f.estado === 'PENDIENTE' ? 'border-l-8 border-orange-500' : 'border-l-8 border-emerald-500'}">
                <div>
                    <p class="text-[10px] font-bold text-slate-400">RECIBO #${f.idConsulta.substr(0,5)}</p>
                    <p class="font-bold text-lg">${formatCOP(f.valor)}</p>
                    <p class="text-xs ${f.estado === 'PENDIENTE' ? 'text-orange-500' : 'text-emerald-500'} font-black">${f.estado}</p>
                </div>
                <button onclick="verDetalle('${f.idConsulta}')" class="bg-slate-100 p-3 rounded-xl text-xs font-bold hover:bg-blue-50">VER DETALLE</button>
            </div>
        `).join('');
    }
}

// --- MODALES ---
function verDetalle(id) {
    const c = DB.consultas.find(x => x.id === id);
    const p = DB.pacientes.find(x => x.id === c.idMascota);
    document.getElementById('modal-container').classList.remove('hidden');
    document.getElementById('modal-content').innerHTML = `
        <h2 class="text-3xl font-bold mb-2">Detalle Clínico</h2>
        <p class="text-blue-500 font-bold mb-6">${p.nombre} - ${p.especie}</p>
        <div class="space-y-4 border-t pt-6">
            <div class="grid grid-cols-2 gap-4">
                <div><p class="text-[10px] text-slate-400 font-bold">FECHA</p><p class="font-medium">${c.fecha}</p></div>
                <div><p class="text-[10px] text-slate-400 font-bold">COSTO</p><p class="font-medium">${formatCOP(c.costo)}</p></div>
            </div>
            <div><p class="text-[10px] text-slate-400 font-bold">MOTIVO</p><p class="font-medium text-slate-700">${c.motivo}</p></div>
            <div class="bg-slate-50 p-6 rounded-[2rem]"><p class="text-[10px] text-slate-400 font-bold mb-2">DIAGNÓSTICO</p><p class="italic text-sm text-slate-600">${c.diag}</p></div>
            <div class="p-4 border-2 border-dashed border-blue-200 rounded-2xl flex justify-between items-center">
                <span class="font-bold">💊 Recetado: ${c.med}</span>
            </div>
        </div>
        <button onclick="cerrarModal()" class="w-full mt-8 p-4 bg-slate-900 text-white rounded-2xl font-bold">Cerrar</button>
    `;
}

function nuevaConsulta() {
    document.getElementById('modal-container').classList.remove('hidden');
    document.getElementById('modal-content').innerHTML = `
        <h2 class="text-2xl font-bold mb-6">Nueva Orden Médica</h2>
        <div class="space-y-4">
            <select id="f-pet" class="input-field">${DB.pacientes.map(p => `<option value="${p.id}">${p.nombre} (${p.emailDueno})</option>`).join('')}</select>
            <input id="f-mot" placeholder="Motivo de consulta" class="input-field">
            <select id="f-med" class="input-field">${MEDS.map(m => `<option value="${m.n}">${m.n} - ${formatCOP(m.p)}</option>`).join('')}</select>
            <input id="f-cos" type="number" value="65000" class="input-field">
            <button onclick="guardarConsulta()" class="w-full p-4 bg-blue-600 text-white rounded-2xl font-bold">Generar Factura Pendiente</button>
            <button onclick="cerrarModal()" class="w-full p-2 text-slate-400 text-xs">Cancelar</button>
        </div>
    `;
}

function guardarConsulta() {
    const idPet = document.getElementById('f-pet').value;
    const pet = DB.pacientes.find(x => x.id === idPet);
    const idC = Math.random().toString(36).substr(2, 9);
    const costo = parseInt(document.getElementById('f-cos').value);
    
    DB.consultas.push({
        id: idC, idMascota: idPet, fecha: new Date().toLocaleDateString(),
        motivo: document.getElementById('f-mot').value, diag: "Nueva consulta generada.",
        med: document.getElementById('f-med').value, costo: costo
    });
    DB.facturas.push({ idConsulta: idC, emailDueno: pet.emailDueno, valor: costo, estado: "PENDIENTE" });
    
    localStorage.setItem('v_con', JSON.stringify(DB.consultas));
    localStorage.setItem('v_fac', JSON.stringify(DB.facturas));
    alert("Consulta guardada. Factura pendiente generada para " + pet.emailDueno);
    cerrarModal();
    navegar('Panel Médico');
}

function cerrarModal() { document.getElementById('modal-container').classList.add('hidden'); }

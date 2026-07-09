// ==========================================
// 0. GUARDIA DE SESIÓN
// ==========================================
// Si no hay un usuario activo (no pasó por login.html), lo regresamos al login.
const usuarioActivo = sessionStorage.getItem('usuarioActivo');
if (!usuarioActivo) {
    window.location.href = 'login.html';
}

// ==========================================
// 1. NAVBAR: nombre de usuario y logout
// ==========================================
const nombreUsuarioNav = document.getElementById('nombreUsuarioNav');
const avatarUsuario = document.getElementById('avatarUsuario');
const correoUsuarioDropdown = document.getElementById('correoUsuarioDropdown');
const btnUsuario = document.getElementById('btnUsuario');
const dropdownUsuario = document.getElementById('dropdownUsuario');
const btnSalir = document.getElementById('btnSalir');

if (usuarioActivo) {
    nombreUsuarioNav.textContent = usuarioActivo;
    correoUsuarioDropdown.textContent = usuarioActivo;
    avatarUsuario.textContent = usuarioActivo.charAt(0).toUpperCase();
}

btnUsuario.addEventListener('click', function (e) {
    e.stopPropagation();
    dropdownUsuario.classList.toggle('abierto');
});

document.addEventListener('click', function () {
    dropdownUsuario.classList.remove('abierto');
});

btnSalir.addEventListener('click', function () {
    sessionStorage.removeItem('usuarioActivo');
    window.location.href = 'login.html';
});

// ==========================================
// 2. SIDEBAR: colapsar / expandir (hamburguesa)
// ==========================================
const sidebar = document.getElementById('sidebar');
const navbar = document.getElementById('navbar');
const contenido = document.getElementById('contenido');
const btnHamburguesa = document.getElementById('btnHamburguesa');
const overlayMovil = document.getElementById('overlayMovil');

function esMovil() {
    return window.innerWidth <= 900;
}

btnHamburguesa.addEventListener('click', function () {
    if (esMovil()) {
        sidebar.classList.toggle('abierto-movil');
        overlayMovil.classList.toggle('visible');
    } else {
        sidebar.classList.toggle('colapsado');
        navbar.classList.toggle('expandido');
        contenido.classList.toggle('expandido');
    }
});

overlayMovil.addEventListener('click', function () {
    sidebar.classList.remove('abierto-movil');
    overlayMovil.classList.remove('visible');
});

// ==========================================
// 3. SIDEBAR: submenús desplegables (Usuarios / Alumnos)
// ==========================================
document.querySelectorAll('.item-titulo').forEach(function (titulo) {
    titulo.addEventListener('click', function () {
        const li = titulo.closest('li');
        li.classList.toggle('abierto');
    });
});

// ==========================================
// 4. NAVEGACIÓN ENTRE SECCIONES
// ==========================================
const secciones = document.querySelectorAll('.seccion');
const enlacesSubmenu = document.querySelectorAll('.enlace-submenu');

function mostrarSeccion(idSeccion) {
    secciones.forEach(sec => sec.classList.remove('activa'));
    const objetivo = document.getElementById('seccion-' + idSeccion);
    if (objetivo) objetivo.classList.add('activa');

    enlacesSubmenu.forEach(a => a.closest('li').classList.remove('activo'));

    if (esMovil()) {
        sidebar.classList.remove('abierto-movil');
        overlayMovil.classList.remove('visible');
    }
}

enlacesSubmenu.forEach(function (enlace) {
    enlace.addEventListener('click', function () {
        mostrarSeccion(this.dataset.seccion);
        this.closest('li').classList.add('activo');
    });
});

// ==========================================
// 5. MODALES: abrir / cerrar
// ==========================================
function abrirModal(id) {
    document.getElementById(id).classList.add('activo');
}
function cerrarModal(id) {
    document.getElementById(id).classList.remove('activo');
}

document.querySelectorAll('[data-cerrar-modal]').forEach(function (btn) {
    btn.addEventListener('click', function () {
        cerrarModal(this.dataset.cerrarModal);
    });
});

document.querySelectorAll('.modal-overlay').forEach(function (overlay) {
    overlay.addEventListener('click', function (e) {
        if (e.target === overlay) overlay.classList.remove('activo');
    });
});

// ==========================================
// 6. FORMULARIO: Usuarios > Captura
// ==========================================
const formUsuario = document.getElementById('formUsuario');

formUsuario.addEventListener('submit', function (e) {
    e.preventDefault();

    document.querySelectorAll('#formUsuario .error-msg, #error-usuario-general')
        .forEach(el => el.style.display = 'none');

    const nombre = document.getElementById('usu-nombre').value.trim();
    const correo = document.getElementById('usu-correo').value.trim();
    const password = document.getElementById('usu-password').value;

    let valido = true;

    if (!soloLetras(nombre) || nombre === '') {
        document.getElementById('error-usu-nombre').style.display = 'block';
        valido = false;
    }
    if (!validarCorreo(correo)) {
        document.getElementById('error-usu-correo').style.display = 'block';
        valido = false;
    }
    if (!validarPassword(password)) {
        document.getElementById('error-usu-password').style.display = 'block';
        valido = false;
    }

    if (!valido) {
        const errorGeneral = document.getElementById('error-usuario-general');
        errorGeneral.textContent = 'Revisa los campos marcados en rojo.';
        errorGeneral.style.display = 'block';
        return;
    }

    document.getElementById('modalUsuarioTexto').innerHTML =
        `<strong>${capitalizarTexto(nombre)}</strong> fue registrado correctamente con el correo <strong>${correo}</strong>.`;
    abrirModal('modalUsuario');
    formUsuario.reset();
});

// ==========================================
// 7. FORMULARIO: Alumnos > Captura
// ==========================================
const formAlumno = document.getElementById('formAlumno');

formAlumno.addEventListener('submit', function (e) {
    e.preventDefault();

    document.querySelectorAll('#formAlumno .error-msg, #error-alumno-general')
        .forEach(el => el.style.display = 'none');

    const nombre = document.getElementById('alu-nombre').value.trim();
    const control = document.getElementById('alu-control').value.trim();
    const fecha = document.getElementById('alu-fecha').value;

    let valido = true;

    if (!soloLetras(nombre) || nombre === '') {
        document.getElementById('error-alu-nombre').style.display = 'block';
        valido = false;
    }
    if (!validarLongitud(control, 8)) {
        document.getElementById('error-alu-control').style.display = 'block';
        valido = false;
    }
    if (!fecha) {
        document.getElementById('error-alu-fecha').style.display = 'block';
        valido = false;
    }

    if (!valido) {
        const errorGeneral = document.getElementById('error-alumno-general');
        errorGeneral.textContent = 'Revisa los campos marcados en rojo.';
        errorGeneral.style.display = 'block';
        return;
    }

    const edad = calcularEdad(fecha);
    const mayorEdad = esMayorDeEdad(fecha);
    const nombreFormateado = capitalizarTexto(nombre);

    const icono = document.getElementById('modalEdadIcono');
    const titulo = document.getElementById('modalEdadTitulo');
    const texto = document.getElementById('modalEdadTexto');

    if (mayorEdad) {
        icono.className = 'modal-icono ok';
        icono.textContent = '✓';
        titulo.textContent = 'Alumno mayor de edad';
    } else {
        icono.className = 'modal-icono no';
        icono.textContent = '✕';
        titulo.textContent = 'Alumno menor de edad';
    }

    texto.innerHTML = `
        <strong>${nombreFormateado}</strong> (control <strong>${control}</strong>)
        tiene <strong>${edad} años</strong>.<br>
        ${mayorEdad ? 'Es mayor de edad.' : 'Es menor de edad.'}
    `;

    abrirModal('modalEdad');
    formAlumno.reset();
});

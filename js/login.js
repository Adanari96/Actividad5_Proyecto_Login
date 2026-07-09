// ==========================================
// LÓGICA DE LA PANTALLA DE LOGIN
// ==========================================
// Nota: este login es simulado (sin backend). Solo valida el FORMATO
// del correo y la contraseña usando utileria.js. Si el formato es
// correcto, se "inicia sesión" y se guarda el correo para mostrarlo
// después en el navbar de index.html.

const loginForm = document.getElementById('loginForm');
const inputCorreo = document.getElementById('correo');
const inputPassword = document.getElementById('password');
const errorCorreo = document.getElementById('error-correo');
const errorPassword = document.getElementById('error-password');
const errorGeneral = document.getElementById('error-general');

function ocultarErrores() {
    [errorCorreo, errorPassword, errorGeneral].forEach(el => el.style.display = 'none');
}

loginForm.addEventListener('submit', function (e) {
    e.preventDefault();
    ocultarErrores();

    const correo = inputCorreo.value.trim();
    const password = inputPassword.value;

    let esValido = true;

    if (!validarCorreo(correo)) {
        errorCorreo.style.display = 'block';
        esValido = false;
    }

    if (!validarPassword(password)) {
        errorPassword.style.display = 'block';
        esValido = false;
    }

    if (!esValido) {
        errorGeneral.textContent = 'Revisa los campos marcados en rojo.';
        errorGeneral.style.display = 'block';
        return;
    }

    // "Login" exitoso (simulado): guardamos el usuario de la sesión.
    sessionStorage.setItem('usuarioActivo', correo);
    window.location.href = 'index.html';
});

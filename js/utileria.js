/**
 * LIBRERÍA DE UTILERÍAS JS
 * Colección de funciones puras para validación y formateo de datos.
 * Usada por login.html e index.html
 */

// ==========================================
// 1. FUNCIONES DE VALIDACIÓN
// ==========================================

/**
 * Valida que un correo electrónico tenga un formato correcto.
 * @param {string} correo
 * @returns {boolean}
 */
function validarCorreo(correo) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

/**
 * Verifica que un texto solo contenga letras y espacios.
 * @param {string} texto
 * @returns {boolean}
 */
function soloLetras(texto) {
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    return regex.test(texto);
}

/**
 * Verifica que un valor (número o texto numérico) tenga EXACTAMENTE
 * la longitud indicada. Se usa para teléfono (10) y número de control (6).
 * @param {number|string} valor
 * @param {number} longitudExacta
 * @returns {boolean}
 */
function validarLongitud(valor, longitudExacta) {
    const str = String(valor).trim();
    return str.length === longitudExacta && /^\d+$/.test(str);
}

/**
 * Verifica que el teléfono tenga exactamente 10 dígitos numéricos.
 * @param {string} telefono
 * @returns {boolean}
 */
function validarTelefono(telefono) {
    const regex = /^[0-9]{10}$/;
    return regex.test(telefono);
}

/**
 * Valida que una contraseña cumpla los requisitos mínimos de seguridad:
 * mínimo 8 caracteres, 1 mayúscula, 1 minúscula, 1 número y 1 carácter especial.
 * @param {string} password
 * @returns {boolean}
 */
function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(password);
}

// ==========================================
// 2. FUNCIONES DE FECHA / EDAD
// ==========================================

/**
 * Calcula la edad a partir de una fecha de nacimiento.
 * @param {string} fechaNacimiento
 * @returns {number}
 */
function calcularEdad(fechaNacimiento) {
    const nacimiento = new Date(fechaNacimiento);
    const hoy = new Date();

    let edad = hoy.getFullYear() - nacimiento.getFullYear();
    const mes = hoy.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
        edad--;
    }
    return Math.max(0, edad);
}

/**
 * Determina si una persona es mayor de edad (18 años o más).
 * @param {string} fechaNacimiento
 * @returns {boolean}
 */
function esMayorDeEdad(fechaNacimiento) {
    return calcularEdad(fechaNacimiento) >= 18;
}

// ==========================================
// 3. FUNCIONES DE FORMATEO (SECCIÓN LIBRE)
// ==========================================

/**
 * Convierte la primera letra de cada palabra en mayúscula
 * y el resto en minúscula.
 * @param {string} texto
 * @returns {string}
 */
function capitalizarTexto(texto) {
    if (!texto) return "";
    return texto
        .trim()
        .toLowerCase()
        .split(" ")
        .filter(Boolean)
        .map(p => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
}

/**
 * Da formato de moneda mexicana (MXN) a una cantidad numérica.
 * @param {number|string} cantidad
 * @returns {string}
 */
function formatearMoneda(cantidad) {
    const numero = parseFloat(cantidad);
    if (isNaN(numero)) return "$0.00";
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(numero);
}

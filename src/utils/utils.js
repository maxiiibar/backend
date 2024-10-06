import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcrypt from "bcrypt";

/**
 *  Función que realiza el hasheo de la contraseña a través del mecanismo "hashSync" de bcrypt
 * @param {string} password - Contraseña que se desea hashear
 * @returns - Contraseña hasheada
 */
export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * Función que compara la contraseña en string plano con la hasheada del usuario
 * @param {string} password - Contraseña tipo string plano
 * @param {string} passwordHasheada - Contraseña hasheada de usuario existente en base de datos
 * @returns {boolean}
 */
export const isValidPassword = (password, passwordHasheada) =>
  bcrypt.compareSync(password, passwordHasheada);

/**
 * Función para validar si el imput tiene efectivamente el formato adecuado
 * @param {string} email - String a validar
 * @returns True en caso de ser valido, falso si no
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Función para determinar si pasó más de x tiempo desde la última conexión del usuario
 * @param {date} lastConnectionDate - Fecha de la última conexión del usuario
 * @param {number} timeInHours - Tiempo a comprobar
 * @returns {boolean}
 */
export const hasBeenMoreThanXTime = (lastConnectionDate, timeInHours) => {
  const dateNow = new Date();
  const diffMs = dateNow - lastConnectionDate;
  const hoursMs = timeInHours * 60 * 60 * 1000;
  return diffMs > hoursMs;
};

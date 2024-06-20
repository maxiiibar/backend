import { dirname } from "path";
import { fileURLToPath } from "url";
export const __dirname = dirname(fileURLToPath(import.meta.url));

import bcrypt from "bcrypt";

/**
 *  Función que realiza el hasheo de la contraseña a través del mecanismo "hashSync" de bcrypt
 * @param {string} password - Contraseña que se desea hashear
 * @returns - Contraseña hasheada
 */
export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

/**
 * Función que compara la contraseña en string plano con la hasheada del usuario
 * @param {string} password - Contraseña tipo string plano
 * @param {string} passwordHasheada - Contraseña hasheada de usuario existente en base de datos
 * @returns {boolean}
 */

export const isValidPassword = (password, passwordHasheada) => bcrypt.compareSync(password, passwordHasheada);

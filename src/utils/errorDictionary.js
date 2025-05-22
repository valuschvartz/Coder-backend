// utils/errorDictionary.js
export const errorDictionary = {
    INVALID_USER_DATA: {
      code: 400,
      message: 'Los datos del usuario son inválidos o incompletos.'
    },
    PET_CREATION_ERROR: {
      code: 400,
      message: 'Error al crear la mascota. Verifica los campos requeridos.'
    },
    USER_ALREADY_EXISTS: {
      code: 409,
      message: 'El usuario ya se encuentra registrado.'
    },
    PET_NOT_FOUND: {
      code: 404,
      message: 'Mascota no encontrada.'
    },
    UNKNOWN_ERROR: {
      code: 500,
      message: 'Error interno del servidor.'
    }
  };
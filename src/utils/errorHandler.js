const errorDictionary = {
    USER_EXISTS: { code: 400, message: "El usuario ya existe" },
    INVALID_DATA: { code: 400, message: "Datos inválidos" },
    PET_EXISTS: { code: 400, message: "La mascota ya existe" },
    AUTH_FAIL: { code: 401, message: "Autenticación fallida" },
    NOT_FOUND: { code: 404, message: "Recurso no encontrado" },
    SERVER_ERROR: { code: 500, message: "Error interno del servidor" },
  };
  
  export function createCustomError(name, detail) {
    const err = new Error(detail || errorDictionary[name]?.message || "Error desconocido");
    err.name = name;
    err.statusCode = errorDictionary[name]?.code || 500;
    return err;
  }
  
  export function errorHandler(err, req, res, next) {
    const status = err.statusCode || 500;
    const message = err.message || "Error interno del servidor";
    res.status(status).json({ error: { name: err.name, message } });
  }
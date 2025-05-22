export default class GenericRepository {
    constructor(dao) {
      this.dao = dao;
    }
  
    // Obtener todos los documentos (opcionalmente con filtros)
    getAll = async (params = {}) => {
      try {
        return await this.dao.get(params);
      } catch (error) {
        throw new Error(`Error en getAll: ${error.message}`);
      }
    };
  
    // Obtener un documento por filtro (por ejemplo, { email: 'test@' })
    getBy = async (params) => {
      try {
        return await this.dao.getBy(params);
      } catch (error) {
        throw new Error(`Error en getBy: ${error.message}`);
      }
    };
  
    // Crear un nuevo documento
    create = async (doc) => {
      try {
        return await this.dao.save(doc);
      } catch (error) {
        throw new Error(`Error en create: ${error.message}`);
      }
    };
  
    // Actualizar un documento por ID
    update = async (id, doc) => {
      try {
        return await this.dao.update(id, doc);
      } catch (error) {
        throw new Error(`Error en update: ${error.message}`);
      }
    };
  
    // Eliminar un documento por ID
    delete = async (id) => {
      try {
        return await this.dao.delete(id);
      } catch (error) {
        throw new Error(`Error en delete: ${error.message}`);
      }
    };
  }
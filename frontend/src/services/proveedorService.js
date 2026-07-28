import axios from 'axios';
import mockData from '../data/mockData.json';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

/**
 * Capa de Abstracción de Servicios para Proveedores y Productos.
 * Intenta comunicarse con la API REST real en Spring Boot (puerto 8000)
 * y realiza fallback automático a mockData.json si el backend no está encendido aún.
 */
export const proveedorService = {
  async getCategorias() {
    try {
      const response = await axios.get(`${API_BASE_URL}/categorias`, { timeout: 2000 });
      return response.data;
    } catch (error) {
      console.info('[proveedorService] Backend offline o deshabilitado. Usando mockData para categorías.');
      return mockData.categorias;
    }
  },

  async getProveedores(categoriaId = '', query = '') {
    try {
      const response = await axios.get(`${API_BASE_URL}/proveedores`, {
        params: { categoriaId: categoriaId || undefined, query: query || undefined },
        timeout: 2000
      });
      return response.data;
    } catch (error) {
      console.info('[proveedorService] Backend offline o deshabilitado. Usando mockData para proveedores.');
      let result = [...mockData.proveedores];
      if (categoriaId) {
        result = result.filter((p) => String(p.categoriaId) === String(categoriaId));
      }
      if (query) {
        const q = query.toLowerCase();
        result = result.filter(
          (p) =>
            p.nombreNegocio.toLowerCase().includes(q) ||
            p.descripcion.toLowerCase().includes(q) ||
            p.ciudad.toLowerCase().includes(q) ||
            p.productos.some((prod) => prod.nombre.toLowerCase().includes(q))
        );
      }
      return result;
    }
  },

  async getProveedorPorId(id) {
    try {
      const response = await axios.get(`${API_BASE_URL}/proveedores/${id}`, { timeout: 2000 });
      return response.data;
    } catch (error) {
      console.info(`[proveedorService] Backend offline. Usando mockData para proveedor #${id}.`);
      const proveedor = mockData.proveedores.find((p) => String(p.id) === String(id));
      if (!proveedor) {
        throw new Error(`Proveedor con ID ${id} no encontrado.`);
      }
      return proveedor;
    }
  },

  async registrarProveedor(datosProveedor) {
    try {
      const response = await axios.post(`${API_BASE_URL}/proveedores`, datosProveedor, { timeout: 3000 });
      return {
        exito: true,
        mensaje: 'Tu perfil ha sido registrado y será revisado en menos de 48 horas.',
        proveedorId: response.data.id
      };
    } catch (error) {
      console.info('[proveedorService] Backend offline. Simulando registro de proveedor.');
      return {
        exito: true,
        mensaje: 'Tu perfil será revisado y publicado en menos de 48 horas.',
        proveedorId: `prov-temp-${Date.now()}`
      };
    }
  },

  async trackContacto(proveedorId, canal = 'whatsapp') {
    try {
      await axios.post(`${API_BASE_URL}/tracking/contacto`, { proveedorId, canal }, { timeout: 2000 });
      console.log(`[SPRING BOOT OBSERVER] Evento de contacto registrado en la base de datos para proveedor #${proveedorId}`);
    } catch (error) {
      console.info(`[proveedorService] Simulación local: Clic en contactar a proveedor #${proveedorId} vía ${canal}`);
    }
    return { exito: true };
  }
};

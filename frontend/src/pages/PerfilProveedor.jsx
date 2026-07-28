import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { proveedorService } from '../services/proveedorService';
import { ProductoCard } from '../components/features/perfil/ProductoCard';
import { BotonContacto } from '../components/features/perfil/BotonContacto';
import { ModalDisponibilidad } from '../components/features/perfil/ModalDisponibilidad';
import { SeccionResenas } from '../components/features/perfil/SeccionResenas';
import { Badge } from '../components/common/Badge';

export const PerfilProveedor = () => {
  const { id } = useParams();
  const [proveedor, setProveedor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productoCotizar, setProductoCotizar] = useState(null);

  useEffect(() => {
    async function loadProveedor() {
      setLoading(true);
      try {
        const data = await proveedorService.getProveedorPorId(id);
        setProveedor(data);
      } catch (err) {
        setProveedor(null);
      } finally {
        setLoading(false);
      }
    }
    loadProveedor();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-slate-500 text-sm">
        Cargando perfil del proveedor...
      </div>
    );
  }

  if (!proveedor) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-900">Proveedor no encontrado</h2>
        <p className="text-sm text-slate-500">
          El proveedor que estás buscando no existe o fue desactivado del catálogo.
        </p>
        <Link to="/">
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold">
            Volver al catálogo
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-24">
      {/* Botón Volver */}
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver al catálogo completo</span>
      </Link>

      {/* Header del Proveedor */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
        <img
          src={proveedor.fotoUrl}
          alt={proveedor.nombreNegocio}
          className="w-full md:w-48 h-48 rounded-2xl object-cover border border-slate-100 shadow-inner"
        />

        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-heading">
              {proveedor.nombreNegocio}
            </h1>
            {proveedor.verificado && (
              <Badge variant="teal" className="gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verificado
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
            <MapPin className="w-4 h-4 text-teal-600" />
            <span>{proveedor.ciudad}</span>
            <span className="text-slate-300">•</span>
            <span>Miembro activo desde {proveedor.fechaRegistro || '2024'}</span>
          </div>

          <p className="text-slate-600 text-sm leading-relaxed max-w-2xl">
            {proveedor.descripcion}
          </p>

          <div className="pt-2">
            <BotonContacto
              proveedor={proveedor}
              productoSeleccionado={productoCotizar}
            />
          </div>
        </div>
      </div>

      {/* Catálogo de Productos del Proveedor */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 font-heading">
              Productos Disponibles
            </h2>
            <p className="text-xs text-slate-500">
              Haz clic en "Consultar disponibilidad" para ver tiempos de entrega y lotes mínimos.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full border border-slate-200">
            {proveedor.productos?.length || 0} ítems en catálogo
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {proveedor.productos?.map((producto) => (
            <ProductoCard
              key={producto.id}
              producto={producto}
              onCotizar={(prod) => setProductoCotizar(prod)}
            />
          ))}
        </div>
      </div>

      {/* Sección de Reseñas y Experiencias B2B */}
      <SeccionResenas proveedorId={proveedor.id} />

      {/* Modal interactivo de Disponibilidad */}
      {productoCotizar && (
        <ModalDisponibilidad
          producto={productoCotizar}
          proveedor={proveedor}
          onClose={() => setProductoCotizar(null)}
        />
      )}
    </div>
  );
};

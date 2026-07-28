import React, { useState } from 'react';
import { X, Clock, PackageCheck, Truck, MessageSquare, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '../../common/Button';
import { proveedorService } from '../../../services/proveedorService';

export const ModalDisponibilidad = ({ producto, proveedor, onClose }) => {
  const [enviado, setEnviado] = useState(false);
  const [cantidad, setCantidad] = useState(100);

  if (!producto || !proveedor) return null;

  const precioTotalEst = (producto.precioSugerido * cantidad).toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  });

  const handleWhatsAppQuote = async () => {
    await proveedorService.trackContacto(proveedor.id, 'whatsapp');
    const mensaje = `Hola *${proveedor.nombreNegocio}*, estoy consultando disponibilidad de *${producto.nombre}* (${cantidad} unidades). ¿Tienen stock inmediato para despacho a mi ciudad?`;
    const phone = proveedor.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden space-y-0">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 bg-slate-900 text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-900 font-bold">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-tight">Consulta de Disponibilidad</h3>
              <p className="text-xs text-slate-300">{proveedor.nombreNegocio}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Card Detalle Producto */}
          <div className="flex gap-4 p-3 bg-slate-50 rounded-2xl border border-slate-200/80">
            <img
              src={producto.fotoUrl}
              alt={producto.nombre}
              className="w-20 h-20 rounded-xl object-cover border border-slate-200"
            />
            <div className="space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">{producto.nombre}</h4>
              <p className="text-xs text-slate-500 line-clamp-1">{producto.descripcion}</p>
              <div className="flex items-center gap-2 pt-1 text-xs">
                <span className="font-extrabold text-slate-900">
                  ${producto.precioSugerido?.toLocaleString('es-CO')} / ud
                </span>
                {producto.unidadMinima && (
                  <span className="text-[10px] bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md font-semibold">
                    {producto.unidadMinima}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Métricas de Disponibilidad */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-teal-50/70 border border-teal-200/80 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-teal-800 font-bold">
                <Clock className="w-4 h-4 text-teal-600" />
                <span>Tiempo Despacho</span>
              </div>
              <p className="text-xs text-teal-900 font-medium">24 a 48 horas hábiles</p>
            </div>

            <div className="p-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-amber-800 font-bold">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Capacidad Stock</span>
              </div>
              <p className="text-xs text-amber-900 font-medium">Lotes de alta capacidad</p>
            </div>
          </div>

          {/* Calculadora Estimada */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700">
              <span>Cantidad estimada a solicitar:</span>
              <span className="text-teal-700 font-extrabold text-sm">{cantidad} unidades</span>
            </div>
            <input
              type="range"
              min={20}
              max={2000}
              step={10}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value))}
              className="w-full accent-teal-600 cursor-pointer"
            />
            <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
              <span>Valor estimado sugerido:</span>
              <span className="font-extrabold text-slate-900 text-sm">{precioTotalEst}</span>
            </div>
          </div>

          {/* Botones de Acción directos */}
          <div className="space-y-3 pt-2">
            <Button
              variant="primary"
              size="lg"
              icon={MessageSquare}
              onClick={handleWhatsAppQuote}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 text-sm shadow-md shadow-emerald-600/20"
            >
              Consultar Stock por WhatsApp
            </Button>
            <p className="text-[11px] text-slate-400 text-center">
              * El proveedor responderá con la confirmación de inventario y flete exacto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

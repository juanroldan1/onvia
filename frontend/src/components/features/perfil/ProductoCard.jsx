import React from 'react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';
import { ShoppingBag } from 'lucide-react';

export const ProductoCard = ({ producto, onCotizar }) => {
  const precioFormateado = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0
  }).format(producto.precioSugerido);

  return (
    <Card className="flex flex-col justify-between overflow-hidden">
      <div>
        <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
          <img
            src={producto.fotoUrl}
            alt={producto.nombre}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 space-y-2">
          <h4 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
            {producto.nombre}
          </h4>
          <p className="text-xs text-slate-500 line-clamp-2">
            {producto.descripcion}
          </p>
          <div className="pt-2 flex items-baseline justify-between border-t border-slate-100">
            <div>
              <span className="text-xs text-slate-400 block font-medium">Desde</span>
              <span className="text-base font-extrabold text-slate-900">{precioFormateado}</span>
            </div>
            {producto.unidadMinima && (
              <Badge variant="navy" className="text-[10px]">
                {producto.unidadMinima}
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div className="p-4 pt-0">
        <button
          onClick={() => onCotizar && onCotizar(producto)}
          className="w-full py-2 px-3 bg-slate-100 hover:bg-teal-50 text-slate-800 hover:text-teal-700 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 border border-slate-200 hover:border-teal-300 transition-all cursor-pointer"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          <span>Consultar disponibilidad</span>
        </button>
      </div>
    </Card>
  );
};

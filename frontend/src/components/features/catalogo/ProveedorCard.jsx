import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, CheckCircle2, ChevronRight, PackageCheck } from 'lucide-react';
import { Card } from '../../common/Card';
import { Badge } from '../../common/Badge';

export const ProveedorCard = ({ proveedor }) => {
  return (
    <Card className="flex flex-col justify-between overflow-hidden group">
      <div>
        {/* Banner / Foto con Badge */}
        <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
          <img
            src={proveedor.fotoUrl}
            alt={proveedor.nombreNegocio}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
          
          <div className="absolute top-3 right-3 flex gap-2">
            {proveedor.badge && (
              <Badge variant={proveedor.badge === 'Destacado' ? 'orange' : 'teal'}>
                {proveedor.badge}
              </Badge>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 text-white">
            <h3 className="font-extrabold text-lg leading-tight line-clamp-1 group-hover:text-teal-300 transition-colors">
              {proveedor.nombreNegocio}
            </h3>
            <div className="flex items-center gap-1.5 text-xs text-slate-200 mt-1">
              <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
              <span>{proveedor.ciudad}</span>
            </div>
          </div>
        </div>

        {/* Cuerpo */}
        <div className="p-4 space-y-3">
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {proveedor.descripcion}
          </p>

          {/* Cantidad de Productos */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
            <span className="flex items-center gap-1.5 text-slate-500 font-medium">
              <PackageCheck className="w-4 h-4 text-teal-600" />
              {proveedor.productos?.length || 0} productos catálogo
            </span>
            {proveedor.verificado && (
              <span className="flex items-center gap-1 text-emerald-600 font-semibold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Verificado
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Card Action */}
      <div className="p-4 pt-0">
        <Link to={`/proveedor/${proveedor.id}`} className="block w-full">
          <button className="w-full py-2.5 px-4 bg-slate-900 hover:bg-teal-600 text-white hover:text-slate-95 font-semibold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all duration-200">
            <span>Ver Productos y Cotizar</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </Card>
  );
};

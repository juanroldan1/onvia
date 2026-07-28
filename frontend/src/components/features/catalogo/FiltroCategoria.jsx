import React from 'react';
import { Package, Rocket, Building2, Briefcase, Grid } from 'lucide-react';

const iconMap = {
  Package: Package,
  Rocket: Rocket,
  Building2: Building2,
  Briefcase: Briefcase,
};

export const FiltroCategoria = ({ categorias, categoriaSeleccionada, onSelectCategoria }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      <button
        onClick={() => onSelectCategoria('')}
        className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all duration-200 cursor-pointer ${
          categoriaSeleccionada === ''
            ? 'bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-105'
            : 'bg-white text-slate-700 hover:bg-slate-100 hover:scale-105 border border-slate-200'
        }`}
      >
        <Grid className="w-4 h-4" />
        <span>Todos</span>
      </button>

      {categorias.map((cat) => {
        const IconComponent = iconMap[cat.icono] || Package;
        const isSelected = categoriaSeleccionada === cat.id;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategoria(cat.id)}
            title={cat.descripcion}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap flex items-center gap-2 transition-all duration-200 cursor-pointer ${
              isSelected
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:scale-105 border border-slate-200'
            }`}
          >
            <IconComponent className="w-4 h-4" />
            <span>{cat.nombre}</span>
          </button>
        );
      })}
    </div>
  );
};

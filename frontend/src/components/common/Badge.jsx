import React from 'react';

/**
 * Componente Badge para mostrar categorías, estados o etiquetas ("Destacado", "Verificado").
 */
export const Badge = ({ children, variant = 'teal', className = '' }) => {
  const variants = {
    teal: 'bg-teal-50 text-teal-700 border-teal-200',
    orange: 'bg-orange-50 text-orange-700 border-orange-200',
    navy: 'bg-slate-100 text-slate-800 border-slate-300',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
        variants[variant] || variants.navy
      } ${className}`}
    >
      {children}
    </span>
  );
};

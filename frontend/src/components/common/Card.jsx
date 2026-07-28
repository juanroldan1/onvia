import React from 'react';

/**
 * Componente Card contenedor reutilizable con bordes redondeados y micro-interacción al hacer hover.
 */
export const Card = ({ children, className = '', hover = true, onClick, ...props }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-xl border border-slate-200/80 shadow-sm ${
        hover ? 'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

import React from 'react';

/**
 * Campo de texto / Input reutilizable con soporte para label, icono y mensajes de error.
 */
export const Input = ({
  label,
  error,
  icon: Icon,
  type = 'text',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-slate-700">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <div className="absolute left-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        <input
          id={inputId}
          type={type}
          className={`w-full bg-white border ${
            error ? 'border-red-400 focus:ring-red-400' : 'border-slate-300 focus:ring-teal-500'
          } rounded-xl py-2.5 ${
            Icon ? 'pl-11' : 'pl-4'
          } pr-4 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${className}`}
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};

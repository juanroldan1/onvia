import React from 'react';

/**
 * Componente de Botón reutilizable con variantes de estilo del sistema de diseño.
 */
export const Button = ({
  children,
  variant = 'primary', // 'primary' (Teal), 'secondary' (Navy), 'outline', 'ghost'
  size = 'md', // 'sm', 'md', 'lg'
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-sm';

  const variants = {
    primary:
      'bg-teal-600 hover:bg-teal-700 text-white focus:ring-teal-500 shadow-teal-700/20 active:scale-[0.98]',
    secondary:
      'bg-slate-800 hover:bg-slate-900 text-white focus:ring-slate-700 shadow-slate-900/20 active:scale-[0.98]',
    outline:
      'border-2 border-slate-300 hover:border-slate-800 text-slate-700 hover:text-slate-900 bg-white focus:ring-slate-500',
    ghost:
      'text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:ring-slate-400 shadow-none'
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5 font-semibold'
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`}
      {...props}
    >
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
    </button>
  );
};

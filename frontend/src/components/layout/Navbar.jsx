import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, PlusCircle, Search } from 'lucide-react';
import { Button } from '../common/Button';

export const Navbar = () => {
  const location = useLocation();
  const [usePngLogo, setUsePngLogo] = useState(true);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Contenedor del Logo PNG con fallback elegante */}
        <Link to="/" className="flex items-center gap-2.5 group">
          {usePngLogo ? (
            <img
              src="/logo.png"
              alt="Logo B2B Marketplace"
              onError={() => setUsePngLogo(false)}
              className="h-9 w-auto object-contain group-hover:scale-105 transition-transform"
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center text-slate-900 font-extrabold group-hover:scale-105 transition-transform shadow-md shadow-teal-500/20">
              <Package className="w-6 h-6 stroke-[2.5]" />
            </div>
          )}
          <div>
            <span className="text-lg font-extrabold tracking-tight text-white font-heading">
              on<span className="text-teal-400">via</span>
            </span>
            <span className="hidden sm:block text-[10px] uppercase font-bold tracking-widest text-slate-400 -mt-1">
              la web de los negociantes
            </span>
          </div>
        </Link>

        {/* Links de navegación */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link to="/">
            <Button
              variant="ghost"
              size="sm"
              icon={Search}
              className="text-slate-300 hover:text-white hover:bg-slate-800"
            >
              Buscar negocios, servicios o proveedores
            </Button>
          </Link>

          <Link to="/registro">
            <Button
              variant="primary"
              size="sm"
              icon={PlusCircle}
              className="bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold"
            >
             Tengo un negocio
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

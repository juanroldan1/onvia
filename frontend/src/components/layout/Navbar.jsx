import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Package, PlusCircle, Search, LogIn, User, ChevronDown } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const [usePngLogo, setUsePngLogo] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  // Simula si hay sesión iniciada (cuando exista auth real, cambiar esto)
  const isLoggedIn = false;

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white shadow-md">
      <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

        {/* Logo */}
        <Link to="/" className="flex items-center group py-1 shrink-0">
          {usePngLogo ? (
            <div className="flex items-center gap-2">
              <img
                src="/onviaLogo.png"
                alt="Logo VíaWeb"
                onError={() => setUsePngLogo(false)}
                className="h-10 sm:h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
              <div className="flex flex-col justify-center leading-none">
                <span className="text-lg sm:text-xl font-bold text-teal-400 group-hover:text-teal-300 transition-colors duration-200">
                  Onvia
                </span>
                <span className="text-[10px] font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-200 -mt-0.5">
                  web
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center group-hover:scale-105 transition-transform duration-200 shadow-lg shadow-teal-500/20">
                <Package className="w-5 h-5 text-slate-900 stroke-[2.5]" />
              </div>
              <div className="flex flex-col justify-center leading-none">
                <span className="text-lg font-bold text-teal-400 group-hover:text-teal-300 transition-colors duration-200">Onvia</span>
                <span className="text-[10px] font-medium text-slate-400 -mt-0.5">web</span>
              </div>
            </div>
          )}
        </Link>

        {/* Buscador central (solo visible en pantallas medianas+) */}
        <Link
          to="/"
          className="hidden md:flex flex-1 max-w-md items-center gap-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 rounded-xl px-4 py-2 text-sm text-slate-400 hover:text-slate-200 transition-all duration-200 group"
        >
          <Search className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors duration-200 shrink-0" />
          <span className="truncate">Buscar negocios, servicios o proveedores...</span>
        </Link>

        {/* Acciones derecha */}
        <nav className="flex items-center gap-2 shrink-0">
          {/* Buscador pequeño en móvil */}
          <Link
            to="/"
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-teal-400 hover:bg-slate-800 transition-all duration-200"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Botón Iniciar Sesión */}
          {!isLoggedIn ? (
            <Link to="/login">
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-all duration-200 text-sm font-medium cursor-pointer">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Iniciar sesión</span>
              </button>
            </Link>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-700 hover:border-teal-500/50 transition-all duration-200 text-sm font-medium cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-teal-500 flex items-center justify-center">
                  <User className="w-3.5 h-3.5 text-slate-900" />
                </div>
                <span className="hidden sm:inline">Mi negocio</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${menuOpen ? 'rotate-180' : ''}`} />
              </button>

              {menuOpen && (
                <div className="absolute right-0 top-full mt-2 w-44 bg-slate-800 border border-slate-700 rounded-xl shadow-xl overflow-hidden z-50">
                  <Link
                    to="/mi-negocio"
                    className="flex items-center gap-2 px-4 py-3 text-sm text-slate-300 hover:text-white hover:bg-slate-700 transition-colors duration-150"
                    onClick={() => setMenuOpen(false)}
                  >
                    <User className="w-4 h-4 text-teal-400" />
                    Mi Perfil
                  </Link>
                  <button
                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-red-400 hover:text-red-300 hover:bg-slate-700 transition-colors duration-150 cursor-pointer"
                    onClick={() => setMenuOpen(false)}
                  >
                    <LogIn className="w-4 h-4 rotate-180" />
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Botón Tengo un negocio */}
          <Link to="/registro">
            <button className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-900 font-bold text-sm transition-all duration-200 shadow-md shadow-teal-500/20 hover:shadow-teal-500/30 cursor-pointer">
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Tengo un negocio</span>
              <span className="sm:hidden">Unirme</span>
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

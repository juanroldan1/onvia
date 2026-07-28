import { useState } from 'react';
import { Link } from 'react-router-dom';

/**
 * COMPONENTE HEADER (NAVBAR REUTILIZABLE)
 * 
 * Este componente se utiliza en todas las páginas para mantener
 * una navegación consistente. Incluye:
 * - Logo/Nombre de la app
 * - Links de navegación (desktop)
 * - Botones de Iniciar sesión y Registrarse
 * - Menú hamburguesa responsive para móviles
 * 
 * VENTAJAS DE COMPONENTES:
 * - DRY: No Repetir Código (Don't Repeat Yourself)
 * - Mantenibilidad: Cambios en un solo lugar
 * - Consistencia: Mismo diseño en todas las páginas
 */
export default function Header() {
  // Estado para controlar si el menú móvil está abierto
  const [menuAbierto, setMenuAbierto] = useState(false);

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex justify-between items-center">
        {/* LOGO / NOMBRE DE LA APP */}
        <span className="text-xl font-bold text-slate-800">MiApp</span>

        {/* LINKS DE NAVEGACIÓN - Solo visibles en desktop (md: responsive de Tailwind) */}
        <div className="hidden md:flex gap-4">
          {/* Link a Servicios */}
          <Link
            to="/servicios"
            className="text-slate-600 hover:text-slate-900 font-medium transition"
          >
            Servicios
          </Link>

          {/* Link a Acerca de */}
          <Link
            to="/about"
            className="text-slate-600 hover:text-slate-900 font-medium transition"
          >
            Acerca de
          </Link>

          {/* Link a Contacto */}
          <Link
            to="/contact"
            className="text-slate-600 hover:text-slate-900 font-medium transition"
          >
            Contacto
          </Link>
        </div>

        {/* BOTONES DE AUTENTICACIÓN - Solo visibles en desktop */}
        <div className="hidden md:flex gap-4">
          {/* Botón Iniciar sesión */}
          <Link
            to="/login"
            className="text-slate-600 hover:text-slate-900 font-medium transition"
          >
            Iniciar sesión
          </Link>

          {/* Botón Registrarse - Usando color primario */}
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition"
          >
            Registrarse
          </Link>
        </div>

        {/* BOTÓN HAMBURGUESA - Solo visible en móviles */}
        {/* md:hidden = oculto en pantallas medianas o más grandes */}
        <button
          className="md:hidden text-slate-700"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* Mostrar X si está abierto, menú si está cerrado */}
            {menuAbierto ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      {/* Se muestra solo cuando menuAbierto es true y en pantallas pequeñas */}
      {menuAbierto && (
        <div className="md:hidden mt-4 flex flex-col gap-3">
          {/* Links de navegación móvil */}
          <Link
            to="/servicios"
            className="text-slate-600 hover:text-slate-900 font-medium text-left transition"
          >
            Servicios
          </Link>
          <Link
            to="/about"
            className="text-slate-600 hover:text-slate-900 font-medium text-left transition"
          >
            Acerca de
          </Link>
          <Link
            to="/contact"
            className="text-slate-600 hover:text-slate-900 font-medium text-left transition"
          >
            Contacto
          </Link>

          {/* Separador visual */}
          <div className="border-t border-slate-200 mt-2 pt-2"></div>

          {/* Botones de autenticación en móvil */}
          <Link
            to="/login"
            className="text-slate-600 hover:text-slate-900 font-medium text-left transition"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/register"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg transition text-center"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
}

import { Link } from 'react-router-dom';
import Header from '../components/header';

function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Importar el Header componente reutilizable */}
      <Header />

      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Bienvenido a <span className="text-indigo-600">OnVia</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
          Esta es tu pantalla de inicio. Desde aquí vas a construir el resto
          de tu aplicación.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <Link to="/Start.jsx" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition">
            descubre los servicios que tenemos para ti
          </Link>
        </div>
      </section>

      {/* Tarjetas / features */}
      <section className="max-w-5xl mx-auto px-6 pb-24 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-indigo-600 font-bold">1</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Rápido</h3>
          <p className="text-slate-600 text-sm">
            Construido con React + Vite para tiempos de carga mínimos.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-indigo-600 font-bold">2</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Seguro</h3>
          <p className="text-slate-600 text-sm">
            Autenticación con Laravel Sanctum en el backend.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 hover:shadow-md transition">
          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
            <span className="text-indigo-600 font-bold">3</span>
          </div>
          <h3 className="font-semibold text-slate-800 mb-2">Escalable</h3>
          <p className="text-slate-600 text-sm">
            Arquitectura API + SPA lista para crecer.
          </p>
        </div>
      </section>

      {/* Call to action final */}
      <section className="bg-indigo-600 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-white">¿Listo para comenzar?</h2>
        <p className="text-indigo-100 mt-3 max-w-md mx-auto">
          Crea tu cuenta gratis y empieza a usar MiApp hoy mismo.
        </p>
        <button className="mt-6 bg-white text-indigo-600 font-semibold px-6 py-3 rounded-lg hover:bg-indigo-50 transition">
          Crear cuenta
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-6 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-white font-semibold">MiApp</span>
          <p className="text-sm">© 2026 MiApp. Todos los derechos reservados.</p>
          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:text-white transition">Términos</a>
            <a href="#" className="hover:text-white transition">Privacidad</a>
            <a href="#" className="hover:text-white transition">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
      
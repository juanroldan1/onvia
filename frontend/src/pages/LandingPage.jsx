import React, { useState, useEffect } from 'react';
import { Search, ArrowRight, Sparkles, Users, ShoppingBag, TrendingUp } from 'lucide-react';
import { proveedorService } from '../services/proveedorService';
import { FiltroCategoria } from '../components/features/catalogo/FiltroCategoria';
import { ProveedorCard } from '../components/features/catalogo/ProveedorCard';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

// Frases animadas del hero (se rotan automáticamente)
const HERO_FRASES = [
  { texto: 'emprendimientos', color: 'text-teal-400' },
  { texto: 'negocios', color: 'text-orange-400' },
  { texto: 'proveedores', color: 'text-teal-400' },
  { texto: 'servicios', color: 'text-orange-400' },
];

export const LandingPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [categoriaSel, setCategoriaSel] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);
  const [fraseIdx, setFraseIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  // Rotación automática de frases en el hero
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setFraseIdx((prev) => (prev + 1) % HERO_FRASES.length);
        setVisible(true);
      }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    async function loadInitialData() {
      setLoading(true);
      const [catList, provList] = await Promise.all([
        proveedorService.getCategorias(),
        proveedorService.getProveedores(categoriaSel, busqueda)
      ]);
      setCategorias(catList);
      setProveedores(provList);
      setLoading(false);
    }
    loadInitialData();
  }, [categoriaSel, busqueda]);

  const fraseActual = HERO_FRASES[fraseIdx];

  return (
    <div className="space-y-12 pb-16">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative bg-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl overflow-hidden">

        {/* Fondo punteado animado */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:20px_20px] animate-pulse" />

        {/* Círculos decorativos flotantes */}
        <div className="absolute top-8 left-8 w-48 h-48 rounded-full bg-teal-500/5 border border-teal-500/10 animate-[spin_30s_linear_infinite]" />
        <div className="absolute bottom-12 right-12 w-32 h-32 rounded-full bg-orange-500/5 border border-orange-500/10 animate-[spin_20s_linear_infinite_reverse]" />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-teal-400/5 border border-teal-400/10 animate-[bounce_6s_ease-in-out_infinite]" />

        <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">

          {/* Headline con frase animada */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white font-heading">
            {/* Texto fijo */}
            <span>{'"vivimos para servir'}<br /></span>
            <span>y algunos para ser </span>
            {/* Palabra que rota con fade in/out */}
            <span
              className={`inline-block ${fraseActual.color} transition-all duration-400 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
              style={{ transition: 'opacity 0.4s ease, transform 0.4s ease' }}
            >
              {fraseActual.texto}
            </span>
            <span className="text-white">{'"'}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Encuentra proveedores, emprendimientos y servicios para tu negocio o para ti.
          </p>

          {/* Barra de Búsqueda */}
          <div className="bg-white p-2 rounded-2xl shadow-2xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-2 border border-slate-200">
            <div className="flex-1 flex items-center pl-3 w-full">
              <Search className="w-5 h-5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Buscar producto o servicio..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full pl-3 pr-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
              />
            </div>
            <Button
              variant="primary"
              size="md"
              className="w-full sm:w-auto bg-teal-500 hover:bg-teal-600 text-slate-900 font-bold px-6"
            >
              Buscar
            </Button>
          </div>

          {/* Stats rápidas de confianza */}
          <div className="flex flex-wrap justify-center gap-6 pt-2">
            {[
              { icon: Users, label: 'Negocios activos', value: '200+' },
              { icon: ShoppingBag, label: 'Productos publicados', value: '1.4K+' },
              { icon: TrendingUp, label: 'Conexiones mensuales', value: '3K+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex items-center gap-2 text-slate-400 text-xs">
                <Icon className="w-4 h-4 text-teal-500" />
                <span className="font-bold text-white">{value}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATÁLOGO ─────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight font-heading">
              Catálogo
            </h2>
            <p className="text-sm text-slate-500">
              Explora por categorías o filtra la lista.
            </p>
          </div>
        </div>

        <FiltroCategoria
          categorias={categorias}
          categoriaSeleccionada={categoriaSel}
          onSelectCategoria={setCategoriaSel}
        />

        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            Cargando catálogo...
          </div>
        ) : proveedores.length === 0 ? (
          <div className="py-12 bg-white rounded-2xl border border-slate-200 text-center space-y-3">
            <p className="text-slate-600 font-medium text-sm">
              No encontramos una respuesta para lo que pides.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setCategoriaSel('');
                setBusqueda('');
              }}
            >
              Limpiar Filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {proveedores.map((proveedor) => (
              <ProveedorCard key={proveedor.id} proveedor={proveedor} />
            ))}
          </div>
        )}
      </section>

      {/* ── BANNER CTA ───────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>¿Tienes algo que ofrecer?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-heading">
              Publica tu negocio gratis y llega a más personas
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Únete a la red y conecta directamente con clientes, socios o proveedores que necesitan lo que tú ofreces.
            </p>
          </div>
          <Link to="/registro">
            <Button
              variant="primary"
              size="lg"
              icon={ArrowRight}
              className="bg-teal-500 hover:bg-teal-400 text-slate-900 font-extrabold text-base whitespace-nowrap px-8 shadow-lg shadow-teal-500/20"
            >
              Registrar mi negocio
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

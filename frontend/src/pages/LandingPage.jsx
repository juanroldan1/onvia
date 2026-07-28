import React, { useState, useEffect } from 'react';
import { Search, ShieldCheck, Zap, Factory, ArrowRight } from 'lucide-react';
import { proveedorService } from '../services/proveedorService';
import { FiltroCategoria } from '../components/features/catalogo/FiltroCategoria';
import { ProveedorCard } from '../components/features/catalogo/ProveedorCard';
import { Button } from '../components/common/Button';
import { Link } from 'react-router-dom';

export const LandingPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [proveedores, setProveedores] = useState([]);
  const [categoriaSel, setCategoriaSel] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section con Headline y Buscador Combinado */}
      <section className="relative bg-slate-900 text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#14B8A6_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-teal-400 text-xs font-semibold">
            <Zap className="w-4 h-4" />
            <span>onvia para Empresas y Emprendedores</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white font-heading">
            vivimos para servir y<span className="text-teal-400"> algunos para ser servidos</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal">
            Encuentra proovedores, emprendimientos y servicios para tu negocio o para ti.
          </p>

          {/* Barra de Búsqueda Combinada */}
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
        </div>
      </section>

      {/* Catálogo de Proveedores */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Catálogo
            </h2>
            <p className="text-sm text-slate-500">
              Explora por categorías o filtra la lista.
            </p>
          </div>
        </div>

        {/* Chips de Categorías */}
        <FiltroCategoria
          categorias={categorias}
          categoriaSeleccionada={categoriaSel}
          onSelectCategoria={setCategoriaSel}
        />

        {/* Grid de Proveedores */}
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

      {/* Banner de Propuesta de Valor para Registro */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-800 shadow-xl">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-xs uppercase tracking-wider">
              <Factory className="w-4 h-4" />
              <span>¿Eres fabricante o distribuidor?</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Publica tu catálogo gratis y recibe compras al por mayor
            </h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              Únete al directorio verificado y conecta directamente con empresas que necesitan cajas, vinipel y cintas de embalaje.
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

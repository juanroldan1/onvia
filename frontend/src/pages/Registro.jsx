import React from 'react';
import { ArrowLeft, ShieldCheck, Zap, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FormularioProveedor } from '../components/features/registro/FormularioProveedor';

export const Registro = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Volver a la página principal</span>
      </Link>

      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-bold border border-teal-200">
        
          
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
          Registrate y conecta con clientes, proovedores y servicios para potenciar tu negocio
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
         registra tu negocio y has que mas personas lo vean
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
        <FormularioProveedor />
      </div>
    </div>
  );
};

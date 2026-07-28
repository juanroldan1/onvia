import React from 'react';
import { Package, ShieldCheck, Mail, Phone, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Columna 1: Branding */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-teal-500 flex items-center justify-center text-slate-900 font-bold">
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">CentroProveedores</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm">
              La plataforma que simplifica las compras industriales B2B conectando directo con fabricantes y distribuidores de empaques, cintas y vinipel.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 bg-slate-800/80 w-fit px-3 py-1.5 rounded-full border border-slate-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>Validación manual de cada proveedor en 48 horas</span>
            </div>
          </div>

          {/* Columna 2: Categorías */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Categorías</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="hover:text-teal-400 transition-colors">emprendimientos</li>
              <li className="hover:text-teal-400 transition-colors">mi negocio</li>
              <li className="hover:text-teal-400 transition-colors">proveedores</li>
              <li className="hover:text-teal-400 transition-colors">ayuda</li>
            </ul>
          </div>

          {/* Columna 3: Soporte */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-3">Soporte B2B</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400" />
                <span>contacto@centroproveedores.co</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+57 (601) 300-8000</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Centro de Proveedores B2B. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

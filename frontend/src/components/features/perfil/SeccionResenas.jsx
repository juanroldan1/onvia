import React, { useState } from 'react';
import { Star, ThumbsUp, CheckCircle2, MessageCircle, Camera, Send } from 'lucide-react';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';

const resenasEjemplo = [
  {
    id: 1,
    autor: 'Carlos M. - Logística & Envíos',
    rating: 5,
    fecha: 'Hace 4 días',
    verificado: true,
    comentario: 'Excelente tiempo de respuesta y calidad de las cajas. Compramos un lote de 500 unidades y llegaron perfectas a Cali.',
    fotoUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 2,
    autor: 'Sofía R. - Ecommerce Moda',
    rating: 5,
    fecha: 'Hace 2 semanas',
    verificado: true,
    comentario: 'El vinipel negro es de excelente calibre. Súper recomendado para proteger envíos de alto valor.',
    fotoUrl: null
  }
];

export const SeccionResenas = ({ proveedorId }) => {
  const [resenas, setResenas] = useState(resenasEjemplo);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [nuevaResena, setNuevaResena] = useState({
    nombre: '',
    rating: 5,
    comentario: ''
  });

  const handleAgregarResena = (e) => {
    e.preventDefault();
    if (!nuevaResena.nombre || !nuevaResena.comentario) return;

    const item = {
      id: Date.now(),
      autor: `${nuevaResena.nombre} (Cliente Verificado)`,
      rating: nuevaResena.rating,
      fecha: 'Ahora',
      verificado: true,
      comentario: nuevaResena.comentario,
      fotoUrl: null
    };

    setResenas([item, ...resenas]);
    setNuevaResena({ nombre: '', rating: 5, comentario: '' });
    setMostrarForm(false);
  };

  return (
    <div className="space-y-6 pt-6 border-t border-slate-200">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>Experiencias y Calificaciones B2B</span>
            <span className="text-xs bg-teal-100 text-teal-800 font-bold px-2.5 py-0.5 rounded-full">
              4.9 ★
            </span>
          </h3>
          <p className="text-xs text-slate-500">
            Opiniones reales de empresas y compradores que han cotizado con este proveedor.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={MessageCircle}
          onClick={() => setMostrarForm(!mostrarForm)}
        >
          {mostrarForm ? 'Cancelar' : 'Dejar una Calificación'}
        </Button>
      </div>

      {/* Formulario Nueva Reseña */}
      {mostrarForm && (
        <form onSubmit={handleAgregarResena} className="p-5 bg-slate-900 text-white rounded-2xl space-y-4 shadow-xl">
          <h4 className="font-extrabold text-sm text-teal-400">Escribe tu opinión sobre el proveedor</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Tu Nombre / Empresa"
              value={nuevaResena.nombre}
              onChange={(e) => setNuevaResena({ ...nuevaResena, nombre: e.target.value })}
              className="bg-slate-800 text-white border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
              required
            />
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
              <span className="text-xs text-slate-400 mr-2">Calificación:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setNuevaResena({ ...nuevaResena, rating: star })}
                  className="cursor-pointer"
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= nuevaResena.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-600'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Cuenta tu experiencia (ej: calidad del producto, atención, tiempos de despacho)..."
            value={nuevaResena.comentario}
            onChange={(e) => setNuevaResena({ ...nuevaResena, comentario: e.target.value })}
            rows={3}
            className="w-full bg-slate-800 text-white border border-slate-700 rounded-xl p-3 text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
            required
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-400 flex items-center gap-1">
              <Camera className="w-3.5 h-3.5 text-teal-400" />
              Sube fotos del producto recibido en el backend
            </span>
            <Button type="submit" variant="primary" size="sm" icon={Send} className="bg-teal-500 text-slate-900 font-bold">
              Publicar Opinión
            </Button>
          </div>
        </form>
      )}

      {/* Lista de Reseñas */}
      <div className="space-y-4">
        {resenas.map((res) => (
          <Card key={res.id} hover={false} className="p-4 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-xs">{res.autor}</span>
                {res.verificado && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-semibold border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3" />
                    Compra Verificada
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400">{res.fecha}</span>
            </div>

            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < res.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{res.comentario}</p>

            {res.fotoUrl && (
              <div className="pt-1">
                <img
                  src={res.fotoUrl}
                  alt="Foto adjunta por cliente"
                  className="w-20 h-20 rounded-xl object-cover border border-slate-200"
                />
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

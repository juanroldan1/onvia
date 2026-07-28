import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Mail, CheckCircle2, ArrowRight, User, Store, Upload, X } from 'lucide-react';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { proveedorService } from '../../../services/proveedorService';

export const FormularioProveedor = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [tipoEntidad, setTipoEntidad] = useState(''); // 'persona' | 'negocio'
  const [mediaFiles, setMediaFiles] = useState([]);

  const [formData, setFormData] = useState({
    nombreNegocio: '',
    categoriaId: '',
    ciudad: '',
    whatsapp: '',
    email: '',
    descripcion: ''
  });
  const [errores, setErrores] = useState({});

  useEffect(() => {
    proveedorService.getCategorias().then(setCategorias);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errores[name]) setErrores((prev) => ({ ...prev, [name]: null }));
  };

  const handleMediaUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image'
    }));
    setMediaFiles((prev) => [...prev, ...previews].slice(0, 8));
  };

  const removeMedia = (index) => {
    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const validar = () => {
    const errs = {};
    if (!tipoEntidad) errs.tipoEntidad = 'Indica si eres persona o negocio';
    if (!formData.nombreNegocio.trim()) errs.nombreNegocio = 'El nombre es requerido';
    if (!formData.categoriaId) errs.categoriaId = 'Selecciona una categoría';
    if (!formData.ciudad.trim()) errs.ciudad = 'Ingresa la ciudad';
    if (!formData.whatsapp.trim()) errs.whatsapp = 'El WhatsApp es obligatorio';
    if (!formData.email.trim()) errs.email = 'El correo es obligatorio';
    if (!formData.descripcion.trim()) errs.descripcion = 'Escribe una breve descripción';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) { setErrores(errs); return; }

    setLoading(true);
    try {
      await proveedorService.registrarProveedor({ ...formData, tipoEntidad });
      setEnviado(true);
    } catch (err) {
      alert('Ocurrió un error al enviar el formulario.');
    } finally {
      setLoading(false);
    }
  };

  if (enviado) {
    return (
      <Card className="max-w-xl mx-auto p-8 text-center space-y-6 bg-slate-900 text-white border-slate-800 shadow-2xl">
        <div className="w-16 h-16 bg-teal-500/20 text-teal-400 rounded-full flex items-center justify-center mx-auto border border-teal-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold tracking-tight font-heading">¡Solicitud recibida con éxito!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Tu perfil para <span className="text-teal-400 font-bold">{formData.nombreNegocio}</span> será revisado por nuestro equipo y publicado en menos de <strong className="text-white">48 horas</strong>.
          </p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl text-left text-xs text-slate-400 space-y-1.5 border border-slate-700">
          <p>✔️ Registro 100% gratuito sin comisiones iniciales</p>
          <p>✔️ Revisión manual de tu perfil antes de publicar</p>
          <p>✔️ Recibe contactos directos a tu WhatsApp ({formData.whatsapp})</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEnviado(false);
            setTipoEntidad('');
            setMediaFiles([]);
            setFormData({ nombreNegocio: '', categoriaId: '', ciudad: '', whatsapp: '', email: '', descripcion: '' });
          }}
          className="bg-teal-500 text-slate-900 font-bold hover:bg-teal-400"
        >
          Registrar otro negocio
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Paso 1: ¿Persona o Negocio? */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-slate-800">¿Cómo quieres aparecer en la plataforma?</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: 'persona', label: 'Soy una Persona', sub: 'Freelance, independiente o emprendedor.', icon: User },
            { key: 'negocio', label: 'Tengo un Negocio', sub: 'Empresa, pyme, tienda o marca establecida.', icon: Store }
          ].map(({ key, label, sub, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => { setTipoEntidad(key); setErrores(p => ({ ...p, tipoEntidad: null })); }}
              className={`flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all duration-200 cursor-pointer ${
                tipoEntidad === key
                  ? 'border-teal-500 bg-teal-50 shadow-md shadow-teal-500/10'
                  : 'border-slate-200 bg-white hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <div className={`mt-0.5 w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                tipoEntidad === key ? 'bg-teal-500 text-white' : 'bg-slate-100 text-slate-500'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">{label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
              </div>
            </button>
          ))}
        </div>
        {errores.tipoEntidad && <span className="text-xs text-red-500 font-medium">{errores.tipoEntidad}</span>}
      </div>

      {/* Paso 2: Datos del perfil */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label={tipoEntidad === 'persona' ? 'Tu nombre o marca personal' : 'Nombre de tu negocio'}
          name="nombreNegocio"
          placeholder={tipoEntidad === 'persona' ? 'Ej: Juan Martínez - Diseñador' : 'Ej: TechSoluciones SAS'}
          icon={Building2}
          value={formData.nombreNegocio}
          onChange={handleChange}
          error={errores.nombreNegocio}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-semibold text-slate-700">Categoría</label>
          <select
            name="categoriaId"
            value={formData.categoriaId}
            onChange={handleChange}
            className={`w-full bg-white border ${
              errores.categoriaId ? 'border-red-400' : 'border-slate-300 focus:ring-teal-500'
            } rounded-xl py-2.5 px-3 text-sm text-slate-800 focus:outline-none focus:ring-2`}
          >
            <option value="">-- Selecciona una categoría --</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>
          {errores.categoriaId && <span className="text-xs text-red-500 font-medium">{errores.categoriaId}</span>}
        </div>

        <Input
          label="Ciudad"
          name="ciudad"
          placeholder="Ej: Bogotá D.C. / en línea"
          icon={MapPin}
          value={formData.ciudad}
          onChange={handleChange}
          error={errores.ciudad}
        />

        <Input
          label="WhatsApp de contacto"
          name="whatsapp"
          placeholder="Ej: +57 300 123 4567"
          icon={Phone}
          value={formData.whatsapp}
          onChange={handleChange}
          error={errores.whatsapp}
        />
      </div>

      <Input
        label="Correo electrónico"
        name="email"
        type="email"
        placeholder="puede ser personal o del negocio"
        icon={Mail}
        value={formData.email}
        onChange={handleChange}
        error={errores.email}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Descripción de tu oferta</label>
          <span className="text-xs text-slate-400">{formData.descripcion.length}/200</span>
        </div>
        <textarea
          name="descripcion"
          maxLength={200}
          rows={3}
          placeholder="Describe qué ofreces, a quién va dirigido y qué te hace diferente..."
          value={formData.descripcion}
          onChange={handleChange}
          className={`w-full bg-white border ${
            errores.descripcion ? 'border-red-400' : 'border-slate-300 focus:ring-teal-500'
          } rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2`}
        />
        {errores.descripcion && <span className="text-xs text-red-500 font-medium">{errores.descripcion}</span>}
      </div>

      {/* Sección de Fotos y Videos */}
      <div className="space-y-3">
        <div>
          <p className="text-sm font-bold text-slate-800">Fotos y Videos de tu negocio</p>
          <p className="text-xs text-slate-500 mt-0.5">Sube imágenes de tus productos, servicios o tu lugar de trabajo. Máximo 8 archivos.</p>
        </div>

        {/* Grid de previews */}
        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {mediaFiles.map((media, idx) => (
              <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 group bg-slate-100">
                {media.type === 'video' ? (
                  <video src={media.url} className="w-full h-full object-cover" muted />
                ) : (
                  <img src={media.url} alt="" className="w-full h-full object-cover" />
                )}
                <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/30 transition-colors duration-200" />
                <button
                  type="button"
                  onClick={() => removeMedia(idx)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-md"
                >
                  <X className="w-3 h-3" />
                </button>
                {media.type === 'video' && (
                  <div className="absolute bottom-1 left-1 bg-slate-900/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md">
                    VIDEO
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Botón de upload */}
        {mediaFiles.length < 8 && (
          <label className="flex flex-col items-center justify-center gap-2 p-5 border-2 border-dashed border-slate-300 hover:border-teal-400 rounded-2xl cursor-pointer transition-colors duration-200 bg-white hover:bg-teal-50/30 group">
            <Upload className="w-6 h-6 text-slate-400 group-hover:text-teal-500 transition-colors" />
            <p className="text-sm text-slate-500 group-hover:text-teal-600 transition-colors font-medium">
              Agregar fotos o videos
            </p>
            <p className="text-xs text-slate-400">JPG, PNG, MP4 — máx. 50MB por archivo</p>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMediaUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        disabled={loading}
        icon={ArrowRight}
        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 text-base"
      >
        {loading ? 'Registrando...' : 'Registrar mi negocio'}
      </Button>
    </form>
  );
};

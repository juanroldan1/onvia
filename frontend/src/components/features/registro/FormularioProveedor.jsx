import React, { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Mail, FileText, CheckCircle2, ArrowRight } from 'lucide-react';
import { Input } from '../../common/Input';
import { Button } from '../../common/Button';
import { Card } from '../../common/Card';
import { proveedorService } from '../../../services/proveedorService';

export const FormularioProveedor = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enviado, setEnviado] = useState(false);
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
    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validar = () => {
    const errs = {};
    if (!formData.nombreNegocio.trim()) errs.nombreNegocio = 'El nombre de la empresa es requerido';
    if (!formData.categoriaId) errs.categoriaId = 'Selecciona una categoría principal';
    if (!formData.ciudad.trim()) errs.ciudad = 'Ingresa la ciudad de operación';
    if (!formData.whatsapp.trim()) errs.whatsapp = 'El WhatsApp de contacto es obligatorio';
    if (!formData.email.trim()) errs.email = 'El correo electrónico es obligatorio';
    if (!formData.descripcion.trim()) errs.descripcion = 'Escribe una breve descripción';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validar();
    if (Object.keys(errs).length > 0) {
      setErrores(errs);
      return;
    }

    setLoading(true);
    try {
      await proveedorService.registrarProveedor(formData);
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
          <h2 className="text-2xl font-extrabold tracking-tight">¡Solicitud recibida con éxito!</h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Tu perfil para <span className="text-teal-400 font-bold">{formData.nombreNegocio}</span> será revisado por nuestro equipo y publicado en menos de <strong className="text-white">48 horas</strong>.
          </p>
        </div>
        <div className="bg-slate-800 p-4 rounded-xl text-left text-xs text-slate-400 space-y-1.5 border border-slate-700">
          <p>✔️ Registro 100% gratuito sin comisiones iniciales</p>
          <p>✔️ Verificación manual de reputación empresarial</p>
          <p>✔️ Recibe cotizaciones directas a tu WhatsApp ({formData.whatsapp})</p>
        </div>
        <Button
          variant="primary"
          onClick={() => {
            setEnviado(false);
            setFormData({
              nombreNegocio: '',
              categoriaId: '',
              ciudad: '',
              whatsapp: '',
              email: '',
              descripcion: ''
            });
          }}
          className="bg-teal-500 text-slate-900 font-bold hover:bg-teal-400"
        >
          Registrar otro negocio
        </Button>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nombre de tú negocio"
          name="nombreNegocio"
          placeholder="Ej: Empaques Industriales SAS"
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
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
          {errores.categoriaId && (
            <span className="text-xs text-red-500 font-medium">{errores.categoriaId}</span>
          )}
        </div>

        <Input
          label="Ciudad"
          name="ciudad"
          placeholder="Ej: Bogotá D.C./ en linea"
          icon={MapPin}
          value={formData.ciudad}
          onChange={handleChange}
          error={errores.ciudad}
        />

        <Input
          label="WhatsApp de Contacto Directo"
          name="whatsapp"
          placeholder="Ej: +57 300 123 4567"
          icon={Phone}
          value={formData.whatsapp}
          onChange={handleChange}
          error={errores.whatsapp}
        />
      </div>

      <Input
        label="Correo Electrónico"
        name="email"
        type="email"
        placeholder="puede ser el de tú negocio o personal"
        icon={Mail}
        value={formData.email}
        onChange={handleChange}
        error={errores.email}
      />

      <div className="flex flex-col gap-1.5">
        <div className="flex justify-between items-center">
          <label className="text-sm font-semibold text-slate-700">Breve Descripción de tu oferta</label>
          <span className="text-xs text-slate-400">{formData.descripcion.length}/200 caracteres</span>
        </div>
        <textarea
          name="descripcion"
          maxLength={200}
          rows={3}
          placeholder="agrega la descripción de tu negocio, productos o servicios que ofreces"
          value={formData.descripcion}
          onChange={handleChange}
          className={`w-full bg-white border ${
            errores.descripcion ? 'border-red-400' : 'border-slate-300 focus:ring-teal-500'
          } rounded-xl p-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2`}
        />
        {errores.descripcion && (
          <span className="text-xs text-red-500 font-medium">{errores.descripcion}</span>
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

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowLeft, LogIn, CheckCircle2, AlertCircle, Sparkles, ShieldCheck } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [usePngLogo, setUsePngLogo] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Animación suave de entrada (modal-card mount)
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.email || !formData.password) {
      setError('Por favor ingresa tu correo y contraseña.');
      return;
    }

    setIsLoading(true);

    try {
      // Simulación de autenticación (se conectará con el backend Laravel)
      await new Promise((resolve) => setTimeout(resolve, 850));
      
      setSuccess('¡Sesión iniciada correctamente! Redirigiendo...');
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      setError('Credenciales incorrectas. Revisa tus datos e intenta nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex flex-col justify-center items-center px-4 py-8 relative overflow-hidden">
      {/* Luz de fondo ambiental (animación CSS suave sin impacto de RAM) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ease-out"></div>
      
      {/* Botón Volver */}
      <div className="w-full max-w-md mb-4 flex justify-between items-center z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al inicio</span>
        </Link>
        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
          <ShieldCheck className="w-3.5 h-3.5" /> Acceso Seguro
        </span>
      </div>

      {/* Tarjeta Modal de Iniciar Sesión con animación de entrada */}
      <div
        className={`w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden z-10 transition-all duration-500 transform ${
          mounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'
        }`}
      >
        {/* Cabecera estilo tarjeta con Ícono del Logo únicamente (sin texto) */}
        <div className="bg-slate-900 text-white p-8 text-center relative overflow-hidden">
          {/* Patrón de brillo de fondo */}
          <div className="absolute -top-16 -right-16 w-36 h-36 bg-teal-400/20 rounded-full blur-2xl pointer-events-none"></div>

          {/* Ícono de la aplicación (solamente el logo icon sin letras) */}
          <div className="flex justify-center mb-3">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-teal-400 to-teal-600 blur opacity-40 group-hover:opacity-75 transition duration-300"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-slate-900 border border-teal-500/30 flex items-center justify-center p-2.5 shadow-xl">
                {usePngLogo ? (
                  <img
                    src="/onviaLogo.png"
                    alt="Logo Icon"
                    onError={() => setUsePngLogo(false)}
                    className="w-full h-full object-contain filter drop-shadow"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-teal-500 flex items-center justify-center">
                    <LogIn className="w-5 h-5 text-slate-900 stroke-[2.5]" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Iniciar Sesión
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Ingresa a tu panel de control y gestiona tus productos y servicios
          </p>
        </div>

        {/* Formulario Interactivo */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Feedback de Estado */}
          {error && (
            <div className="flex items-center gap-2.5 p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-medium animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-2.5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-700 text-xs font-medium animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{success}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Correo electrónico
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@negocio.com"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Contraseña
                </label>
                <a
                  href="#forgot"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('La recuperación de clave enviará un código a tu correo una vez conectado el backend.');
                  }}
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-teal-600 transition-colors">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:bg-white transition-all duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Checkbox Recordarme */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500 cursor-pointer accent-teal-500"
                />
                <span className="text-xs font-medium text-slate-600">Mantener mi sesión iniciada</span>
              </label>
            </div>

            {/* Botón de envío interactivo */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3.5 px-4 bg-teal-500 hover:bg-teal-400 active:scale-[0.98] text-slate-900 font-extrabold text-sm rounded-2xl shadow-lg shadow-teal-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                  <span>Verificando credenciales...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-4.5 h-4.5 stroke-[2.5]" />
                  <span>Ingresar a mi cuenta</span>
                </>
              )}
            </button>
          </form>

          {/* Enlace hacia el Registro */}
          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              ¿Aún no formas parte de Onvia Web?{' '}
              <Link to="/registro" className="font-extrabold text-teal-600 hover:text-teal-700 hover:underline">
                Registra tu negocio gratis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

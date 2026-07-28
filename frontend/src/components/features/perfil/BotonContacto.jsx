import React from 'react';
import { MessageSquare, Mail } from 'lucide-react';
import { Button } from '../../common/Button';
import { proveedorService } from '../../../services/proveedorService';

export const BotonContacto = ({ proveedor, productoSeleccionado }) => {
  const handleWhatsApp = async () => {
    // 1. Registrar evento de tracking en servicio
    await proveedorService.trackContacto(proveedor.id, 'whatsapp');

    // 2. Construir mensaje personalizado para WhatsApp
    let mensaje = `Hola *${proveedor.nombreNegocio}*, vi su perfil en el Centro de Proveedores B2B y me interesa cotizar empaques al por mayor.`;
    if (productoSeleccionado) {
      mensaje += ` Específicamente el producto: *${productoSeleccionado.nombre}*.`;
    }

    const phone = proveedor.whatsapp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmail = async () => {
    await proveedorService.trackContacto(proveedor.id, 'email');
    const subject = encodeURIComponent(`Cotización B2B - Centro de Proveedores`);
    const body = encodeURIComponent(
      `Hola ${proveedor.nombreNegocio},\n\nNos gustaría recibir una cotización de sus servicios/productos B2B.\n\nQuedamos atentos.`
    );
    window.location.href = `mailto:${proveedor.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full">
      <Button
        variant="primary"
        size="lg"
        icon={MessageSquare}
        onClick={handleWhatsApp}
        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20"
      >
        Contactar por WhatsApp
      </Button>

      <Button
        variant="outline"
        size="lg"
        icon={Mail}
        onClick={handleEmail}
        className="sm:w-auto"
      >
        Enviar Correo
      </Button>
    </div>
  );
};

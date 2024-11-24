// src/components/MercadoPagoButton.tsx

import React, { useState } from 'react';

// Si MercadoPago no tiene tipos disponibles, puedes declarar el tipo manualmente.
// Tipo básico para el SDK de MercadoPago (si no tienes los tipos adecuados)
declare global {
  interface Window {
    MercadoPago: any;
  }
}

const MercadoPagoButton: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      // Llamar al backend para obtener la preferencia de pago
      const response = await fetch('http://localhost:8080/api/pago/preferencia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error al crear la preferencia de pago');
      }

      const preference = await response.json();

      // Crear una instancia de MercadoPago con tu public key
      const mp = new window.MercadoPago(process.env.MERCADOPAGO_, {
        locale: 'es-UY', // Cambia la localización según el país
      });

      // Crear el checkout de pago con la preferencia obtenida
      mp.checkout({
        preference: {
          id: preference.id,
        },
        render: {
          container: '#checkout-button', // Contenedor donde se renderiza el botón
          label: 'Pagar ahora', // Etiqueta del botón
        },
      });
    } catch (error) {
      console.error('Error al procesar el pago:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        style={{ padding: '10px 20px', fontSize: '16px' }}
      >
        {loading ? 'Cargando...' : 'Pagar con Mercado Pago'}
      </button>
      <div id="checkout-button"></div> {/* Aquí se renderiza el botón de MercadoPago */}
    </div>
  );
};

export default MercadoPagoButton;

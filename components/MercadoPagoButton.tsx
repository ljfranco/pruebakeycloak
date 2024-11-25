import React, { useState } from 'react';

// Si MercadoPago no tiene tipos disponibles, puedes declarar el tipo manualmente.
declare global {
    interface Window {
        MercadoPago: any;
    }
}

interface MercadoPagoButtonProps {
    accessToken: string;
}

const MercadoPagoButton: React.FC<MercadoPagoButtonProps> = ({ accessToken }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);

    const handleClick = async () => {
        try {
            setLoading(true);
            // Llamar al backend para obtener la preferencia de pago
            const response = await fetch(`${process.env.NEXT_PUBLIC_GATEWAY_URL}/payments/createpreference`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify([{
                    "id": "1",
                    "name": "Reforestación del Parque Nacional Quebrada de los Cuervos",
                    "description": "Iniciativa para plantar 5,000 árboles nativos en el parque.",
                    "imageUrl": "https://7maravillas.uy/wp-content/uploads/2021/01/quebrada-cuervos-foto-uruguay-natural.jpg",
                    "location": "Treinta y Tres, Uruguay",
                    "quantity": 1,
                    "unitPrice": 1000
                }]),
            });

            if (!response.ok) {
                throw new Error('Error al crear la preferencia de pago');
            }

            const preference = await response.json();
            console.log('Preferencia de pago:', preference);

            setPreferenceId(preference.id);

            // Redirigir al usuario a la URL de MercadoPago con el pref_id
            const redirectUrl = `https://www.mercadopago.com.uy/checkout/v1/redirect?pref_id=${preference.id}`;
            window.location.href = redirectUrl;  // Redirigir al checkout de MercadoPago
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
        </div>
    );
};

export default MercadoPagoButton;

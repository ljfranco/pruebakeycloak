// app/success/page.tsx
'use client'; // Indica que este componente es un componente cliente

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Para obtener los parámetros de la URL

const Success = () => {
    const searchParams = useSearchParams(); // Para acceder a los parámetros de la URL
    const [paymentData, setPaymentData] = useState<{ paymentId: string | null; status: string | null } | null>(null);

    useEffect(() => {
        if (searchParams) {
            setPaymentData({
                paymentId: searchParams.get('payment_id'),
                status: searchParams.get('status'),
            });
        }
    }, [searchParams]);

    return (
        <div>
            <h1>Pago Exitoso</h1>
            {paymentData ? (
                <div>
                    <p>ID de Pago: {paymentData.paymentId}</p>
                    <p>Estado: {paymentData.status}</p>
                    <p>Datos de la transacción recibidos correctamente.</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Success;

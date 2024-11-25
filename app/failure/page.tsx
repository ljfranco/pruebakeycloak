// app/failure/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation'; // Para obtener los parámetros de la URL

const Failure = () => {
    const searchParams = useSearchParams();
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
            <h1>Pago Fallido</h1>
            {paymentData ? (
                <div>
                    <p>ID de Pago: {paymentData.paymentId}</p>
                    <p>Estado: {paymentData.status}</p>
                    <p>Hubo un problema con tu pago. Intenta nuevamente.</p>
                </div>
            ) : (
                <p>Cargando...</p>
            )}
        </div>
    );
};

export default Failure;

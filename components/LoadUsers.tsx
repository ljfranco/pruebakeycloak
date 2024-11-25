"use client";

import { useState } from "react";
import MercadoPagoButton from "./MercadoPagoButton";

interface LoadUsersProps {
    accessToken: string | null;
}

const LoadUsers: React.FC<LoadUsersProps> = ({ accessToken }) => {
    const [user, setUser] = useState<any>(null); // Cambiar a un solo usuario
    const [error, setError] = useState<string | null>(null);

    const handleLoadUsers = async () => {
        if (!accessToken) {
            setError("No estás autenticado.");
            return;
        }

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_GATEWAY_URL}/projects/getall`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                    // body: JSON.stringify({
                    //     "name": "Reforestación Barros Blancos",
                    //     "description": "Proyecto de reforestación en la cuenca para mejorar la calidad del agua.",
                    //     "imageUrl": "https://upload.wikimedia.org/wikipedia/commons/d/d5/Parque_del_R%C3%ADo_Olimar.jpg",
                    //     "location": "Treinta y Tres, Uruguay",
                    //     "endDate": "2024-11-30"
                    // }),
                }
            );

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();

            // Verificar la respuesta recibida
            console.log("Respuesta de la API:", data);

            // Asignar la respuesta (un solo usuario) al estado
            setUser(data);
            setError(null); // Resetear el error si la solicitud es exitosa
        } catch (err: any) {
            setError(err.message || "Error al cargar el usuario.");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-3">
            <button
                onClick={handleLoadUsers}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Cargar Usuario
            </button>
            {error && <div className="text-red-500">{error}</div>}
            {user && (
                <div className="mt-4 w-full max-w-4xl">
                    <h3 className="font-semibold text-xl">
                        Respuesta (en formato JSON):
                    </h3>
                    <pre className="bg-gray-800 text-white p-4 rounded-lg shadow whitespace-pre-wrap overflow-x-auto">
                        {JSON.stringify(user, null, 2)}
                    </pre>
                </div>
            )}
            <div>
                <h1>Realiza tu pago con MercadoPago</h1>
                {accessToken && <MercadoPagoButton accessToken={accessToken} />}
            </div>
        </div>
    );
};

export default LoadUsers;

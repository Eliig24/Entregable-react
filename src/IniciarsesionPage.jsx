//import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "./axiosInstance.jsx"

const IniciarsesionPage = () => {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const irAInscripcion = () => {
        navigate("/inscripcion");
    };

    const manejarSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        // Validaciones locales
        const newErrors = {};
        const isValidEmail = (em) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em);
        const isStrongPassword = (pw) => {
            // mínimo 8 caracteres, al menos una minúscula, mayúscula, número y carácter especial
            return /(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/.test(pw);
        };

        if (!email) newErrors.email = "El email es obligatorio.";
        else if (!isValidEmail(email)) newErrors.email = "Ingresa un email con formato válido.";

        if (!password) newErrors.password = "La contraseña es obligatoria.";
        else if (!isStrongPassword(password)) newErrors.password = "La contraseña debe tener mínimo 8 caracteres, incluir mayúscula, minúscula, número y un carácter especial.";

        if (Object.keys(newErrors).length) {
            setErrors(newErrors);
            setMessage({ type: "error", text: "Corrige los errores en el formulario." });
            return;
        }
        setErrors({});

        try {
            setLoading(true);
            setMessage(null);
            const res = await axiosInstance.post("auth/login", {
                email,
                password,
            }
            );

            console.log("Data recibida:", res.data);
            setMessage({ type: "success", text: "Sesion iniciada correctamente" });
        } catch (error) {
            console.log("Error:", error);
            setMessage({ type: "error", text: error?.response?.data?.message || "Ocurrio un error inesperado, recargue la pagina e intente nuevamente en unos minutos." });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="max-w-md mx-auto my-8">
            <h1 className="text-4xl font-bold text-red-600 text-center p-4 mb-4">Iniciar Sesión</h1>
            <form onSubmit={manejarSubmit} className='space-y-6 px-6'>
            <div className='bg-red-100 p-4 rounded-2xl'>
                <label htmlFor='email' className='block text-sm font-medium text-red-600'>
                    Correo electrónico
                </label>
                <input 
                type="email"
                id='email'
                name='email'
                placeholder="eli-g@example.com"
                defaultValue=""
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className='mt-1 block w-full bg-white border border-red-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                />
                {errors.email && (
                    <p id="email-error" className="text-xs text-red-700 mt-1">{errors.email}</p>
                )}
                <label htmlFor='password' className='block text-sm font-medium text-red-600 py-1'>
                    Contraseña
                </label>
                <input 
                type="password"
                id="password"
                name="password"
                placeholder="Tu contraseña"
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className='mt-1 block w-full bg-white border border-red-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm'
                />
                {errors.password && (
                    <p id="password-error" className="text-xs text-red-700 mt-1">{errors.password}</p>
                )}
                {message && (
                    <p className={`mt-2 text-sm ${message.type === "error" ? "text-red-700" : "text-green-700"}`}>
                        {message.text}
                    </p>
                )}
                <div className='p-4 px-4 text-right'>
                    
                </div>
                <div className='p-4 px-4 justify-center flex gap-10'>
                    <button
                    onClick={irAInscripcion}
                    className='inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50'
                    >
                        Me quiero Inscribir
                    </button>
                    <button
                    type="submit"
                    disabled={loading}
                    className='inline-flex justify-center py-2 px-4 border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50'
                    >
                        {loading ? "Iniciando..." : "Iniciar sesion"}
                    </button>
                </div>
            </div>
            </form>
        </div>
    )
}

export default IniciarsesionPage
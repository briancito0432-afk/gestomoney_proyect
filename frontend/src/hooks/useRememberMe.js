import { useState, useEffect } from 'react';

/**
 * Hook para manejar la funcionalidad "Recuérdame" en formularios de login
 * Guarda y carga credenciales del localStorage
 * 
 * @returns {Object} { formData, setFormData, handleRememberMe, clearRemembered }
 */
export const useRememberMe = (initialEmail = '', initialPassword = '') => {
    const [formData, setFormData] = useState({
        email: initialEmail,
        password: initialPassword,
        rememberMe: false,
    });

    // Cargar datos guardados al montar el componente
    useEffect(() => {''
        const savedEmail = localStorage.getItem('rememberedEmail');
        const savedPassword = localStorage.getItem('rememberedPassword');
        const wasRemembered = localStorage.getItem('rememberMe') === 'true';

        if (savedEmail && savedPassword && wasRemembered) {
            setFormData({
                email: savedEmail,
                password: savedPassword,
                rememberMe: true,
            });
        }
    }, []);

    /**
     * Guarda las credenciales en localStorage si rememberMe está activado
     */
    const handleRememberMe = () => {
        if (formData.rememberMe) {
            localStorage.setItem('rememberedEmail', formData.email);
            localStorage.setItem('rememberedPassword', formData.password);
            localStorage.setItem('rememberMe', 'true');
        } else {
            clearRemembered();
        }
    };

    /**
     * Limpia los datos guardados del localStorage
     */
    const clearRemembered = () => {
        localStorage.removeItem('rememberedEmail');
        localStorage.removeItem('rememberedPassword');
        localStorage.removeItem('rememberMe');
    };

    return {
        formData,
        setFormData,
        handleRememberMe,
        clearRemembered,
    };
};

import React, { createContext, useState, useEffect } from 'react'



export const AuthContext = createContext();


export default function AuthProvider({ children }) {
    const [auth, setauth] = useState(null);

    // useEffect(() => {
    //     const storedAuth = localStorage.getItem('auth');
    //     if (storedAuth) {
    //         setauth(JSON.parse(storedAuth));
    //     }
    // }, []);

    // useEffect(() => {
    //     if (auth) {
    //         localStorage.setItem('auth', JSON.stringify(auth));
    //     } else {
    //         localStorage.removeItem('auth');
    //     }
    // }, [auth]);


    // Load auth data from localStorage on mount
    useEffect(() => {
        const loadAuth = () => {
            try {
                const storedAuth = localStorage.getItem("userAuth");
                if (storedAuth) {
                    setauth(JSON.parse(storedAuth));
                }
            } catch (error) {
                console.error("Failed to load auth data", error);
            }
        };
        loadAuth();
    }, []);

    // Save auth data to localStorage whenever it changes
    useEffect(() => {
        const saveAuth = () => {
            try {
                if (auth) {
                    localStorage.setItem("userAuth", JSON.stringify(auth));
                } else {
                    localStorage.removeItem("userAuth");
                }
            } catch (error) {
                console.error("Failed to save auth data", error);
            }
        };
        saveAuth();
    }, [auth]);



    return (
        <AuthContext.Provider value={{ auth, setauth }}>
            {children}
        </AuthContext.Provider>
    )
}

import React, { createContext, useState ,useEffect} from 'react'



export const AuthContext = createContext();


export default function AuthProvider({ children }) {
    const [auth, setauth] = useState(null);
    useEffect(() => {
        // Load auth data from localStorage on initial load
        const storedAuth = localStorage.getItem('auth');
        if (storedAuth) {
            setauth(JSON.parse(storedAuth));
        }
    }, []);

    useEffect(() => {
        // Save auth data to localStorage when auth state changes
        if (auth) {
            localStorage.setItem('auth', JSON.stringify(auth));
        } else {
            localStorage.removeItem('auth');
        }
    }, [auth]);
    return (
        <AuthContext.Provider value={{ auth, setauth }}>
            {children}
        </AuthContext.Provider>
    )
}

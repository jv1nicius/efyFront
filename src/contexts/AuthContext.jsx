import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const savedUser = localStorage.getItem('@app:user')

        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }

        setLoading(false)
    }, [])

    async function login(email) {
        try {
            const response = await api.post('/usuarios/login', { email })

            const userData = response.data

            setUser(userData)
            localStorage.setItem('@app:user', JSON.stringify(userData))

            return { success: true }
        } catch (error) {
            return {
                success: false,
                message: 'Email inválido ou não encontrado'
            }
        }
    }

    function logout() {
        localStorage.removeItem('@app:user')
        setUser(null)
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth precisa estar dentro de <AuthProvider>')
    }
    return context
}
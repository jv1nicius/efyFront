import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography, Link, Snackbar, Fade, Alert } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [errorToast, setErrorToast] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/email')
        }
    }, [isAuthenticated, navigate])

    const handleLogin = async () => {
        setLoading(true)
        try {
            const result = await login(name, email, password)

            if (!result.success) {
                setErrorToast(true)
                return
            }
        } catch (error) {
            setErrorToast(true)
        } finally {
            setLoading(false)
            setName('')
            setEmail('')
            setPassword('')
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>
                Login
            </Typography>

            <TextField
                fullWidth
                label="Nome"
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <TextField
                fullWidth
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                fullWidth
                label="Senha"
                type="password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleLogin}
                disabled={loading ||
                    !email.trim() ||
                    !password.trim()
                }

            >
                {loading ? 'Entrando...' : 'Entrar'}
            </Button>
            <Snackbar
                open={errorToast}
                autoHideDuration={4000}
                onClose={() => setErrorToast(false)}
                slots={{ transition: Fade }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert
                    onClose={() => setErrorToast(false)}
                    severity="error"
                    variant="filled"
                >
                    Falha!
                </Alert>
            </Snackbar>
        </Container>
    )
}
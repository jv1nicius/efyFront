import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Container, TextField, Button, Typography, Snackbar, Fade, Alert, Divider } from '@mui/material'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
    const { login, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [errorToast, setErrorToast] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/email')
        }
    }, [isAuthenticated, navigate])

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleLogin = async () => {
        if (!isValidEmail(email)) {
            setErrorToast(true);
            return;
        }

        setLoading(true)
        try {
            const result = await login(email)

            if (!result.success) {
                setErrorToast(true)
                return
            }
        } catch (error) {
            setErrorToast(true)
        } finally {
            setLoading(false)
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
                label="Email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={email.length > 0 && !isValidEmail(email)}
                helperText={
                    email.length > 0 && !isValidEmail(email)
                        ? 'Digite um email válido'
                        : ''
                }
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

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                Ainda não tem uma conta?
            </Typography>

            <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/sign-up')}
            >
                Criar conta
            </Button>
            <Snackbar
                open={errorToast}
                autoHideDuration={2000}
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
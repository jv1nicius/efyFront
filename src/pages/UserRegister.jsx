import { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextField, Button, Container, Typography, Snackbar, Fade, Alert, Divider } from '@mui/material'
import { api } from '../services/api'
import { useAuth } from '../contexts/AuthContext'

export default function UserRegister() {
    const { isAuthenticated, login } = useAuth()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [successToast, setSuccessToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/email')
        }
    }, [isAuthenticated, navigate])

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            await api.post('/usuarios', { name, email, password })
            await login(email)

            setSuccessToast(true)
            setName('')
            setEmail('')
            setPassword('')

            setTimeout(() => navigate('/'), 1500)
        } catch (error) {
            setErrorToast(true)
        } finally {
            setLoading(false)
        }
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 3, mt: 5 }}>
                Cadastro de Usuário
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
                onKeyDown={(e) => e.key === 'Enter' && !loading && name.trim() && email.trim() && password.trim() && handleSubmit()}
            />

            <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSubmit}
                disabled={loading || !name.trim() || !email.trim() || !password.trim()}
            >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
            </Button>

            <Divider sx={{ my: 3 }} />

            <Typography variant="body2" align="center" sx={{ mb: 1 }}>
                Já tem uma conta?
            </Typography>

            <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate('/')}
            >
                Fazer login
            </Button>

            <Snackbar
                open={successToast}
                autoHideDuration={1500}
                onClose={() => setSuccessToast(false)}
                slots={{ transition: Fade }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setSuccessToast(false)} severity="success" variant="filled">
                    Usuário cadastrado com sucesso!
                </Alert>
            </Snackbar>

            <Snackbar
                open={errorToast}
                autoHideDuration={2000}
                onClose={() => setErrorToast(false)}
                slots={{ transition: Fade }}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setErrorToast(false)} severity="error" variant="filled">
                    Erro ao cadastrar. Tente novamente.
                </Alert>
            </Snackbar>
        </Container>
    )
}
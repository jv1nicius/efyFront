import { useState } from 'react'
import { useEffect } from 'react'
import {
    Container,
    TextField,
    Button,
    Typography,
    Alert,
    Snackbar,
    Fade,
    Link,
    Stack
} from '@mui/material'
import HistoryIcon from '@mui/icons-material/History'
import { api } from '../services/api'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function EmailForm() {
    const { user, isAuthenticated, logout } = useAuth()
    const navigate = useNavigate()
    const [openToast, setOpenToast] = useState(false)
    const [errorToast, setErrorToast] = useState(false)

    const [email, setEmail] = useState({
        usuario: {
            id: user?.id,
        },
        destinatarios: '',
        assunto: '',
        message: '',
        status: 'PENDENTE',
    })

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
    }, [isAuthenticated, navigate])

    async function handleSubmit(e) {
        e.preventDefault()
        if (
            !email.destinatarios.trim() ||
            !email.assunto.trim() ||
            !email.message.trim()
        ) {
            setErrorToast(true)
            return
        }
        if (!user?.id) {
            setErrorToast(true)
            return
        }

        try {
            const payload = {
                ...email,
                usuario: {
                    id: user?.id
                }
            }

            await api.post('/emails', payload)
            setOpenToast(true)

            setEmail({
                usuario: {
                    id: user?.id,
                },
                destinatarios: '',
                assunto: '',
                message: '',
                status: 'PENDENTE',
            })
        } catch (error) {
            setErrorToast(true)
        }
    }
    const handleLogout = () => {
        logout()
        navigate('/')
    }

    return (
        <Container maxWidth="md">
            <Stack
                direction={{ xs: 'column', sm: 'row' }}
                justifyContent="space-between"
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                spacing={2}
                sx={{ mt: 8, mb: 3 }}
            >
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                    Nova Notificação
                </Typography>
                <Button
                    variant="outlined"
                    startIcon={<HistoryIcon />}
                    onClick={() => navigate('/history')}
                >
                    Ver histórico
                </Button>
            </Stack>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth

                    label="Destinatários"
                    margin="normal"
                    value={email.destinatarios}
                    onChange={(e) =>
                        setEmail({
                            ...email,
                            destinatarios: e.target.value
                        })
                    }
                />

                <TextField
                    fullWidth

                    label="Assunto"
                    margin="normal"
                    value={email.assunto}
                    onChange={(e) =>
                        setEmail({
                            ...email,
                            assunto: e.target.value
                        })
                    }
                />

                <TextField
                    fullWidth

                    multiline
                    rows={5}
                    label="Mensagem"
                    margin="normal"
                    value={email.message}
                    onChange={(e) =>
                        setEmail({
                            ...email,
                            message: e.target.value
                        })
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    Enviar
                </Button>
            </form>
            <Typography sx={{ mt: 2 }}>
                Sair da conta?{' '}
                <Link
                    component="button"
                    underline="none"
                    onClick={handleLogout}>
                    Clique aqui
                </Link>
            </Typography>

            <Snackbar

                open={openToast}
                autoHideDuration={1500}
                onClose={() => setOpenToast(false)}
                slots={{ transition: Fade }}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
            >
                <Alert
                    onClose={() => setOpenToast(false)}
                    severity="success"
                    variant="filled"
                >
                    E-mail enviado para a fila com sucesso!
                </Alert>
            </Snackbar>
            <Snackbar
                open={errorToast}
                autoHideDuration={1500}
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
                    A tentativa de envio falhou!
                </Alert>
            </Snackbar>
        </Container>

    )
}
import { useEffect } from 'react'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import EmailStatusCard from '../components/EmailStatusCard'
import { Container, Typography, Stack, Button } from '@mui/material'
import { api } from '../services/api'

export default function History() {
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(true)

    const loadHistory = async () => {
        try {
            const { data } = await api.get('/emails/historico')
            setResult(data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/')
        }
        loadHistory()
    }, [isAuthenticated, navigate])

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
                    Histórico de e-mails
                </Typography>
                <Button
                    variant="outlined"

                    onClick={() => navigate('/email')}
                >
                    Nova notificação
                </Button>
            </Stack>
            <Box
                sx={{
                    height: "70vh",
                    overflowY: "auto",
                    flexDirection: "column",
                    gap: 1,
                    p: 1,
                    bgcolor: "#c8c8c8",
                    borderRadius: 4
                }}
            >
                {result.map((item, index) => (
                    <EmailStatusCard
                        key={item.id ?? index}
                        item={item}
                    />
                ))}
            </Box>
        </Container>
    )
}
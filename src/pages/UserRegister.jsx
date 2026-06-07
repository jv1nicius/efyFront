import { useState } from 'react'
import { TextField, Button, Container, Typography } from '@mui/material'
import { api } from '../services/api'

export default function UserRegister() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        created_at: ''
    })

    async function handleSubmit(e) {
        e.preventDefault()

        await api.post('/usuarios', user)

        alert('Usuário cadastrado!')
    }

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mb: 3 }}>
                Cadastro de Usuário
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Nome"
                    margin="normal"
                    onChange={(e) =>
                        setUser({ ...user, name: e.target.value })
                    }
                />

                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                    }
                />

                <TextField
                    fullWidth
                    type="password"
                    label="Senha"
                    margin="normal"
                    onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                    }
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                >
                    Cadastrar
                </Button>
            </form>
        </Container>
    )
}
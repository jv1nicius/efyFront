import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import Login from './pages/Login'
import UserRegister from './pages/UserRegister'
import EmailForm from './pages/EmailForm'

function App() {

    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sing-up" element={<UserRegister />} />
                <Route path="/email" element={<EmailForm />} />
            </Routes>
        </AuthProvider>
    )
}

export default App

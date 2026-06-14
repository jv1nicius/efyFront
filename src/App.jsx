import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import Login from './pages/Login'
import UserRegister from './pages/UserRegister'
import EmailForm from './pages/EmailForm'
import History from './pages/History'

function App() {

    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/sign-up" element={<UserRegister />} />
                <Route path="/email" element={<EmailForm />} />
                <Route path="/history" element={<History />} />
            </Routes>
        </AuthProvider>
    )
}

export default App

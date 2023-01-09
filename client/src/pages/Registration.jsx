import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export function Registration() {
    const [err, setError] = useState(null);
    const [inputs, setInputs] = useState({ username: '', email: '', password: '' });

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/auth/registration', inputs);
            navigate('/login');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleChange = ({ target: { name, value } }) => {
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="auth">
            <h1>Registration</h1>
            <form>
                <input
                    required
                    type="text"
                    placeholder="Username"
                    name="username"
                    onChange={handleChange}
                />
                <input
                    required
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />

                <button type="submit" onClick={handleSubmit}>Register</button>

                {err && <p>{err}</p>}

                <span>
                    Do you have an account?
                    <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
}

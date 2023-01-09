import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { AuthContext } from '../context';

export function Login() {
    const [err, setError] = useState(null);
    const [inputs, setInputs] = useState({ username: '', password: '' });

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(inputs);
            navigate('/');
        } catch (error) {
            setError(error.response.data.message);
        }
    };

    const handleChange = ({ target: { value, name } }) => {
        setInputs((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="auth">
            <h1>Login</h1>
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
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                />

                <button type="submit" onClick={handleSubmit}>Login</button>

                {err && <p>{err}</p>}

                <span>
                    Don&#39;t you have an account?
                    <Link to="/registration">Registration</Link>
                </span>
            </form>
        </div>
    );
}

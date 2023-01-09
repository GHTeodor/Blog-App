import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../context';

function Account() {
    const { currentUser, setCurrentUser, logout } = useContext(AuthContext);
    const [error, setError] = useState('');
    const [updated, setUpdated] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [inputs, setInputs] = useState({
        username: '',
        email: '',
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: '',
    });

    const navigate = useNavigate();

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('avatar', avatar);

            const { data } = await axios.post('/file/avatar', formData);
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const imageUrl = await upload() || currentUser.image;

        if (inputs.newPassword !== inputs.confirmNewPassword) {
            setError("Password and confirm password fields doesn't match");
            return;
        }

        const user = {
            username: inputs.username,
            email: inputs.email,
            oldPassword: inputs.oldPassword,
            image: imageUrl,
            password: inputs.newPassword,
        };

        try {
            await axios.put(`/users/${currentUser.id}`, user);

            setCurrentUser({
                ...currentUser, username: user.username, email: user.email, image: imageUrl,
            });

            setUpdated(true);
            setError('');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    const handleChange = ({ target: { value, name } }) => {
        setUpdated(false);
        setInputs({ ...inputs, [name]: value });
    };

    const deleteUser = async () => {
        await axios.delete(`/users/${currentUser.id}`).catch((err) => setError(err.response.data.message));
        await logout();
        navigate('/');
    };

    return (
        <div className="account">
            <h1>Account</h1>

            <form>
                <input type="file" onChange={({ target }) => setAvatar(target.files[0])} />

                <input
                    required
                    type="text"
                    name="username"
                    placeholder={currentUser.username}
                    onChange={handleChange}
                />
                <input
                    required
                    type="email"
                    name="email"
                    placeholder={currentUser.email}
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    name="oldPassword"
                    placeholder="Old password"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    name="newPassword"
                    placeholder="New password"
                    onChange={handleChange}
                />
                <input
                    required
                    type="password"
                    name="confirmNewPassword"
                    placeholder="Confirm new password"
                    onChange={handleChange}
                />
                <button
                    type="submit"
                    style={{ backgroundColor: updated ? 'greenyellow' : '' }}
                    onClick={handleSubmit}
                >
                    Edit user
                </button>
            </form>

            {error && <p>{error}</p>}

            <button className="delete" type="button" onClick={deleteUser}>Delete user</button>
        </div>
    );
}

export { Account };

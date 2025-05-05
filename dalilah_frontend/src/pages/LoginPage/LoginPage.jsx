import { useState } from "react";
import { useNavigate } from "react-router";
import * as usersAPI from "../../utilities/users-api";
import './styles.css';


export default function LoginPage({ setUser }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        const user = await usersAPI.login(formData);
        if (user) {
            setUser(user);
            navigate("/");  
        } else {
            setError("Invalid username or password.");
        }
    }

    return (
        <div className="page-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} className="form-container signup">
                <table>
                    <tbody>
                        <tr>
                            <th><label htmlFor="username">Username:</label></th>
                            <td>
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                        <tr>
                            <th><label htmlFor="password">Password:</label></th>
                            <td>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                {error && <p className="error">{error}</p>}
                <button type="submit" className="btn submit">Login</button>
            </form>
        </div>
    );
}

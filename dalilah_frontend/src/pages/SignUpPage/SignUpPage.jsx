// IMPORTS
import { useState } from "react";
import { useNavigate } from "react-router";


// APIs
import * as usersAPI from "../../utilities/users-api.js";
import './styles.css';

export default function SignupPage({ setUser }) {
    const navigate = useNavigate();
    const initialState = { username: "", email: "", password: "", confirmPassword: "" };
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const disabledSubmitBtn =
        Object.values(errors).every((val) => val === "") &&
        Object.values(formData).every((val) => val !== "");

    function handleChange(evt) {
        setFormData({ ...formData, [evt.target.name]: evt.target.value });
        checkErrors(evt);
    }

    function checkErrors({ target }) {
        const updateErrors = { ...errors };

        if (target.name === "username") {
            updateErrors.username =
                target.value.length < 3 ? "Username must be at least 3 characters." : "";
        }

        if (target.name === "email") {
            updateErrors.email = !target.value.includes("@") ? "Invalid email address." : "";
        }

        if (target.name === "password") {
            updateErrors.password =
                target.value.length < 3 ? "Password must be at least 3 characters." : "";
        }

        if (target.name === "confirmPassword") {
            updateErrors.confirmPassword =
                target.value !== formData.password ? "Passwords do not match." : "";
        }

        setErrors(updateErrors);
    }

    async function handleSubmit(evt) {
        evt.preventDefault();
        try {
            const newUser = await usersAPI.signup(formData);
            if (newUser) {
                setUser(newUser);
                setFormData(initialState);
                navigate("/"); 
            } else {
                alert("Signup failed. Try again.");
            }
        } catch (err) {
            console.error(err);
            alert("An unexpected error occurred.");
        }
    }

    return (
        <>
            <div className="page-header">
                <h1>Sign Up</h1>
            </div>

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
                                />
                                {errors.username && <p>{errors.username}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th><label htmlFor="email">Email:</label></th>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                                {errors.email && <p>{errors.email}</p>}
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
                                />
                                {errors.password && <p>{errors.password}</p>}
                            </td>
                        </tr>
                        <tr>
                            <th><label htmlFor="confirmPassword">Confirm Password:</label></th>
                            <td>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                                {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit" className="btn submit" disabled={!disabledSubmitBtn}>
                    Submit!
                </button>
            </form>
        </>
    );
}

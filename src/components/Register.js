import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState([]);
  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();

    // Şifre doğrulama işlemi
    const validationErrors = validatePassword(password);
    if (validationErrors.length > 0) {
      setPasswordValidationErrors(validationErrors);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/v1/users/save", {
        name: name,
        surname: surname,
        email: email,
        username: username,
        password: password,
      });
      alert("Registration Successful");
      navigate('/');
    } catch (err) {
      alert("Registration Failed");
    }
  }


  function validatePassword(password) {
    const errors = [];

    if (password.length < 8 || password.length > 20) {
      errors.push("Password must be between 8 and 20 characters long.");
    }

    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /[0-9]/.test(password);
    const hasSpecial = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(password);

    if (!hasUpper) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!hasLower) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!hasDigit) {
      errors.push("Password must contain at least one digit.");
    }

    if (!hasSpecial) {
      errors.push("Password must contain at least one special character.");
    }

    return errors;
  }

  return (
    <div className="container mt-4">
      <form>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Surname</label>
          <input
            type="text"
            className="form-control"
            placeholder="Surname"
            value={surname}
            onChange={(event) => {
              setSurname(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label>Password Again</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
          />
        </div>


        {!passwordsMatch && (
          <div className="alert alert-danger" role="alert">
            Passwords do not match.
          </div>
        )}


        {passwordValidationErrors.length > 0 && (
          <div className="alert alert-danger" role="alert">
            {passwordValidationErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}

        <button className="btn btn-primary mt-4" onClick={save}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;

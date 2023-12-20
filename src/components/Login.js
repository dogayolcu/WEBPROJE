import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login () {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Hata mesajı için state
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/api/v1/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Invalid credentials');
        }
    })
    .then(data => {
        console.log('Login successful:', data);
        navigate('/kanban'); // Başarılı giriş durumunda /kanban sayfasına yönlendir
    })
    .catch(error => {
        console.error('Error:', error);
        setError('Incorrect username or password'); // Hata mesajını güncelle
    });
  };

  return (
    <div className="container">
  <h1>Login</h1>
  {error && <p style={{ color: 'red' }}>{error}</p>} {/* Hata mesajını göster */}
  <form onSubmit={handleSubmit}>
    {/* Kullanıcı Adı Input Alanı */}
    <div className="form-group">
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
    </div>

    {/* Şifre Input Alanı */}
    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
    </div>

    <button type="submit">Login</button>
    <Link to="/register">
      <button type="button">Create An Account</button>
    </Link>
  </form>
</div>

  );
};

export default Login;

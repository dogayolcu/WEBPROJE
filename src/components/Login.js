import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Sadece kullanıcı girişi kontrolü yapılabilir, şifre kontrolü kaldırıldı
    console.log('Username:', username);

    // Kullanıcı girişi başarılı ise Kanban sayfasına yönlendir
    navigate('/kanban');
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        {/* Şifre kontrolü kaldırıldı */}

        <button type="submit">Login</button>
        <Link to="/register">
          <button type="button">Create An Account</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;

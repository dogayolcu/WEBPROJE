import React, { useState } from 'react';

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Burada hesap oluşturma işlemlerini gerçekleştirebilirsiniz.
    console.log('Name:', name);
    console.log('Surname:', surname);
    console.log('Email:', email);
    console.log('Username:', username);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    
    <div className="container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />

        <label htmlFor="surname">Surname:</label>
        <input type="text" id="surname" name="surname" value={surname} onChange={(e) => setSurname(e.target.value)} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label htmlFor="confirm-password">Confirm Password:</label>
        <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />

        <button type="submit">Create Account</button>
      </form>
      {/* Eğer sunucu ile ilgili bir işlem yapacaksanız, registerServer.js dosyasını kullanabilirsiniz. */}
      {/* <script src="registerServer.js"></script> */}
    </div>
  );
};

export default CreateAccount;

import axios from 'axios';
import {useState } from "react";
import { useNavigate } from 'react-router-dom';
function Register()
{
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  async function save(event) {
    event.preventDefault();
    if(password !== confirmPassword) {
      alert("Passwords do not match");
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
    } catch(err) {
      alert("Registration Failed");
    }
  }
    return (
        <div class="container mt-4" >
        <form>
        <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" placeholder="Name"
             value={name}
            onChange={(event) =>
              {
                setName(event.target.value);
              }}
            />
        </div>

        <div class="form-group">
            <label>Surname</label>
            <input type="text" class="form-control" placeholder="Surname"
             value={surname}
             onChange={(event) =>
               {
                setSurname(event.target.value);
               }}
            />
        </div>

        <div class="form-group">
            <label>Email</label>
            <input type="text" class="form-control" placeholder="Email"
            value={email}
            onChange={(event) =>
              {
                setEmail(event.target.value);
              }}
           />
        </div>

        <div class="form-group">
            <label>Username</label>
            <input type="text" class="form-control" placeholder="Username"
            value={username}
            onChange={(event) =>
              {
                setUsername(event.target.value);
              }}
           />
        </div>

        <div class="form-group">
            <label>Password</label>
            <input type="password" class="form-control" placeholder="Password"
            value={password}
            onChange={(event) =>
              {
                setPassword(event.target.value);
              }}
           />
        </div>

        <div class="form-group">
            <label>Password Again</label>
            <input type="password" class="form-control" placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) =>
              {
                setConfirmPassword(event.target.value);
              }}
           />
        </div>
        
        <button class="btn btn-primary mt-4"  onClick={save}>Register</button>
        </form>

      </div>
    );
  }

  export default Register;
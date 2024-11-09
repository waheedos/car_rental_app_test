
import React, { useState } from 'react';
import axios from 'axios';

function Register() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [license, setLicense] = useState('');

    const registerUser = () => {
        axios.post('http://localhost:3001/api/register', {
            name,
            address,
            phone,
            driver_license: license
        }).then(response => {
            alert(response.data.message);
        }).catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Register User</h2>
            <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
            <input type="text" placeholder="Address" onChange={(e) => setAddress(e.target.value)} />
            <input type="text" placeholder="Phone" onChange={(e) => setPhone(e.target.value)} />
            <input type="text" placeholder="Driver's License" onChange={(e) => setLicense(e.target.value)} />
            <button onClick={registerUser}>Register</button>
        </div>
    );
}

export default Register;

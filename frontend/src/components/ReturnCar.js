
import React, { useState } from 'react';
import axios from 'axios';

function ReturnCar() {
    const [carId, setCarId] = useState('');

    const returnCar = () => {
        axios.post('http://localhost:3001/api/returns', {
            car_id: carId
        }).then(response => {
            alert(response.data.message);
        }).catch(error => console.error(error));
    };

    return (
        <div>
            <h2>Return a Car</h2>
            <input type="text" placeholder="Car ID" onChange={(e) => setCarId(e.target.value)} />
            <button onClick={returnCar}>Return Car</button>
        </div>
    );
}

export default ReturnCar;

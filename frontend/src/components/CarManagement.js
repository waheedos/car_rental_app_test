
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CarManagement() {
    const [cars, setCars] = useState([]);
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [plateNumber, setPlateNumber] = useState('');
    const [dailyRate, setDailyRate] = useState('');

    const addCar = () => {
        axios.post('http://localhost:3001/api/cars', {
            brand, model, plate_number: plateNumber, daily_rate: dailyRate
        }).then(response => {
            alert(response.data.message);
            fetchCars();
        }).catch(error => console.error(error));
    };

    const fetchCars = () => {
        axios.get('http://localhost:3001/api/cars').then(response => {
            setCars(response.data);
        }).catch(error => console.error(error));
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div>
            <h2>Car Management</h2>
            <input type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} />
            <input type="text" placeholder="Model" onChange={(e) => setModel(e.target.value)} />
            <input type="text" placeholder="Plate Number" onChange={(e) => setPlateNumber(e.target.value)} />
            <input type="number" placeholder="Daily Rate" onChange={(e) => setDailyRate(e.target.value)} />
            <button onClick={addCar}>Add Car</button>
            <h3>Available Cars</h3>
            <ul>
                {cars.map(car => (
                    <li key={car.id}>{car.brand} {car.model} - {car.daily_rate}/day</li>
                ))}
            </ul>
        </div>
    );
}

export default CarManagement;

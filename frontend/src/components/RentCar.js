
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RentCar() {
    const [cars, setCars] = useState([]);
    const [userId, setUserId] = useState('');
    const [carId, setCarId] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const fetchCars = () => {
        axios.get('http://localhost:3001/api/cars').then(response => {
            setCars(response.data);
        }).catch(error => console.error(error));
    };

    const rentCar = () => {
        axios.post('http://localhost:3001/api/rentals', {
            user_id: userId, car_id: carId, start_date: startDate, end_date: endDate
        }).then(response => {
            alert(`Car rented successfully. Total Cost: ${response.data.totalCost}`);
            fetchCars();
        }).catch(error => console.error(error));
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <div>
            <h2>Rent a Car</h2>
            <input type="text" placeholder="User ID" onChange={(e) => setUserId(e.target.value)} />
            <select onChange={(e) => setCarId(e.target.value)}>
                <option value="">Select a Car</option>
                {cars.map(car => (
                    <option key={car.id} value={car.id}>{car.brand} {car.model}</option>
                ))}
            </select>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
            <button onClick={rentCar}>Rent Car</button>
        </div>
    );
}

export default RentCar;

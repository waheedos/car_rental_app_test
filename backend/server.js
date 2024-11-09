
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'car_rental'
});

db.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected...");
});

// User Registration
app.post('/api/register', (req, res) => {
    const { name, address, phone, driver_license } = req.body;
    const sql = 'INSERT INTO users (name, address, phone, driver_license) VALUES (?, ?, ?, ?)';
    db.query(sql, [name, address, phone, driver_license], (err, result) => {
        if (err) throw err;
        res.send({ message: 'User registered successfully', userId: result.insertId });
    });
});

// Add New Car
app.post('/api/cars', (req, res) => {
    const { brand, model, plate_number, daily_rate } = req.body;
    const sql = 'INSERT INTO cars (brand, model, plate_number, daily_rate, available) VALUES (?, ?, ?, ?, true)';
    db.query(sql, [brand, model, plate_number, daily_rate], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Car added successfully', carId: result.insertId });
    });
});

// Get Available Cars
app.get('/api/cars', (req, res) => {
    const sql = 'SELECT * FROM cars WHERE available = true';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Book Car
app.post('/api/rentals', (req, res) => {
    const { user_id, car_id, start_date, end_date } = req.body;
    const days = Math.floor((new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24));
    const sqlCar = 'SELECT daily_rate FROM cars WHERE id = ? AND available = true';
    db.query(sqlCar, [car_id], (err, car) => {
        if (err || car.length === 0) return res.status(400).send({ message: 'Car not available' });
        
        const totalCost = car[0].daily_rate * days;
        const sqlRental = 'INSERT INTO rentals (user_id, car_id, start_date, end_date, total_cost) VALUES (?, ?, ?, ?, ?)';

        db.query(sqlRental, [user_id, car_id, start_date, end_date, totalCost], (err, result) => {
            if (err) throw err;
            db.query('UPDATE cars SET available = false WHERE id = ?', [car_id]);
            res.send({ message: 'Car booked successfully', rentalId: result.insertId, totalCost });
        });
    });
});

// Return Car
app.post('/api/returns', (req, res) => {
    const { car_id } = req.body;
    const sql = 'UPDATE cars SET available = true WHERE id = ?';
    db.query(sql, [car_id], (err, result) => {
        if (err) throw err;
        res.send({ message: 'Car returned successfully' });
    });
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});

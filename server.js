const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const carModel = require('./carModel');
const COMMON = require('./COMMON')

const uri = COMMON.uri; // Đảm bảo thông tin chính xác

// Kết nối MongoDB ở đây
mongoose.connect(uri)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));

// Middleware để parsing requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const apiMobile = require('./api')

app.use('/api', apiMobile)

// Route handler
app.get('/', async (req, res) => {
    try {
        const cars = await carModel.find().lean();
        console.log(cars);
        res.send(cars);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.post('/add_xe', async (req, res) => {
    await mongoose.connect(uri)

    // let car = {
    //     ten: 'xe 30',
    //     namSX: 2025,
    //     hang: 'Yamama',
    //     gia: 1000000
    // }

    let car = req.body;


    let kq = await carModel.create(car)
    console.log(kq)
    res.send(kq)
})

app.get('/xoa/:id', async (req, res) => {

    await mongoose.connect(uri)

    let id = req.params.id

    console.log(id);

    try {
        await carModel.deleteOne({ _id: id })

        res.redirect('../')
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})

app.get('/update/:id', async (req, res) => {
    await mongoose.connect(uri)

    let id = req.params.id
    console.log(id);

    let tenXeMoi = 'Xe Moi năm 2024 heheh'



    try {
        await carModel.updateOne({ _id: id }, { ten: tenXeMoi })

        let xehois = await carModel.find({})
        res.send(xehois)
    } catch (error) {
        console.log(error);
        res.status(500).send('Server error');
    }
})
const express = require('express');

const router = express.Router()

module.exports = router

router.get('/', (req, res) => {
    res.send('Vao api thanh cong')
})
const mongoose = require('mongoose');
const carModel = require('./carModel');
const COMMON = require('./COMMON')

router.get('/list', async (req, res) => {
    await mongoose.connect(COMMON.uri)
    let cars = await carModel.find()
    console.log(cars);
    res.send(cars);
})


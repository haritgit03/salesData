const express = require('express');
const router = express.Router();
const SalesData = require('../models/sales.model');

//GET All Sales Data with Pagination
router.get('/', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        
        const sales = await SalesData.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
        const totalSales = await SalesData.countDocuments();
        
        res.status(200).json({
            success: true,
            count: sales.length,
            total: totalSales,
            totalPages: Math.ceil(totalSales / limit),
            currentPage: Number(page),
            data: sales
        });
    } catch (error) {
        console.error('Error fetching sales:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});


//GET Sales Data by Customer Name (Search)
router.get('/search', async (req, res) => {
    try {
        const { customerName } = req.query; // Customer Name search

        if (!customerName) {
            return res.status(400).json({
                success: false,
                message: 'Customer Name query parameter is required'
            });
        }

        const sales = await SalesData.find({
            customerName: { $regex: customerName, $options: 'i' }
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: sales.length,
            data: sales
        });
    } catch (error) {
        console.error('Error searching sales by customer name:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

//GET Sales Data with Sorting
router.get('/sort', async (req, res) => {
    try {
        const { sortBy = 'createdAt', order = 'desc' } = req.query;
        const sortOrder = order === 'asc' ? 1 : -1;
        
        const sales = await SalesData.find().sort({ [sortBy]: sortOrder });

        res.status(200).json({
            success: true,
            count: sales.length,
            data: sales
        });
    } catch (error) {
        console.error('Error sorting sales:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
});

//Create Sales Data
router.post('/', async (req, res) => {
    try {
        const {
            orderId, productId, customerId, productName, category,
            region, dateOfSale, quantitySold, unitPrice, discount,
            shippingCost, paymentMethod, customerName, customerEmail, customerAddress
        } = req.body;

        // Validation added
        if (!orderId || !productName || !dateOfSale) {
            return res.status(400).json({ error: 'Missing required fields: orderId, productName, or dateOfSale' });
        }

        // Create a new SalesData instance
        const newSale = new SalesData({
            orderId,
            productId,
            customerId,
            productName,
            category,
            region,
            dateOfSale,
            quantitySold,
            unitPrice,
            discount,
            shippingCost,
            paymentMethod,
            customerName,
            customerEmail,
            customerAddress
        });

        // Save the new sale to the database
        await newSale.save();

        // Send response
        res.status(201).json({ message: 'Sale created successfully', newSale });
    } catch (err) {
        console.error('Error creating sale:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Update Sales Data by Order ID
router.put('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;

        const updatedSale = await SalesData.findOneAndUpdate({ orderId }, updateData, { new: true });

        if (!updatedSale) {
            return res.status(404).json({ error: 'Sale not found' });
        }

        res.json({ message: 'Sale updated successfully', updatedSale });
    } catch (err) {
        console.error('Error updating sale:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//Delete Sales Data by Order ID
router.delete('/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const deletedSale = await SalesData.findOneAndDelete({ orderId });

        if (!deletedSale) {
            return res.status(404).json({ error: 'Sale not found' });
        }

        res.json({ message: 'Sale deleted successfully', deletedSale });
    } catch (err) {
        console.error('Error deleting sale:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;

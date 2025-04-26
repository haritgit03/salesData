var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    productId: {
        type: String
    },
    customerId: {
        type: String
    },
    productName: {
        type: String
    },
    category: {
        type: String
    },
    region: {
        type: String
    },
    dateOfSale: {
        type: Date,
        required: true
    },
    quantitySold: {
        type: Number
    },
    unitPrice: {
        type: Number
    },
    discount: {
        type: Number
    },
    shippingCost: {
        type: Number
    },
    paymentMethod: {
        type: String
    },
    customerName: {
        type: String
    },
    customerEmail: {
        type: String
    },
    customerAddress: {
        type: String
    }
}, {
    timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' }
});

var SalesData  = mongoose.model('SalesData', schema, 'salesData');
module.exports = SalesData;

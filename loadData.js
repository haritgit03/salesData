const mongoose = require('mongoose');
const csv = require('csvtojson');
const SalesData = require('./models/sales.model');

const mongoURI = 'mongodb://localhost:27017/salesDB'; // your MongoDB local URL

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected!');
        loadData();
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
    });

async function loadData() {
    try {
        const csvFilePath = './src/sales_data.csv';
        const jsonArray = await csv().fromFile(csvFilePath);

        // 🔥 Map and Fix Data properly
        const formattedData = jsonArray.map(item => ({
            orderId: item['Order ID'],
            productId: item['Product ID'],
            customerId: item['Customer ID'],
            productName: item['Product Name'],
            category: item['Category'],
            region: item['Region'],
            dateOfSale: new Date(item['Date of Sale']),
            quantitySold: Number(item['Quantity Sold']),
            unitPrice: Number(item['Unit Price']),
            discount: Number(item['Discount']),
            shippingCost: Number(item['Shipping Cost']),
            paymentMethod: item['Payment Method'],
            customerName: item['Customer Name'],
            customerEmail: item['Customer Email'],
            customerAddress: item['Customer Address']
        }));

        await SalesData.insertMany(formattedData);
        console.log('Data inserted successfully!');
        process.exit();  // Exit after successful insertion
    } catch (error) {
        console.error('Error inserting data:', error);
        process.exit(1);  // Exit with error
    }
}

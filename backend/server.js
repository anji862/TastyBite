require('dotenv').config();
const express = require('express')
const connectDb = require('./config/db')
const productRoutes=require('./routes/productRoutes')

connectDb();
const app = express();

app.use(express.json());
app.use('/api/products',productRoutes)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server is running"))

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('/frontend/build'));
}

app.get('*', (request, response) => {
	response.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});
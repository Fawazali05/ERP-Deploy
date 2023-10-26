// To connect with your mongoDB database
require('./connection');


// For backend and express
const express = require('express');
const app = express();
const dotenv = require('dotenv');
dotenv.config({ path : './config.env'})
const PORT = process.env.PORT

const cors = require("cors");
console.log("App listen at port ");
console.log(PORT);

app.use(express.json());
app.use(cors());

//Using routes
app.use('/api/auth', require('./router/auth'))
app.use('/api/student', require('./router/personalInfo'))
app.use('/api/files',require('./router/download'))
app.use('/api/data',require('./router/adminRoutes'))
app.use('/api/images', require('./router/imageUpload'))

app.get("/", (req, resp) => {

	resp.send("App is Working");
	// You can check backend is working or not by
	// entering http://loacalhost:5000
	
	// If you see App is working means
	// backend working properly
});


app.listen(PORT);

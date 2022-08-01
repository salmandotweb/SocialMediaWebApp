const PORT = process.env.PORT || 8000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const { readdirSync } = require("fs");

let allowedOrigins = ["http://localhost:3000"];
function corsOptions(req, res) {
	let temp;
	let origin = req.header("Origin");
	if (allowedOrigins.indexOf(origin) > -1) {
		temp = { origin: true, useSuccessStatus: 200 };
	} else {
		temp = { origin: false, useSuccessStatus: 401 };
	}
	res(null, temp);
}
app.use(cors(corsOptions));

app.use(express.json());

readdirSync("./routes").map((route) =>
	app.use("/", require("./routes/" + route))
);

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
	})
	.then(() => {
		console.log("DataBase connected");
	})
	.catch((err) => {
		console.log(err);
	});

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

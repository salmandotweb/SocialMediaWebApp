const PORT = process.env.PORT || 8000;

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const { readdirSync } = require("fs");

let corsOptions = {
	origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(
	fileUpload({
		useTempFiles: true,
	})
);

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

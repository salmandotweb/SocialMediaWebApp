import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./styles/icons/icons.css";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/app/store";
import { Provider } from "react-redux";
import App from "./App";

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

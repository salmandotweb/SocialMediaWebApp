function App() {
	const get = async () => {
		const response = await fetch("http://localhost:8000/");
		const data = await response.json();
		console.log(data);
	};
	get();
	return <div>welcome to frontend</div>;
}

export default App;

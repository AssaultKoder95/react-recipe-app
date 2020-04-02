import React, { useState, useEffect } from 'react';
import Recipe from './components/Recipe';
import './App.css';

function App() {
	const [recipes, setRecipes] = useState([]);
	const [searchTerm, setSearchTerm] = useState('Banana');
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		const APP_ID = process.env.REACT_APP_ID;
		const APP_KEY = process.env.REACT_APP_KEY;
		const RECIPE_API_ENDPOINT = `https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}`;

		const updateRecipeEndpoint = searchTerm => {
			const apiEndpoint = new URL(RECIPE_API_ENDPOINT);
			apiEndpoint.searchParams.append('q', searchTerm);
			return apiEndpoint;
		};

		const getRecipes = async () => {
			const updatedRecipeEndpoint = updateRecipeEndpoint(searchTerm);
			const response = await fetch(updatedRecipeEndpoint);
			const data = await response.json();
			const recipeData = data.hits.map(recipeList => recipeList.recipe);
			setRecipes(recipeData);
		};

		getRecipes();
	}, [searchTerm]);

	const handleInput = e => setInputValue(e.target.value);

	const handleSubmit = e => {
		e.preventDefault();
		setSearchTerm(inputValue);
		setInputValue('');
	};

	return (
		<div className="App">
			<form onSubmit={handleSubmit} className="search-form">
				<input
					className="search-bar"
					type="text"
					placeholder="Chicken, Peas, Bread ..."
					onChange={handleInput}
					value={inputValue}
				/>

				<button className="search-button" type="submit">
					Search
				</button>
			</form>
			<div className="recipes">
				{recipes.map((recipe, index) => (
					<Recipe key={index} data={recipe} />
				))}
			</div>
		</div>
	);
}

export default App;

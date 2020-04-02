import React from 'react';
import style from './recipe.module.css';
const Recipes = props => {
	const { data: recipe } = props;
	const { label: title, ingredients, calories, image } = recipe;
	return (
		<div className={style.recipe}>
			<h1>{title}</h1>
			<p>Calories: {parseInt(calories, 10)}</p>
			<img src={image} alt={title} />
			<h4>Ingredients</h4>
			<ul>
				{ingredients.map((ingredient, index) => (
					<li key={index}>{ingredient.text}</li>
				))}
			</ul>
		</div>
	);
};

export default Recipes;

import React, {useEffect, useState} from "react";
import './App.css';
import Recipe from './Recipe';
import Header from "./Header";

const App = () => {

  const APP_ID = 'ee300f11';
  const APP_KEY = '55e9cae8d076f1cd71313572f77114ae';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');


useEffect( () => {
  getRecipes();
}, [query]);

const getRecipes = async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
  const data = await response.json();
  setRecipes(data.hits);
};

const updateSearch = e => {
  setSearch(e.target.value);
}

const getSearch = e => {
  e.preventDefault();
  setQuery(search);
  setSearch('');
}

  return (
    <div className="App">
    <div className="app-title">
      <Header />
    </div>
    <form onSubmit={getSearch} className="search-form">
      <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
      <button className="search-button" type="submit">Search</button>
    </form>
    <div className="recipe">
    {recipes.map(recipe => (
      <Recipe
      key={recipe.recipe.label}
      title={recipe.recipe.label}
      calories={recipe.recipe.calories}
      image={recipe.recipe.image}
      ingredients={recipe.recipe.ingredients}
      />
    ))}
    </div>
    </div>
  );
}

export default App;

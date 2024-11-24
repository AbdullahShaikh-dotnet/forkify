import * as model from './model.js';
import receipeView from './views/receipeView.js';
import searchView from './views/searchView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    receipeView.renderSpinner();

    await model.loadRecipe(id);

    receipeView.render(model.state.recipe);
  } catch (error) {
    console.error(error);
    receipeView.renderErrorMessage();
  }
};

const controlSearchResult = async function () {
  try {
    const query = searchView?.getQuery(); 
    if(!query) return;

    await model.loadSearchResult(query);
    console.log(model.state.search.result);
  } catch (err) {
    console.error(err);
    throw err;
  }
};


const init = function () {
  receipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
};

init();

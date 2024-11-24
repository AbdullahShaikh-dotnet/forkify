import * as model from './model.js';
import receipeView from './views/receipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

if(module.hot){
  module.hot.accept();
}

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
    resultView.renderSpinner();
    const query = searchView?.getQuery();
    if (!query) return;

    await model.loadSearchResult(query);

    // resultView.render(model.state.search.result);
    resultView.render(model.getSearchResultPage());
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

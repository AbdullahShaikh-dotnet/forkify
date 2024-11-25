import * as model from './model.js';
import receipeView from './views/receipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';
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

    resultView.update(model.getSearchResultPage());

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
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const controlPagination = function(goTo){
  resultView.render(model.getSearchResultPage(goTo));
  paginationView.render(model.state.search);
}

const controlServings = function(newServings){
  model.updateServings(newServings);
  // receipeView.render(model.state.recipe);
  receipeView.update(model.state.recipe);
}


const init = function () {
  receipeView.addHandlerRender(controlRecipe);
  receipeView.addHandlerUpdateServings(controlServings);
  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
};

init();

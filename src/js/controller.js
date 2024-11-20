import * as model from './model.js';
import receipeView from './views/receipeView.js';
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
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

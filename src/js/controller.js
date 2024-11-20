import * as model from './model.js';
import receipeView from './views/receipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

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
    alert(error);
    console.error(error);
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

// window.addEventListener('hashchange',controlRecipe);
// window.addEventListener('load',controlRecipe);

import { API_ENDPOINT, RESULT_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
  },
  bookmarks:[]
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_ENDPOINT}${id}`);

    const { recipe } = data.data;
    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceURL: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    state.recipe.bookmarked = state.bookmarks.some(bookmark => bookmark.id === id);

  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const loadSearchResult = async function (query) {
  try {
    const data = await getJSON(`${API_ENDPOINT}?search=${query}`);
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceURL: rec.source_url,
        image: rec.image_url,
      };
      state.search.page = 1;
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const startPage = (page - 1) * state.search.resultPerPage; //0;
  const endPage = page * state.search.resultPerPage; //10;
  return state.search.result.slice(startPage, endPage);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
};


export const addBookmark = function(receipe){
  state.bookmarks.push(receipe);
  if(state.recipe.id === receipe.id) state.recipe.bookmarked = true;
}

export const removeBookmark = function(id){
  const index = state.bookmarks.indexOf(el => el.id === id);

  state.bookmarks.slice(index,1);

  if(state.recipe.id === id) state.recipe.bookmarked = false;
}
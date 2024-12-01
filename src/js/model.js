import { API_ENDPOINT, RESULT_PER_PAGE, API_Key } from './config.js';
import { AJAX } from './helpers.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    result: [],
    page: 1,
    resultPerPage: RESULT_PER_PAGE,
  },
  bookmarks: [],
};

const createReceipeObject = function (data) {
  const { recipe } = data.data;
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceURL: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_ENDPOINT}${id}?key=${API_Key}`);

    state.recipe = createReceipeObject(data);

    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === id
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};
/**
 * abc
 * @param {*} query 
 */
export const loadSearchResult = async function (query) {
  try {
    const data = await AJAX(`${API_ENDPOINT}?search=${query}&key=${API_Key}`);
    state.search.result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        sourceURL: rec.source_url,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
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

const storeBookmark = function () {
  localStorage.setItem('Bookmark', JSON.stringify(state.bookmarks));
};

export const addBookmark = function (receipe) {
  state.bookmarks.push(receipe);
  if (state.recipe.id === receipe.id) state.recipe.bookmarked = true;
  storeBookmark();
};

export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);

  state.bookmarks.splice(index, 1);

  if (state.recipe.id === id) state.recipe.bookmarked = false;
  storeBookmark();
};

const init = function () {
  const storage = localStorage.getItem('Bookmark');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

export const UploadReceipe = async function (newReceipe) {
  try {
    const ingredients = Object.entries(newReceipe)
      .filter(entry => entry[0]?.startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const IngArray = ing[1]?.replaceAll(' ', '')?.split(',');

        if (IngArray.length != 3)
          throw new Error('String is not in Correct Format');

        const [quantity, unit, description] = IngArray;
        return { quantity: quantity ? +quantity : null, unit, description };
      });

    const receipe = {
      title: newReceipe.title,
      source_url: newReceipe.sourceUrl,
      image_url: newReceipe.image,
      publisher: newReceipe.publisher,
      cooking_time: +newReceipe.cookingTime,
      servings: +newReceipe.servings,
      ingredients,
    };

    const data = await AJAX(`${API_ENDPOINT}?key=${API_Key}`, receipe);
    state.recipe = createReceipeObject(data);
    addBookmark(state.recipe);
  } catch (error) {
    throw error;
  }
};

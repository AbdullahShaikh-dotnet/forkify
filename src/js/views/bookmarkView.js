import View from './view.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';

class BookMarkView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmark yet. Find a nice receipe and Bookmark it';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }

  addHandlerBookmark(handler){
    document.addEventListener("DOMContentLoaded", handler());
  }
}

export default new BookMarkView();

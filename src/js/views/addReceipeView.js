import View from './view.js';
import icons from 'url:../../img/icons.svg';

class AddReceipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this.addHandlerOpen();
    this.addHandlerClose();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  addHandlerOpen() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerClose() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {}

  addHandlerAddReceipe(handler){
    this._parentElement.addEventListener('submit', function(e){
        e.preventDefault();
        const dataArr = [...new FormData(this)];
        const Data = Object.fromEntries(dataArr);
        handler(Data);
    })
  }
}

export default new AddReceipeView();

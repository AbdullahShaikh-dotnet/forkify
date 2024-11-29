import icons from 'url:../../img/icons.svg';
export default class view {
  _data;
  _errorMessage =
    'No receipe found for search result please try another one ;)';
  _message = '';

  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();

    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `<div class="spinner">
                        <svg>
                          <use href="${icons}#icon-loader"></use>
                        </svg>
                      </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMessage(errorMessage = this._errorMessage) {
    const markup = `<div class="error">
                      <div>
                        <svg>
                          <use href="${icons}#icon-alert-triangle"></use>
                        </svg>
                      </div>
                      <p>${errorMessage}</p>
                    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `<div class="error">
                      <div>
                        <svg>
                          <use href="${icons}#icon-alert-triangle"></use>
                        </svg>
                      </div>
                      <p>${message}</p>
                    </div>`;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElement = Array.from(newDOM.querySelectorAll('*'));
    const currentElemet = Array.from(this._parentElement.querySelectorAll('*'));

    newElement.forEach((newEl, index) => {
      const currentEl = currentElemet[index];
      if (
        !newEl.isEqualNode(currentEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        currentEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(currentEl)) {
        Array.from(newEl.attributes).forEach(att => {
          currentEl.setAttribute(att.name, att.value);
        });
      }
    });
  }
}

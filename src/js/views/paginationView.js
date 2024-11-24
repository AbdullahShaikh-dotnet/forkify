import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  #PreviousButton(currentPage) {
    const PreviousPage = currentPage - 1;
    return `
        <button data-goto="${ PreviousPage }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${ PreviousPage }</span>
          </button>
    `;
  }

  #NextButton(currentPage) {
    const NextPage = currentPage + 1;
    return `
        <button data-goto="${ NextPage }" class="btn--inline pagination__btn--next">
            <span>Page ${ NextPage }</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }

  addHandlerClick(handler){
    this._parentElement.addEventListener('click', function(e){
        const btn = e.target.closest('.btn--inline');
        if(!btn) return;
        const goToPage = +btn.dataset.goto;
        handler(goToPage);
    })
  }

  _generateMarkup() {
    const pageNumbers = Math.ceil(
      this._data.result.length / this._data.resultPerPage
    );

    const currentPage = this._data.page;

    // page 1, and there are other pages
    if (currentPage === 1 && pageNumbers > 1) {
      return this.#NextButton(currentPage);
    }

    // Last Page
    if (currentPage === pageNumbers && pageNumbers > 1) {
      return this.#PreviousButton(currentPage);
    }

    // Other Page
    if (currentPage < pageNumbers) {
      return `${this.#PreviousButton(currentPage)}${this.#NextButton(currentPage)}`;
    }

    // page 1, and there are no ther pages
    return '';
  }
}

export default new PaginationView();

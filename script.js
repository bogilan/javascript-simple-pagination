const paginationContainer = document.querySelector('.pagination-container');
const pagination = paginationContainer.querySelector('.pagination');
const prevBtn = paginationContainer.querySelector('.prev-btn');
const nextBtn = paginationContainer.querySelector('.next-btn');

// Set starting page numbers
let currentPage = 1;
let totalPages = 10;
let visiblePages = 2;

// Function to create the pagination elements with the given current page and total number of pages
function createPagination() {
  // Clear the pagination element's content
  pagination.innerHTML = '';

  // Calculate the start and end pages to be shown based on the current page and visible pages
  // As Current page is in the middle, Start and End Page are as follows:
  // Start Page is Current Page - number of Visible Pages, or 1st page
  let startPage = Math.max(1, currentPage - visiblePages);
  // End Page is Current Page + number of Visible Pages, or Last page
  let endPage = Math.min(totalPages, currentPage + visiblePages);

  // Adjust the range of pages to show based on the current page and the visible pages
  // This is neccesary due to the fact that when on first or last two pages, current page can not be in the middle
  // as it will result in lesser number of pages than 5
  // so we set end and start page with calculation to ensure that we always have same number of visible pages
  if (currentPage - startPage < visiblePages) {
    endPage = Math.min(totalPages, startPage + visiblePages * 2);
    startPage = Math.max(1, endPage - visiblePages * 4);
  }
  if (endPage - currentPage < visiblePages) {
    startPage = Math.max(1, endPage - visiblePages * 2);
    endPage = Math.min(totalPages, startPage + visiblePages * 4);
  }

  // Add the numbered page buttons
  for (let i = startPage; i <= endPage; i++) {
    // Add the active class to the current page button
    // if on currentPage, add active class
    // else blank
    const isActive = i === currentPage ? 'active' : '';
    // add elements to pagination list
    pagination.innerHTML += `<li class="num ${isActive}">${i}</li>`;
  }

  // Add event listeners to the numbered page buttons to update the pagination on click
  // Each click on number will create new pagination with number clicked as new current page
  pagination.querySelectorAll('.num').forEach(num => {
    num.addEventListener('click', () => {
      currentPage = Number(num.textContent);
      createPagination();
    });
  });

  // Disable PREV and NEXT buttons when on 1st and last page
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  // Add event listeners for PREV and NEXT buttons
  // Each click calls PREV nad NEXT btn functions
  // Button click functions are called outside createPagination function...
  // ... multiple fast clicks are adding event listeners to the PREV and NEXT buttons every time the createPagination function is called
  // ... which can break code
  prevBtn.addEventListener('click', onPrevBtnClick);
  nextBtn.addEventListener('click', onNextBtnClick);
}

// Click function for PREV button
// Decreases current page by 1 and calls createPagination
function onPrevBtnClick() {
  currentPage--;
  createPagination();
}

// Click function for NEXT button
// Increases current page by 1 and calls createPagination
function onNextBtnClick() {
  currentPage++;
  createPagination();
}


// Call the createPagination function with provided values for the current page and the total number of pages
createPagination();
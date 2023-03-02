const paginationContainer = document.querySelector('.pagination-container');
const pagination = paginationContainer.querySelector('.pagination');
const prevBtn = paginationContainer.querySelector('.prev-btn');
const nextBtn = paginationContainer.querySelector('.next-btn');

// Function to create the pagination elements with the given current page and total number of pages
function createPagination(currentPage, totalPages) {
  // Clear the pagination element's content
  pagination.innerHTML = '';

  // Set the number of visible pages left and right of current page
  let visiblePages = 2;

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
    const isActive = i === currentPage ? 'active' : '';
    pagination.innerHTML += `<li class="num ${isActive}">${i}</li>`;
  }

  // Add event listeners to the numbered page buttons to update the pagination on click
  pagination.querySelectorAll('.num').forEach(num => {
    num.addEventListener('click', () => {
      createPagination(Number(num.textContent), totalPages);
    });
  });

  // Set event listeners for prev and next buttons
  if (currentPage === 1) {
    prevBtn.setAttribute('disabled', 'true');
  } else {
    prevBtn.removeAttribute('disabled');
    prevBtn.addEventListener('click', () => {
      createPagination(currentPage - 1, totalPages);
    });
  }

  if (currentPage === totalPages) {
    nextBtn.setAttribute('disabled', 'true');
  } else {
    nextBtn.removeAttribute('disabled');
    nextBtn.addEventListener('click', () => {
      createPagination(currentPage + 1, totalPages);
    });
  }
}

// Call the createPagination function with the initial values of 1 for the current page and 10 for the total number of pages
createPagination(1, 10);
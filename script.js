console.log("library");
const allBooksContainer = document.getElementById("books-container");
const changeDisplayView = document.getElementById("view");
const searchInput = document.getElementById("seach-input");
const sortBooks = document.getElementById("sort-books");
let result = [];
const getBooks = async () => {
  try {
    const res = await fetch("https://api.freeapi.app/api/v1/public/books"); // Await fetch
    const data = await res.json(); // Await response parsing

    console.log(data.data.data, "value in data");
    result = data.data.data;
    displayBooks(result);

    return data;
  } catch (error) {
    console.log(error);
  }
};

// Call the function
getBooks();

function displayBooks(books) {
  allBooksContainer.innerHTML = "";
  if (books.length <= 0) {
    allBooksContainer.innerHTML = "<h3>No Book Found</h3>";
  }
  books
    .map((book) => {
      const bookItems = document.createElement("div");
      bookItems.classList.add("book-items");
      allBooksContainer.appendChild(bookItems);
   
      bookItems.innerHTML += `<a href="bookdetails.html?detailsLink=${book.selfLink}" target="_blank">
      <img 
src="${book.volumeInfo.imageLinks.smallThumbnail}" 

alt="Thumbnail"
>     
  <p><b>Title:</b> ${book.volumeInfo.title}</p>
  <p><b>Author:</b> ${book.volumeInfo.authors.map((author) => author)}</p>
  <p><b>Publisher:</b> ${book.volumeInfo.publisher}</p>
  <p><b>Published Date:</b> ${book.volumeInfo.publishedDate}</p></a>
 `;
    })
    .sort();
}
let currentDisplay = "flex"; // Default to grid view
changeDisplayView.addEventListener("click", () => {
  if (currentDisplay !== "block") {
    currentDisplay = "block"; // Change to list view
    allBooksContainer.style.display = currentDisplay;

    changeDisplayView.innerText = "# Grid View";
  } else {
    currentDisplay = "flex"; 
    allBooksContainer.style.display = currentDisplay;
    

    changeDisplayView.innerText = "- List View";
  }
});

searchInput.addEventListener("input", function () {
  const query = searchInput.value.toLowerCase();
  console.log(query);

  const filteredBooks = result.filter((book) => {
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors.map((author) => author.toLowerCase())
      : [];

    return (
      book.volumeInfo.title.toLowerCase().includes(query) ||
      authors.some((author) => author.includes(query))
    );
  });

  displayBooks(filteredBooks);
});

sortBooks.addEventListener("input", () => {
  let input = sortBooks.value;
  if (input == "name") {
    const sortByTitle = [...result].sort((a, b) =>
      a.volumeInfo.title.localeCompare(b.volumeInfo.title)
    );
    displayBooks(sortByTitle);
  } else if (input === "oldToNew") {
    const sortByDate = [...result].sort(
      (a, b) =>
        new Date(a.volumeInfo.publishedDate) -
        new Date(b.volumeInfo.publishedDate)
    );
    displayBooks(sortByDate);
  } else {
    displayBooks(result);
  }
});

window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        displayBooks(result); // Fetch next set of books
    }
});

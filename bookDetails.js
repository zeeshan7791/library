console.log('book details')
const bookDetails= document.getElementById("books-details");

const urlParams = new URLSearchParams(window.location.search);
const bookDetailsUrl = urlParams.get('detailsLink');
console.log(bookDetailsUrl);  
let result=[]
const getBookDetails = async () => {
    try {
      const res = await fetch(bookDetailsUrl); // Await fetch
      const data = await res.json(); // Await response parsing
  
     console.log(data)
     displayBooks(data)
   
  
      
    } catch (error) {
      console.log(error);
    }
  };
  console.log(result,"value in result")
   getBookDetails()
   function displayBooks(book) {
    bookDetails.innerHTML = "";
   
  
        const bookItems = document.createElement("div");
        bookItems.classList.add("book-details");
        bookDetails.appendChild(bookItems);
        bookItems.innerHTML = `
        <img 
  src="${book.volumeInfo.imageLinks.thumbnail}" 
  width="200" 
  height="150" 
  alt="Video Thumbnail">     
    <p><b>Title:</b> ${book.volumeInfo.title}</p>
    <p><b>Author:</b> ${book.volumeInfo.authors.map((author) => author)}</p>
    <p><b>Publisher:</b> ${book.volumeInfo.publisher}</p>
    <p><b>Published Date:</b> ${book.volumeInfo.publishedDate}</p></a>
   `
    
      
  }
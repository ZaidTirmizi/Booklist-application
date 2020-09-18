//book class: represents a book
class Book {
    constructor(title, author, isbn){
        this.author = author;
        this.title = title;
        this.isbn = isbn
    }
}

class UI {
    static displayBooks(){
        const storedBooks = [
            {
                title: 'book one',
                author: 'john Doe',
                isbn: '323232'
            },
            {
                title: 'book two',
                author: 'john Doe',
                isbn: '323562'
            }
        ];
        const books = storedBooks;
        books.forEach(book => UI.addBookToList(book));
    }
   static addBookToList(book){
       const list = document.querySelector('#book-list');
       const row = document.createElement('tr');
       row.innerHTML = `
       <td>${book.title}</td>
       <td>${book.author}</td>
       <td>${book.isbn}</td>
       <td><a href='#' class='btn btn-danger btn-sm delete'>X</a></td>
       `;

       list.appendChild(row);
   }

   //delete book
   static deleteBook(el){
       if (el.classList.contains('delete')){
           el.parentElement.parentElement.remove();
       }
   }

   //alert messages for validation
   static showAlert(message, className){
       const div = document.createElement('div');
       div.className =`alert alert${className}`;
       div.appendChild(document.createTextNode(message));
       const container = document.querySelector('.container');
       const form = document.querySelector('#book-form');
       container.insertBefore(div,form);

       //vanish in three seconds
       setTimeout(()=> document.querySelector('.alert').remove(),3000);
   }

   //clear form after submit event
   static clearField(){
       document.querySelector('#title').value = '';
       document.querySelector('#author').value = '';
       document.querySelector('#isbn').value = '';
   }
}

// Store Class: Handles Storage

//Event: display book
document.addEventListener('DOMContentLoaded', UI.displayBooks);

//Event: add a book
document.querySelector('#book-form').addEventListener('submit', e => {
    //get form values
    e.preventDefault();
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    //validate
    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('please fill in all the fields','danger')
    }else {
        const book = new Book(title, author, isbn);
        //console.log(book);
    
        UI.addBookToList(book);
        UI.clearField();
    }
   
})

//Event: remove a book
document.querySelector('#book-list').addEventListener('click', e=>UI.deleteBook(e.target));
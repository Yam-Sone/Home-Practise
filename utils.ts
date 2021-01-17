
// CRUD, map and filter practice
// 1. Create a book list, book: {name, currentlyReading}
// 2. Creating function to add a book to list
// 3. Create a function to remove a book from list
// 4. Create a function to update book status as currently reading
// 5. Create a function that transforms the book list to an online edition


interface books {
    name: string;
    currentlyReading: boolean;
}

interface booksOnline extends  books{
    isOnline: boolean;
}



let booksList: books[] = [
    {name: 'hasamba', currentlyReading: true},
    {name: 'deepvis', currentlyReading: false},
    {name: 'hunter', currentlyReading: true},
    {name: 'ranger', currentlyReading: true},
    {name: 'house of death', currentlyReading: false}

]

let newBook: books = {name: 'shalom', currentlyReading: false}

console.log(booksList)



const addBook = (list: books[], book: books):books[] => {

    list.push(book);
    return list;

}

const removeBook = (list: books[], book: books):books[] => {
    list = list.filter(item => item !== book);
    return list;

}

const updateBook = (list: books[], book: books):books[] => {
    let result = list.find(item => item.name === book.name);
    updateCurrentlyReading(result);
    return list;

}

const updateCurrentlyReading = (book: books):books => {
    book.currentlyReading = !book.currentlyReading;
    return book;
}

const updateToOnline = (list: books[]): booksOnline[] => {

    let newList = list.map (value => ({...value, isOnline: Math.random() < 0.65}))
    return newList;
}

console.log(addBook(booksList, newBook))
//console.log(removeBook(booksList, newBook))
// console.log(addBook(booksList, newBook))
console.log(updateBook(booksList, newBook))
console.log(updateToOnline(booksList))

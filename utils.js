// CRUD, map and filter practice
// 1. Create a book list, book: {name, currentlyReading}
// 2. Creating function to add a book to list
// 3. Create a function to remove a book from list
// 4. Create a function to update book status as currently reading
// 5. Create a function that transforms the book list to an online edition
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var booksList = [
    { name: 'hasamba', currentlyReading: true },
    { name: 'deepvis', currentlyReading: false },
    { name: 'hunter', currentlyReading: true },
    { name: 'ranger', currentlyReading: true },
    { name: 'house of death', currentlyReading: false }
];
var newBook = { name: 'shalom', currentlyReading: false };
console.log(booksList);
var addBook = function (list, book) {
    list.push(book);
    return list;
};
var removeBook = function (list, book) {
    list = list.filter(function (item) { return item !== book; });
    return list;
};
var updateBook = function (list, book) {
    var result = list.find(function (item) { return item.name === book.name; });
    updateCurrentlyReading(result);
    return list;
};
var updateCurrentlyReading = function (book) {
    book.currentlyReading = !book.currentlyReading;
    return book;
};
var updateToOnline = function (list) {
    var newList = list.map(function (value) { return (__assign(__assign({}, value), { isOnline: Math.random() < 0.65 })); });
    return newList;
};
console.log(addBook(booksList, newBook));
//console.log(removeBook(booksList, newBook))
// console.log(addBook(booksList, newBook))
console.log(updateBook(booksList, newBook));
console.log(updateToOnline(booksList));

import { useState } from "react";
import { Link } from "react-router-dom";
import { search } from "../BooksAPI";

const Search = (props) => {
    const [books, setBooks] = useState([]);

    const searchResult = async (query, maxNumber) => {
        try {
            const searchedBooks = await search(query, maxNumber);
            props.books.map(b => searchedBooks.map(s => {
                if (s.id === b.id) s.shelf = b.shelf;
            }))

            if (!Array.isArray(searchedBooks) || !query.trim()) {
                setBooks([]);
                return;
            };
            setBooks(searchedBooks)
        } catch (e) {
            setBooks([]);
        }
    };

    return (
        <div className="search-books">
            <div className="search-books-bar">
                <Link
                    className="close-search"
                    to="/"
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={(e) => searchResult(e.target.value, 20)}
                    />
                </div>
            </div>
            <div className="search-books-results">
                <ol className="books-grid">
                    {books.map(b => {
                        return (
                            <li key={b.id}>
                                <div className="book">
                                    <div className="book-top">
                                        <div
                                            className="book-cover"
                                            style={{
                                                width: 128,
                                                height: 193,
                                                backgroundImage:
                                                    `url("${b.imageLinks?.smallThumbnail}")`,
                                            }}
                                        ></div>
                                        <div className="book-shelf-changer">
                                            <select value={b.shelf ? b.shelf : "none"} onChange={(e) => {
                                                props.addBook(b.id, e.target.value);
                                                props.updateShelf(b.id, e.target.value);
                                                b.shelf = e.target.value;
                                            }
                                            }>
                                                <option disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{b.title}</div>
                                    <div className="book-authors">{b.authors?.join(", ")}</div>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
};
export default Search;
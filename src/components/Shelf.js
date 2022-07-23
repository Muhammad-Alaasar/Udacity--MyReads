const Shelf = (props) => {
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{props.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {props.books.map(b => {
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
                                                    `url("${b.imageLinks.smallThumbnail}")`,
                                            }}
                                        ></div>
                                        <div className="book-shelf-changer">
                                            <select value={b.shelf} onChange={(e) => props.updateShelf(b.id, e.target.value)}>
                                                <option value="none" disabled>Move to...</option>
                                                <option value="currentlyReading">Currently Reading</option>
                                                <option value="wantToRead">Want to Read</option>
                                                <option value="read">Read</option>
                                                <option value="none">None</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="book-title">{b.title}</div>
                                    <div className="book-authors">{b.authors.join(", ")}</div>
                                </div>
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    );
}

export default Shelf;
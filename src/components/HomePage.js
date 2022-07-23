import Shelf from "./Shelf";
import GoSearchButton from "./GoSearchButton";

const HomePage = (props) => {

    const currentlyReading = props.books.filter(i => i.shelf === "currentlyReading");
    const wantToRead = props.books.filter(i => i.shelf === "wantToRead");
    const read = props.books.filter(i => i.shelf === "read");

    return (
        <div className="app">
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf name={"Currently Reading"} books={currentlyReading} updateShelf={props.updateShelf} />
                        <Shelf name={"Want to Read"} books={wantToRead} updateShelf={props.updateShelf} />
                        <Shelf name={"Read"} books={read} updateShelf={props.updateShelf} />
                    </div>
                </div>
                <GoSearchButton />
            </div>
            )
        </div>
    );
};

export default HomePage;
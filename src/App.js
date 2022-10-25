import React, { useState, useEffect } from "react";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Books from "./pages/Books";
import { books } from "./data";
import BooksInfo from "./pages/BooksInfo";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  const [cart, setCart] = useState([]);

  // 'addToCart'
  // adding extra books
  // spreading in the original book and also new property - quantity
  // need comp. to know about changes in quantity

  function addToCart(book) {
    setCart([...cart, { ...book, quantity: 1 }]);
  }

  // 'removeBook'
  // [1, 2, 3, 4].filter(num => num !== 3)
  // returns [1, 2, 4]
  // [1, 2, 3, 4].filter(num => num === 3)
  // returns [3]
  // Function will keep the books in the cart who's id doesn't
  // match the id of the book we're passing into the function
  // when we press remove...essentially deleting it
  
  function removeBook(item) {
    setCart(cart.filter((book) => book.id !== item.id));
  }

  // 'changeQuantity'
  // So we're mapping the original items in cart into a new array 'item' and
  // we're comparing the id of those to the book.id of the book we're adding from
  // the 'Books' page. If they're equal, we spread in the original item along with
  // the quantity.
  // Otherwise we just return the original item
  // quantity param = event.target.value !

  function changeQuantity(book, quantity) {
    setCart(
      cart.map((item) =>
        item.id === book.id
          ? {
              ...item,
              quantity: +quantity,
            }
          : item
      )
    );
  }

  function numberOfItems() {
    let counter = 0;
    cart.forEach((item) => {
      counter += item.quantity;
    });
    return counter;
  }

  return (
    <Router>
      <div className="App">
        <Nav numberOfItems={numberOfItems()} />
        <Route path="/" exact component={Home} />
        <Route path="/books" exact render={() => <Books books={books} />} />
        <Route
          path="/books/:id"
          exact
          render={() => (
            <BooksInfo books={books} addToCart={addToCart} cart={cart} />
          )}
        />
        <Route
          path="/cart"
          exact
          render={() => (
            <Cart
              removeBook={removeBook}
              books={books}
              cart={cart}
              changeQuantity={changeQuantity}
            />
          )}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;

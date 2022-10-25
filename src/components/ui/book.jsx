import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import Price from "./Price";

const Book = ({ book }) => {
  const [img, setImg] = useState();

  const mountedRef = useRef(true);
  // When we switch the routes, don't set image in unmounted component
  // When 'img' changes in useState, our whole comp. re-renders
  // unlike useState, when mountedRef changes, our whole comp. doesn't
  // re-render

  useEffect(() => {
    const image = new Image();
    image.src = book.url;
    image.onload = () => {
      if (mountedRef.current) {
        setTimeout(() => {
          setImg(image);
        }, 300);
        // executes only after HTML has loaded after 300ms
      }
    };
    return () => {
      mountedRef.current = false;
      // This is going to call when comp. unmounts
      // To set a variable such as useRef to 'false' or anything else
      // We have to use '.current'
    };
  });
  
  return (
    <div className="book">
      {img ? (
        <>
          <Link to={`/books/${book.id}`}>
            <figure className="book__img--wrapper">
              <img src={img.src} alt="" className="book__img" />
            </figure>
          </Link>
          <div className="book__title">
            <Link to={`/books/${book.id}`} className="book__title--link">
              {book.title}
            </Link>
          </div>
          <Rating rating={book.rating} />
          <Price
            salePrice={book.salePrice}
            originalPrice={book.originalPrice}
          />
        </>
      ) : (
        <>
          <div className="book__img--skeleton"></div>
          <div className="skeleton book__title--skeleton"></div>
          <div className="skeleton book__rating--skeleton"></div>
          <div className="skeleton book__price--skeleton"></div>
        </>
      )}
    </div>
  );
};

export default Book;

import React from "react";

const Price = ({ originalPrice, salePrice }) => {
  return (
    <div className="book__price">
      {salePrice ? (
        <div className="">
          <span className="book__price--normal">
            ${originalPrice.toFixed(2)}
          </span>
          ${salePrice.toFixed(2)}
        </div>
      ) : (
        <div className="">${originalPrice.toFixed(2)}</div>
      )}
    </div>
  );
};

export default Price;

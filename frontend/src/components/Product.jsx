import React from "react";
import { Link } from "react-router-dom";
import {FaHeart} from "react-icons/fa"
import { BsPlus, BsEyeFill } from "react-icons/bs";
import LaptopImg from "../assets/logom.webp"

const Product = ({ product }) => {

  // destructure product
  const { product_id, category_name, product_name, price } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            <img
              className="max-h-[160px] group-hover:scale-110 transition duration-300 -order-10"
              src={LaptopImg}
              alt="hell"
            />
          </div>
        </div>
        {/* buttons */}
        <div className="absolute top-6 -right-1 group-hover:right-5 p-2 flex opacity-0 flex-col justify-center items-center gap-y-2 group-hover:opacity-100 transition-all duration-300 w-0 group-hover:w-fit">
          <button>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${product_id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
          <button onClick={()=>console.log("Wishlisted")}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-red-500">
              <FaHeart className="text-2xl" />
            </div>
          </button>
        </div>
      </div>
      {/* category_id, product_name & price */}
      <div>
        <div className="tex-sm capitalize text-gray-500 mb-1">{category_name}</div>
        <Link to={`/product/${product_id}`}>
          <h2 className="font-semibold mb-1">{product_name}</h2>
        </Link>

        <h2 className="font-semibbold">₹ {price}</h2>
      </div>
    </div>
  );
};

export default Product;
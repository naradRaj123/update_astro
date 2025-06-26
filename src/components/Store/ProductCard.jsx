import { Link } from "react-router-dom";

const ProductCard = ({ id, image, title, price, oldPrice }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
      <h3 className="text-lg font-bold mt-2">{title}</h3>
      <p className="text-red-600 font-semibold">₹{price}</p>
      <p className="text-gray-500 line-through">₹{oldPrice}</p>

      {/* Navigate to detail page */}
      <Link to={`/product/${id}`}>
        <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-all">
          Book Now
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;

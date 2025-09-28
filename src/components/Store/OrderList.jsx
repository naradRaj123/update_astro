import { useEffect, useState } from "react";
import axios from "axios";

export default function RawOrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("https://astro-talk-backend.onrender.com/web/orderlist"); // replace with your API
        setOrders(data.data);
        console.log(data.data)
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();
  }, []);

  return (
    <ul className="max-w-2xl mx-auto p-4 space-y-2">
      {orders.map((order, index) => (
        <li
          key={order._id}
          className={`flex justify-between items-center p-3 rounded-lg shadow-md bg-white 
            transition transform duration-300 hover:scale-105 hover:shadow-xl`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          <div>
            <p className="font-semibold">{order.product_name || "Product Name"}</p>
            <p className="text-sm text-gray-600">User: {order.user_name}</p>
            <p className="text-sm text-gray-600">Amount: ₹{order.product_amount}</p>
          </div>
          <div>
            {order.paymentStatus === "Complete" ? (
              <span className="text-green-600 font-semibold animate-bounce">✔ Complete</span>
            ) : (
              <span className="text-yellow-500 font-semibold animate-pulse">⏳ Pending</span>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

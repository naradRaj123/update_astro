// pages/admin/Users.jsx
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { BadgeCheck, Info, Pencil, ShieldX, Square } from "lucide-react";
import { Link } from "react-router-dom";
import { FallingLines, RotatingLines } from "react-loader-spinner";



const ProductList = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/admin-login";
    };


    const [productlist, setProduct] = useState([]);
    const [staticPath, setPath] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchProduct = async () => {
        try {
            const res = await axios.get("https://astro-talk-backend.onrender.com/web/productlist");
            console.log(res.data.staticPath)
            setProduct(res.data.data || []);
            setPath(res.data.staticPath);
        } catch (error) {
            console.error("Error fetching product:", error);
            setProduct([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    // status change of users
    const [status, setStatus] = useState(false)
    const handleToggleStatusUsers = async (userId) => {

        setLoading(true);
        try {
            const response = await axios.post(`https://astro-talk-backend.onrender.com/admin/userupdate`);

            if (response.data.status) {
                setStatus(!status); // update UI
                fetchProduct();
            }
        } catch (err) {
            console.error("Error updating status:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Topbar userName="Admin" onLogout={handleLogout} />
                <div className="p-6">
                    <h1 className="text-xl font-semibold mb-4">Users</h1>
                    <table className="min-w-full bg-white shadow rounded-xl">
                        <thead>
                            <tr className="bg-red-100 text-gray-800">
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Image</th>
                                {/* <th className="px-4 py-2 text-left">Short Description</th>
                                <th className="px-4 py-2 text-left">Description</th> */}
                                <th className="px-4 py-2 text-left">Price</th>
                                <th className="px-4 py-2 text-left">Discount</th>
                                <th className="px-4 py-2 text-left">Status</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="px-4 py-4">
                                        <div className="flex justify-center items-center">
                                            <RotatingLines
                                                visible={true}
                                                height="30"
                                                width="30"
                                                color="grey"
                                                strokeWidth="5"
                                                animationDuration="0.75"
                                                ariaLabel="rotating-lines-loading"
                                                wrapperStyle={{}}
                                                wrapperClass=""
                                            />
                                        </div>
                                    </td>
                                </tr>

                            ) : productlist.length > 0 ? (
                                productlist.map((v) => (

                                    <tr key={v._id} className="border-b">
                                        <td className="px-4 py-2">{v.productName}</td>
                                        <td className="px-4 py-2">
                                            <img src={`${staticPath}/${v.productCoverImg}`} alt="Product" height={100} width={100} />
                                        </td>

                                        <td className="px-4 py-2">₹ {v.productPrice}</td>
                                        <td className="px-4 py-2">₹ {v.discount}</td>
                                        <td className="px-4 py-2 capitalize">
                                            {v.productStatus ? (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-green-600 "> Active</span>) : (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-red-600 "> Deactive</span>)}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button className="text-sm text-blue-600" onClick={() => {
                                                setSelectedProduct(v);
                                                setOpen(true);
                                            }} ><Info /></button>
                                            {/* <button className="ml-4 text-sm text-green-600">Approve</button> */}

                                            <Link to={`/admin/update/${v._id}`}>
                                                <button className={`ml-4 text-sm font-medium text-green-600 `}>  <Pencil /> </button>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center text-gray-600 px-4 py-4">
                                        No Product found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Product  Details</DialogTitle>
                            </DialogHeader>
                            {selectedProduct && (
                                <div className="space-y-2">
                                    <p>
                                        <img src={`${staticPath}/${selectedProduct.productCoverImg}`} height={80} width={80} alt="Product" />
                                    </p>
                                    <p><strong>Product Name:</strong> {selectedProduct.productName}</p>
                                    <p><strong>Short:</strong> {selectedProduct.productSortTitle}</p>
                                    <p><strong>Description:</strong> {selectedProduct.productDesc}</p>
                                    <p><strong>Price:</strong> ₹ {selectedProduct.productPrice}</p>
                                    <p><strong>Discount :</strong> ₹ {selectedProduct.discount}</p>
                                    <p>
                                        <strong>Product Status :</strong>
                                        {selectedProduct.productStatus ?
                                            (<span className="text-white px-2 py-1 text-[.6rem] bg-green-600 rounded-lg " > Active Product </span>)
                                            :
                                            (<span className="text-white px-3 py-1 bg-red-600 rounded-lg "> Deactive Product </span>)
                                        }
                                    </p>
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};

export default ProductList;

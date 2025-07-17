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



const PaymentRequestList = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/admin-login";
    };


    const [paymentlist, setPayment] = useState([]);
    const [staticPath, setPath] = useState('');
    const [loading, setLoading] = useState(true);

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchPaymentRequest = async () => {
        try {
            const res = await axios.get("http://localhost:8000/web/paymentRequest");
            console.log(res.data.data)
            setPayment(res.data.data || []);
            setPath(res.data.staticPath);
        } catch (error) {
            console.error("Error fetching product:", error);
            setPayment([]);
        } finally {
            setLoading(false);
        }
    };

    // get astrologerinfo of astrologer
    const getInfoAstrologerInfoById = async (astrologerId) => {
        console.log(astrologerId)
        try {
            const response = await fetch('http://localhost:8000/web/astro/astrolinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ astrologerId })
            });

            const result = await response.json();

            if (result.status) {
                console.log('Astrologer Info:', result.data);
                // You can set this to state if using React
                console.log(result.data)
                setSelectedProduct(result.data)

            } else {
                console.warn('Failed to fetch astrologer info:', result.message);
            }
        } catch (error) {
            console.error('Error fetching astrologer info:', error);
        }
    }

    console.log(selectedProduct)
    useEffect(() => {
        fetchPaymentRequest();
    }, []);


    // paynow
    const handlePayNow = async (v) => {
        console.log(v)

        try {
            // Step 1: Create Razorpay order
            const res = await axios.post(`http://localhost:8000/create-order`, {
                amount: v.requestAmount,
                astrologerId:v.astrologerId,
            });
            const { order } = res.data;

            // Step 2: Setup Razorpay options
            const options = {
                key: 'rzp_test_6m5EFshHcmM2o1', // use from .env
                amount: 1000,
                currency: 'INR',
                name: "Your Brand",
                description: "Astrologer Payment",
                // order_id: order.id,
                handler: async function (response) {
                    // Step 3: Verify payment
                    const verifyRes = await axios.post(`${import.meta.env.VITE_BASE_URL}/verify-payment`, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        astrologerId: v.astrologerId,
                        requestAmount: v.requestAmount,
                    });

                    if (verifyRes.data.success) {
                        alert("Payment Successful!");
                        // Optional: reload or update status
                    } else {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: "Narad Bhardwaj",
                    email: "narad@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment Error:", error);
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
                                <th className="px-4 py-2 text-left">Astrologer</th>
                                <th className="px-4 py-2 text-left">Amount</th>
                                <th className="px-4 py-2 text-left">Transaction Id</th>
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

                            ) : paymentlist.length > 0 ? (
                                paymentlist.map((v) => (

                                    <tr key={v._id} className="border-b">
                                        <td className="px-4 py-2">{v.astrologerId}</td>
                                        <td className="px-4 py-2">₹ {v.requestAmount}</td>
                                        <td className="px-4 py-2"> {v.transactionId}</td>
                                        <td className="px-4 py-2 capitalize">
                                            {v.paymentStatus ? (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-green-600 "> Active</span>) : (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-red-600 "> Deactive</span>)}
                                        </td>
                                        <td className="px-4 py-2">
                                            <button className="text-sm text-blue-600" onClick={() => {
                                                setOpen(true);
                                                getInfoAstrologerInfoById(v.astrologerId);
                                            }} ><Info /></button>
                                            {/* <button className="ml-4 text-sm text-green-600">Approve</button> */}

                                            <button className={`ml-4 bg-purple-500 p-2 text-white rounded-md text-sm font-medium  `} onClick={() => handlePayNow(v)} > PayNow </button>
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

                                    <p><strong>Astrologer Name:</strong> {selectedProduct.astroName}</p>
                                    <p><strong>Avilable Amount :</strong> {selectedProduct.wallet}</p>
                                    {/* <p>
                                        <strong>Product Status :</strong>
                                        {selectedProduct.productStatus ?
                                            (<span className="text-white px-2 py-1 text-[.6rem] bg-green-600 rounded-lg " > Active Product </span>)
                                            :
                                            (<span className="text-white px-3 py-1 bg-red-600 rounded-lg "> Deactive Product </span>)
                                        }
                                    </p> */}
                                </div>
                            )}
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
};

export default PaymentRequestList;

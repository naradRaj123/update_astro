import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import axios from "axios";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Info } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";

const PaymentRequestList = () => {
    const handleLogout = () => {
        localStorage.clear();
        window.location.href = "/admin-login";
    };

    const [paymentlist, setPayment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [open, setOpen] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const totalPages = Math.ceil(paymentlist.length / rowsPerPage);
    const paginatedData = paymentlist.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    const fetchPaymentRequest = async () => {
        try {
            const res = await axios.get("http://localhost:8000/web/paymentRequest");
            setPayment(res.data.data || []);
        } catch (error) {
            console.error("Error fetching product:", error);
            setPayment([]);
        } finally {
            setLoading(false);
        }
    };

    const getInfoAstrologerInfoById = async (astrologerId) => {
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
                setSelectedProduct(result.data);
            } else {
                console.warn('Failed to fetch astrologer info:', result.message);
            }
        } catch (error) {
            console.error('Error fetching astrologer info:', error);
        }
    };

    const handlePayNow = async (v) => {
        try {
            const res = await axios.post(`http://localhost:8000/create-order`, {
                amount: v.requestAmount,
                astrologerId: v.astrologerId,
            });

            const { order } = res.data;

            const options = {
                key: 'rzp_test_6m5EFshHcmM2o1',
                amount: 1000,
                currency: 'INR',
                name: "Astrotruth",
                description: "Astrologer Payment",
                handler: async function (response) {
                    const verifyRes = await axios.post(`${import.meta.env.VITE_BASE_URL}/verify-payment`, {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        astrologerId: v.astrologerId,
                        requestAmount: v.requestAmount,
                    });

                    if (verifyRes.data.success) {
                        alert("Payment Successful!");
                        fetchPaymentRequest(); // refresh list
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
    };

    useEffect(() => {
        fetchPaymentRequest();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1">
                <Topbar userName="Admin" onLogout={handleLogout} />
                <div className="p-6">
                    <h1 className="text-xl font-semibold mb-4">Payment Requests</h1>

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
                                    <td colSpan="5" className="px-4 py-4 text-center">
                                        <RotatingLines
                                            visible={true}
                                            height="30"
                                            width="30"
                                            color="grey"
                                            strokeWidth="5"
                                            animationDuration="0.75"
                                            ariaLabel="rotating-lines-loading"
                                        />
                                    </td>
                                </tr>
                            ) : paginatedData.length > 0 ? (
                                paginatedData.map((v) => (
                                    <tr key={v._id} className="border-b">
                                        <td className="px-4 py-2">{v.astrologerId}</td>
                                        <td className="px-4 py-2">₹ {v.requestAmount}</td>
                                        <td className="px-4 py-2">{v.transactionId}</td>
                                        <td className="px-4 py-2 capitalize">
                                            {v.paymentStatus ? (
                                                <span className="p-1 px-2 text-white rounded-md text-xs font-bold bg-green-600">
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="p-1 px-2 text-white rounded-md text-xs font-bold bg-red-600">
                                                    Deactive
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-4 py-2 space-x-2">
                                            <button
                                                className="text-sm text-blue-600"
                                                onClick={() => {
                                                    setOpen(true);
                                                    getInfoAstrologerInfoById(v.astrologerId);
                                                }}
                                            >
                                                <Info />
                                            </button>
                                            <button
                                                className="bg-purple-500 p-2 text-white rounded-md text-sm font-medium"
                                                onClick={() => handlePayNow(v)}
                                            >
                                                PayNow
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="text-center text-gray-600 px-4 py-4">
                                        No Payment Requests found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* Pagination Controls */}
                    <div className="flex justify-between items-center mt-4 px-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentPage === 1}
                            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Prev
                        </button>
                        <span className="text-sm text-gray-700">
                            Page {currentPage} of {totalPages}
                        </span>
                        <button
                            onClick={handleNext}
                            disabled={currentPage === totalPages}
                            className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>

                    {/* Astrologer Info Dialog */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogContent className="max-w-md">
                            <DialogHeader>
                                <DialogTitle>Astrologer Details</DialogTitle>
                            </DialogHeader>
                            {selectedProduct && (
                                <div className="space-y-2">
                                    <p><strong>Astrologer Name:</strong> {selectedProduct.astroName}</p>
                                    <p><strong>Available Amount:</strong> ₹ {selectedProduct.wallet}</p>
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

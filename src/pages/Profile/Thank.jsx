import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Bell, LogOut, ArrowLeft, CheckCircle } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";

const ThankYouPage = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const navigate = useNavigate();
    const { id: paymentId } = useParams();

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) navigate("/user-login");
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        navigate("/user-login");
    };

    const [loading, setLoading] = useState(false);
    const [verified, setVerified] = useState(false);
    // verify recharge
    useEffect(() => {
        if (!paymentId) return;
        const verifyPayment = async () => {
            setLoading(true);            
            try {
                const { data } = await axios.get(
                    `https://astro-talk-backend.onrender.com/web/user/verifyrecharge/${paymentId}`
                );
                console.log(data.data)

                if (data?.status === true) {
                    setVerified(true); // success case
                    localStorage.setItem("user", JSON.stringify(data.data));
                } else {
                    setVerified(false); // fail case
                }
            } catch (err) {
                setVerified(false);
            } finally {
                setLoading(false);
            }
        };

        verifyPayment();
    }, [paymentId])
    return (
        <div className="min-h-screen bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 p-4 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center md:text-left">
                    Welcome, {user?.user_name || "User"}!
                </h1>
                <div className="flex flex-wrap gap-2 justify-center md:justify-end">
                    <Button
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        onClick={() => navigate("/user-update")}
                    >
                        <Settings className="mr-2 h-4 w-4" />
                        Account Settings
                    </Button>

                    <Button
                        variant="outline"
                        className="border-gray-400 text-gray-600 hover:bg-gray-200"
                        onClick={() => navigate("/user-dashboard")}
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>

                    <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-100">
                        <Bell className="h-6 w-6" />
                    </Button>

                    <Button variant="destructive" size="lg" onClick={handleLogout}>
                        <LogOut className="mr-2 h-5 w-5" />
                        Logout
                    </Button>
                </div>
            </div>

            <div className="flex justify-center">
                <Card className="w-full max-w-2xl shadow-xl rounded-xl">
                    <CardHeader className="text-center">
                        <CardTitle className="text-3xl font-bold text-gray-800">
                            Thank You !
                        </CardTitle>

                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col items-center mb-6">
                            <div className="w-28 h-28 rounded-full bg-green-700 flex items-center justify-center text-white text-3xl font-bold shadow-md">
                                <CheckCircle />
                            </div>
                        </div>

                        <div className="flex justify-center items-center w-full  text-gray-800 text-sm">

                            {loading && <p>⏳ Verifying payment...</p>}


                            {!loading && verified && (

                                <Link to={'/user-profile'} >
                                    <Button
                                        className="  cursor-pointer text-white bg-green-600 hover:bg-green-700 mt-4"
                                    >
                                        <strong>Go to Profile</strong>
                                    </Button>
                                </Link>
                            )}

                            {!loading && !verified && (
                                <p className="text-red-500 mt-4">❌ Payment verification failed</p>
                            )}

                        </div>
                    </CardContent>
                </Card>
            </div>


        </div>
    );
};

export default ThankYouPage;

// pages/admin/Astrologers.jsx
import Sidebar from "@/components/Sidebar";
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
import { BadgeCheck, Info, ShieldX } from "lucide-react";
import { FallingLines, RotatingLines } from "react-loader-spinner";

const Karmkandy = () => {
    const [astrologerlist, setAstrologers] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedAstrologer, setSelectedAstrologer] = useState(null);
    const [open, setOpen] = useState(false);

    const fetchAstrologers = async () => {
        try {
            const res = await axios.get("https://astro-talk-backend.onrender.com/web/astro/astrolist");
            // console.log(res.data.data)
            setAstrologers(res.data.data || []);
        } catch (error) {
            console.error("Error fetching astrologers:", error);
            setAstrologers([]);
        } finally {
            setLoading(false);
        }
    };

    // status change
    // status change 
    const [status, setStatus] = useState(false);
    const handleToggleStatus = async (astroId) => {
        // console.log(astroId)
        setLoading(true);
        try {
            const response = await axios.post("https://astro-talk-backend.onrender.com/admin/astroUpdate", {
                astroId: astroId,
                status: !status, // toggle
            });

            if (response.data.status) {
                setStatus(!status); // update UI
                fetchAstrologers();
            }
        } catch (err) {
            console.error("Error updating status:", err);
        } finally {
            setLoading(false);
        }
    };



    useEffect(() => {
        fetchAstrologers();
    }, []);

    return (
        <div className="flex">
            <Sidebar />
            <div className="flex-1 p-8">
                <h1 className="text-xl font-semibold mb-4">Astrologers</h1>

                <table className="min-w-full bg-white shadow rounded-xl">
                    <thead>
                        <tr className="bg-red-100 text-gray-800">
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-left">Email</th>
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
                        ) : astrologerlist.length > 0 ? (
                            astrologerlist.filter((v) => v.role === "Karmkandi" || v.role === "both").map((v) => (
                                <tr key={v._id} className="border-b">
                                    <td className="px-4 py-2">{v.astroName}</td>
                                    <td className="px-4 py-2">{v.email}</td>
                                    <td className="px-4 py-2 capitalize">
                                        {v.status ? (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-green-600 "> Verified</span>) : (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-red-600 "> Pending</span>)}
                                    </td>
                                    <td className="px-4 py-2">
                                        <button className="text-sm text-black-600" onClick={() => {
                                            setSelectedAstrologer(v);
                                            setOpen(true);
                                        }} ><Info /></button>
                                        <button className={`ml-4 text-sm font-medium ${v.status ? "text-red-600" : "text-green-600"
                                            }`}
                                            onClick={() => handleToggleStatus(v._id)}
                                            disabled={loading}>
                                            {loading ? "Please wait..." : v.status ? (<ShieldX />) : (<BadgeCheck />)}
                                        </button>
                                        {/* <button className="ml-4 text-sm text-green-600">Approve</button> */}
                                        <button className="ml-4 text-sm text-red-600">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center text-gray-600 px-4 py-4">
                                    No karamkandi found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Astrologer Details</DialogTitle>
                        </DialogHeader>
                        {selectedAstrologer && (
                            <div className="space-y-2">
                                <p><strong>Name:</strong> {selectedAstrologer.astroName}</p>
                                <p><strong>Email:</strong> {selectedAstrologer.email}</p>
                                <p><strong>Mobile:</strong> {selectedAstrologer.mobile}</p>
                                <p><strong>Status:</strong> {selectedAstrologer.status}</p>
                                <p><strong>Experience:</strong> {selectedAstrologer.experience} years</p>
                                <p><strong>City:</strong> {selectedAstrologer.city}</p>
                                <p><strong>Language:</strong> {selectedAstrologer.language}</p>
                                <p><strong>Expertise:</strong> {selectedAstrologer.expertise}</p>
                                <p><strong>Charge per Session:</strong> ₹{selectedAstrologer.chargePerSession}</p>
                                <p><strong>Account Status:</strong> {selectedAstrologer.chargePerSession}</p>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>


            </div>
        </div>
    );
};

export default Karmkandy;

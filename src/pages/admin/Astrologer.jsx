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
import * as Select from '@radix-ui/react-select';
import { BadgeCheck, Info, PlusCircle, ShieldX, Trash } from "lucide-react";
import { RotatingLines } from "react-loader-spinner";

const Astrologer = () => {
  const [astrologerlist, setAstrologers] = useState([]);
  const [loading, setLoading] = useState(true);

  // const baseUrl=import.meta.env.VITE_BASE_URL;
  const baseUrlLocal='https://astro-talk-backend.onrender.com';
  // console.log(baseUrl);

  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [open, setOpen] = useState(false);

  const fetchAstrologers = async () => {
    try {
      const res = await axios.get(`${baseUrlLocal}/web/astro/astrolist`);
      setAstrologers(res.data.data || []);
    } catch (error) {
      console.error("Error fetching astrologers:", error);
      setAstrologers([]);
    } finally {
      setLoading(false);
    }
  };


  // status change 
  const [status, setStatus] = useState(false);
  const handleToggleStatus = async (astroId) => {
    console.log(astroId)
    setLoading(true);
    try {
      const response = await axios.post(`${baseUrlLocal}/admin/astroUpdate`, {
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

  // set charge modal (charge perSession)
  const [chargeModalOpen, setChargeModalOpen] = useState(false);
  const [chargeValue, setChargeValue] = useState(10);
  const [astroId, setAstroId] = useState();
  const [accountType, setAccountType] = useState(null);

  const handleChargeSession = async (sessionCharege, astrologerId, accountType) => {
    // console.log(accountType);
    setChargeModalOpen(true)
    setAstroId(astrologerId)
    setChargeValue(sessionCharege)
    setAccountType(accountType)
  }

  const handleChargeSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post(`${baseUrlLocal}/admin/astroChargeUpdate`, {
        astroId: astroId,
        sessionCharge: chargeValue,
        accountType: accountType
      });

      if (res.data.status) {
        setChargeModalOpen(false);
        fetchAstrologers();
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  console.log(accountType)
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
              astrologerlist.filter((v) => v.role === "astrologer").map((v) => (

                <tr key={v._id} className="border-b">
                  {console.log(v.status, v.astroName)}
                  <td className="px-4 py-2">{v.astroName}</td>
                  <td className="px-4 py-2">{v.email}{ }</td>
                  <td className="px-4 py-2 capitalize">
                    {v.status ? (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-green-600 "> Verified</span>) : (<span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-red-600 "> Pending</span>)}
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-sm text-green-600" onClick={() => {
                      setSelectedAstrologer(v);
                      setOpen(true);
                    }} ><Info /></button>
                    <button className={`ml-4 text-sm font-medium ${v.status ? "text-red-600" : "text-green-600"
                      }`}
                      onClick={() => handleToggleStatus(v._id)}
                      disabled={loading}>
                      {loading ? "Please wait..." : v.status ? (<ShieldX />) : (<BadgeCheck />)}
                    </button>
                    <button className="ml-4 text-sm text-red-600" onClick={() => alert("Working Pending.....")} ><Trash /></button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-gray-600 px-4 py-4">
                  No astrologers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* show details of select astrologer */}
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
                <p><strong>Account Type:</strong> <span className="bg-red-500/20 backdrop-blur-md p-1 px-2 shadow-md border border-white/30 font-bold text-[.6rem] rounded-md " > {selectedAstrologer.accountType} </span> </p>
                <p><strong >Charge per Session:</strong> ₹
                  <span className="  cursor-pointer" onClick={() => handleChargeSession(selectedAstrologer.chargePerSession, selectedAstrologer._id, selectedAstrologer.accountType)}> {selectedAstrologer.chargePerSession}

                  </span></p>
                <p>
                  <strong>Account Status :</strong>
                  {selectedAstrologer.status ?
                    (<span className="text-white px-2 py-1 text-[.6rem] bg-green-600 rounded-lg " > Verified Astrologer </span>)
                    :
                    (<span className="text-white px-3 py-1 bg-red-600 rounded-lg "> Awaiting Verification </span>)
                  }
                </p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* charges per min modal */}
        <Dialog open={chargeModalOpen} onOpenChange={setChargeModalOpen}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Set Charge per Session</DialogTitle>
            </DialogHeader>
            <form action="" onSubmit={handleChargeSubmit}>
              <div className="space-y-3">
                <label htmlFor="charge" className="block text-sm font-medium text-gray-700">New Charge (₹)</label>
                <input
                  type="number"
                  id="charge"
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Enter new charge"
                  value={chargeValue}
                  onChange={(e) => setChargeValue(e.target.value)}
                />
              </div>
              <div className="space-y-1 mt-4 mb-3 cursor-pointer ">
                <label htmlFor="accountType" className="block text-sm font-medium text-gray-700">Account Type</label>
                <select name="accountType" value={accountType} onChange={(e) => setAccountType(e.target.value)} id="" className="w-full border cursor-pointer px-3 py-2 rounded-md bg-white text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-green-500 ">
                  <option value="Normal">Normal</option>
                  <option value="Premium">Premium</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-md"

              >
                Save
              </button>

            </form>
          </DialogContent>
        </Dialog>



      </div>
    </div>
  );
};

export default Astrologer;

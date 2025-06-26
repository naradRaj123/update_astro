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
import { BadgeCheck, Info, ShieldX } from "lucide-react";



const Users = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/admin-login";
  };


   const [userlist, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUsers, setSelectedUsers] = useState(null);
const [open, setOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://astro-talk-backend.onrender.com/web/user/userlist");
      console.log(res.data.data)
      setUser(res.data.data || []);
    } catch (error) {
      console.error("Error fetching astrologers:", error);
      setUser([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // status change of users
  const [status, setStatus] = useState(false)
  const handleToggleStatusUsers= async (userId)=>{
    
    setLoading(true);
    try {
      const response = await axios.post("https://astro-talk-backend.onrender.com/admin/userupdate", {
        userId: userId,
        status: !status, // toggle
      });

      if (response.data.status) {
        setStatus(!status); // update UI
        fetchUsers();
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
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
              <tr>
                <td colSpan="4" className="text-center px-4 py-4">
                  Loading...
                </td>
              </tr>
            ) : userlist.length > 0 ? (
              userlist.map((v) => (
                
                <tr key={v._id} className="border-b">
                  <td className="px-4 py-2">{v.user_name}</td>
                  <td className="px-4 py-2">{v.email}</td>
                  <td className="px-4 py-2 capitalize">
                    {v.status ? ( <span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-green-600 "> Verified</span>) : ( <span className="p-1 px-2 text-white rounded-md text-[.6rem] font-bold bg-red-600 "> Pending</span>)}
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-sm text-blue-600" onClick={() => {
                  setSelectedUsers(v);
                  setOpen(true);
                  }} ><Info/></button>
                    {/* <button className="ml-4 text-sm text-green-600">Approve</button> */}
                    <button className={`ml-4 text-sm font-medium ${v.status ? "text-red-600" : "text-green-600"
                      }`}
                      onClick={()=>handleToggleStatusUsers(v._id)}
                      >{loading ? "Please wait..." : v.status ? (<ShieldX />) : (<BadgeCheck/> )}</button>
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
           <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Users  Details</DialogTitle>
              </DialogHeader>
              {selectedUsers && (
                <div className="space-y-2">
                  <p><strong>Name:</strong> {selectedUsers.user_name}</p>
                  <p><strong>Email:</strong> {selectedUsers.email}</p>                  
                </div>
              )}
            </DialogContent>
          </Dialog>
          
        </div>
      </div>
    </div>
  );
};

export default Users;

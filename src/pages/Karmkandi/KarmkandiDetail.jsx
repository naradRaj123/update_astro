import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const KarmkandiDetail = () => {
  const { id } = useParams();
  const [astrologer, setAstrologer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAstrologerDetails = async () => {
      try {
        const res = await axios.get("https://astro-talk-backend.onrender.com/web/astro/astrolist");
        const list = res.data?.data || [];

        const foundAstrologer = list.find((astro) => astro._id === id);
        setAstrologer(foundAstrologer || null);
      } catch (error) {
        console.error("Error fetching astrologer list:", error);
        setAstrologer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAstrologerDetails();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium text-gray-700">
        Loading astrologer details...
      </div>
    );
  }

  if (!astrologer) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Astrologer not found.
      </div>
    );
  }

  // Construct image URL if exists
  // const imageUrl = astrologer.image
  //   ? `https://astro-talk-backend.onrender.com/${astrologer.image.replace(/^\/?/, "")}`
  //   : "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <section className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg mt-10">
      <img
        // src={imageUrl}
        // onError={(e) => {
        //   e.target.onerror = null;
        //   e.target.src = "https://via.placeholder.com/600x400?text=Image+Not+Found";
        // }}
        alt={astrologer.astroName || "Astrologer"}
        className="w-full h-64 object-cover rounded-md mb-4"
      />

      <h2 className="text-2xl font-bold mb-2">{astrologer.astroName}</h2>
      <p className="text-gray-600 mb-1"><strong>Specialty:</strong> {astrologer.specialty || "N/A"}</p>
      <p className="text-gray-600 mb-1"><strong>Experience:</strong> {astrologer.experience || "N/A"}</p>
      <p className="text-gray-600 mb-1"><strong>Languages:</strong> {astrologer.langauge || "N/A"}</p>
      <p className="text-gray-600 mb-1">
        <strong>Expertise:</strong>{" "}
        {Array.isArray(astrologer.expertise)
          ? astrologer.expertise.join(", ")
          : astrologer.expertise || "N/A"}
      </p>
      <p className="text-gray-600 mt-4"><strong>Short Bio:</strong> {astrologer.shortBio || "N/A"}</p>
    </section>
  );
};

export default KarmkandiDetail;

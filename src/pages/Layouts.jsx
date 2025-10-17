import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Layouts = ({ children }) => {
  const location = useLocation();

  // Paths where header/footer should be hidden
  const hideHeaderFooterPaths = ["/admin"];

  // Hide if the current pathname starts with any of the specified paths
  const hideHeaderFooter = hideHeaderFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideHeaderFooter && <Navbar />}
      <div className={`${!hideHeaderFooter ? "mt-[6rem] mb-12" : "mt-0 mb-0"}`}
      >{children}</div>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layouts;

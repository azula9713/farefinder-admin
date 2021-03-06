import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./css/style.scss";

import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import PopularLocations from "./pages/PopularLocations";
import PopularLocation from "./pages/PopularLocation";
import HotelScripts from "./pages/HotelScripts";

function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route exact path="/popular-locations" element={<PopularLocations />} />
        <Route
          path="/popular-locations/:locationId"
          element={<PopularLocation />}
        />
        <Route exact path="/hotelscripts" element={<HotelScripts />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </>
  );
}

export default App;

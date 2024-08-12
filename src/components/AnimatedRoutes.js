import { AnimatePresence, motion } from "framer-motion";
import { Routes, Route, useLocation } from "react-router-dom";
import NewAdvert from "../pages/NewAdvert";
import AdvertListings from "../pages/AdvertListings";

import JobRequirements from "../pages/JobRequirements";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import PreviewAdvert from "../pages/PreviewAdvert";
import ApplicantDetails from "../pages/ApplicantDetails";
import UploadDocuments from "../pages/UploadDocuments";
import Layout from "../hocs/Layout";
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Layout>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/new-advert" element={<NewAdvert />} />
          <Route path="/adverts/:id/preview" element={<PreviewAdvert />} />
          <Route path="/adverts-list" element={<AdvertListings />} />
          <Route
            path="/adverts/:id/requirements"
            element={<JobRequirements />}
          />
          <Route path="/applicant-details" element={<ApplicantDetails />} />
          <Route path="/applicant-uploads" element={<UploadDocuments />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;

import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";

import "./Layout.css";

import {
  fetchApplications,
  fetchContactTypes,
} from "../features/applications/applicationsSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdverts } from "../features/adverts/advertsSlice";
import { userVerification } from "../features/users/usersSlice";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdverts());
    dispatch(fetchApplications());
    dispatch(fetchContactTypes());
    dispatch(userVerification());
  }, [dispatch]);
  const isAuthenticated = useSelector((state) => state.users.isAuthenticated);
  return (
    <>
      <Navbar />

      <div className="container-fluid">
        <div className="row">
          {isAuthenticated ? (
            <>
              <div className="col-lg-3 custom-col">
                <Sidebar />
              </div>
              <div className="col-lg-9">{children}</div>
            </>
          ) : (
            <div className="col-lg-12">{children}</div>
          )}
        </div>
      </div>

      {/* <Footer className="footer"/> */}
    </>
  );
};

export default Layout;

import React, { useEffect } from "react";
import Topbar from "../components/Topbar";
import { useDispatch } from "react-redux";
import { userVerification } from "../features/users/usersSlice";

const Layout = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userVerification());
  }, dispatch);
  return (
    <div>
      <Topbar />
      {props.children}
    </div>
  );
};

export default Layout;

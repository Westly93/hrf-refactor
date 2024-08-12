import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, redirect } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.users);

  console.log(user);
  console.log(isAuthenticated);

  if (!isAuthenticated) {
    navigate("/login");
  }
  //   else {
  //     let isAdmin = false;
  //     for (const role of user.user.roles) {
  //       if (role.name === "admin") {
  //         isAdmin = true;
  //         if (isAdmin) navigate("/adverts-list");
  //       }
  //     }

  //     navigate("/applicant-adverts-list");
  //   }

  return (
    <>
      {isAuthenticated && (
        <div>
          <Home />
        </div>
      )}
      {!isAuthenticated && (
        <div>
          {" "}
          <Login />{" "}
        </div>
      )}
    </>
  );
}

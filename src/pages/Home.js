import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Person, Assignment, Chat } from "@mui/icons-material";
import { fetchAdverts } from "../apis/AdvertsFunction";

import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchInterviewCandidates } from "../features/interviews/interviewSlice";

export default function Home() {
  const navigate = useNavigate();
  const [advertCount, setAdvertCount] = useState(0);
  const [interview, setInterviewCount] = useState(0);

  // const { isAuthenticated, loginStatus, user, loginError } = useSelector(
  //   (state) => state.users
  // );

  const { status, user, isAuthenticated } = useSelector((state) => state.users);
  // Fetch the interview candidates from the Redux store
  const interviewCandidates = useSelector(fetchInterviewCandidates);
  // Calculate the total number of interview candidates
  const totalInterviewCandidates = interviewCandidates.total;

  // console.log("number:", totalInterviewCandidates);

  useEffect(() => {
    fetchAdverts()
      .then((data) => {
        setAdvertCount(data.total);
      })
      .catch((error) => console.error("Error fetching adverts:", error));

      if (isAuthenticated) {
        if (user?.roles.some((role) => role.name === "admin")) {
          navigate("/adverts-list");
        } else if (user?.roles.some((role) => role.name === "user")) {
          navigate("/applicant-adverts-list");
        } else {
          navigate("/login");
        }
      }

    if (!isAuthenticated) {
      return navigate("/vacancies");
    }


    // useEffect(() => {
    //   //disptch(userVerification());
     
    // }, [isAuthenticated, navigate, user?.roles]);


    //interviews
    // fetchInterviewCandidates()
    // .then((candidates) => {
    //   console.log('Interviews:', candidates);
    //   console.log('Total number of interviews:', candidates.total);
    //   setAdvertCount(candidates.total);
    // })
    // .catch((error) => console.error('Error fetching interviews:', error));
  }, [isAuthenticated]);

  // console.log("Total number of adverts:", advertCount);

  // Show loading message while waiting for data to be fetched
  if (advertCount === null) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      {status === "loading" ? (
        <div class="spinner-border text-info" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="container mt-4">
          <h1 className="mb-4">Dashboard</h1>
          <div className="row">
            <div className="col-md-4">
              <Card className="border-success shadow h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="me-3">
                    <Person
                      fontSize="large"
                      style={{
                        backgroundColor: "#28a745",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div>
                    <h5 className="card-title">Applicants</h5>
                    {/* <p className="card-text">100</p> */}
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Card className="border-primary shadow h-100">
                <Card.Body className="d-flex align-items-center">
                  <div className="me-3">
                    <Assignment
                      fontSize="large"
                      style={{
                        backgroundColor: "#007bff",
                        color: "#fff",
                        padding: "10px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div>
                    <h5 className="card-title">Adverts</h5>
                    <h2 className="card-text">
                      <b>{advertCount}</b>
                    </h2>
                  </div>
                </Card.Body>
              </Card>
            </div>
            <div className="col-md-4">
              <Link to="/interview-candidates/">
                <Card className="border-warning shadow h-100">
                  <Card.Body className="d-flex align-items-center">
                    <div className="me-3">
                      <Chat
                        fontSize="large"
                        style={{
                          backgroundColor: "#ff9800",
                          color: "#fff",
                          padding: "10px",
                          borderRadius: "50%",
                        }}
                      />
                    </div>
                    <div>
                      <h5 className="card-title">Interviews</h5>
                      {/* <p className="card-text">25</p> */}
                      <h2 className="card-text">
                        <b>{totalInterviewCandidates}</b>
                      </h2>
                    </div>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

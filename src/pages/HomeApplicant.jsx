import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Person, Assignment, Chat } from '@mui/icons-material';
import { fetchAdverts } from '../apis/AdvertsFunction';
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";
import {fetchApplications, 
  fetchApplicationScores, 
  applicationScores, 
} from "../features/applications/applicationsSlice";


export default function Home() {
  const [advertCount, setAdvertCount] = useState(0);
  const [appscoresCount, setappScoresCount] = useState(0)

const Home = () => {
  const variants = {
    enter: { x: "-100%", opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: "100%", opacity: 0 },
  };
  return (
    <motion.div
      initial="enter"
      animate="center"
      exit="exit"
      variants={variants}
      transition={{ duration: 1 }}
    >
      Welcome to the Hr System
    </motion.div>
  );
};

useEffect(() => {
  fetchAdverts()
    .then((data) => {
      console.log('Data:', data);
      console.log('Total number of adverts:', data.total);
      setAdvertCount(data.total);
    })
    .catch((error) => console.error('Error fetching adverts:', error));
}, []);

  console.log('Total number of adverts:', advertCount);

  // Show loading message while waiting for data to be fetched
  if (advertCount === null) {
    return <div><LoadingSpinner /></div>;
  }
  return (

    <div className="container mt-4">
      <h1 className="mb-4">Dashboard</h1>
      <div className="row">
        <div className="col-md-4">
          <Card className="border-success shadow h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <Person
                  fontSize="large"
                  style={{ backgroundColor: '#28a745', color: '#fff', padding: '10px', borderRadius: '50%' }}
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
                  style={{ backgroundColor: '#007bff', color: '#fff', padding: '10px', borderRadius: '50%' }}
                />
              </div>
              <div>
                <h5 className="card-title">Published Jobs</h5>
                <h2 className="card-text"><b>{advertCount}</b></h2>
              </div>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-4">
          <Card className="border-warning shadow h-100">
            <Card.Body className="d-flex align-items-center">
              <div className="me-3">
                <Chat
                  fontSize="large"
                  style={{ backgroundColor: '#ff9800', color: '#fff', padding: '10px', borderRadius: '50%' }}
                />
              </div>
              <div>
                <h5 className="card-title">Interviews</h5>
                {/* <p className="card-text">25</p> */}
                <h2 className="card-text"><b>0</b></h2>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    );
}

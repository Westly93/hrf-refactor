import { useSelector, useDispatch } from "react-redux";
import PageTitle from "../components/PageTitle";
import {fetchApplicationRequirementScores} from "../features/applications/applicationScores";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import CandidateSelectionMatrix from "../components/CandidateSelectionMatrix";
import { singleAdvert } from "../apis/AdvertsFunction";
import LoadingSpinner from "../components/LoadingSpinner";
import { fetchAdvertApplicationScores, fetchReqScores} from "../features/applications/applicationsSlice";
import { fetchAdvert } from "../features/adverts/advertsSlice";
import { useReactToPrint } from "react-to-print";




const MatrixScores = () =>{
//this is advert id
const { id } = useParams();
const dispatch= useDispatch();
const componentRef = useRef();

//applicants
const { reqScores, applicationadvertScores } = useSelector((state) => state.applications);

const { isLoading, isError, error, data: advert } = useQuery({
  queryKey: ["advert", id],
  queryFn: () => singleAdvert(parseInt(id)),
});

//handle to print
const handlePrint = useReactToPrint({
  content: () => componentRef.current,
  pageStyle: '@page { size: landscape; }'
});
//end print

useEffect(() =>{
  dispatch(fetchAdvertApplicationScores(id))
  dispatch(fetchReqScores())
  // dispatch(fetchAdvert(id))

}, [applicationadvertScores, reqScores]);


if (isLoading) {
  <div className="loading-spinner">
  <LoadingSpinner />
</div>
}

if(!reqScores){
  <div className="loading-spinner">
  <LoadingSpinner />
</div>
}

if (isError) {
  return <p className="alert alert-danger">Network Error</p>;
}


// Filter the scores by the advert id and remove duplicates
const filteredScores = applicationadvertScores
?.filter(score => score.advert_id === parseInt(id))
.reduce((acc, current) => {
  const x = acc.find(item => item.applicant_id === current.applicant_id);
  if (!x) {
    return acc.concat([current]);
  } else {
    return acc;
  }
}, []);

    return(

      <div style={{ margin: '20px' }}>
      <h4>Candidate Selection Matrix</h4>

      <button className="btn btn-success my-3" onClick={handlePrint}>
        Print Matrix Scores
      </button>

      <div ref={componentRef}>
        <CandidateSelectionMatrix candidates={filteredScores} applicationScores={reqScores} advert={advert}/>
      </div>
  
    </div>
      
    )
}

export default MatrixScores;
import React from "react";


const CandidateSelectionMatrix = ({advert, candidates, applicationScores}) => {

  // if(candidates == null || 'undefined') {
  //   return(
  //     <div>
  //       <p className="alert alert-success">No data available...</p>
  //     </div>
  //   )
  // }


    return (
        <>
         <table className="table table-bordered">
                <thead class="thead-dark">
                <tr>
                    <th colSpan="10">Position Title: {advert?.title}</th>
                   
                </tr>
            
                <th colSpan="10">Date: From {advert?.created_at ? new Date(advert?.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}</th>
                <tr>
                    <th>Candidate Name</th>
                    {advert?.advert_requirements?.map((requirement, index) => (
                        <th key={index}>
                        <div className="">{requirement.requirement?.description}</div>
                        </th>
                    ))}
                    <th>Total</th>
                    <th>Comments</th>
                </tr>
                </thead>
                <tbody>

                {candidates?.map((candidate, index) => {

                        const applicationScore = applicationScores?.filter(score => score.application_id === candidate.application_id);
                    
                        const requirementScores = advert?.advert_requirements.map(req => {

                            const score = applicationScore?.find(s => s.requirement_id === req.requirement_id);
                        
                            return score ? score.score : '';
                        });

                        const scoresWithNumbers = requirementScores?.filter((score) => score !== ''); // Filter out empty strings
                        const totalScore = scoresWithNumbers?.reduce((sum, score) => sum + parseInt(score, 10), 0);


                        {requirementScores?.length === 0  && (
                            <p>loading...</p>
                          )}
                        return (
                            <tr key={index}>
                                <td>{candidate.firstnames}{" "}{candidate.surname}</td>
                                {requirementScores?.map((score, i) => (
                                    <td key={i}>{score}</td>
                                ))}
                                <td>{totalScore}</td>
                                <td>{''}</td>
                            </tr>
                        );
                    })}
                    </tbody>
            </table>

            <div className="mt-2">
        <div className="card">
          <h6 className="card-header">Requirement Scores</h6>
          <div className="card-body">
          {/* {advert?.advert_requirements?.map((requirement, index) => (
              <ul key={index}>
                <li>{requirement.requirement?.description}</li>
              </ul>
            ))} */}

          <table className="table table-bordered">
            <tr>
              <th>Criteria for Shortlisting</th>
              <th>Mark</th>
            </tr>
              <tbody>
                {advert?.advert_requirements?.map((requirement, index) => (
                  <tr key={index}>
                    <td>{requirement.requirement?.description}</td>
                    <td>{requirement?.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
        </>
    )
}


export default CandidateSelectionMatrix
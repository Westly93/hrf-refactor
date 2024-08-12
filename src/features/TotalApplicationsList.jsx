import PageTitle from "../components/PageTitle";


const TotalApplicationsList = ({ application }) => {
  return (
    <>
      <div className="container">
         {/* <PageTitle icon="bi bi-people-fill" title="Applicants Shortlist" /> */}

          <div className="card shadow border-0 rounded mt-4">
          {/* <h3 className="card-header fw-medium"><h3>Applicants Shortlist</h3></h3> */}
          <h3 className="card-header fw-medium"><PageTitle icon="bi bi-people-fill" title="Applicant" />
        </h3>
            <div className="card-body">
            <table className="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Application ID</th>
                    <th>Fullname</th>
                    <th>Advert</th>
                    <th>Advert ID</th>
                </tr>
            </thead>
            <tbody>
                {
                  <tr>
                  <td>{application.id}</td>
                  <td>{application.applicant.firstnames} - {application.applicant.surname}</td>
                  <td>{application.advert.title}</td>
                  <td>{application.advert_id}</td>
                  </tr>
                }
            </tbody>
            </table>

            
            </div>
          </div> 

        </div>
    </>
  );
};

export default TotalApplicationsList;

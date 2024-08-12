import { Link } from "react-router-dom";

const AdvertsList = ({ advert }) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-8 d-flex justify-content-center">
            {/* <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" id="myInput" placeholder="Search" aria-label="Search"/>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                            </form> */}
          </div>
        </div>
        <div className="row py-2 justify-content-center">
          <div className="card shadow-sm border border-5 border-start border-dark-subtle border-top-0 border-end-0 border-bottom-0">
          <div class="card-body px-3">
              <h4 className="fw-bold text-primary">{advert.title}</h4>

              <table className="col-lg-12">
                <tr>
                  <td>
                    {" "}
                    <p>
                      <span className="fw-semibold">
                        <i class="bi bi-info-circle-fill text-muted mr-1"></i>{" "}
                        Status:
                      </span>
                      {/* Shortlisting */}
                    </p>
                  </td>
                  <td>
                    {" "}
                    <p>
                      <span className="fw-semibold mr-2">
                        <i class="bi bi-send-fill text-muted mr-1"></i> Posted:
                      </span>
                      {advert.human_created_at}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td>
                    <p>
                      <span className="fw-semibold">
                        <i class="bi bi-people-fill text-muted mr-1"></i>{" "}
                        Applications
                      </span>{" "}
                      {advert.applications_count}
                    </p>
                  </td>
                  <td>
                    <p>
                      <span className="fw-semibold">
                        <i class="bi bi-clock-fill text-muted mr-1"></i> Closing
                        Date:
                      </span>{" "}
                      {advert.human_closing_date}
                    </p>
                  </td>
                </tr>
              </table>

              <div className="d-flex">
                <Link to={`/adverts/${advert.id}`}>
                  <button className="btn btn-space border-primary-subtle btn-light font-medium">
                    <i class="bi bi-eye-fill text-muted"></i> View Advert
                  </button>
                </Link>

                {/* <Link to={`/add-requirements/${advert.id}`}>
                  <button className="btn btn-primary font-medium">
                    <i class="bi bi-eye-fill"></i> Job Requirements
                  </button>
                </Link> */}
                
              </div>
            </div>
         
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvertsList;

import { Link } from 'react-router-dom'

const VacancyList = ({ advert }) => {


    return (
      <>
        <div className="container">
          <div className="row">
            <div className="col-md-8 d-flex">
            
            </div>
          </div>
          <div className="row py-2 justify-content-center">
            <Link
              to={`/jobs/${advert.id}`}
              class="card shadow-sm border border-5 border-start border-dark-subtle border-top-0 border-end-0 border-bottom-0"
            >
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
                        Shortlisting
                      </p>
                    </td>
                    <td>
                      {" "}
                      <p>
                        <span className="fw-semibold mr-2">
                          <i class="bi bi-send-fill text-muted mr-1"></i>{" "}
                          Posted:
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
                          Application
                        </span>{" "}
                        {/* {advert.applications_count} */}
                      </p>
                    </td>
                    <td>
                      <p>
                        <span className="fw-semibold">
                          <i class="bi bi-clock-fill text-muted mr-1"></i>{" "}
                          Closing Date:
                        </span>{" "}
                        {advert.human_closing_date}
                      </p>
                    </td>
                  </tr>
                </table>

                <button className="btn btn border-2 border-primary-subtle btn-light font-medium">
                  <i class="bi bi-eye-fill text-muted"></i> View Advert
                </button>
              </div>
            </Link>
          </div>
        </div>
      </>
    );
}

export default VacancyList;
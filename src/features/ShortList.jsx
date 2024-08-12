import { Link } from "react-router-dom";


const ShortList = ({ shortlistItem }) => {
    return ( 
        <>
        <div className="container">
        <div className="row py-2 justify-content-center">       
          <Link
            to='/'
            class="card shadow-sm border border-5 border-start border-dark-subtle border-top-0 border-end-0 border-bottom-0"
          >
            <div class="card-body px-3">
              <h4 className="fw-bold text-primary">{shortlistItem.firstnames} - {shortlistItem.surname} </h4>

              <table className="col-lg-12">
                <tr>
                  <td>
                    {" "}
                    <p>
                      <span className="fw-semibold">
                        <i class="bi bi-info-circle-fill text-muted mr-1"></i>{" "}
                        Gender:
                      </span>
                      {shortlistItem.sex}    
                    </p>
                  </td>
                  <td>
                    {" "}
                    <p>
                      <span className="fw-semibold mr-2">
                        <i class="bi bi-send-fill text-muted mr-1"></i> Posted:
                      </span>
                      {/* {shortlistItem.human_created_at} */}
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
                      {shortlistItem.title}
                    </p>
                  </td>
                  <td>
                    <p>
                      <span className="fw-semibold">
                        <i class="bi bi-clock-fill text-muted mr-1"></i> Closing
                        Date:
                      </span>{" "}
                      {shortlistItem.human_closing_date}
                    </p>
                  </td>
                </tr>
              </table>

              <button className="btn btn border-2 border-primary-subtle btn-light font-medium">
                <i class="bi bi-eye-fill text-muted"></i> Invite
              </button>
            </div>
          </Link>
        </div>
      </div>
        </>
     );
}
 
export default ShortList;
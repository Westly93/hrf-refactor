import {useSelector } from "react-redux"
//import AdvertsList from "../features/AdvertsList"

const AppliedJobs = () => {
  const { appliedAdverts} = useSelector(state=>state.adverts)
  return (
    <div>
      {appliedAdverts?.length ? (<>
      {appliedAdverts?.map(advert=>(
          <div className="container">
          <div className="row">
            <div className="col-md-8 d-flex">
            
            </div>
          </div>
          <div className="row py-2 justify-content-center">
           
              <div class="card-body px-3">
                <h4 className="fw-bold text-primary">{advert.title}</h4>

                <table className="col-lg-12">
                  
                  <tr>
                    
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
              </div>
          </div>
        </div>
        ))}
      </>
        
        
      ): (
        <strong>You haven't applied for any advert </strong>
      )}
      
    </div>
  )
}

export default AppliedJobs

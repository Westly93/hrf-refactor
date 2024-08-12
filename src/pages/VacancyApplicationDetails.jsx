import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { singleAdvert } from '../apis/AdvertsFunction';
import LoadingSpinner from '../components/LoadingSpinner';

const VacancyApplicationDetails = () => {
    
    const { id } = useParams()
    const navigate = useNavigate()
    
    const { isLoading, isError, error, data: advert } = useQuery(
        {queryKey: ['advert', id],
         queryFn: () => singleAdvert(id)
        })
   
    //passing the data 
//   const handleProceed = () => {
//     const dataToSend = {
//       id: advert.id,
//       title: advert.title,
//       closingDate: advert.closing_date,
//     };
//     navigate(`/application`, { state: { JobApply: dataToSend } });
   
//   };

    return (
      <>
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {isError && (
          <div>
            <h2>Error whilst loading...</h2>
          </div>
        )}
        {advert && (
          <div className="container">
            <h2 className="fw-bold mb-2">{advert.title}</h2>

            
              <h6>
              <span className="fw-bold">Number of Posts: </span>
              {advert.id !== 152 && advert?.number_of_posts}
            </h6>
            
            <h6>
              <span className="fw-bold">Posted:</span>
              {advert.human_created_at}
            </h6>
            <h6>
              <span className="fw-bold">Closing Date:</span>
              
              {advert.id !== 152 && advert?.human_closing_date}
            </h6>
            <div className="row py-4 ">
              <div className="col-md-8">
                <div className="card">
                  <div className="card-body">
                    <div className="card-body">
                      <div
                        dangerouslySetInnerHTML={{ __html: advert.content }}
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="mt-3">
                  <Link to={'/login'} className="btn btn-primary fw-semibold">
                    Apply for this Post
                  </Link>
                </div> */}

                {advert.id !== 152 && (
                        <div className="mt-3">
                          <Link to={'/login'} className="btn btn-primary fw-semibold">
                            Apply for this Post
                          </Link>
                        </div>
                      )}
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default VacancyApplicationDetails;

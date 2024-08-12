import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react';
import { singleAdvert } from '../apis/AdvertsFunction';
import LoadingSpinner from '../components/LoadingSpinner';
import { UseSelector, useSelector } from 'react-redux';
const AdvertApplicationDetails = () => {
    const {isAuthenticated} = useSelector(state=>state.users)
    const { id } = useParams()
    const navigate = useNavigate()
    const { isLoading, isError, error, data: advert } = useQuery(
        {queryKey: ['advert', id],
         queryFn: () => singleAdvert(id)
        })

 


 
    //const navigate= useNavigate()
    if(!isAuthenticated){
      navigate("/login")
    }
    //passing the data 
//   const handleProceed = () => {
//     const dataToSend = {
//       id: advert.id,
//       title: advert.title,
//       closingDate: advert.closing_date,
//     };
//     navigate(`/application`, { state: { JobApply: dataToSend } });
   
//   };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated]);



  const closingDate = advert?.closing_date;
  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

 

  if (closingDate < formattedDate) {
    return(
     <>
     <div className="card">
      <h4 className="card-header">Post: {advert?.title}</h4>
      <div className="card-body">
      <h5 className="alert alert-danger">This advert has expired!!</h5>
      <div className="card-footer">
      <Link to={`/applicant-adverts-list`} className="btn btn-primary fw-semibold">
           Return Back
        </Link>
      </div>
      </div>
     </div>
     </>
    )
   }






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
              <span className="fw-bold">Number of Posts:    </span>
              {advert.number_of_posts}
            </h6>
            <h6>
              <span className="fw-bold">Posted:</span>
              {advert.human_created_at}
            </h6>
            <h6>
              <span className="fw-bold">Closing Date:</span>
              {advert.human_closing_date}
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
                <div className="mt-3">
                  {/* <Link to={`/application/${id}`} className="btn btn-primary fw-semibold">
                    Apply for this Post
                  </Link>
 */}

                  {advert.id !== 152 && (
                        <div className="mt-3">
                           <Link to={`/application/${id}`} className="btn btn-primary fw-semibold">
                              Apply for this Post
                            </Link>
                        </div>
                      )}


                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
}

export default AdvertApplicationDetails;

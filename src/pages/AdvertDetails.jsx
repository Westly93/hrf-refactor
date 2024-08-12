import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { singleAdvert } from '../apis/AdvertsFunction';


const AdvertDetails = () => {
    
    const { id } = useParams()
    const navigate = useNavigate()
    const { isLoading, isError, error, data: advert } = useQuery(
        {queryKey: ['advert', id],
         queryFn: () => singleAdvert(id)
        })

    // console.log(advert)


    return(
        <>
            {isLoading && <div><h2>Data is Loading...</h2></div>}
            {isError && <div><h2>Error whilst loading...</h2></div>}
            {advert && <div className="container text-center">
                <div className="row justify-content-center py-4 ">
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">{advert.title}</h2>
                            <div className="card-body">
                               <p>{advert.content}</p>
                            </div>
                            <div className="card-footer text-lead">
                                <h6>Posted: {advert.created_at}</h6>
                                <h6>Closing Date: {advert.closing_date}</h6>
                            </div>

                        </div>
                        </div>

                        <div className="mt-4">
                        <Link to={"/application/${advert.id}"} class="btn btn-primary">Proceed To Apply</Link>
                        
                        </div>
                    </div>
                </div>
            </div>}



        </> 
    )
}

export default AdvertDetails;

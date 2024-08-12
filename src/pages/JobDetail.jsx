import { useParams, Link } from 'react-router-dom'
import {useAdvertQuery} from '../redux/features/advertApiSlice';

const JobDetail = () => {
    const { id } = useParams()
    const {data, isLoading, isFetching, error}= useAdvertQuery(id);
    console.log(data)
    if (isLoading || isFetching){
        return (
            <div>Loading ...</div>
        )
    }
    if(error){
        return (
            <div>Ooops something went wrong</div>
        )
    }
    return(
        <>
            {data && <div className="container text-center">
                <div className="row justify-content-center py-4 ">
                    <div className="col-md-8">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title">{data?.title}</h2>
                            <div className="card-body">
                            <div
                                dangerouslySetInnerHTML={{ __html: data?.content }}
                            />
                               
                            </div>
                            <div className="card-footer text-lead">
                                <h6>Posted: {data?.created_at}</h6>
                                <h6>Closing Date: {data?.closing_date}</h6>
                            </div>

                        </div>
                        </div>

                        <div className="mt-4">
                        <Link to={`/jobs/${data?.id}/apply`} class="btn btn-primary">Proceed To Apply</Link>
                        
                        </div>
                    </div>
                </div>
            </div>}
        </> 
    )
}

export default JobDetail;

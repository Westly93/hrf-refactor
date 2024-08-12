import { useQuery } from "@tanstack/react-query";
// import { useQuery, usePaginatedQuery } from 'react-query';
// import AdvertsList from '../components/features/AdvertsList';
import { fetchApplications } from "../apis/AdvertsFunction";
import TotalApplicationsList from "../features/TotalApplicationsList";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import PageButton from "../components/PageButton";


const TotalApplications = () => {
    const [page, setPage] = useState(1)
    const [filteredAdverts, setFilteredAdverts] = useState();
    const [timer, setTimer] = useState()
    const [searchTerm, setSearchTerm] = useState("")

    //fetch applications from server
    const {
        isLoading,
        isError,
        error,
        data: applications,
        isFetching,
        isPreviousData,
    } = useQuery(['/applications'],
        fetchApplications
    )
   // console.log(applications)


      //conditions
    if (isLoading) return <p><LoadingSpinner /></p>

    if (isError) return <p>Error: {error.message}</p>


    //map applications and paginate
    const content = applications.data.map(application => <TotalApplicationsList application={application} key={application.id}/>)


    return (
        <>
        <PageTitle icon="bi bi-journals" title="Total Applications" />
        <div className="container">
          <div className="row pt-2">
          
        </div>
      </div>
            
            {isFetching && <span className="loading"><LoadingSpinner /></span>}
            {content}
        </>
    )
}
export default TotalApplications

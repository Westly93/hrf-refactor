import { useInfiniteQuery,useQuery  } from "@tanstack/react-query";
import { fetchAdverts, fetchFilteredAdverts } from "../apis/AdvertsFunction";
import AdvertsList from "../features/AdvertsList";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import PageButton from "../components/PageButton";
import Pagination from "../components/Pagination";
import { useGetAdvertsQuery, advertsApi } from "../apis/advertsApi";
import AdvertSpinner from "../components/AdvertSpinner";
import "../search.css"





const AdvertListings = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const { data, isFetching, error } = useGetAdvertsQuery();
  //console.log(data);
  const adverts = data?.data;

  console.log('adverts', adverts)

  // Filter the adverts based on the search term
  const filteredAdverts = adverts?.filter((advert) =>
    advert.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    await advertsApi.invalidateQueries('getAdverts', { refetchActive: true }); // Invalidate the 'getAdverts' query to trigger a refetch
  };


  if (isFetching) return <LoadingSpinner />;


  if (error) {
    return <div className='font-semibold'>Network Error. Please Reload Page!</div>;
  }

  

  return (
    <div>
      <PageTitle icon="bi bi-journals" title="Job Adverts" />
      <div className="container mt-5">
      <div className="row height d-flex justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="form">
            <i className="fa fa-search"></i>
            <form onSubmit={handleSearch}>
              <input
                type="text"
                className="form-control form-input"
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Adverts..."
              />
              <span className="left-pan">
                <i className="fa fa-microphone"></i>
              </span>
              <button type="submit" style={{ display: 'none' }}></button>
            </form>
          </div>
        </div>
      </div>
        
                 
      {filteredAdverts &&  filteredAdverts.map((advert) => (<AdvertsList advert={advert} key={advert.id} /> ))}

    </div>
    </div>
  );
}
export default AdvertListings

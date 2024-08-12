import { useQuery } from "@tanstack/react-query";
import { fetchAdverts, fetchFilteredAdverts } from "../apis/AdvertsFunction";
import ApplicantAdvertList from "../features/ApplicantAdvertList";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import PageButton from "../components/PageButton";
import Pagination from "../components/Pagination";
import { useSelector } from "react-redux";

const AdvertListings = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useSelector((state) => state.users);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Fetch adverts from server
  const {
    isLoading,
    isError,
    error,
    data: adverts,
    isFetching,
    isPreviousData,
  } = useQuery(["/adverts", currentPage], () => fetchAdverts(currentPage), {
    keepPreviousData: true,
  });

  // Filter adverts based on user type
  const rows = user?.user?.email.endsWith("@staff.msu.ac.zw")
    ? adverts?.data?.filter((advert) => advert.advert_type === 1)
    : adverts?.data?.filter((advert) => advert.advert_type === 0);

  // Fetch filtered adverts
  const { data: filteredAdverts } = useQuery(
    ["filteredAdverts", searchQuery],
    () => fetchFilteredAdverts(searchQuery),
    {
      enabled: searchQuery !== "", // Disable the query when searchQuery is empty
    }
  );
  let filteredRows=[]
  if (filteredAdverts?.data.length){
    filteredRows = user?.user?.email.endsWith("@staff.msu.ac.zw")
    ? filteredAdverts?.data?.filter((advert) => advert.advert_type === 1)
    : filteredAdverts?.data?.filter((advert) => advert.advert_type === 0);
  }

  if (isLoading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  // Map adverts and paginate
  const content = rows?.map((advert) => (
    <ApplicantAdvertList advert={advert} key={advert.id} />
  ));

  return (
    <div>
      <PageTitle icon="bi bi-journals" title="Job Adverts" />
      <div className="container">
        <div className="row pt-2">
          <div className="col-md-12 d-flex justify-content-center">
            <form className="my-2">
              <div className="input-group mb-3 rounded-pill">
                <input
                  type="text"
                  value={searchQuery}
                  placeholder="Search adverts..."
                  className="form-control form-control-lg rounded-pill"
                  onChange={handleSearch}
                />
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* <Pagination
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      /> */}

      {isFetching && <p>Loading more data...</p>}

      {filteredAdverts ? (
        filteredRows.map((advert) => (
          <ApplicantAdvertList advert={advert} key={advert.id} />
        ))
      ) : content ? (
        <div>{content}</div>
      ) : null}
    </div>
  );
};

export default AdvertListings;

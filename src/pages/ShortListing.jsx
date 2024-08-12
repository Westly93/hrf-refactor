import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';
import { allShortListed } from "../apis/AdvertsFunction";
import ShortList from "../features/ShortList";
import LoadingSpinner from "../components/LoadingSpinner";
import PageTitle from "../components/PageTitle";
import ShortlistedTable from "../components/ShortlistedTable";
import "./App.css";


const ShortListing = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchQuery, setSearchQuery] = useState('');

  const [timer, setTimer] = useState()

  const { isLoading, isError, error, data: shortlisted } = useQuery({
    queryKey: ['shortlisted'],
    queryFn: allShortListed
  });

  console.log(shortlisted);

  const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
    if (shortlisted && shortlisted.length > 0) {
        setTotalPages(Math.ceil(shortlisted.length / 10));
    }
    }, [shortlisted]);

    const handlePrevPage = () => {
    if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
    }
    };

    const handleNextPage = () => {
    if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
    }
    };



  // conditions
  if (isLoading) return <p><LoadingSpinner /></p>

  if (isError) return <p>Error: {error.message}</p>


  //console.log("list", shortlisted)

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = shortlisted.filter((person) =>
    person.title.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <>
         <div className="container">
           <div className="row pt-2 mt-4 mb-2">
             <div>
            <PageTitle icon="bi bi-people-fill" title="Shortlist of All Applicants" />
            <input
            type="text"
            className="form-control"
            placeholder="Search by Advert ..."
            value={searchQuery}
            onChange={handleSearch}
          />
           
          </div>
        </div>
      </div>
      <div className="container">        
        <div className="card-body">

        {filteredData.length > 0 && (
          <table className="table table-bordered table-hover mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Surname</th>
                <th>Gender</th>
                <th>National ID</th>
                <th>Contact</th>
                <th>Advert</th>
                <th>Total Scores</th>
              </tr>
            </thead>
            <tbody>
              {filteredData
                .slice((currentPage - 1) * 15, currentPage * 15)
                .map((person, index) => (
                  <tr key={index}>
                    <td>{person.firstnames}</td>
                    <td>{person.surname}</td>
                    <td>{person.sex}</td>
                    <td>{person.national_id}</td>
                    <td>{person.cell}</td>
                    <td>{person.title}</td>
                    <td>{person.totalscore}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {filteredData.length === 0 && (
          <p>No data available</p>
        )}
              
          <div className="d-flex justify-content-center mt-3">
                        <button
                            className="btn btn-outline-primary me-2"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <button
                            className="btn btn-outline-primary"
                            onClick={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                        </div>
                       
        </div>
      </div>
    </>
  );
}

export default ShortListing;


import { useState, useEffect } from "react";
import ApplicantAdvertList from "../features/ApplicantAdvertList";
import NewPagination from "../components/NewPagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdvert } from "../features/adverts/advertsSlice";
import { Link } from "react-router-dom";
import "../search.css"

const ApplicantAdvertListings=() =>{
  
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const { adverts }= useSelector(state=>state.adverts)
  const [data, setData] = useState(adverts);
  const dispatch = useDispatch()

  const outerDivStyle = {
    backgroundColor: '#f5f7fa',
  };

  const sectionStyle = {
    maxWidth: '100vw',
  };


  // const onChange = (e) => {
  //   setData(adverts.filter((advert) => advert.title.toLowerCase().includes(e.target.value.toLowerCase())));
  // };

  const onChange = (e) => {
    const currentDate = new Date();
    setData(
      adverts.filter((advert) => 
        advert.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
        new Date(advert.closing_date) < currentDate
      )
    );
  };
  
  // console.log("current vacancies", data)

  useEffect(() =>{
    dispatch(fetchAdvert())
  },[adverts])

  const changePageNo = (number) => setCurrentPage(number);

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex -  dataPerPage;
  const currentData = data?.slice(firstIndex,lastIndex);

  //console.log("current vacancies", currentData)


  return (
    <div className="App">

      <div className="container">
      <section className="mx-auto my-5" style={sectionStyle}>
        <div className="card">
          <div className="card-body">
            
            <blockquote className="blockquote blockquote-custom bg-white px-3 pt-4" style={{ position: 'relative', fontSize: '1.1rem' }}>
              <div className="blockquote-custom-icon bg-primary shadow-1-strong" style={{ width: '50px', height: '50px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'absolute', top: '-40px', left: '19px' }}>
                <i className="fa fa-quote-left text-white"></i>
              </div>
              <h2 className="card-title">Application Details</h2>
              <p className="mb-0 mt-2 font-italic">
              <ol>
              <li>Create a Profile with Personal Details, Academic Qualifications and Work Experience</li>
              <li>Apply for the preferred job post under Jobs menu</li>
            </ol>
              </p>
              <footer className="blockquote-footer pt-4 mt-4 border-top">
                Welcome to our Platform 
                <cite title="Source Title"></cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </div>
{/* 
      <div style={{width: '600px', marginLeft:"120px"}} className="">
      <input
        type="text"
        placeholder="Search adverts..."
        className="form-control form-control-lg rounded-pill"
        onChange={e=> onChange(e)}
        />
      </div> */}

      <div className="container">

            <div className="row height d-flex justify-content-center align-items-center">

              <div className="col-md-6">

                <div className="form">
                  <i className="fa fa-search"></i>
                  <input type="text" className="form-control form-input"
                  onChange={e=> onChange(e)}
                   placeholder="Search Adverts..."/>
                  <span className="left-pan"><i className="fa fa-microphone"></i></span>
                </div>
                
              </div>
              
            </div>
            
          </div>
      
    {currentData && currentData.map((advert) =>{
      return (
      <>
      
      <ApplicantAdvertList advert={advert} key={advert.id} />
      </>
      )
    })}
    {/* Pagination Component */}
    <div className="mb-5 d-flex justify-content-center mt-3">
    <NewPagination
    changePageNo={changePageNo} 
    data={data?.length}
    dataPerPage={dataPerPage}
    currentPage={currentPage}
    />
    </div>
    
  </div>
  );
}

export default ApplicantAdvertListings
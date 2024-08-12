import { useRef } from "react"
import { useReactToPrint } from 'react-to-print';
import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { fetchProfiles } from "../features/applications/applicationsSlice"
import { fetchAdvert } from "../features/adverts/advertsSlice";
import PrintableTable from "../components/PrintableTable"


const SummaryTable = () => {
  const {id}= useParams()
  const dispatch= useDispatch()
  const {profiles}= useSelector(state=>state.applications)
  const { adverts} =useSelector(state=>state.adverts)


  const advert= adverts?.find(advert=> advert.id== profiles[0]?.advert_id)
 // console.log(advert)
  //console.log(id)
  const componentRef = useRef();
  
  const calculateAge = (birthdate) => {
    const today = new Date();
    const birthDate = new Date(birthdate);

    //console.log('profiles', profiles);
    
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  };
  //console.log('Age ',calculateAge('1993-01-20'))
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: '@page { size: landscape; }'
  });

   //console.log(profiles)
    // useEffect(async ()=>{
    //   await dispatch(fetchProfiles(parseInt(id)))
    //   await dispatch(fetchAdvert())
    // }, [dispatch, id, adverts])

    useEffect(() => {
      const fetchData = async () => {
        await dispatch(fetchProfiles(parseInt(id)))
        await dispatch(fetchAdvert())
      };
    
      fetchData();
    }, [dispatch, id, adverts]);
    
  return (
    <>
    <div className="container">
      <div className="row">
      <div className="d-flex justify-content-between ">
        <h1>Summary Table</h1>
      <button className="btn btn-outline-info my-3" onClick={handlePrint}>
        Print Summary Table
      </button>
      </div>
      </div>
      
      <div ref={componentRef} className="row">
        <div className="col-md-12">
        <PrintableTable calculateAge={calculateAge} profiles={profiles} advert={advert} />
        </div>
      </div>
    </div>
    </>
  )
}

export default SummaryTable

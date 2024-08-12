import {useParams} from "react-router-dom"
import {useSelector} from "react-redux"
import {useEffect} from "react"
import {useDispatch} from "react-redux"
import {fetchAdverts} from "../features/adverts/advertsSlice"
import {fetchApplications} from "../features/applications/applicationsSlice"

const AdvertScores= ()=>{
	const { id }= useParams()
	const dispatch= useDispatch()
	const {adverts}= useSelector(state=>state.adverts)
	const {applications}= useSelector(state=>state.applications)
	const advert= adverts?.data?.find(advert=>advert.id ===Number(id))
	const advertApplicants= applications?.data?.filter(application=>application.advert_id===Number(id))
	// console.log(advertApplicants)
	useEffect(() => {
    if (adverts.length === 0) {
      dispatch(fetchAdverts());
    }if(applications.length === 0){
    	dispatch(fetchApplications())
    }
  }, [dispatch, adverts, applications]);
	return (
		<section>
		{advert ? (<div className="shadow p-3 mt-5">
			<h3>Title: {advert.title}</h3>
			<small>Closing Date: { advert.closing_date}</small>
		</div>) : <strong>Loading.....</strong>}
		<div className="mt-5">
		<h3>Scores</h3>
		<table class="table">
  <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Sex</th>
      <th scope="col">Nation</th>
      <th scope="col">Total Score</th>
      <th scope="col">Detail</th>
      <th scope="col">ShortList</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Weston</td>
      <td>Male</td>
      <td>Nation</td>
      <td>50%</td>
      <td><button className="btn btn-success btn-sm">View</button></td>
      <td>
      <div class="form-floating">
  <select class="form-select form-select-sm" id="floatingSelect" aria-label="Floating label select example">
    <option selected>Open this select menu</option>
    <option value="1">One</option>
    <option value="2">Two</option>
    <option value="3">Three</option>
  </select>
  <label for="floatingSelect">Works with selects</label>
</div>
      </td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    
  </tbody>
</table>
		</div>
		
		</section>
	)
}

export default AdvertScores
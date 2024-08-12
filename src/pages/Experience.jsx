import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Experience from '../components/Experience'
import EditExperienceModal from '../components/EditExperienceModal'


const ApplicantExperience = () => {
    const {user}= useSelector(state=>state.users)
    const {qualifications, experience}= useSelector(state=>state.users)
    const myExperience= experience?.filter(exp=>exp.applicant_id=== user?.user?.profile?.id)
  return (
    <div>
            <div className='shadow p-4 my-5'>
                <div className='d-flex justify-content-between'>
                    <h3 className='mb-3 text-uppercase'>Experience</h3>
                    <i data-bs-toggle="modal" data-bs-target="#addExperienceModal" style={{cursor:'pointer'}} class="bi bi-plus h3"></i>

                </div>
            
            {myExperience?.length ? myExperience?.map(q=>(
                <div key={q.id} className='border-bottom my-3'>
                    <div className='d-flex justify-content-between'>
                        <h5>{q.company}</h5>
                        <i style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target={`#edit${q.id}`} class="bi bi-pencil-square"></i>
                    </div>
                    
                    <p>{q.title}</p>
                    <p>{q.description}</p>
                    <p>{q.start_date} - {q.end_date ? (<span>{q.end_date}</span>) : (<span>Present</span>)}</p>
                    <p>{q.location}</p>
                    <EditExperienceModal id= {`edit${q.id}`} object={q}/>
                </div>
            )) : (<strong>No experience yet .. </strong>)}
            
        </div>
      <Experience/>
    </div>
  )
}

export default ApplicantExperience

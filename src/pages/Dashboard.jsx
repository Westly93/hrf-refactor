import React from 'react'
import { useSelector } from 'react-redux'
import {Link, useNavigate} from "react-router-dom"
import AppliedJobs from './AppliedJobs'
import EditExperienceModal from '../components/EditExperienceModal'
import Qualification from '../components/Qualification'
import Experience from '../components/Experience'
import EditQualificationModal from '../components/EditQualificationModal'
import {logout} from '../features/users/usersSlice'
import { useDispatch } from 'react-redux'
import { useState } from 'react'

const Dashboard = () => {
  const {user, contacts}= useSelector(state=>state.users)
  const { applicantDocuments}= useSelector(state=>state.applications)
  const myDocuments= applicantDocuments?.filter(doc=>doc.applicant_id === user?.user?.profile?.id)
  // console.log(myDocuments)
  const dispatch= useDispatch()
  const navigate= useNavigate()
  const {qualifications, experience}= useSelector(state=>state.users)

   const myQualifications= qualifications?.filter(q=> q.applicant_id === user?.user?.profile?.id)

   const myExperience= experience?.filter(exp=>exp.applicant_id=== user?.user?.profile?.id)
   const [redirect, setRedirect]= useState(false)
   const handleLogout= async()=>{
    await dispatch(logout())
    navigate('/login')
   }
   
  return (
        <div class="row border-top p-4">
      <div class="col-md-3">
        <div
          class="nav flex-column nav-pills"
          id="myTab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            className="nav-link active"
            id="tab1"
            data-bs-toggle="pill"
            href="#content1"
            role="tab"
            aria-controls="content1"
            aria-selected="true"
            >My Jobs</a
          >
          <a
            class="nav-link"
            id="tab2"
            data-bs-toggle="pill"
            href="#content2"
            role="tab"
            aria-controls="content2"
            aria-selected="false"
            >My Profile</a
          >
          <a
            class="nav-link"
            id="tab3"
            data-bs-toggle="pill"
            href="#content3"
            role="tab"
            aria-controls="content3"
            aria-selected="false"
            >Experience</a
          >
          <a
            class="nav-link"
            id="tab6"
            data-bs-toggle="pill"
            href="#content6"
            role="tab"
            aria-controls="content3"
            aria-selected="false"
            >Qualifications</a
          >
          <a
            class="nav-link"
            id="tab7"
            data-bs-toggle="pill"
            href="#content7"
            role="tab"
            aria-controls="content3"
            aria-selected="false"
            >Contacts</a
          >
          <a
            class="nav-link"
            id="tab3"
            data-bs-toggle="pill"
            href="#content4"
            role="tab"
            aria-controls="content3"
            aria-selected="false"
            >Settings</a
          >
          <li style={{cursor: 'pointer'}} onClick={()=>handleLogout()} class="nav-link" id="tab3"
            ><i
              class="bi bi-box-arrow-right text-info"
            ></i
            >Logout</li
          >
        </div>
      </div>
      <div className="col-md-9 bg-light">
        <div className="tab-content" id="myTabContent">
          <div
            class="tab-pane show active bg-light"
            id="content1"
            role="tabpanel"
            aria-labelledby="tab1"
          >
            <AppliedJobs />
          </div>
          <div
            class="tab-pane fade bg-light"
            id="content2"
            role="tabpanel"
            aria-labelledby="tab2"
          >
            <div>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='row py-2'>
                    <div className='col'>
                      First name
                    </div>
                    <div className='col'>{ user?.user?.profile?.firstnames }</div>
              </div>
              <div className='row py-2'>
                <div className='col'>
                  Surname
                </div>
                <div className='col'>{ user?.user?.profile?.surname }</div>
              </div>
              <div className='row py-2'>
                <div className='col'>
                  National Id
                </div>
                <div className='col'>{ user?.user?.profile?.national_id }</div>
              </div>
              <div className='row py-2'>
                <div className='col'>
                  Date of birth
                </div>
                <div className='col'>{ user?.user?.profile?.dob }</div>
              </div>
              <div className='row py-2'>
                <div className='col'>
                  Nationality
                </div>
                <div className='col'>{ user?.user?.profile?.nationality }</div>
              </div>
              <div className='row py-2'>
                <div className='col'>
                  Gender
                </div>
                <div className='col'>{ user?.user?.profile?.sex }</div>
              </div>
              <div className='row py-2'>
                <div className='col'>
                  Marital Status
                </div>
                <div className='col'>{ user?.user?.profile?.marital_status }</div>
              </div>

                  </div>
                  <div className='col-md-4'>
                    <Link to="/applicant-info"><i class="bi bi-pencil-square"></i></Link>
                  </div>

                </div>
                
            </div>
          </div>
          <div
            class="tab-pane fade bg-light"
            id="content3"
            role="tabpanel"
            aria-labelledby="tab3"
          >
            <div>
              {/* Experience portion */}
            <div className='shadow p-4 my-5'>
                <div className='d-flex justify-content-between'>
                    <h3 className='mb-3 text-uppercase'>Experience</h3>
                    <i data-bs-toggle="modal" data-bs-target="#addExperienceModal" style={{cursor:'pointer'}} class="bi bi-plus h3"></i>
                    <Experience/>
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
            </div>
            
          </div>
          <div
            class="tab-pane fade bg-light"
            id="content6"
            role="tabpanel"
            aria-labelledby="tab6"
          >
            <div>
              <div className='shadow p-4'>
                <div className='d-flex justify-content-between'>
                    <h3 className='mb-3 text-uppercase'>Qualifications</h3>
                    <i data-bs-toggle="modal" data-bs-target="#addQualificationModal" style={{cursor:'pointer'}} class="bi bi-plus h3"></i>
                    <Qualification/>
                </div>
            
            { myQualifications?.length ?  myQualifications?.map(q=>(
                <div key={q.id} className='border-bottom my-3'>
                    <div className='d-flex justify-content-between'>
                        <h5>{q.institution}</h5>
                        <i style={{cursor: "pointer"}} data-bs-toggle="modal" data-bs-target={`#edit-qualification${q.id}`} class="bi bi-pencil-square"></i>
                    </div>
                    
                    <p>{q.qualification}</p>
                    <p>{q.start_date} - {q.end_date}</p>
                    <p>Grade: {q.grade}</p>
                    <EditQualificationModal id= {`edit-qualification${q.id}`} object={q} />
                </div>
            )) : (<strong>No Qualifications yet.. </strong>)}
            
        </div>
            </div>
          </div>
          <div
            class="tab-pane fade bg-light"
            id="content7"
            role="tabpanel"
            aria-labelledby="tab7"
          >
            <div className='d-flex justify-content-between my-4'>
              <h3 className="text-center">Contacts</h3>
              <Link className='px-4' to="/applicant-contacts"><i style={{cursor: 'pointer'}} class="bi bi-plus h3 text-success"></i></Link>
              
            </div>
            
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Contact Type</th>
                            <th scope="col">Contact</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        { contacts?.contacts?.length ? (
                            contacts?.contacts?.map(contact=>(
                                <tr key={contact.id}>
                                    <td>{contact.contact_type}</td>
                                    <td>{contact.contact}</td>
                                    
                                </tr>
                            ))
                            ) : (
                            <tr>
                                No Contacts please add 
                            </tr>
                        )}
                        
                        
                    </tbody>
                </table>
          </div>
          <div
            class="tab-pane fade bg-light"
            id="content4"
            role="tabpanel"
            aria-labelledby="tab3"
          >
            <div class="container">
              <Link to="/change-password">Change Password</Link>
            </div>

            
          </div>
          <div
            class="tab-pane fade"
            id="content5"
            role="tabpanel"
            aria-labelledby="tab3"
          >
            Logout
          </div>
        </div>
      </div>
    </div>
    )

}
export default Dashboard
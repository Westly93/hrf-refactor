import { useEffect, useState } from "react";
import {useSelector, useDispatch} from "react-redux";
import { fetchContacts, userVerification } from "../features/users/usersSlice";
import { fetchApplicantContacts } from "../features/applications/applicationsSlice";
import { useQuery } from '@tanstack/react-query'
import { fetchApplicantContactById } from "../features/applicantContact/Contact";
import {
  deleteContact,
  applicantContactAdded,
} from "../features/applications/applicationsSlice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";



const AddContacts= ()=>{
    const dispatch= useDispatch()
    const {user, contacts}= useSelector(state=>state.users)
    const [deleteSuccess, setDeleteSuccess] = useState(false);
    const {applicantContacts} = useSelector(state=>state.applications)
    const applicant_ID = user?.user?.profile?.id;

    //console.log('user infor', user)

    const [formData, setFormData]= useState({
        // applicant_id: user?.user?.profile?.id,
        applicant_id: applicant_ID,
        contact_type_id: "",
        contact: ""
    })

   

   //uuser profile

   useEffect(() => {
    if (user.user.profile === null) {
      dispatch(userVerification());
    }
  }, [applicant_ID, dispatch]);


    console.log('applicant id is this', applicant_ID);
//end user profile

    //console.log('applicant contacts ', applicantContacts)

  

    const {contact_type_id, contact}= formData;
    const onChange=(e)=>{
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }
    const onSubmit=async(e)=>{
        e.preventDefault()
        //console.log(formData)
        const newContact= await dispatch(applicantContactAdded(formData))
        // console.log("contact added", newContact)
     
        window.location.reload()
    }
    const {
    contactTypes,
  } = useSelector((state) => state.applications);


  const handleDelete=async (id)=>{
    await dispatch(deleteContact(id));
    await dispatch(fetchApplicantContacts(user?.user?.profile?.id));
    setDeleteSuccess(true);
    window.location.reload()
  }

  //fetching contacts details
  const { isLoading, isError, error, data: applicantContactList } = useQuery(
    {queryKey: ['applicantContactList', applicant_ID],
     queryFn: () => fetchApplicantContactById(applicant_ID)
    })

     // console.log('applicant contacts two ', applicantContactList?.contacts)


    if (isLoading) return <p><LoadingSpinner /></p>

//end fetching contacts




    return (
        <div>
            <div className="card">
                <h3 className="card-header">Contact Information</h3>
                <div className="card-body">

                <form onSubmit={e=>onSubmit(e)}>
                <div>
                <label for="contact" className="form-label">Contact Type</label>
                    <select
                    name="contact_type_id"
                    value={contact_type_id}
                    onChange={e=>onChange(e)}
                     class="form-select" aria-label="Default select example">
                        <option selected>--Select Contact Type--</option>
                        { contactTypes?.map(type=>(
                            <option value={type.id} key={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
  
                <div class="mb-3 mt-3">
                    <label for="contact" className="form-label">Contact</label>
                    <input name="contact" value={contact} onChange={e=>onChange(e)} type="text" className="form-control" id="contact"/>
                </div>
                
                <button type="submit" className="btn btn-primary"
                disabled={isLoading}
                >
                {isLoading ? 'Submitting...' : 'Submit'}
                </button>
                </form>
       
                </div>
            </div>

            <div className="card mt-3">
                <h4 className="card-header">Contacts List</h4>
                <div className="card-body">
                <div>
                    {deleteSuccess && <p className="alert alert-success">Contact Deleted successfully!</p>}
                {/* <h3 className="text-center my-4">Contacts</h3> */}
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Contact Type</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        { applicantContactList?.contacts?.length ? (
                            contacts?.contacts?.map(contact=>(
                                <tr key={contact.id}>
                                    <td>{contact.contact_type}</td>
                                    <td>{contact.contact}</td>
                                    <td style={{cursor: 'pointer'}}><i onClick={()=>handleDelete(contact.id)} class="bi bi-trash text-danger cursor-pointer"></i></td>
                                </tr>
                            ))
                            ) : (
                            
                                <span>No Contacts please add </span>
                            
                        )}
                    </tbody>
                </table>
            </div>
            
                </div>
            </div>
            <Link className="btn btn-success mt-3" to='/applicant-uploads'>Next</Link>
        </div>
    )
}

export default AddContacts;

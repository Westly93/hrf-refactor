import {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { editExperience } from '../features/users/usersSlice'
const EditExperienceModal = ({object}) => {
    const dispatch= useDispatch()
    const {user}= useSelector(state=>state.users)
    const [formData, setFormData]= useState({
        id: object.id || "",
        title: object.title || "",
        company: object.company || "",
        location: object.location || "",
        description: object.description || "",
        start_date: object.start_date || ""
    })
    const {title, company, description, start_date, location}= formData
    const [endDate, setEndDate]= useState(object.end_date || "")
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit= async(e)=>{
        e.preventDefault()
        if(endDate !== ""){
            const updatedFormData= {...formData, end_date: endDate}
            setFormData(updatedFormData)
        }
       // console.log(endDate)
        //console.log(formData)
        await dispatch(editExperience(formData))
        setFormData({
    title: "",
    company: "",
    location: "",
    description: "",
    start_date: "",
    end_date: "", 
  });
    }
  return (
    <div class="modal fade" id={`edit${object.id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Edit {object.title} </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form onSubmit={(e)=>onSubmit(e)}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Job Title</label>
                    <input onChange={(e)=>onChange(e)} placeholder='eg, E-Learning Developer' type="text" className="form-control" id="title" name='title' value={title} aria-describedby="emailHelp" />
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Company </label>
                    <input onChange={(e)=>onChange(e)} type="text" placeholder='Midlands State University' className="form-control" id="company" name='company' value={company}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Location </label>
                    <input onChange={(e)=>onChange(e)} type="text" placeholder='Gweru' className="form-control" id="location" name='location' value={location}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Description </label>
                    <textarea onChange={(e)=>onChange(e)} className="form-control"  placeholder='Illustrate your roles' name="description" id="description" value={description} rows="3"></textarea>
                </div>
                <div className='row'>
                    <div class="mb-3 col">
                        <label for="exampleInputPassword1" className="form-label">Start Date </label>
                        <input onChange={(e)=>onChange(e)} type="date" className="form-control" id="start_date" name='start_date' value={start_date}/>
                    </div>
                    <div class="mb-3 col">
                        <label for="exampleInputPassword1" className="form-label">Start Date </label>
                        <input onChange={(e)=>setEndDate(e.target.value)} type="date" className="form-control" id="end_date" name='end_date' value={endDate}/>
                        <div id="end_date" className="form-text">No longer in that role </div>
                    </div>
                </div>
                <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button data-bs-dismiss="modal" type="submit" className="btn btn-primary">Submit</button>
            </div>
                
                </form>
            </div>
            
            </div>
        </div>
    </div>
  )
}

export default EditExperienceModal

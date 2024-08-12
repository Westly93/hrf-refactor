import {useState} from 'react'
import moment from 'moment';
import { useAddExperienceMutation } from '../redux/features/authApiSlice';
import {toast} from 'react-toastify';
const Experience = () => {
    const [addExperience, {isLoading}]= useAddExperienceMutation()
    const [formData, setFormData]= useState({
        title: "",
        company: "",
        location: "",
        description: "",
        start_date: ""
    })
    const {title, company, description, start_date, location}= formData
    const [endDate, setEndDate]= useState("")
    const onChange = (e) => {
        const {name, value}= e.target
        setFormData({ ...formData, [name]: value });
    };
    const [startDateError, setStartDateError] = useState("")
    const [endDateError, setEndDateError] = useState("")
    const onSubmit= (e)=>{
        e.preventDefault()
        if(endDate !== ""){
            setFormData({...formData, end_date: endDate})
        }
       // console.log(endDate)
        
        const currentDate = moment().format('YYYY-MM-DD');
        // console.log("Current date", currentDate)
        // console.log("end date", endDate)
        // console.log("start date", formData.start_date)

        if (moment(formData.start_date).isAfter(currentDate)) {
            setStartDateError('The start date should be a past date');
            return
        }
        
        else if (moment(formData.start_date).isAfter(moment(endDate))) {
            setStartDateError('The end date cannot be greater than the start date');
            return
        }
        else if(endDate !== "" && moment(endDate).isAfter(moment(currentDate))){
            setEndDateError('The end date cannot be greater than the current date');
            return
        }
        else {
            addExperience({title, company, location, description, start_date, endDate})
            .unwrap()
            .then(()=>{
                toast.success("Experience added successfully")
            })
            .catch(()=>{
                toast.error('Failed to add experience')
            })
            
        }

    }
  return (
    <div class="modal fade" id="addExperienceModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Experience </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form onSubmit={(e)=>onSubmit(e)}>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Job Title</label>
                    <input required onChange={(e)=>onChange(e)} placeholder='eg, E-Learning Developer' type="text" className="form-control" id="title" name='title' value={title} aria-describedby="emailHelp" />
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Company </label>
                    <input required onChange={(e)=>onChange(e)} type="text" placeholder='Midlands State University' className="form-control" id="company" name='company' value={company}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Location </label>
                    <input required onChange={(e)=>onChange(e)} type="text" placeholder='Gweru' className="form-control" id="location" name='location' value={location}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Description </label>
                    <textarea required className="form-control" onChange={(e)=>onChange(e)} placeholder='Illustrate your roles' id="description" name='description' value={description} rows="3"></textarea>
                    
                </div>
                <div className='row'>
                    
                    <div class="mb-3 col">
                        <label for="exampleInputPassword1" className="form-label">Start Date </label>
                        <input required onChange={(e)=>onChange(e)} type="date" className="form-control" id="start_date" name='start_date' value={start_date}/>
                        { startDateError && (<div className='text-danger text-sm'>{startDateError}</div>)}
                        
                    </div>
                    <div class="mb-3 col">
                        <label for="exampleInputPassword1" className="form-label">End Date </label>
                        <input onChange={(e)=>setEndDate(e.target.value)} type="date" className="form-control" id="end_date" name='end_date' value={endDate}/>
                        {/* <div id="end_date" className="form-text">No longer in that role </div> */}
                        { endDateError && (<div className='text-danger text-sm'>{endDateError}</div>)}
                    </div>
                    {/* { startDateError && (<div className='alert alert-danger alert-sm'>{startDateError}</div>)} */}
                </div>
                <div class="d-flex justify-content-between">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
                
                </form>
            </div>
            
            </div>
        </div>
    </div>
  )
}

export default Experience

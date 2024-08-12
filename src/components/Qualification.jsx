import {useState} from 'react'
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux'
import { newQualification } from '../features/users/usersSlice'

const Qualification = () => {
    const {user}= useSelector(state=>state.users)
    const dispatch= useDispatch()
   const [formData, setFormData]= useState({
        applicant_id: user?.user?.profile?.id || "",
        institution: "",
        qualification: "",
        grade: "",
        start_date: "",
        end_date: ""
    })
    const [startDateError, setStartDateError] = useState("")
    const {institution, qualification, grade, start_date, end_date}= formData
    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const onSubmit= async(e)=>{
        e.preventDefault()
        const currentDate = moment().format('MM-DD-YYYY');
        if (moment(formData.start_date).isAfter(currentDate)) {
            setStartDateError('The start date should be a past date');
            return
        } else if (moment(formData.start_date).isAfter(moment(formData.end_date))) {
            setStartDateError('The end date cannot be greater than the start date');
            return
        } else {
            await dispatch(newQualification(formData))
            setStartDateError("")
            window.location.reload()
        }
        
        setFormData({
        applicant_id: user?.user?.profile?.id || "",
        institution: "",
        qualification: "",
        grade: "",
        start_date: "",
        end_date: ""
    })
    }
  return (
    <div class="modal fade" id="addQualificationModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Add Qualification</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <form onSubmit={e=>onSubmit(e)}>
                    <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Institution </label>
                    <input required onChange={(e)=>onChange(e)} type="text" placeholder='e.g, Midlands State University' className="form-control" id="institution" name='institution' value={institution}/>
                </div>
                <div class="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Qualification</label>
                    <input required onChange={(e)=>onChange(e)} placeholder="eg, Bachelor's Degree in Computer Science " type="text" className="form-control" id="qualification" name='qualification' value={qualification} aria-describedby="emailHelp" />
                    
                </div>
                <div class="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Grade </label>
                    <input required onChange={(e)=>onChange(e)} type="text" placeholder='Second Upper Class' className="form-control" id="grade" name='grade' value={grade}/>
                </div>
                
                <div className='row'>
                    <div class="mb-3 col">
                        <label for="exampleInputPassword1" className="form-label">Start Date </label>
                        <input required onChange={(e)=>onChange(e)} type="date" className="form-control" id="start_date" name='start_date' value={start_date}/>
                    </div>
                    <div class="mb-3 col">
                        <label for="exampleInputPassword1" className="form-label">End Date </label>
                        <input required onChange={(e)=>onChange(e)} type="date" className="form-control" id="end_date" name='end_date' value={end_date}/>
                        
                    </div>
                    { startDateError && (<div className='alert alert-danger alert-sm'>{startDateError}</div>)}
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


export default Qualification

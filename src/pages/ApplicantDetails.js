import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { MdOutlineNavigateNext } from "react-icons/md";
import moment from "moment";
import {
  fetchNationalities,
  fetchContactTypes,
  fetchMaritalStatus,
  applicantAdded,
  nationalIDAdded,
  applicantContactAdded,
} from '../features/applications/applicationsSlice';

const ApplicantDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    nationalities,
    contactTypes,
    maritalStatuses,
    status,
    applicantAddedError,
    nationalIDAddedError,
  } = useSelector((state) => state.applications);
  const { isAuthenticated, user, contacts } = useSelector(
    (state) => state.users
  );
  //const user = useSelector((state) => state.users.user);
  const user_id = user?.user?.id;
  // console.log("Logg in user:", user_id);

  const [formData, setFormData] = useState({
    firstnames: user?.user?.profile?.firstnames || '',
    surname: user?.user?.profile?.surname || '',
    dob: user?.user?.profile?.dob || '',
  });
  const [dobErr, setDobErr]= useState();
  const [redirect, setRedirect] = useState(false);
  const [maritalStatusErr, setMaritalStatusErr] = useState('')
  const [applicantContacts, setApplicantContacts] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState('');
  const [nationality_id, setNationality_id] = useState("");
  const { firstnames, surname, dob } = formData;
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [sex, setSex] = useState(user?.user?.profile?.sex || '');
  const [nationalId, setNationalId] = useState(
    user?.user?.profile?.national_id || ''
  );

  const subtractYears = (date, years) => {
    date.setFullYear(date.getFullYear() - years);
    return date.toISOString().split('T')[0];
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const foundStatus = maritalStatuses.find(
        (status) => status.name === user?.user?.profile?.marital_status
      );
    
    const selectedNatinality = nationalities.find(
        (nation) => nation.name === user?.user?.profile?.nationality
      );
    const updatedFormData = {
      ...formData,
      sex: sex,
      maritial_status_id: parseInt(maritalStatus, 10) ? maritalStatus : foundStatus.id,
      nationality_id: parseInt(nationality_id, 10) ? nationality_id : selectedNatinality.id,
      user_id: user_id,
    };
    setFormData(updatedFormData); // Flag variable to track errors

    try {
      const inputDate = moment(dob);
      const minDate = moment().subtract(65, "years");
      const maxDate = moment().subtract(18, "years");
      if (!inputDate.isBetween(minDate, maxDate, null, "[]")){
        console.log('updated data ', updatedFormData)
        setDobErr('Please enter a date between 18 and 65 years ago.')
      }
      else if(formData.maritial_status_id === ''){
        console.log('updated data2 ', formData)
        setMaritalStatusErr('Please Select Marital status!')
      }
      else{

      const addedApplicant = await dispatch(applicantAdded(updatedFormData));
      if (addedApplicant.payload) {
        const nationalID = await dispatch(
          nationalIDAdded({
            applicant_id: addedApplicant.payload.id,
            national_id: nationalId,
          })

          // console.log("added applicant", addedApplicant)
        );
        if (nationalID) {
          setRedirect(true);
        }
      }
    }
    } catch (error) {
      // console.log(error.message);
      // Handle the error here
    }
  };
  //console.log('user profile',user.user.profile)
  //console.log('merital statuses ', maritalStatuses)
  //console.log('selected status ', maritalStatus)
  //console.log('nationalities ', nationalities)

  if (redirect) {
    navigate('/applicant-contacts');
  }
  useEffect(() => {
    dispatch(fetchNationalities());
    dispatch(fetchContactTypes());
    dispatch(fetchMaritalStatus());
  }, [dispatch, navigate, isAuthenticated, status]);
  // console.log("national added error ", nationalIDAddedError?.errors);
  return (
    <>
      {status === 'loading' ? (
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="card">
          <h4 className="card-header">
            Enter your Personal details
          </h4>

          <div className="card-body">
            
        <form onSubmit={(e) => onSubmit(e)}>
          
          <div class="mb-3">
            <label for="name" className="form-label">
              Firstname(s)
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="firstname"
              value={firstnames}
              name="firstnames"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="mb-3">
            <label for="surname" className="form-label">
              Surname
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="surname"
              value={surname}
              name="surname"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="mb-3">
            <label for="name" className="form-label">
              National ID
            </label>
            <input
              type="text"
              required
              className="form-control"
              id="nationalId"
              value={nationalId}
              name="nationalId"
              onChange={(e) => setNationalId(e.target.value)}
            />
            {nationalIDAddedError?.errors?.national_id && (
              <div class="alert alert-danger mt-1" role="alert">
                {nationalIDAddedError?.errors?.national_id.map((err) => (
                  <li>{err}</li>
                ))}
              </div>
            )}
          </div>
          <div class="mb-3">
            <select
              class="form-select"
              onChange={(e) => setSex(e.target.value)}
              name="sex"
              aria-label="Default select example"
              required
            >
              <label htmlFor="sex">Gender:</label>
              <option selected={!user?.user.profile?.sex} value="">
                Select Gender
              </option>
              <option
                selected={user?.user.profile?.sex === 'male'}
                value="male"
              >
                Male
              </option>
              <option
                selected={user?.user.profile?.sex === 'female'}
                value="female"
              >
                Female
              </option>
            </select>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              required
              onChange={(e) => setMaritalStatus(e.target.value)}
              name="maritalStatus"
              aria-label="Default select example"
              defaultValue="select marital status"
            >
              <option value="">Select Marital Status</option>
              {maritalStatuses.map((status) => (
                <option
                  selected={user?.user.profile?.marital_status === status.name}
                  key={status.id}
                  value={status.id}
                >
                  {status.name}
                </option>
              ))}
            </select>
            {applicantAddedError?.errors.maritial_status_id && (
              <div class="alert alert-danger" role="alert">
                Please Select the Marital status
              </div>
            )}
            {maritalStatusErr && (
              <div class="alert alert-danger" role="alert">
                { maritalStatusErr}
              </div>
            )}
          </div>{" "}
          <div className="mb-3 form-group">
            <label for="dob" className="form-label">
              Date of birth
            </label>
            <input
              type="date"
              required
              className="form-control"
              id="dob"
              name="dob"
              min={subtractYears(new Date(), 65)}
              max={subtractYears(new Date(), 18)}
              value={dob}
              onChange={(e) => onChange(e)}
            />
            {dobErr && (
              <span className='text-danger'>{ dobErr }</span>
            )}
          </div>
          <div class="mb-3">
            <select
              class="form-select"
              required
              aria-label="Default select example"
              onChange={(e) => setNationality_id(e.target.value)}
            >
              <option value="">Select nation</option>
              {nationalities?.length ? (
                nationalities.map((nation) => (
                  <option
                    selected={user?.user.profile?.nationality === nation.name}
                    key={nation.id}
                    value={nation.id}
                  >
                    {nation.name}
                  </option>
                ))
              ) : (
                "LOADING....."
              )}
            </select>
          </div>
          <div>
            <button type="submit" className="btn btn-primary">
              Next <MdOutlineNavigateNext />
            </button>
          </div>
        </form>
          </div>

        </div>
      

      )}
    </>
  );
};

export default ApplicantDetails;

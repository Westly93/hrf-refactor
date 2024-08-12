import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {setAuth} from '../redux/features/authSlice';
import {useRegisterMutation} from '../redux/features/authApiSlice';
import {toast} from 'react-toastify';

// import logo from '../imgs/logo.png';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, {isLoading, error}]= useRegisterMutation();
 
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    password_confirmation: "",
  });
  
  //console.log(errorMessage)
  const { email, name, password, password_confirmation } = formData;
  const onChange = (e) => {
    const { name, value}= e.target
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    register(formData)
    .unwrap()
    .then(()=>{
      toast.success('Registration success')
      dispatch(setAuth())
      navigate('/')
    })
    .catch(()=>{
      toast.error("Failed to register")
    })
  };

  return (
    <div className="col-lg-4 m-auto mt-4">
      {/* <img src={logo} alt="Logo" class="img-fluid" /> */}
      <legend className="fw-bold text-center">HRM Recruitment System</legend>
      <form
        className="card shadow border-0 rounded"
        onSubmit={(e) => onSubmit(e)}
      >
        <div className="card-header fw-medium">Create Account</div>
        <div className="card-body">
          
          <div class="mb-3">
            <label for="name" className="form-label fw-medium text-muted">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={name}
              name="name"
              onChange={(e) => onChange(e)}
            />
          </div>
          <div class="mb-3">
            <label
              for="exampleInputEmail1"
              className="form-label fw-medium text-muted"
            >
              Email address
            </label>
            <input
              type="email"
              className='form-control'
              id="exampleInputEmail1"
              value={email}
              name="email"
              required
              onChange={(e) => onChange(e)}
              aria-describedby="emailHelp"
            />
            
          </div>
          <div class="mb-3">
            <label
              for="exampleInputPassword1"
              className="form-label fw-medium text-muted"
            >
              Password
            </label>
            <input
              type="password"
              className='form-control'
              id="exampleInputPassword1"
              onChange={(e) => onChange(e)}
              value={password}
              name="password"
            />
            
          </div>
          
          <div class="mb-3">
            <label
              for="confirm_password"
              className="form-label fw-medium text-muted"
            >
              Password Confirm
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm_password"
              onChange={(e) => onChange(e)}
              value={password_confirmation}
              name="password_confirmation"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary fw-medium w-100 btn-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="visually-hidden">Loading...</span>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Please Wait!
              </>
            ) : (
              <>
                Create Account{" "}
                <i className="bi bi-plus-circle-fill float-end"></i>
              </>
            )}
          </button>
        </div>
      </form>
      <p className="mt-4">
        Already have an account?
        <Link className="fw-medium " to="/login">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUp;

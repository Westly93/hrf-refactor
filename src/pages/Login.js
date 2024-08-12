import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {toast} from 'react-toastify';
import {useLoginMutation} from '../redux/features/authApiSlice';
import {setAuth, setUser} from '../redux/features/authSlice';
import {useDispatch} from 'react-redux';
const Login = () => {
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const [login, {isLoading, error}]= useLoginMutation()


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  //console.log("error message", error)
  const { email, password } = formData;
  const onChange = (e) => {
    const {name, value}= e.target
    setFormData({ ...formData, [name]: value });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      toast.success("Login success");
      // Use the response data here
      //console.log("Response data:", response);
      const {token, user}= response
      localStorage.setItem('token', token);
      dispatch(setUser(user))

      // Set isAuthenticated to true
      dispatch(setAuth());

      // Redirect to home
      navigate('/');
    } catch (err) {
      console.error("Failed to login:", err);
      toast.error("Failed to login");
    }
  };
  
  return (
    <div className="col-lg-4 m-auto mt-5">
      <div>
        <legend className="fw-bold text-center">MSU HRM System</legend>
        {error?.data && (
          <div className="alert alert-danger">{error?.data?.message}</div>
        )}
        <form
          className="card shadow rounded border-0"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="card-header fw-medium">Login </div>
          <div className="card-body">
    
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
                className="form-control"
                id="exampleInputPassword1"
                onChange={(e) => onChange(e)}
                value={password}
                required
                name="password"
              />
               
            </div>
            <p className="mt-2">
              Forgot your password?{" "}
              <Link to="/reset-password">Request Reset Password</Link>
            </p>
            {/* <Link>Forgot Password?</Link> */}
          </div>
          <div className="card-footer">
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
                  Login <i className="bi bi-box-arrow-in-right float-end"></i>
                </>
              )}
            </button>
          </div>
        </form>
        <p className="mt-2">
          Dont have an account?{" "}
          <Link className="fw-medium" to="/signup">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

import { useState } from "react";
import { motion } from "framer-motion";
import { useResetPasswordMutation } from "../redux/features/authApiSlice";
import {toast} from 'react-toastify'
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delay: 1.25,
      type: "spring",
      stiffness: 120,
    },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};
const PasswordReset = () => {
  const [resetPassword, {isLoading}]= useResetPasswordMutation();
  const [email, setEmail]= useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    resetPassword(email)
    .unwrap()
    .then(()=>{
      toast.success("Please Check your email for the password reset link")
    })
    .catch(()=>{
      toast.error('Something went wrong')
    })
    
    //setRequestSent(true);
  };

  // if (resetPasswordStatus === "succeeded") {
  //   return setTimeout(() => <Navigate to="/vacancies" />, 5000);
  //   //return <Navigate to="/" />;
  // }
  return (
    <motion.div
      className="mt-5"
      variants={containerVariants}
      animate="visible"
      initial="hidden"
      exit="exit"
    >
      <form
        className="card shadow rounded border-0"
        onSubmit={onSubmit}
        style={{ width: "500px", margin: "auto" }}
      >
        <div className="card-header fw-medium">Password Reset Request </div>

        <div className="card-body">
          <div className="form-group">
            <label className="form-label fw-medium text-muted">Email</label>
            <input
              placeholder="email@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              name="email"
              className='form-control'
            />
          
          </div>

          <div className="d-grid mt-2">
            <button
              className="btn btn-primary fw-medium w-100 btn-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div class="spinner-border text-success" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              ) : (
                <span>Request Password Reset</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PasswordReset;

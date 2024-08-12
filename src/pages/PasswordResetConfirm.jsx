import { useState } from "react";
import { motion } from "framer-motion";
import { useResetPasswordConfirmMutation } from "../redux/features/authApiSlice";
import {toast} from 'react-toastify';
import { useParams } from "react-router-dom";
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
const PasswordResetConfirm = () => {
  const [resetPasswordConfirm, {isLoading}]= useResetPasswordConfirmMutation();
  const [formData, setFormData] = useState({
    password: "",
    password_confirmation: "",
  });
  const { password, password_confirmation } = formData;
  const onChange = (e) =>{
    const {name, value}= e.target
    setFormData({ ...formData, [name]: value });
  }
    
  const params = useParams();
  const onSubmit = (e) => {
    e.preventDefault();
    const {uid, token}= params
    resetPasswordConfirm({uid, token, password, password_confirmation})
    .unwrap()
    .then(()=>{
      toast.success("Password Reset success, You can now Login")
    })
    .catch(()=>{
      toast.error("Failed to reset password")
    })
   
    //setRequestSent(true);
  };
  
  return (
    <motion.div
      className="mt-5"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <form
        className="card shadow rounded border-0"
        onSubmit={onSubmit}
        style={{ width: "500px", margin: "auto" }}
      >
        <div className="card-header fw-medium">Reset Password Confirm </div>
        <div className="card-body">

          <div className="form-group mb-3">
            <label className="form-label fw-medium text-muted">
              New Password
            </label>
            <input
              placeholder="new password"
              value={password}
              onChange={(e) => onChange(e)}
              type="password"
              required
              name="password"
              className='form-control'
            />
          </div>
          <div className="form-group mb-3">
            <label className="form-label fw-medium text-muted">
              Confirm New Password
            </label>
            <input
              placeholder=" Confirm new password"
              value={password_confirmation}
              onChange={(e) => onChange(e)}
              type="password"
              name="password_confirmation"
              className="form-control"
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
                <span>Reset Password</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default PasswordResetConfirm;

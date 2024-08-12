import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Navigate, useParams } from "react-router-dom";
import { activateAccount } from "../features/users/usersSlice";
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
const Activate = () => {
  //const [verified, setVerified] = useState(false);
  const { accountActivationStatus, accountActivationError } = useSelector(
    (state) => state.users
  );
  const params = useParams();
  const dispatch = useDispatch();
  const verify = () => {
    const uid = params.uid;
    const token = params.token;
    dispatch(activateAccount(uid, token));
    //setVerified(true);
  };

  if (accountActivationStatus === "succeeded") {
    <Navigate to="/login" />;
  }
  return (
    <motion.div
      className="container"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="d-flex mt-5 flex-column justify-content-center align-items-center">
        <h1>Verify your account</h1>
        <div className="d-grid mt-3">
          {accountActivationError && (
            <div className="alert alert-danger">{accountActivationError}</div>
          )}
          <button
            onClick={verify}
            className="btn btn-primary"
            disabled={accountActivationStatus === "loading"}
          >
            {accountActivationStatus === "loading" ? (
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            ) : (
              "Verify"
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Activate;

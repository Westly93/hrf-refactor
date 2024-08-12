import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
const Topbar = () => {
  return (
    <div>
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <Link class="navbar-brand" href="#">
            Hr<span>System</span>
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <Link class="nav-link active" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/new-advert">
                  Create Advert
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" aria-current="page" to="/adverts-list">
                  Adverts List
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/signup">
                  register
                </Link>
              </li>
              <li class="nav-item">
                <button>
                  Logout <BiLogOut />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Topbar;

import "./Register2.scss";
import { useHistory, Link } from "react-router-dom";
// import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerNewUser } from "../../services/userService";
import logo from "../../logo.png";
import { UserContext } from "../../context/UserContext";

const Register2 = (props) => {
  const { user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const defaultValidInput = {
    isValidEmail: true,
    isValidPhone: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  };
  const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    if (user && user.isAuthenticated) {
      history.push("/");
    }
  }, []);

  const isValidInput = () => {
    setObjCheckInput(defaultValidInput);

    if (!email) {
      toast.error("Email is required");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    let regx = /\S+@\S+\.\S+/;
    if (!regx.test(email)) {
      toast.error("Please enter a valid email address");
      setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
      return false;
    }
    if (!phone) {
      setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
      toast.error("Phone is required");
      return false;
    }
    if (!password) {
      setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
      toast.error("Password is required");
      return false;
    }

    if (password !== confirmPassword) {
      setObjCheckInput({
        ...defaultValidInput,
        isValidConfirmPassword: false,
      });
      toast.error("Your password is not the same");
      return false;
    }

    return true;
  };

  const handleRegister = async () => {
    let check = isValidInput();

    if (check === true) {
      let serverData = await registerNewUser(email, phone, username, password);
      if (+serverData.EC === 0) {
        toast.success(serverData.EM);
        history.push("/login");
      } else {
        toast.error(serverData.EM);
        if (+serverData.EC === 1) {
          setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
        } else if (+serverData.EC === 2) {
          setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
        }
      }
    }
  };

  return (
    <>
      <div class="wrapper">
        <div class="d-flex align-items-center justify-content-center my-5 my-lg-0">
          <div class="container">
            <div class="row row-cols-1 row-cols-lg-2 row-cols-xl-2">
              <div class="col mx-auto">
                <div class="card">
                  <div class="card-body">
                    <div class="border p-4 rounded">
                      <div class="text-center">
                        <img
                          src={logo}
                          width="30"
                          height="30"
                          className="d-inline-block align-top me-3"
                          alt="Logo"
                        />
                        <h3 class="">Register</h3>
                      </div>
                      <p>
                        Already have an account?
                        <Link to="/login">Login here</Link>
                      </p>
                      <div class="form-body">
                        <form class="row g-3">
                          <div class="col-sm-6">
                            <label for="inputFirstName" class="form-label">
                              First Name
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="inputFirstName"
                              placeholder="Jhon"
                            ></input>
                          </div>
                          <div class="col-sm-6">
                            <label for="inputLastName" class="form-label">
                              Last Name
                            </label>
                            <input
                              type="email"
                              class="form-control"
                              id="inputLastName"
                              placeholder="Deo"
                            ></input>
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Email Address
                            </label>
                            <input
                              type="text"
                              className={
                                objCheckInput.isValidEmail
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Email address"
                              value={email}
                              onChange={(event) => setEmail(event.target.value)}
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Phone Number
                            </label>
                            <input
                              type="number"
                              className={
                                objCheckInput.isValidPhone
                                  ? "form-control"
                                  : "form-control is-invalid"
                              }
                              placeholder="Phone number"
                              value={phone}
                              onChange={(event) => setPhone(event.target.value)}
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputEmailAddress" class="form-label">
                              Username
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Username"
                              value={username}
                              onChange={(event) =>
                                setUsername(event.target.value)
                              }
                            />
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objCheckInput.isValidPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Password"
                                value={password}
                                onChange={(event) =>
                                  setPassword(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <label for="inputChoosePassword" class="form-label">
                              Re-Enter Password
                            </label>
                            <div class="input-group" id="show_hide_password">
                              <input
                                type="password"
                                className={
                                  objCheckInput.isValidConfirmPassword
                                    ? "form-control"
                                    : "form-control is-invalid"
                                }
                                placeholder="Re-enter Password"
                                value={confirmPassword}
                                onChange={(event) =>
                                  setConfirmPassword(event.target.value)
                                }
                              />
                            </div>
                          </div>
                          <div class="col-12">
                            <div class="d-grid">
                              <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => handleRegister()}
                              >
                                Register
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/*
      <div className="register-contanier">
        <div className="container">
          <div className="row px-3 px-sm-0">
            <div className="content-left col-12 d-none col-sm-7 d-sm-block">
              <div className="brand">
                <Link to="/">
                  <span title="Return to HomePage" className="brand-item">
                    <img
                      src={logo}
                      width="50"
                      height="50"
                      className="d-inline-block align-top me-3"
                      alt="Logo"
                    />
                    <div className="brand__name my-3">JOBTOP</div>
                  </span>
                </Link>
              </div>
              <div className="detail">Việc Làm Dành Cho Bạn</div>
            </div>

            <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
              <div className="brand d-sm-none">JOBTOP</div>
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="text"
                  className={
                    objCheckInput.isValidEmail
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Email address"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Phone number:</label>
                <input
                  type="text"
                  className={
                    objCheckInput.isValidPhone
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Username:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  className={
                    objCheckInput.isValidPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Re-enter Password:</label>
                <input
                  type="password"
                  className={
                    objCheckInput.isValidConfirmPassword
                      ? "form-control"
                      : "form-control is-invalid"
                  }
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>

              <button
                className="btn btn-primary"
                type="button"
                onClick={() => handleRegister()}
              >
                Register2
              </button>
              <hr />
              <div className="text-center">
                <button
                  className="btn btn-success"
                  onClick={() => handleLogin()}
                >
                  Already've an account. Login
                </button>
                <div className="mt-3 return">
                  <Link to="/">
                    <i className="fa fa-arrow-circle-left"></i>
                    <span title="Return to HomePage"> Return to HomePage </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      */}
    </>
  );
};

export default Register2;

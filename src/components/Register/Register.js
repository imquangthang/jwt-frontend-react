import "./Register.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const Register = (props) => {
  let history = useHistory();
  const handleLogin = () => {
    history.push("/login");
  };

  useEffect(() => {
    axios.get("http://localhost:8080/api/test-api").then((data) => {
      console.log(">>> check data axios: ", data);
    });
  }, []);

  return (
    <div className="register-contanier">
      <div className="container">
        <div className="row px-3 px-sm-0">
          <div className="content-left col-12 d-none col-sm-7 d-sm-block">
            <div className="brand">THANG</div>
            <div className="detail">THANG Learning everything</div>
          </div>

          <div className="content-right col-sm-5 col-12 d-flex flex-column gap-3 py-3">
            <div className="brand d-sm-none">THANG</div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
              />
            </div>

            <div className="form-group">
              <label>Phone number:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
            </div>

            <div className="form-group">
              <label>Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>

            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div className="form-group">
              <label>Re-enter Password:</label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter Password"
              />
            </div>

            <button className="btn btn-primary">Register</button>
            <hr />
            <div className="text-center">
              <button className="btn btn-success" onClick={() => handleLogin()}>
                Already've an account. Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;

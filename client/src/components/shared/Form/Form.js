import React, { useState, useEffect } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const validateForm = ({ formType, name, email, password, phone, role }) => {
  const errors = {};
  if (formType === "register") {
    if (role === "admin" || role === "donar") {
      if (!name.match(/^[a-zA-Z\s]*$/)) {
        errors.name = "Name should contain only characters";
      }
    }
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      errors.email = "Invalid email format";
    }
    if (password.length < 6) {
      errors.password = "Password should be at least 6 characters long";
    }
    if (!phone.match(/^\d{10}$/)) {
      errors.phone = "Phone number should be 10 digits long";
    }
  }
  return errors;
};

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Clear all fields when the role changes
    setEmail("");
    setPassword("");
    setName("");
    setOrganisationName("");
    setHospitalName("");
    setWebsite("");
    setAddress("");
    setPhone("");
    setErrors({});
  }, [role]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formErrors = validateForm({
            formType,
            name,
            email,
            password,
            phone,
            role,
          });
          if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
          }

          if (formType === "login") {
            handleLogin(e, email, password, role);
          } else if (formType === "register") {
            handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website
            );
          }
        }}
      >
        <h1 className="text-center">{formTitle}</h1>
        <hr />
        <div className="d-flex mb-3">
          <div className="form-check">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="donarRadio"
              value={"donar"}
              onChange={(e) => setRole(e.target.value)}
              defaultChecked
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Donar
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="adminRadio"
              value={"admin"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="adminRadio" className="form-check-label">
              Admin
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="hospitalRadio"
              value={"hospital"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="hospitalRadio" className="form-check-label">
              Hospital
            </label>
          </div>
          <div className="form-check ms-2">
            <input
              type="radio"
              className="form-check-input"
              name="role"
              id="organisationRadio"
              value={"organisation"}
              onChange={(e) => setRole(e.target.value)}
            />
            <label htmlFor="organisationRadio" className="form-check-label">
              Organisation
            </label>
          </div>
        </div>
        {(() => {
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <>
                      <InputType
                        labelText={"Name"}
                        labelFor={"forName"}
                        inputType={"text"}
                        name={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && <p className="text-danger">{errors.name}</p>}
                    </>
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    labelText={"Email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email && <p className="text-danger">{errors.email}</p>}
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password}</p>
                  )}
                  <InputType
                    labelText={"Website (Optional)"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {errors.phone && <p className="text-danger">{errors.phone}</p>}
                </>
              );
            }
          }
        })()}

        <div className="d-flex flex-row justify-content-between">
          {formType === "login" ? (
            <p>
              Not registered yet? Register
              <Link to="/register"> Here!</Link>
            </p>
          ) : (
            <p>
              Already a user? Please
              <Link to="/login"> Login!</Link>
            </p>
          )}
          <button className="btn btn-primary" type="submit">
            {submitBtn}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

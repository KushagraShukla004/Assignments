import React, { useEffect, useState } from "react";
import countryOptions from "./countryList";
import "./Form.css";
import PasswordInput from "./PasswordInput";
import { GiCrossMark } from "react-icons/gi";
import { TiTick } from "react-icons/ti";
import cityOptions from "./cityList";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();

  const initialState = {
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    city: "",
    pan: "",
  };

  /* eslint-disable no-unused-vars */
  const [formData, setFormData] = useState(initialState);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(true);

  //Validations
  const [uCase, setUCase] = useState(false);
  const [num, setNum] = useState(false);
  const [sChar, setSChar] = useState(false);
  const [passLength, setPassLength] = useState(false);
  const [passcheck, setPasscheck] = useState(false);

  const crossIcon = <GiCrossMark color="red" size={15} />;
  const checkIcon = <TiTick color="green" size={15} />;
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    }
    return crossIcon;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let err = {};

    //eslint-disable-next-line
    let regexU = /^[A-Za-z0-9_]{6,30}$/;
    if (!regexU.test(formData.userName)) {
      err.userName = "Username not valid";
    }
    //eslint-disable-next-line
    let regexEmail =
      /[A-Za-z0-9._%+-]{2,}@[a-zA-Z]{1,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})/;
    if (!regexEmail.test(formData.email)) {
      err.email = "Email not valid!";
    }

    //eslint-disable-next-line
    let regexPhone = /^\+?\d{1,3}?[-. ]?\(?\d{1,3}\)?[-. ]?\d{3,4}[-. ]?\d{4,6}$/;
    if (!regexPhone.test(formData.phone)) {
      err.phone = "Phone number is not valid!";
    }

    let regexPan = /^[0-9]{4}[ -]?[0-9]{4}[ -]?[0-9]{4}$/;
    if (!regexPan.test(formData.pan)) {
      err.pan = "Adhaar Card Number is not valid!";
    }

    if (!passcheck) {
      console.log("passcheck inside: ", passcheck);
      err.password = "Password Invalid";
    }

    // console.log("err: ", err);
    setFormError({ ...err });

    return Object.keys(err).length < 1;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    let isValid = validateForm();

    if (isValid) {
      setIsSubmit(true);
      navigate("/FormDetails", { state: formData });
    } else {
      alert("In-Valid Form:");
    }
  };

  useEffect(() => {
    // Check Lower and Uppercase
    if (formData.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setUCase(true);
    } else {
      setUCase(false);
    }
    // Check For Numbers
    if (formData.password.match(/([0-9])/)) {
      setNum(true);
    } else {
      setNum(false);
    }
    // Check For Special char
    if (formData.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
      setSChar(true);
    } else {
      setSChar(false);
    }
    // Check if password is greater than 5
    if (formData.password.length > 5) {
      setPassLength(true);
    } else {
      setPassLength(false);
    }

    // Set passcheck to true only when all conditions are met
    if (uCase && num && sChar && passLength) {
      setPasscheck(true);
    } else {
      setPasscheck(false);
    }
  }, [formData.password, uCase, num, sChar, passLength]);

  return (
    <div className="card">
      <center>
        <h2>Form</h2>
      </center>
      <div className="divider"></div>
      <form onSubmit={handleSubmit}>
        <div className="grid-col1">
          <div className="fields">
            <input
              type="text"
              name="firstName"
              id="fName"
              value={formData.firstName}
              placeholder="First Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="fields">
            <input
              type="text"
              name="lastName"
              id="lName"
              value={formData.lastName}
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
          </div>
          <div className="fields">
            <input
              type="text"
              name="userName"
              id="userName"
              value={formData.userName}
              placeholder="User Name"
              onChange={handleChange}
              required
            />
          </div>
          <span className="invalid">{formError.userName}</span>
          <div className="fields">
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>
          <span className="invalid">{formError.email}</span>
          <div className="fields">
            <PasswordInput
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="pass_check">
            {/* List  */}
            <ul className="form-list">
              <li>
                <span className="indicator">
                  {switchIcon(uCase)}
                  &nbsp; <p>Lowercase & Uppercase</p>
                </span>
              </li>
              <li>
                <span className="indicator">
                  {switchIcon(num)}
                  &nbsp; <p>Number (0-9)</p>
                </span>
              </li>
              <li>
                <span className="indicator">
                  {switchIcon(sChar)}
                  &nbsp; <p>Special Character (!@#$%^&*)</p>
                </span>
              </li>
              <li>
                <span className="indicator">
                  {switchIcon(passLength)}
                  &nbsp; <p>At least 5 Character</p>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="grid-col2">
          <div className="fields">
            <input
              type="tel"
              name="phone"
              id="phoneNumber"
              value={formData.phoneNumber}
              placeholder="Phone Number"
              onChange={handleChange}
              required
            />
          </div>
          <span className="invalid">{formError.phone}</span>
          <div className="fields">
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleChange}
              required
            >
              {countryOptions.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="fields">
            <select
              name="city"
              id="city"
              value={formData.city}
              onChange={handleChange}
              required
            >
              {cityOptions.map((item, i) => {
                return (
                  <option key={i} value={item.value}>
                    {item.label}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="fields">
            <input
              type="text"
              id="pan"
              name="pan"
              value={formData.pan}
              placeholder="Pan or Adhaar Card Number"
              onChange={handleChange}
              required
            />
          </div>
          <span className="invalid">{formError.pan}</span>
          <button type="submit" disabled={!isSubmit}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

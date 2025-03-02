import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

const AddEmployee = () => {
  // State variables for user input fields
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (firstName && lastName) {
      const formattedEmail = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@cd.com`;
      const formattedPassword = `${phone}`;
      setEmail(formattedEmail);
      setPassword(formattedPassword);
    }
  }, [firstName, lastName, phone]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = `${firstName} ${lastName}`;
    try {
      // API call to register user
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/register`,
        { name, email, password, phone, address }
      );

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/va/auth/save-account`,
        {
          email,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message);
      }

      setfirstName("");
      setlastName("");
      setPhone("");
      setAddress("");
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Register Employee</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputFirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            className="form-control"
            id="exampleInputFirstName"
            placeholder="Enter Your First Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputLastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            className="form-control"
            id="exampleInputLastName"
            placeholder="Enter Your Last Name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPhoneNo" className="form-label">
            Phone No.
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            id="exampleInputPhoneNo"
            placeholder="Enter Your Phone No."
            pattern="[0-9]{11}"
            maxLength="11"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="form-control"
            id="exampleInputAddress"
            placeholder="Enter Your Home Address"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddEmployee;

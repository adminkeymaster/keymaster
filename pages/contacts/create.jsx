import axios from "axios";
import { useState, useEffect } from "react";

const CreateContact = () => {
  const [formIsSent, setFormIsSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    title: "",
    description: "",
    email: "",
  });

  const [signUpError, setSignUpError] = useState({
    error: false,
    errorMsg: "",
  });

  const handleInputFormData = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post("/api/contact", formData);

    try {
      const response = await axios.post("/api/contact", formData);
      setFormIsSent(true);
      console.log(response);
      if (!response.data.success) {
        setSignUpError({
          error: true,
          errorMsg: response.data.msg,
        });
      }
    } catch (error) {
      console.log(error);
      setFormIsSent(true);
      setSignUpError({
        error: true,
        errorMsg: error.message,
      });
    }
  };
  return (
    <main>
      Create Contact page
      <div>
        <form action="POST">
          Name:{" "}
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleInputFormData}
            required
          />
          <br />
          Phone number:{" "}
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            onChange={handleInputFormData}
            required
          />
          <br />
          Title:{" "}
          <input
            type="text"
            name="title"
            id="title"
            onChange={handleInputFormData}
            required
          />
          <br />
          Description:{" "}
          <input
            type="text"
            name="description"
            id="description"
            onChange={handleInputFormData}
            required
          />
          <br />
          Email:{" "}
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputFormData}
            required
          />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Create
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateContact;

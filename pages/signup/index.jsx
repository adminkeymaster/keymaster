//Next, React (core node_modules) imports must be placed here
import { useState } from "react";

import axios from "axios";
//Fetchers must be imported here
//import useFETCHER from 'tools/useFETCHER'

//Layout must be imported here
//import LAYOUT from 'layouts/LAYOUT'
import SignupLayout from "@/layouts/Signup";

//Component must be imported here
//import COMPONENT from 'components/COMPONENT'
import StyledForm from "@/components/StyledForm";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryLink from "@/components/SecondaryLink";

const SignupPage = (props) => {
  const [formIsSent, setFormIsSent] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    email: "",
    phoneNumber: "",
    password: "",
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
    console.log(formData)
    try {
      const response = await axios.post("/api/user", formData);
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
      {formIsSent ? (!signUpError.error ? <h1>Амжилттай бүртгэгдлээ!</h1> : <h1> {signUpError.errorMsg} </h1>) : (
        <StyledForm onSubmit={handleSubmit}>
          <h1>Бүртгүүлэх</h1>
          <div>
            <label htmlFor="firstName">Овог</label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="Овог"
              onChange={handleInputFormData}
              required
            />
          </div>
          <div>
            <label htmlFor="lastName">Нэр</label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Нэр"
              onChange={handleInputFormData}
              required
            />
          </div>
          <div>
            <label htmlFor="gender">Хүйс</label>
            <select 
              name="gender" onChange={handleInputFormData}>
              <option defaultValue value="male">Эр</option>
              <option value="female">Эм</option>
            </select>
          </div>
          <div>
            <label htmlFor="birthDate">Birthday:</label>
            <input
              type="date" id="birthDate" name="birthDate" onChange={handleInputFormData} />
          </div>
          <div>
            <label htmlFor="phonenumber">Утасны дугаар</label>
            <input
              type="text"
              name="phoneNumber"
              id="phonenumber"
              placeholder="Утасны дугаар"
              onChange={handleInputFormData}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Цахим шуудан</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Цахим шуудан"
              onChange={handleInputFormData}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Нууц үг</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Нууц үг"
              onChange={handleInputFormData}
              required
            />
          </div>
          <div>
            <label htmlFor="passwordconfirm">Нууц үг давтах</label>
            <input
              type="password"
              name="passwordconfirm"
              id="passwordconfirm"
              placeholder="Нууц үг"
            />
          </div>
          <PrimaryButton href="/">Бүртгэх</PrimaryButton>
          <SecondaryLink href="/login">Нэвтрэх</SecondaryLink>
        </StyledForm>
      )}
    </main>
  );
};
SignupPage.Layout = SignupLayout;
export default SignupPage;

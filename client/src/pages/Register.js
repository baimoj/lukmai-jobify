import { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  name: "",
  email: "aubon@gmail.com",
  password: "123456",
  isMember: true,
};

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return;
    }
    const currentUser = { name, email, password };
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: "login",
        alertText: "เข้าสุ่ระบบ สำเร็จ รอสักครู่...",
      });
    } else {
      setupUser({
        currentUser,
        endPoint: "register",
        alertText: "สมัคร ผ่านเเล้ว รอสักครู่...",
      });
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <div>{JSON.stringify(user)}</div>
        <Logo />
        <h3>{values.isMember ? "เข้าสู่ระบบ" : "สมัคร"}</h3>
        {showAlert && <Alert />}
        {/* name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="name"
            labelText="ชื่อ"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        {/* email input */}
        <FormRow
          type="email"
          name="email"
          labelText="อีเมล์"
          value={values.email}
          handleChange={handleChange}
        />
        {/* password input */}
        <FormRow
          type="password"
          name="password"
          labelText="รหัสผ่าน"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          {values.isMember ? "เข้าสุ่ระบบ" : "สมัคร"}
        </button>
        {/* <button
          type="button"
          className="btn btn-block btn-hipster"
          disabled={isLoading}
          onClick={() => {
            setupUser({
              currentUser: { email: "testUser@test.com", password: "secret" },
              endPoint: "login",
              alertText: "Login Successful! Redirecting...",
            });
          }}
        >
          {isLoading ? "loading..." : "demo app"}
        </button> */}
        <p>
          {values.isMember ? "ยังไม่ได้เป็นสมาชิก?" : "เป็นสมาชิกแล้ว?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "สมัคร" : "เข้าสุ่ระบบ"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;

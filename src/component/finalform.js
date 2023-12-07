import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import Logojamtech from "../img/light-white-log.png";
import "./Finalform.css";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function Finalform() {
  const [showPassword, setShowPassword] = useState(false);
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  function onSubmit(data) {
    axios
      .post("http://localhost:3000/login", data)
      .then((response) => {
        console.log("RESPONSE", response);
        toast.success("Success Notification !", {
          position: toast.POSITION.TOP_RIGHT,
        });
        console.log(response.user);
      })
      .catch((error) => {
        toast.error("Failed: " + error.message);
      });
  }
  return (
      <section className="login_page">
        <div className="container">
         <div className="row justify-content-center align-items-center">
           <div className="col-sm-6 login_inner_sec">
             <Form className="p-4">
              <div className="text-center">
              <img className="logo-site" src={Logojamtech} alt="Logo" />
               </div>
                 <p className="form-title-upper text-center">
                Presenting a coding contest
              </p>
              <h1 className="form-title-login text-center">Login</h1>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                <Form.Text className="text-muted">
                  {errors.email?.message}
                </Form.Text>
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>
              <InputGroup className="mb-3" controlId="formBasicPassword">
                <FormControl
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                <InputGroup.Text
                  onClick={handleTogglePassword}
                  style={{ cursor: "pointer" }}
                  >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
                <Form.Text className="text-muted">
                  {errors.password?.message}
                </Form.Text>
              </InputGroup>
               <Button
                style={{ display: "block", margin: "auto" }}
                onClick={handleSubmit(onSubmit)}
                variant="primary"
                type="submit">
                Sign In 
              </Button> 
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Finalform;

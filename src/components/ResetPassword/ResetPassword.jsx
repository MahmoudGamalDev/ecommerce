import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  let navigate = useNavigate();

  async function resetPassword(values) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      values
    );
    if (data.token) {
      navigate("/signin");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string()
      .required("enter your email")
      .email("enter a valid email"),
    newPassword: Yup.string().required("new password required"),
  });

  let Formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: resetPassword,
  });

  return (
    <div>
      <form onSubmit={Formik.handleSubmit} className="w-75 my-5 m-auto">
        <label htmlFor="email">Email:</label>
        <input
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          value={Formik.values.email}
          type="email"
          id="email"
          className="form-control"
        />
        <label htmlFor="password">New Password:</label>
        <input
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          value={Formik.values.newPassword}
          type="password"
          id="newPassword"
          className="form-control"
        />
        <button type="submit" className="btn btn-success my-3">
          Change Password
        </button>
      </form>
    </div>
  );
}

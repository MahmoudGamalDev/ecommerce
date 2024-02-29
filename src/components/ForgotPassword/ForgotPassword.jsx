import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Fragment } from "react";

export default function ForgotPassword() {
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("enter your email")
      .email("enter a valid email"),
  });

  async function sendCode(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      values
    );
    if (data.statusMsg === "success") {
      document.querySelector(".forgotPassword").classList.add("d-none");
      document.querySelector(".verifyCode").classList.remove("d-none");
    }
  }

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendCode,
  });

  // verify code

  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("enter your code"),
  });

  let navigate = useNavigate();

  async function sendData(values) {
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      values
    );
    if (data.status === "Success") {
      navigate("/resetPassword");
    }
  }

  let verifyFormik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema2,
    onSubmit: sendData,
  });

  return (
    <Fragment>
      <div className="forgotPassword">
        <h3 className="w-50 text-center mt-3 text-success fw-bold fs-2 mx-auto">
          Reset Your Password
        </h3>
        <form onSubmit={formik.handleSubmit} className="w-50 mx-auto my-5">
          <label htmlFor="email">Email:</label>
          <input
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            type="email"
            name="email"
            id="email"
            className="form-control my-1"
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="alert alert-danger mt-2">{formik.errors.email}</p>
          ) : (
            ""
          )}
          <button
            disabled={!(formik.isValid && formik.dirty)}
            type="submit"
            className="btn btn-success d-block my-2 ms-auto"
          >
            Send Code
          </button>
        </form>
      </div>

      <div className="verifyCode d-none">
        <h3 className="w-50 text-center mt-3 text-success fw-bold fs-2 mx-auto">
          Verify Code
        </h3>
        <form
          onSubmit={verifyFormik.handleSubmit}
          className="w-50 mx-auto my-5"
        >
          <label htmlFor="resetCode">Enter Code:</label>
          <input
            value={verifyFormik.values.resetCode}
            onChange={verifyFormik.handleChange}
            onBlur={verifyFormik.handleBlur}
            type="text"
            name="resetCode"
            id="resetCode"
            className="form-control my-1"
          />
          {verifyFormik.touched.resetCode && verifyFormik.errors.resetCode ? (
            <p className="alert alert-danger mt-2">
              {verifyFormik.errors.resetCode}
            </p>
          ) : (
            ""
          )}
          <button
            disabled={!(verifyFormik.isValid && verifyFormik.dirty)}
            type="submit"
            className="btn btn-success d-block my-2 ms-auto"
          >
            Send Code
          </button>
        </form>
      </div>
    </Fragment>
  );
}

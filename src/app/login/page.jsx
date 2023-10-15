"use client";
import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useApi from "../../../hooks/api";
export default function Login() {
  const api = useApi();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string()
      .min(5, "email min is 5")
      .max(100, "email max is 100")
      .email("email not acceptable")
      .matches(
        /^.+@.+\.(com|net|lol)$/,
        "Not accepted email should end with com or net or lol"
      )
      .required("email is required"),
    password: Yup.string()
      .min(8, "password min is 8")
      .max(100, "password max is 100")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/,
        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
      )
      .required("password is required"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnBlur: true,
    onSubmit: async (data) => {
      try {
        const res = await api.post("users/login", data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    },
  });
  useEffect(() => {
    formik.touched.email = false;
    formik.touched.password = false;
  }, []);
  return (
    <main>
      <form
        onSubmit={(e) => {
          console.log(formik.touched);
          formik.handleSubmit(e);
        }}
      >
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            name="email"
            aria-describedby="emailHelp"
            value={formik.values.email}
            onChange={formik.handleChange}
            onFocus={() => {
              formik.touched.email = true;
             
            }}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          <div>
            {formik.touched?.email && formik.errors?.email && (
              <p>{formik.errors?.email}</p>
            )}
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onFocus={() => {
              formik.touched.password = true;
            }}
          />
          <div>
            {formik.touched?.password && <p>{formik.errors?.password}</p>}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </main>
  );
}

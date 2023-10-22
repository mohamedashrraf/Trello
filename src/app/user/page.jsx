"use client";
import React, { useContext, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { UserContext } from "../context/userContext";
import styles from "./User.module.css";

export default function User() {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  // You can retrieve the userData from local storage here
  let userData = JSON.parse(localStorage.getItem("data"));

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required").min(5).max(30),
    email: Yup.string().email("Invalid email").required("Email is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is required")
      .min(18)
      .max(60),
  });

  // Function to update user data
  const updateUser = (values, actions) => {
    // Here you can implement logic to update the user data, e.g., save it back to local storage.
    console.log(values);
    setIsEditing(false);
    // Call actions.setSubmitting(false); when the update is complete to enable the button.
  };

  return (
    <div className="container">
      <div className="col-md-4  mx-auto mt-5">
        {isEditing ? (
          <Formik
            initialValues={{
              userName: userData.userName,
              email: userData.email,
              age: userData.age,
            }}
            validationSchema={validationSchema}
            onSubmit={updateUser}
          >
            {({ isSubmitting }) => (
              <div className={styles.loginForm}>
                <div className={styles.form}>
                  <form className={styles.registerForm}>
                    <h2 className="text-center pb-2">Edit</h2>
                    <div className="form-group">
                      <Field
                        type="text"
                        name="userName"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="userName"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <Field
                        type="text"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <div className="form-group">
                      <Field type="text" name="age" className="form-control" />
                      <ErrorMessage
                        name="age"
                        component="div"
                        className="text-danger"
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-outline-success"
                      disabled={isSubmitting}
                    >
                      Save
                    </button>
                  </form>
                </div>
              </div>
            )}
          </Formik>
        ) : (
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <img src="/images/ava.png" />
            </div>
            <div className={styles.text}>
              <h4 className={``}>
                <span>Username : </span>
                {userData.userName}
              </h4>
              <h4 className={``}>
                <span>Email : </span>
                {userData.email}
              </h4>
              <h4 className={``}>
                <span>Age : </span>
                {userData.age}
              </h4>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

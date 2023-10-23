"use client";
import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../context/userContext';
import { useRouter } from "next/navigation"
import styles from "./User.module.css";
export default function User() {
  const router = useRouter()
  const { user, setUser, updateUser,deleteUser } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  let userData
  useEffect(()=>{

    if (!localStorage?.getItem("token")) {
      router.push("/login")
    }
    userData= JSON.parse(localStorage?.getItem("data"));
  },[])


  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is required').min(5).max(30),
    age: Yup.number().typeError('Age must be a number').required('Age is required').min(18).max(60),
  });

  const confirmUpdate = (values, actions) => {
    actions.setSubmitting(true);
    let id
    let data
    useEffect(()=>{
      id = JSON.parse(localStorage?.getItem("data"))._id;
      data = JSON.parse(localStorage?.getItem("data"));
    },[])
    const updatedAge = parseInt(values.age, 10);
    userData = {
      userName: values.userName,
      age: updatedAge,
    };
    // Here you can implement logic to update the user data, e.g., save it back to local storage.
    updateUser({ ...userData }, id);
    useEffect(()=>{


      localStorage?.setItem('data', JSON.stringify({ ...data, ...userData }));
    },[])
    console.log(values);
    setIsEditing(false);
    //Call when the update is complete to enable the button.
  };

 const confirmDelete = () => {
    const confirmDeletion = window.confirm("Are you sure you want to delete your account?");
    if (confirmDeletion) {
      deleteUser(userData._id);
      if(typeof window !== "undefined"){

        localStorage?.removeItem("token");
        localStorage?.removeItem("data");
      }
      router.push("/login"); // Redirect to the login page after deleting the account.
    }
  };

  return (
    <div className="container">
      <div className="col-md-4  mx-auto mt-5">
        {isEditing ? (
          <Formik
            initialValues={{
              userName: userData?.userName,
              email: userData?.email,
              age: userData?.age,
            }}
            validationSchema={validationSchema}
            onSubmit={confirmUpdate}
          >
            {({ isSubmitting ,handleSubmit }) => (
              <div className={styles.loginForm}>
                <div className={styles.form}>
                  <form className={styles.registerForm} onSubmit={handleSubmit}>
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
            <>
          <div className={styles.userProfile}>
            <div className={styles.avatar}>
              <img src="/images/avatar.jpg" />
            </div>
            <div className={styles.text}>
              <h4>
                <span>Username : </span>
                {userData?.userName}
              </h4>
              <h4>
                <span>Email : </span>
                {userData?.email}
              </h4>
              <h4>
                <span>Age : </span>
                {userData?.age}
              </h4>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? "Cancel" : "Edit"}
              </button>             
              </div>
              <button className={`${styles.delete} btn btn-danger mx-auto`}
              onClick={confirmDelete}
            >
              Delete Account
            </button>
          </>
        )}
      </div>
    </div>
  );
}

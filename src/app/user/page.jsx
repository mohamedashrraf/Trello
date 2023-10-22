"use client";
import React, { useContext, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../context/userContext';
import {useRouter} from "next/navigation"
export default function User() {
  const router = useRouter()
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);
  if(!localStorage.getItem("token")){

    router.push("/login")
  }
  // You can retrieve the userData from local storage here
  let userData = JSON.parse(localStorage.getItem("data"));

  const validationSchema = Yup.object().shape({
    userName: Yup.string().required('User Name is required').min(5).max(30),
    email: Yup.string().email('Invalid email').required('Email is required'),
    age: Yup.number().typeError('Age must be a number').required('Age is required').min(18).max(60),
  });

  // Function to update user data
  const updateUser = (values, actions) => {
    // Here you can implement logic to update the user data, e.g., save it back to local storage.
    console.log(values);
    setIsEditing(false);
    // Call actions.setSubmitting(false); when the update is complete to enable the button.
  };

  return (
    <div className='container'>
      <div className='col-md-4 text-center mx-auto'>
        {isEditing ? (
          <Formik
            initialValues={{
              userName: userData?.userName,
              email: userData?.email,
              age: userData?.age,
            }}
            validationSchema={validationSchema}
            onSubmit={updateUser}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="form-group">
                  <label htmlFor="userName">User Name</label>
                  <Field type="text" name="userName" className="form-control" />
                  <ErrorMessage name="userName" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Field type="text" name="email" className="form-control" />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>

                <div className="form-group">
                  <label htmlFor="age">Age</label>
                  <Field type="text" name="age" className="form-control" />
                  <ErrorMessage name="age" component="div" className="text-danger" />
                </div>

                <button type="submit" className="btn btn-outline-success" disabled={isSubmitting}>
                  Save
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <h1 className={`text-center`}>{userData?.userName}</h1>
            <h2 className={``}>{userData?.email}</h2>
            <h2 className={``}>{userData?.age}</h2>
          </>
        )}

        <button className='btn btn-outline-success' onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>
    </div>
  );
}

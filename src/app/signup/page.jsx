"use client";
import { useForm } from "react-hook-form";
import {useApi} from "../../../hooks/api";
import { useRouter } from "next/navigation";
import styles from "./signUp.module.css";
import Link from "next/link";
import { Fragment, useState } from "react";
export default function Signup() {
  const api = useApi();
  const submitInput = document.getElementById("submitInput")
  const errorsEmail = document.getElementById("errorsEmail")
  const [isLoading, setLoading] = useState(false);
  const submitHandler = async (reqData) => {
    const router =useRouter()
    try {
      setLoading(true);
      const res = await api.post("users/signUp", reqData);
      console.log(res.data);
      setLoading(false);
      router.push("/login");
    } catch (error) {
      setLoading(false);
      if(error.response?.data?.message == "email is unique"){
        console.log("email is unique")
        errorsEmail.innerText = "email is used"
      }
      console.log(error);
    }
  };
  const defaultValues = {
    userName: "",
    email: "",
    age: "",
    phone: "",
    password: "",
    rePassword: "",
    gender: "Gender",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onBlur" });
  
  return (
    <Fragment>
      <div className={styles.body}>
        <div className="container">
        <div className={styles.center}>
        <h1 className="mt-2">Sign Up</h1>

            <form
            className={styles.newForm}
            onSubmit={handleSubmit((data) => {
                data.rePassword = undefined;
                // console.log(data);
                submitHandler(data);
              })}
            >
              <div className={styles.txt_field}>
                <input
                  type="text"
                  className=""
                  id="inputUserName"
                  aria-describedby="userName"
                  {...register("userName", {
                    required: "user name is required",
                    min: {
                      value: 5,
                      message: "user name min is 5",
                    },
                    max: {
                      value: 100,
                      message: "user name max is 100",
                    },
                  })}
                />
                <span></span>
                <label htmlFor="inputUserName" className="form-label ">
                Username
              </label>
                <div>
                  <p className="text-danger"  >{errors.userName?.message}</p>
                </div>
              </div>
              <div className={styles.txt_field}>
                <input
                  type="email"
                  className=""
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  {...register("email", {
                    required: "email is required",
                    min: {
                      value: 5,
                      message: "email min is 5",
                    },
                    max: {
                      value: 100,
                      message: "email max is 100",
                    },
                    pattern: {
                      value: /^.+@.+\.(com|net|lol)$/,
                      message:
                        "Not accepted email should end with com or net or lol ",
                    },
                  })}
                />
                <span></span>
                <label htmlFor="exampleInputEmail1" className="form-label">
                Email
              </label>
                <div>
                  <p className="text-danger" id="errorsEmail">{errors.email?.message}</p>
                </div>
              </div>
              <div className={styles.txt_field}>
                <input
                  type="number"
                  className=""
                  id="inputAge"
                  aria-describedby="Age"
                  {...register("age", {
                    required: "age is required",
                    valueAsNumber: true,
                    validate: (value) => {
                      if (value > 100 || value < 18) {
                        return "age should between 18 and 100 ";
                      }
                    },
                  })}
                />
                <span></span>
                <label htmlFor="inputAge" className="form-label">
                Age
              </label>
                <div>
                  <p className="text-danger">{errors.age?.message}</p>
                </div>
              </div>
              <div className={styles.txt_field}>
                <input
                  type="text"
                  className=""
                  id="inputPhone"
                  aria-describedby="Phone"
                  {...register("phone", {
                    required: "phone is required",
                    pattern: {
                      value: /^0(10|11|12|15)\d{8}$/,
                      message: "Not accepted phone numper",
                    },
                  })}
                />
                <span></span>
                <label htmlFor="inputPhone" className="form-label">
                Phone
              </label>
                <div>
                  <p className="text-danger">{errors.phone?.message}</p>
                </div>
              </div>
              <div className={styles.txt_field}>

                <input
                  type="password"
                  className=""
                  id="exampleInputPassword1"
                  {...register("password", {
                    required: "password is required",
                    min: {
                      value: 8,
                      message: "password min is 8",
                    },
                    max: {
                      value: 100,
                      message: "password max is 100",
                    },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,100}$/,
                      message:
                        "Minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
                    },
                  })}
                />
                <span></span>
                <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
                <div>
                  <p className="text-danger">{errors.password?.message}</p>
                </div>
              </div>
              <div className={styles.txt_field}>

                <input
                  type="password"
                  className=""
                  id="inputrePassword"
                  {...register("rePassword", {
                    required: "rePassword is required",
                    min: {
                      value: 8,
                      message: "rePassword min is 8",
                    },
                    max: {
                      value: 100,
                      message: "rePassword max is 100",
                    },
                    validate: (value) => {
                      if (value != watch("password")) {
                        return "rePassword should equal password";
                      }
                    },
                  })}
                />
                <span></span>
                <label htmlFor="exampleInputPassword1" className="form-label">
                Re Password
              </label>
                <div>
                  <p className="text-danger">{errors.rePassword?.message}</p>
                </div>
              </div>
              <div className="dropdown">
                <div className="mb-3">
                  <select
                    className="form-select"
                    aria-label="Gender"
                    {...register("gender", {
                      required: "Gender is required",
                      validate: (value) => {
                        if (value != "male" && value != "female") {
                          return "Gender only male or female";
                        }
                      },
                    })}
                  >
                    <option>Gender</option>
                    <option value="male">male</option>
                    <option value="female">female</option>
                  </select>
                  <div>
                    <p className="text-danger">{errors.gender?.message}</p>
                  </div>
                </div>
              </div>
              <div>
                <button
                  name="submit" type="Submit" className={styles.sub}
                >{isLoading? <i className='fa fa-spin fa-spinner'></i>:<><i className='fa fa-edit'></i>signUp</>}</button>
            </div>
            <div>
              <div className={styles.signup_link}>
                Have account ? <Link href="/login">Login</Link>
              </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

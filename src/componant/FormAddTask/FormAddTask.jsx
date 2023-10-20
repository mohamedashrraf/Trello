"use client";
import { useForm } from "react-hook-form";
import React from "react";
import { useApiAuth } from "../../../hooks/api";
import { useMutation } from "react-query";
import { useSelector } from "react-redux";
import styles from "./FormAddTask.module.css";
export default function FormAddTask({}) {
  const refetch = useSelector((status) => status.tasks.refetch);
  const userId = useSelector((status) => status.tasks.userId);
  const api = useApiAuth();
  const mutation = () => {
    return useMutation(async (data) => {
      await api.post("/tasks/task", data);
      refetch();
    });
  };
  const { mutate, error, data: serverData } = mutation();
  const defaultValues = {
    title: "",
    description: "",
    userId: userId,
    assignTo: userId,
    deadline: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onBlur" });

  return (
    <div className="row">
    <div className="col-md-3"></div>
      <div className="col-md-6">
        <section className={styles.login}>
          <form
          className={styles.newForm}
            onSubmit={handleSubmit((data) => {
              console.log(data);
              console.log(defaultValues);
              mutate(data);
              reset();
            })}
          >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                {...register("title", {
                  required: "title is required",
                  minLength: {
                    value: 5,
                    message: "title min is 5",
                  },
                  maxLength: {
                    value: 50,
                    message: "title max is 50",
                  },
                })}
              />
              <div>
                <p className="text-danger">{errors.title?.message}</p>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">
                description
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                {...register("description", {
                  required: "description is required",
                  minLength: {
                    value: 5,
                    message: "description min is 5",
                  },
                  maxLength: {
                    value: 200,
                    message: "description max is 200",
                  },
                })}
              />
              <div>
                <p p className="text-danger">{errors.description?.message}</p>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="inputAge" className="form-label">
                deadline
              </label>
              <input
                type="date"
                className="form-control"
                id="inputAge"
                aria-describedby="deadline"
                {...register("deadline", {
                  required: "deadline is required",
                  valueAsDate: true,
                })}
              />
              <div>
                <p p className="text-danger">{errors.deadline?.message}</p>
              </div>
            </div>
            <button type="submit" className={styles.btnLogin}>
              Add
            </button>
          </form>
        </section>
        <div className="col-md-3"></div>

      </div>
    </div>
  );
}

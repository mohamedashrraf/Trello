"use client";
import { useForm } from "react-hook-form";
import React from "react";
import { useApiAuth } from "../../../hooks/api";
import { useMutation } from "react-query";
export default function FormAddTask({ refetch }) {
  const api = useApiAuth();
  const mutation = () => {
    return useMutation(async (data) => {
      await api.post("/tasks/task", data);
      refetch();
    });
  };
  const { mutate, error } = mutation();
  let userId ;
  React.useEffect(()=>{
    userId = JSON.parse(localStorage.getItem("data"))._id;

  },[])
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
    formState: { errors },
  } = useForm({ defaultValues, mode: "onBlur" });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
          console.log(data);
          mutate(data);
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
            <p>{errors.email?.message}</p>
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
            <p>{errors.description?.message}</p>
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
            <p>{errors.deadline?.message}</p>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
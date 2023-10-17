"use client";
import { useForm } from "react-hook-form";
import React from "react";
import { useApiAuth } from "../../../hooks/api";
import { useMutation } from "react-query";
export default function FormUpdateTask({ refetch, task }) {
  const api = useApiAuth();
  const mutation = () => {
    return useMutation(async (data) => {
      await api.patch(`/tasks/task/${task._id}`, data);
      refetch();
    });
  };
  const { mutate, error } = mutation();
  const defaultValues = {
    title: task.title,
    description: task.description,
    status: task.status,
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues, mode: "onBlur" });
  return (
    <>
      <form
        onSubmit={handleSubmit((data) => {
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
            <p>{errors.title?.message}</p>
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
              maxLength: {
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
        <div className="dropdown">
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="status"
              {...register("status", {
                required: "status is required",
                validate: (value) => {
                  if (value != "toDo" && value != "doing" && value != "done") {
                    return "status only toDo doing done";
                  }
                },
              })}
            >
              <option value="toDo">toDo</option>
              <option value="doing">doing</option>
              <option value="done">done</option>
            </select>
            <div>
              <p>{errors.status?.message}</p>
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {/* <div>hi</div> */}
    </>
  );
}

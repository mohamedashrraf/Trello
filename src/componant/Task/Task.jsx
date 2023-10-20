"use client";
import React, { useEffect } from "react";
import FormUpdateTask from "../FormUpdateTask/FormUpdateTask";
import styles from "./Task.module.css";
// const task = {
//   _id: "652c2a7387eef38df1deefcb",
//   title: "string",
//   description: "ljljlk;lrk;lklfjldflhkdf;lhfd",
//   status: "toDo",
//   userId: "652c0605dd35e2fe7c97d37a",
//   assignTo: "652c0605dd35e2fe7c97d37a",
//   deadline: "2020-10-01T00:00:00.000Z",
//   createdAt: "2023-10-15T18:07:47.616Z",
//   updatedAt: "2023-10-15T18:07:47.616Z",
// };
export default function Task({ task, deleteTask, refetch }) {
  const id = task._id;

  return (

    <div className={styles.theTask}>
    <h2>{task.title}</h2>
    <div>
      <p ><strong>Description:</strong> {task.description}</p>
    </div>
    <div>
      <p><strong>Status</strong>: {task.status}</p>
    </div>
    <div><strong>Deadline</strong>: {task.deadline}</div>
    <button
    className="btn btn-danger "
      type="button"
      onClick={() => {
        deleteTask(id);
      }}
    >
    Delete
    </button>
    <div className={styles.disapper}>
      <FormUpdateTask refetch={refetch} task={task} />
    </div>
  </div>
  );
}

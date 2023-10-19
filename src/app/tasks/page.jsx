"use client";
import React, { use, useEffect } from "react";
import Task from "../../componant/Task/task";
import { useApiAuth } from "../../../hooks/api";
import { useQuery } from "react-query";
import FormAddTask from "@/componant/FormAddTask/FormAddTask";
import FormUpdateTask from "@/componant/FormUpdateTask/FormUpdateTask";
import { setRefetch } from "@/tsakesSlice/tsakesSlice";
import { useDispatch } from "react-redux";
// export const metadata = {
//   title: "Tasks",
//   description: "Tasks page",
// };
// let tasks = [{
//   _id: "652c2a7387eef38df1deefcb",
//   title: "string",
//   description: "ljljlk;lrk;lklfjldflhkdf;lhfd",
//   status: "toDo",
//   userId: "652c0605dd35e2fe7c97d37a",
//   assignTo: "652c0605dd35e2fe7c97d37a",
//   deadline: "2020-10-01T00:00:00.000Z",
//   createdAt: "2023-10-15T18:07:47.616Z",
//   updatedAt: "2023-10-15T18:07:47.616Z",
// }];
export default function Tasks() {
  const dispatch = useDispatch();
  let tasks = [];
  let taskJsx;
  const api = useApiAuth();

  const { isLoading, data, error, refetch } = useQuery(
    "tasks",
    async () => await api.get("/tasks/task")
  );
  dispatch(setRefetch(refetch));
  const deleteTask = async (id) => {
    await api.delete(`/tasks/task/${id}`);
    refetch();
  };
  if (data) {
    tasks = data.data.data;
    if (tasks.length == 0) {
      taskJsx = <div>not found task</div>;
    } else {
      taskJsx = tasks.map((task) => {
        return (
          <Task
            task={task}
            key={task._id}
            deleteTask={deleteTask}
            refetch={refetch}
          />
        );
      });
    }
  }

  return (
    <main>
      {isLoading || (data && taskJsx)}
      <FormAddTask refetch={refetch} />
    </main>
  );
}

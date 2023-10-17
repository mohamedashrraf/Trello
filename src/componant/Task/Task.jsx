"use client" 
import React, { useEffect } from "react";
import FormUpdateTask from "../FormUpdateTask/FormUpdateTask";
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
export default function Task({task,deleteTask,refetch}) {
    const id = task._id
   
  return( <section>
    <h2>{task.title}</h2>
    <div><p>description:{task.description}</p></div>
    <div><p>status:{task.status}</p></div>
    <div>deadline:{task.deadline}</div>
    
    <input type="button" onClick={()=>{deleteTask(id)}} value={"delete task"}/>
    <FormUpdateTask refetch={refetch} task={task}/>
  </section>);
}

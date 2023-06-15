import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { useFormik } from "formik";
import TaskList from "./task";
import "./taskManager.css";

const validate = (values) => {
  const errors = {};
  if (!values.title) {
    errors.title = "Required";
  } else if (values.title.length > 30) {
    errors.title = "Must be 30 characters or less";
  }
  if (!values.description) {
    errors.description = "Required";
  }
  return errors;
};

function AddTaskForm() {
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status:"todo"
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      (async()=>{
        await axiosInstance.post('/tasks',{
          title:values.title,
          description:values.description,
          status:values.status
        }).then((response)=>{
          console.log(response.data);
       });
       })();
      resetForm();
    },
  });
  return (
    <form
      onSubmit={formik.handleSubmit}
      className=" addtask-form d-flex flex-column align-items-start"
    >
      {/* <label htmlFor="title" className=''>Title</label> */}
      <input
        className="my-2 "
        id="title"
        name="title"
        type="text"
        placeholder="Title.."
        onChange={formik.handleChange}
        value={formik.values.title}
      />
      {formik.errors.title ? <div>{formik.errors.title}</div> : null}

      {/* <label htmlFor="description">Description</label> */}
      <textarea
        className="my-2"
        id="description"
        name="description"
        type="textarea"
        rows="4"
        cols="40"
        placeholder="Description.."
        onChange={formik.handleChange}
        value={formik.values.description}
      />
      {formik.errors.description ? (
        <div>{formik.errors.description}</div>
      ) : null}

      <button type="submit" className="add-task-button btn w-100">
        Add Task
      </button>
    </form>
  );
}

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState();

  // setTasks([{title:'title1', description:'desc1'}]);
  const addTask = () => {
    // if (title.trim() !== '' && desc.trim()!== '') {
    //   setTasks([...tasks, {title,desc:desc}]);
    //   setNewTask('');
    // }
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const updateTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

  return (
    
      <div className=" main-container d-flex flex-column justify-content-around align-items-center ">
        <div className="header-container d-flex justify-content-center align-items-center  my-2 text-center w-100">
          <h1>Task Manager</h1>
        </div>

        <div className="addtask-container m-2 w-75">
          <AddTaskForm />
        </div>

        <div className="tasks-container mb-4 w-75">
          <TaskList/>
        

          {/* <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <input
              type="text"
              value={task}
              onChange={(e) => updateTask(index, e.target.value)}
            />
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul> */}
        </div>
      </div>
  );
};

export default TaskManager;

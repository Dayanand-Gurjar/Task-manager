import React, { useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import "./taskManager.css";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [reducerValue, setforceUpdate] = useReducer((x) => x + 1, 0);

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      await axios.get("/api/tasks").then((response) => {
        setTasks(response.data);
      });
    })();
  }, [reducerValue]);

  const AddTaskForm = () => {
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

    const PostTask = async (values) => {
      const v = await axios.post("/api/tasks", {
        title: values.title,
        description: values.description,
        status: values.status,
      });
      setforceUpdate();
    };

    const formik = useFormik({
      initialValues: {
        title: "",
        description: "",
        status: "todo",
      },
      validate,
      onSubmit: (values, { resetForm }) => {
        PostTask(values);
        resetForm();
      },
    });
    return (
      <form
        onSubmit={formik.handleSubmit}
        className=" addtask-form d-flex flex-column align-items-start"
      >
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
          ADD TASK
        </button>
      </form>
    );
  };

  const deleteTask = (task) => {
    if (window.confirm("Are you sure to delete the task?") == true) {
      const DeleteTask = async (task) => {
        console.log(task);
        await axios
          .delete(`/api/tasks/${task._id}`)
          .then((response) => {
            setforceUpdate();
          })
          .catch((error) => {
            alert("Some error occured : \n" + error);
          });
      };
      DeleteTask(task);
    }
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
        {tasks.map((task) => {
          return (
            <div key={task._id} className="main-task-div d-flex bg-light my-3 ">
              <div className="task-text d-flex align-items-center p-1" style={{'border':'none','border-left': task.status=='todo'? '5px solid red':'5px solid green'}}>
                {task.title}{" "}
              </div>

              <button className="delete-button"
                onClick={() => navigate("/tasks/" + task._id)}>
                <BiEdit className="icon-edit" />
              </button>
              <button
                className="delete-button"
                onClick={() => deleteTask(task)}
              >
                <AiFillDelete className="icon-delete" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskManager;

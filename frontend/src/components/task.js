import React, { useState,useEffect } from "react";
// import axiosInstance from "../axiosInstance";
import axios from "axios";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useFormik } from "formik";
import "./task.css";

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

const EditTask = ({ data }) => {
  const options = [
    { value: 'todo', label: 'Pending' },
    { value: 'completed', label: 'Completed' }
  ];

  const formik = useFormik({
    initialValues: {
      id: data._id,
      title: data.title,
      description: data.description,
      status:data.status,
    },
    validate,
    onSubmit: (values, { resetForm }) => {
      (async()=>{
        await axios.put(`/api/tasks/${values.id}`,{
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
    <>
      <BiEdit
        className="icon-edit"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      />
      <div class="modal fade" id="exampleModal" tabindex="-1">
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Task ID : {data._id} </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form className=" addtask-form d-flex flex-column align-items-start">
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
                <div className="status-selector d-flex justify-content-between ">
                  <h5 className="mr-2">Status: </h5>
                <select>
            {options.map((option) => (
              <option value={option.value}>{option.label}</option>
            ))}
          </select>
          </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="submit"
                class="btn btn-primary"
                onClick={formik.handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const deleteTask=(task)=>{
  console.log(task);
   if(window.confirm('Are you sure to delete the task?')==true){
    const DeleteTask=async (task)=>{
      console.log(task);
      await axios.delete(`/api/tasks/${task._id}`).then(response=>{
         console.log(response.data);
       }).catch(error=>{
        alert('Some error occured : \n'+error);
       })
    };
    DeleteTask(task);
  }
}

const TaskList = () => {
  const [click, setClick] = useState (false)
  const [tasks, setTasks] = useState([]);
  useEffect(()=>{
   (async()=>{
    await axios.get('/api/tasks').then((response)=>{
      setTasks(response.data);
   });
   })();
  },[]);

  const handleClick =(task) =>{
    setClick (!click);
    // deleteTask(task);
  }

  return (
     tasks?
    <> 
      {
        tasks.map((task) => {
          
          return (<div key={task.id} className="main-task-div d-flex bg-light my-3 ">
            <div className="task-text d-flex align-items-center p-1">
              {task.title}{" "}
            </div>
            <EditTask className="icon-edit" data={task} />
            {console.log(task)}
            <button className="delete-button" onClick={()=>deleteTask(task)}  ><AiFillDelete className="icon-delete" /></button>
          </div>
          );
      })}
    </> : null
  );
};
export default TaskList;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik } from "formik";
import { useParams } from "react-router-dom";


const EditTask = () => {
  const id = useParams().id;
  const navigate=useNavigate();
  console.log(id);

  const [taskData, setTaskData] = useState({});

  useEffect(() => {
      axios.get("/api/tasks/" + id).then((res) => {
        setTaskData(res.data);
        console.log(res.data);
      })
  }, []);

  const options = [
    { value: "todo", label: "Pending" },
    { value: "completed", label: "Completed" },
  ];

  return (
    <>
      {console.log(taskData)}
      <div className=" main-container d-flex flex-column justify-content-start align-items-center ">
        <div className="header-container d-flex justify-content-center align-items-center  my-4 text-center w-100">
          <h3 class="modal-title">Task ID : {taskData._id} </h3>
          <button type="button" class="btn-close" onClick={()=>{navigate("/")}}></button>
        </div>
        <div className="addtask-container  w-75">

          <Formik enableReinitialize
       initialValues={{
        id: taskData._id,
        title: taskData.title,
        description: taskData.description,
        status: taskData.status,
      }}
      validate = {(values) => {
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
      }}
      onSubmit={(values,{setSubmitting}) => {
        console.log(values);
        (async () => {
          await axios
            .put(`/api/tasks/${values.id}`, {
              title: values.title,
              description: values.description,
              status: values.status,
            })
            .then((response) => {
                setSubmitting(false);
            });
        })();
        navigate("/");
      }}
    
     >
       {({
         values,
         errors,
         handleChange,
         handleSubmit,
         isSubmitting,
       }) => (
         <form onSubmit={handleSubmit} className=" addtask-form d-flex flex-column align-items-start justify-content-around p-2 my-2">
           <input
              className="my-2 "
              id="title"
              name="title"
              type="text"
              placeholder="Title.."
              onChange={handleChange}
              value={values.title}
            />
            {errors.title ? <div>{errors.title}</div> : null}

            <textarea
              className="my-2"
              id="description"
              name="description"
              type="textarea"
              rows="4"
              cols="40"
              placeholder="Description.."
              onChange={handleChange}
              value={values.description}
            />
            {errors.description ? (
              <div>{errors.description}</div>
            ) : null}
            <div className="status-selector d-flex justify-content-between ">
              <h5 className="mr-2">Status: </h5>
              <select
                id="status"
                name="status"
                onChange={handleChange}
                value={values.status}
              >
                {options.map((option) => (
                  <option value={option.value}>{option.label}</option>
                ))}
              </select>
              </div>
           <button type="submit" disabled={isSubmitting} className="submit-button align-self-end btn-success rounded">
             Submit
           </button>
         </form>
       )}
     </Formik>
        </div>
      </div>
    </>
  );
};

export default EditTask;

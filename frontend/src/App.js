import React from 'react';
import TaskManager from './components/taskManager';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import EditTask from './components/editTask';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route exact path='/' element={<TaskManager/>}/>
      <Route exact path='/tasks/:id' element={<EditTask/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;

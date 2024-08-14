
import HeaderComponent from './components/HeaderComponent';
import SideBar from './components/SideBar';
import { ROUTES } from './constant/routes';
import MainLayout from './layouts/MainLayout';
import AddNewTask from './pages/AddNewTask';
import AllTasks from './pages/AllTasks';
import DoingTasks from './pages/DoingTasks';
import DoneTasks from './pages/DoneTasks';
import NewTasks from './pages/NewTasks';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import UpdateTask from './pages/UpdateTask';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout/>}>
          <Route index element={<AllTasks/>}/>
          <Route
            path={ROUTES.ALL_TASK}element={<AllTasks />}/>
            <Route
            path={ROUTES.UPDATE_TASK}element={<UpdateTask />}/>
          <Route
            path={ROUTES.NEW_TASK}element={<NewTasks />}/>
          <Route
            path={ROUTES.DOING_TASK}element={ <DoingTasks />}/>
          <Route
            path={ROUTES.DONE_NEW}element={<DoneTasks/>}/>
            <Route
            path={ROUTES.ADD_NEW}element={<AddNewTask/>}/>
          </Route>
          
          <Route
            path={'/'}
            element={
              <Navigate to={ROUTES.ALL_TASK}/>
            }
          />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

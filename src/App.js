
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Finalform from './component/finalform';
import Register from './component/register';
import ContentPage from './component/contentpage';
import File from './component/file';

function App() {
   return(
    <>
    <ToastContainer></ToastContainer>
    <BrowserRouter>
    <Routes>
    <Route  path="/register" element={<Register/>}/> 
    <Route path='/login' element={<Finalform/>}/>
    <Route path='/' element={<ContentPage/>}/>
    <Route path='/file' element={<File/>}/>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;

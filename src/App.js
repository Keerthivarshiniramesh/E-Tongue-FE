import { Route, Routes } from 'react-router-dom';
import './css/App.css';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import { useContext } from 'react';
import { DContext } from './context/Datacontext';
import LoadingPage from './components/pages/Loading';

import { ETongue } from './components/pages/Dashboard';

function App() {

  const {isAuth, currentUser} = useContext(DContext)

  if(isAuth===null || !currentUser){
    return <LoadingPage/>
  }

  return (
    <div className="container-fluid p-0">
   
      <Routes>
        <Route path="/" element={isAuth ? <ETongue />:<Login/>} />
        <Route path="/dashboard" element={<ETongue />} />
        <Route path="/login" element={isAuth ? <ETongue />:<Login/>} />
        <Route path='/register' element={isAuth ? <ETongue />:<Register/>} />
    
        <Route path='/test' element={<LoadingPage/>} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;

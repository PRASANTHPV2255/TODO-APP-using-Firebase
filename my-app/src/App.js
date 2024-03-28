
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Login';
import MainPage from './MainPage';
import Completed from './Completed';
import { AuthContextProvider } from './AuthContex';
import Protected from './Protected';
import Favourite from './Favourite';
import Deleted from './Deleted';

function App() {
  return (
    <div className="App">

      <AuthContextProvider>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/main' element={
            <Protected>
              <MainPage/>
            </Protected>
          }/>
          <Route path='/completed' element={<Completed/>}/>
          <Route path='/fav' element={<Favourite/>}/>
          <Route path='/deleted' element={<Deleted/>}/>
        </Routes>
        </BrowserRouter>
      </AuthContextProvider>

    
      
    </div>
  );
}

export default App;

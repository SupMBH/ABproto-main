import { Route, Routes } from 'react-router-dom';
import "./css/main.css";
// pages
import Home from './pages/Home';
import Layout from './pages/Layout';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RequireAuth from './components/RequireAuth';
import Error from './pages/Error';
import Transactions from './pages/Transactions';

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path='/transactions' element={<Transactions />} />
            <Route path='/user' element={<Profile />} />
          </Route>
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

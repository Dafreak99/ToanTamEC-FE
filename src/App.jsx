import { Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import './css/style.scss';
import { getMe } from './features/user/userSlice';
import Diary from './pages/Diary';
import Login from './pages/Login';
import Profile from './pages/Profile';
import ProjectDetail from './pages/ProjectDetail';
// Import pages
import Projects from './pages/Projects';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]); // triggered on route change

  useEffect(() => {
    dispatch(getMe());
  }, []);

  if (isLoading) {
    return (
      <Flex h='100vh' w='100vw' justifyContent='center' alignItems='center' />
    );
  }

  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/' element={<PrivateRoute />}>
        <Route exact path='/du-an' element={<Projects />} />
        <Route path='/du-an/:id' element={<ProjectDetail />} />
        <Route exact path='/nhat-ky' element={<Diary />} />
        <Route exact path='/thong-tin' element={<Profile />} />
        <Route exact path='*' />
      </Route>
    </Routes>
  );
}

export default App;

import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

import Home from './components/routes/home/home.component.jsx';
import Navigation from './components/navigation/navigation.component.jsx';
import Authenticate from './components/routes/authenticate/authenticate.component.jsx';
import DirectFlights from './components/routes/directflights/directflights.component.jsx';
import SearchResult from './components/routes/search-result/search-result.component.jsx';
import BookingPage from './components/routes/book/book.component.jsx';
import Default404 from './components/404-pages/default/default-404.component';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      dispatch(setCurrentUser(user));
    })
    return unsubscribe;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/auth' element={<Authenticate />} />
        <Route path='/directflights' element={<DirectFlights />} />
        <Route path='/search' element={<SearchResult />} />
        <Route path='/book' element={<BookingPage />} />
        <Route path='*' element={<Default404 />} />
      </Route>
    </Routes>
  )
}

export default App;

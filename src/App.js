import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';
import { setProducts } from './store/product/product.action';

import Home from './components/routes/home/home.component.jsx';
import Navigation from './components/navigation/navigation.component.jsx';
import Authenticate from './components/routes/authenticate/authenticate.component.jsx';
import DirectFlights from './components/routes/directflights/directflights.component.jsx';
import Search from './components/routes/search/search.component.jsx';
import BookingPage from './components/routes/book/book.component.jsx';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      await fetch('http://localhost:4000')
        .then((response) => response.json())
        .then((result) => dispatch(setProducts(result)))
        .then((result) => console.log(result))
        .catch((error) => console.log("An error occured!" + error))

    };

    getData();

  }, [dispatch]);

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
        <Route path='/search' element={<Search />} />
        <Route path='/book' element={<BookingPage />} />
      </Route>
    </Routes>
  )
}

export default App;

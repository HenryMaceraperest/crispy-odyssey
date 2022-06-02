import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

import Home from './routes/home/home.component.jsx';
import Navigation from './components/navigation/navigation.component.jsx';
import Authenticate from './routes/authenticate/authenticate.component.jsx';
import DirectFlights from './routes/directflights/directflights.component.jsx';
import SearchResult from './routes/search-result/search-result.component.jsx';
import BookingPage from './routes/book/book.component.jsx';
import Custom400Error from './components/404-pages/custom-400/custom-400.component';
import FindBookingPage from './routes/find-booking/find-booking.component';
import MyBookingsPage from './routes/my-bookings/my-bookings.component';
import ViewBookingPage from './routes/view-booking/view-booking.component';

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
        <Route path='/findbookings' element={<FindBookingPage />} />
        <Route path='/mybookings' element={<MyBookingsPage />} />
        <Route path='/viewbooking' element={<ViewBookingPage />} />
        <Route path='*' element={<Custom400Error bigText={'404'} smallText={`The page you're looking for is in another galaxy.`} />} />
      </Route>
    </Routes>
  )
}

export default App;

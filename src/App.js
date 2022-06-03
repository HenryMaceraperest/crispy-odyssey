import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { onAuthStateChangedListener, createUserDocumentFromAuth } from './utils/firebase/firebase.utils';
import { setCurrentUser } from './store/user/user.action';

import Home from './routes/home/home.component.jsx';
import Navigation from './components/common-components/main-components/navigation/navigation.component.jsx';
import Authenticate from './routes/authenticate/authenticate.component.jsx';
import DirectFlights from './routes/directflights/directflights.component.jsx';
import SearchResult from './routes/search-result/search-result.component.jsx';
import MakeBookingPage from './routes/bookings/make-booking/make-booking.component.jsx';
import Custom400Error from './components/common-components/main-components/custom-error-400-page/custom-400.component';
import FindBookingPage from './routes/bookings/find-booking/find-booking.component';
import MyBookingsPage from './routes/bookings/my-bookings/my-bookings.component';
import ViewSingleBookingPage from './routes/bookings/view-single-booking/view-single-booking.component';

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
        <Route path='/book' element={<MakeBookingPage />} />
        <Route path='/find-booking' element={<FindBookingPage />} />
        <Route path='/mybookings' element={<MyBookingsPage />} />
        <Route path='/viewbooking' element={<ViewSingleBookingPage />} />
        <Route path='*' element={<Custom400Error bigText={'404'} smallText={`The page you're looking for is in another galaxy.`} />} />
      </Route>
    </Routes>
  )
}

export default App;

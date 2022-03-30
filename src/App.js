import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/home.component.jsx';
import Navigation from './components/navigation/navigation.component.jsx';
import Authenticate from './components/routes/authenticate/authenticate.component.jsx';
import Shop from './components/routes/shop/shop.component.jsx';
import Footer from './components/footer/footer.component.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route path='/' element={<Footer />}>
          <Route index element={<Home />} />
          <Route path='/auth' element={<Authenticate />} />
          <Route path='/shop' element={<Shop />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App;

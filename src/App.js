import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/home.component.jsx';
import Navigation from './components/navigation/navigation.component.jsx';
import Authenticate from './components/routes/authenticate/authenticate.component.jsx';
import Shop from './components/routes/shop/shop.component.jsx';
import Search from './components/routes/search/search.component.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/auth' element={<Authenticate />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/search' element={<Search />} />
      </Route>
    </Routes>
  )
}

export default App;

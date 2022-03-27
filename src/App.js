import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/home.component.jsx';
import Navigation from './components/navigation/navigation.component.jsx';
import Authenticate from './components/routes/authenticate/authenticate.component.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/auth' element={<Authenticate />} />
      </Route>
    </Routes>
  )
}

export default App;

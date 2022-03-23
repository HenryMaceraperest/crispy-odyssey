import { Routes, Route } from 'react-router-dom';
import Home from './components/routes/home/home.component.jsx';
import Navigation from './components/navigation/navigation.component.jsx';
import SignIn from './components/routes/sign-in/sign-in.component.jsx';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='/signin' element={<SignIn />} />
      </Route>
    </Routes>
  )
}

export default App;
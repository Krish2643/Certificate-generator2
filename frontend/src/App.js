import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home/Home';
import Example from './pages/Certificate/Example'
import Certificate from './pages/Certificate/Certificate';
import Feedback from './pages/Feedback/Feedback';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/example' element={<Example />} />
      <Route path='/feedback' element={<Feedback />} />
      <Route path='/certificate-generate' element={<Certificate />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;

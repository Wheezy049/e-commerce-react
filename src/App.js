import './App.css';
import Header from './component/Header';
import Hero from './component/Hero';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SingleProduct from './component/SingleProduct';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Hero />} />
        <Route path='/mens' element={<Hero />} />
        <Route path='/womens' element={<Hero />} />
        <Route path='/jewelery' element={<Hero />} />
        <Route path='/electronics' element={<Hero />} />
        <Route path='/product/:id' element={<SingleProduct />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

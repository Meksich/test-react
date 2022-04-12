
import './App.css';
import Footer from './components/footer/Footer';
import Catalog from './components/catalog/Catalog';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, {useState} from 'react';
import HeaderContext from './contexts/HeaderContext';
import CatalogContext from './contexts/CatalogContext';
import Header from './components/header/Header';
import ItemPage from './components/itempage/ItemPage';
import Cart from './components/cart/Cart';

function App() {
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [dataRender, setDataRender] = useState([]);
  const [filters, setFilters] =  useState({});
  return (
    <BrowserRouter>
      <div>
        <HeaderContext.Provider value={{
          isSearchEnabled,
          setIsSearchEnabled,
        }}>
        <CatalogContext.Provider value={{
          dataRender,
          setDataRender,
          filters,
          setFilters,
        }}>
        <Header/>
        <Routes>
          
          <Route path={'/'} element={<Catalog/>} />
          <Route path={"/itempage/:id"} element={<ItemPage/>}/>
          <Route path={'/cart'} element={<Cart/>} />
        </Routes>
        <Footer />
        
        </CatalogContext.Provider>
        </HeaderContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;

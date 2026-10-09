 
 import {useAuth } from '@clerk/react'
import PageLoader from './components/pageloader';
import Layout from './components/Layout';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import OrdersPage from './Pages/OrdersPage';
 

function App() {
   const { isLoaded,isSignedIn } = useAuth();

   if (!isLoaded){ 
    return <PageLoader />
   }

  return (
   
   <Layout>
       <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage/>} />
        <Route path="/orders" element={isSignedIn?<OrdersPage/>:<Navigate to={"/"}/> } />
       </Routes>
    </Layout>
     
  );
 }

export default App

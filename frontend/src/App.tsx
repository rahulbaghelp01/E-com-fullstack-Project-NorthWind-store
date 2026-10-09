 
 import {useAuth } from '@clerk/react'
import PageLoader from './components/pageloader';
import Layout from './components/Layout';
import { Route, Routes } from 'react-router';
import HomePage from './Pages/HomePage';
 

function App() {
   const { isLoaded } = useAuth();

   if (!isLoaded){ 
    return <PageLoader />
   }

  return (
   
   <Layout>
       <Routes>
        <Route path="/" element={<HomePage />} />
       </Routes>
    </Layout>
     
  );
 }

export default App

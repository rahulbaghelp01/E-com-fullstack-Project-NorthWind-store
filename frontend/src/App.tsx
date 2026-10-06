 
 import { SignInButton,Show,UserButton,SignUpButton,useAuth } from '@clerk/react'
import PageLoader from './components/pageloader';
import Layout from './components/Layout';
 

function App() {
   const isLaoded = useAuth();

   if (!isLaoded){ 
    return <PageLoader />
   }

  return (
   
     <Layout>
      <header>
        <Show when="signed-out">
          <SignInButton mode='modal' />
          <SignUpButton mode='modal' />
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </header>
      <p className="text-lg text-gray-600">Welcome to your app!</p>
      <button className="btn btn-primary">Touch me</button>
    </Layout>
     
  );
 }

export default App

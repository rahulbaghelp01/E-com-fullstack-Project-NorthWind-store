 
 import { SignInButton,Show,UserButton,SignUpButton,useAuth } from '@clerk/react'
import PageLoader from './components/pageloader';
import Layout from './components/Layout';
 

function App() {
   const { isLoaded } = useAuth();

   if (!isLoaded){ 
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
       
    </Layout>
     
  );
 }

export default App

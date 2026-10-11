
import { useAuth } from '@clerk/react'
import PageLoader from './components/pageloader';
import Layout from './components/Layout';
import { Navigate, Route, Routes } from 'react-router';
import HomePage from './Pages/HomePage';
import CartPage from './Pages/CartPage';
import OrdersPage from './Pages/OrdersPage';
import CheckoutReturnPage from './Pages/CheckoutReturnPage';
import ProductDetailPage from './Pages/ProductDetailPage';
import { SentryDemoPage } from './Pages/SentryDemoPage';
import OrderSummaryPage from './Pages/OrderSummaryPage';
import OrderDetailPage from './Pages/OrderDetailPage';
import OrderChatPage from './Pages/OrderChatPage';
import OrderVideoPage from './Pages/OrderVideoPage';


function App() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return <PageLoader />
  }

  return (

    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={isSignedIn ? <OrdersPage /> : <Navigate to={"/"} />} />
        <Route path="/checkout/return" element={<CheckoutReturnPage />} />
        <Route path="/product/:slug" element={<ProductDetailPage />} />
        <Route path="/demo-sentry" element={<SentryDemoPage />} />
        <Route path="/orders/:id" element={<OrderDetailPage />}>
          <Route index element={<OrderSummaryPage />} />
          <Route path="chat" element={<OrderChatPage />} />
          <Route
            path="call"
            element={isSignedIn ? <OrderVideoPage /> : <Navigate to="/orders" replace />}
          />
        </Route>
      </Routes>
    </Layout>

  );
}

export default App

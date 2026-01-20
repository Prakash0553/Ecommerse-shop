import { Route, Routes } from "react-router-dom"
import AuthLogin from "./pages/auth/Login"
import AuthRegister from "./pages/auth/Register"
import AuthLayout from "./components/auth/Layout"
import AdminLayout from "./components/admin-view/Layout"
import AdminDashboard from "./pages/auth/admin-view/dashboard"
import AdminProducts from "./pages/auth/admin-view/products"
import AdminOrders from "./pages/auth/admin-view/orders"
import AdminFeatures from "./pages/auth/admin-view/features"
import ShoppingLayout from "./components/shopping-view/layout"
import NotFound from "./pages/auth/not-found"
import ShoppingHome from "./pages/auth/shopping-view/home"
import ShoppingListing from "./pages/auth/shopping-view/listing"
import ShoppingCheckout from "./pages/auth/shopping-view/checkout"
import ShoppingAccount from "./pages/auth/shopping-view/account"
import CheckAuth from "./components/common/check-auth"
import UnauthPage from "./pages/auth/unauth-page"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { checkAuth } from "./store/auth-slice"
import { Skeleton } from "@/components/ui/skeleton"
import PaymentSuccessPage from "./pages/auth/shopping-view/payment-success"
import PaypalReturnPage from "./pages/auth/shopping-view/paypal-return"
import SearchProducts from "./pages/auth/shopping-view/search"



function App() {

  const {isAuthenticated, user, isLoading} = useSelector(state=>state.auth)
  const dispatch= useDispatch()
  
  useEffect(()=> {
    dispatch(checkAuth())
  },[dispatch])

  if(isLoading) return <Skeleton className="w-[600px] h-[600px]"/>

  return (
    <div className="flex flex-col overflow-hidden bg-white">

      <Routes>

        <Route
          path="/"
          element={
            <CheckAuth
              isAuthenticated={isAuthenticated}
              user={user}
            ></CheckAuth>
          }
        />
        {/* authentication */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>
           <Route path="login" element={<AuthLogin/>}/>
           <Route path="register" element={<AuthRegister/>}/>
        </Route>

        {/* admin */}
        <Route path="/admin" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
           <Route path="dashboard" element={<AdminDashboard/>}/>
           <Route path="products" element={<AdminProducts/>}/>
           <Route path="orders" element={<AdminOrders/>}/>
           <Route path="features" element={<AdminFeatures/>}/>
        </Route>

        {/* shopping */}
        <Route path="/shop" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
            <Route path="home" element={<ShoppingHome/>}/>
            <Route path="listing" element={<ShoppingListing/>}/>
            <Route path="checkout" element={<ShoppingCheckout/>}/>
            <Route path="account" element={<ShoppingAccount/>}/>
            <Route path="paypal-return" element={<PaypalReturnPage />} />
            <Route path="payment-success" element={<PaymentSuccessPage />} />
            <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* not found pages */}
        <Route path="*" element={<NotFound/>}/>

        {/* unauth page */}
        <Route path="/unauth-page" element={<UnauthPage/>}/>

      </Routes>
    </div>
  )
}

export default App

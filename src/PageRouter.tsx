import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";
import LostItemDetail from "./pages/LostItemDetail";
import ProductItemDetail from "./pages/products/ProductItemDetail";
import { Layout, LayoutGuest } from "./components/layout/Layout";
import { CustomersPage } from "./pages/seller/CustomersPage";
import { ProductsPage } from "./pages/seller/ProductsPage";
import { CatalogPage } from "./pages/seller/CatalogPage";
import { StorePage } from "./pages/seller/StorePage";
import { SellerLayout } from "./components/layout/SellerLayout";
import SellerStat from "./pages/seller/SellerStat";
import OrderPage from "./pages/seller/OrderPage";

const PageRouter = () => {
  return (
    <>
      <Router>
        <div className="min-h-screen">
          <Routes>
            <Route path="*" element={
              <LayoutGuest>
                <Home />
              </LayoutGuest>
            } />
            <Route path="/" element={
              <LayoutGuest>
                <Home />
              </LayoutGuest>
            } />
            <Route path="/login" element={
              <LayoutGuest>
                <Login />
              </LayoutGuest>
            } />
            <Route path="/register" element={
              <LayoutGuest>
                <Register />
              </LayoutGuest>
            } />
            <Route path="/search-results" element={
              <LayoutGuest>
                <SearchResults />
              </LayoutGuest>
            } />
            <Route path="/lost-item-detail/:id" element={
              <LayoutGuest>
                <LostItemDetail />
              </LayoutGuest>
            } />
            <Route path="/product-item-detail/:id" element={
              <Layout>
                <ProductItemDetail />
              </Layout>
            } />

            {/* Vendeur */}
            <Route path="/seller" element={
              <SellerLayout>
              <SellerStat />
            </SellerLayout>
              } />
            <Route path="/seller/store" element={
              <SellerLayout>
              <StorePage />
            </SellerLayout>
              } />
            <Route path="/seller/catalog" element={
              <SellerLayout>
                <CatalogPage />
              </SellerLayout>
            } />
            <Route path="/seller/products" element={
              <SellerLayout>
                <ProductsPage />
              </SellerLayout>
            } />
            <Route path="/seller/customers" element={
              <SellerLayout>
                <CustomersPage />
              </SellerLayout>
            } />
            <Route path="/seller/orders" element={
              <SellerLayout>
                <OrderPage />
              </SellerLayout>
            } />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default PageRouter
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

const PageRouter = () => {
  return (
    <>
        <Router>
            <div className="min-h-screen">
                <Routes>
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
                </Routes>
            </div>
        </Router>
    </>
  )
}

export default PageRouter
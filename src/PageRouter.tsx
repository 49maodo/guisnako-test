import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import SearchResults from "./pages/SearchResults";

const PageRouter = () => {
  return (
    <>
        <Router>
            <div className="min-h-screen ">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/search-results" element={<SearchResults />} />
                </Routes>
            </div>
        </Router>
    </>
  )
}

export default PageRouter
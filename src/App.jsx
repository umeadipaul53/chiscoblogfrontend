import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import NodeJs from "./pages/NodeJs";
import ReactPage from "./pages/ReactPage";
import NextJs from "./pages/NextJs";
import VueJs from "./pages/VueJs";
import Python from "./pages/Python";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import MyPosts from "./pages/MyPosts";
import PostDetails from "./pages/PostDetails";
import { useDispatch } from "react-redux";
import { fetchUser } from "./reducers/userReducer";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/nodejs" element={<NodeJs />} />
        <Route path="/react" element={<ReactPage />} />
        <Route path="/nextjs" element={<NextJs />} />
        <Route path="/vuejs" element={<VueJs />} />
        <Route path="/python" element={<Python />} />
        <Route path="/post-details/:id" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<MyPosts />} />
          <Route path="/edit-post/:id" element={<EditPost />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

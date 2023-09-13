import Header from "./components/Header";
import {Routes, Route } from "react-router-dom"
import { Posts } from "./pages/Posts"
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import UserPosts from "./pages/UserPosts";
import PostDetails from "./pages/PostDetails";

function App() {
  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/my-posts" element={<UserPosts/>} />
          <Route path="/post-details/:id" element={<PostDetails />} />
          <Route path="/register" element={<Register />} />
        </Routes>
    </div>
  );
}

export default App;

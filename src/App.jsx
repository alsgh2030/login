import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NaviBar from "./components/newComponents/NaviBar";
import AuthContextPro from "./components/newComponents/AuthContextPro";
import CreatePostPage from "./components/newComponents/CreatePostPage"
import EditPostPage from "./components/newComponents/EditPostPage"
import HomePage from "./components/newComponents/HomePage"
import LoginPage from "./components/newComponents/LoginPage"
import MemberListPage from "./components/newComponents/MemberListPage"
import PostListPage from "./components/newComponents/PostListPage"
import SignUpPage from "./components/newComponents/SignUpPage"

const App = () => {
  return (
  <AuthContextPro>
    <BrowserRouter>
      <NaviBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/join" element={<SignUpPage />} />
          <Route path="/memberList" element={<MemberListPage />} />
          <Route path="/boardList" element={<PostListPage />} />
          <Route path="/posts/create" element={<CreatePostPage />} />
          <Route path="/posts/edit:id" element={<EditPostPage />} />
        </Routes>
    </BrowserRouter>
  </AuthContextPro>
  );
};

export default App;

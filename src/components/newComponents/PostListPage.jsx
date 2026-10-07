import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

const PostListPage = () => {
  // 게시글 작성할 때 localStorage에 저장한 게시글 제목, 내용을 꺼내와야 목록을 띄울 수 있다
  // 화면에 띄울 게시글: []
  const [posts, setPosts] = useState([]);

  // 지금 로그인한 사람: null
  // const [currentUser, setCurrentUser] = useState(null);
  const { currentUser } = useAuth();

  // useEffect로 [] 페이지가 마운트될 때 localStorage에서 글 목록과 로그인한 사용자를 꺼내서 state에 넣음
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storedPosts);

    // const sotredUser = JSON.parse(localStorage.getItem("curretUser")); //useAuth로 currentUser 가지고옴
  }, []);

  const handleDelete = (id) => {
    const isConfirm = confirm("정말 이 게시글을 삭제하시겠습니까?");
    if (isConfirm) {
       // 삭제할 글이 아닌것만 남겨서 새 배열 만듦
      const updated = posts.filter((post) => post.id !== id);
      setPosts(updated); // 화면에서 삭제한 글은 안보이게끔 세팅한다
      localStorage.setItem("posts", JSON.stringify(updated));
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">게시글 목록</h1>

        {/* 글쓰기 버튼 누르면 게시글 작성 폼으로 이동 */}
        <Link
          to="/posts/create"
          className="bg-green-500 text-white px-3 py-1 rounded">
          글쓰기
        </Link>
      </div>
      <div className="space-y-3">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="border p-4 rounded shadow flex justify-between">
              <div>{post.title}</div>
              {/* 로그인한 상태면서 로그인한 사용자 아이디와 글쓴이의 아이디와 같을 경우에만 수정, 삭제가 보여야함, admin일시 모든 글 관리가능 */}
              {currentUser && (currentUser.userId === post.writeId || currentUser.userId === "admin" && currentUser.password === "admin") && (
                <div className="flex gap-3">
                  <Link to={`/posts/edit/${post.id}`} className="text-blue-500">
                    수정
                  </Link>

                  <button
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 cursor-pointer">
                    삭제
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div>게시글 없음</div>
        )}
      </div>
    </div>
  );
};

export default PostListPage;
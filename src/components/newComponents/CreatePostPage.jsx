import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // localStorage에서 저장한 로그인한 사람 정보를 가져온다
  // 로그인한 사람만 게시글 쓸 수 있도록 일단 로그인이 되어있는지 여부 확인
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // currentUser가 없으면 로그인 필요라고 출력
  // navigate는 화면이 렌더링된 이후에 실행되어야함(이벤트핸들러 함수 안에 넣거나 useEffect안에 넣음)
  useEffect(() => {
    if (!currentUser) {
      alert("로그인 필요");
      navigate("/login"); // 렌더링 끝나기 전에 다른 페이지로 이동함 -> 경고 뜸
    }
  }, [navigate]);

  return (
    <div className="max-w-wl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h1 className="text-xl font-bold mb-4">게시글 작성</h1>

      <form onSubmit={onSubmit1}>
        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="border w-full p-2 mb-3 rounded h-40"
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          작성
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

const CreatePostPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  // localStorage에서 저장한 로그인한 사람 정보를 가져온다
  // 로그인한 사람만 게시글 쓸 수 있도록 일단 로그인이 되어있는지 여부 확인

  // const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { currentUser } = useAuth();

  // currentUser가 없으면 로그인 필요라고 출력
  // navigate는 화면이 렌더링된 이후에 실행되어야함(이벤트핸들러 함수 안에 넣거나 useEffect안에 넣음)
  useEffect(() => {
    if (!currentUser) {
      alert("로그인 필요");
      navigate("/login"); // 렌더링 끝나기 전에 다른 페이지로 이동함 -> 경고 뜸
    }
  }, [navigate]);

  const onSubmit1 = (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 입력해라");
      return;
    }

    // 처음에는 posts로 꺼내올 값이 없기 때문에 빈배열 []
    // 기존 게시글 목록을 꺼냄
    let posts = JSON.parse(localStorage.getItem("posts")) || [];

    // 게시글 객체 정의
    const newPost = {
      id: Date.now(),
      // title:title 이지만 동일할 시 생략가능
      title,
      content,
      // 로그인한 사람의 아이디
      writeId: currentUser.userId,
    };

    // posts는 state가 아니라 localStorage에서 꺼낸 지역변수 이기 때문에
    // react가 감시하는 값 아님 -> push로 바꿔도 문제없음
    posts.push(newPost);

    // localStorage에 저장
    localStorage.setItem("posts", JSON.stringify(posts));

    setTitle("");
    setContent("");

    // 게시글 목록 페이지로 이동 -> 이벤트 핸들러 안이라서 navigate 바로 씀
    navigate("/boardList");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
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

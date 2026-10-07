import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContextPro";

const NaviBar = () => {
  // AuthContextPro에 적은 currentUser, logout 가져오기
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate(); // 페이지 이동시키는 훅

  // <Link to ..>: 클릭해서 이동
  // navigate: 직접이동(강제이동)

  // 이벤트가 일어났을 때 실행되는 함수 -> 렌더링 중이 아니라서 바로 호출해도 상관없음
  const logout1 = () => {
    logout();
    navigate("/"); // 로그아웃 하고 나서 홈 화면 (기본경로)로 이동해줘
  };

  return (
    <nav className="bg-orange-200 shadow-md">
      <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
        <div className="flex gap-6 font-semibold">
          <Link to="/">홈</Link>
          <Link to="/memberList">회원목록</Link>
          <Link to="/boardList">게시글목록</Link>
        </div>

        {/* 로그인이 안되어있으면 로그인, 회원가입 보이고, 되어있으면 이름, 로그아웃이 보여야한다 */}
        <div className="flex gap-4 items-center">
          {!currentUser && (
            <div className="flex gap-3">
              <Link to="/login">로그인</Link>
              <Link to="join">회원가입</Link>
            </div>
          )}

          {currentUser && (
            <div>
              {/* <span>{currentUser.이름}</span> */}
              <button
                onClick={logout1}
                className="bg-red-400 text-white px-3 py-1 rounded">로그아웃</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NaviBar;

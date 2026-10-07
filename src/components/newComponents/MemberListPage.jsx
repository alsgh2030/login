import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContextPro";

const MemberListPage = () => {
  // 1. 로컬스토리지에서 회원정보들 다 가져오기
  const users = JSON.parse(localStorage.getItem("users")) || [];
  

  // 관리자로 로그인하면 회원목록 보이고, 아니면 안보이게
  // 2. 로그인한 사용자 상태 초기화 - null로 초기화
  // 처음에 null(아무도 로그인 안 한 상태)로 시작
  const [currentUser, setCurrentUser] = useState(null);
  // const {currentUser, setCurrentUser}=useAuth(); // 둘 중 아무거나 써도 됨

  // 3. 로컬스토리지에서 로그인한 사용자 가져온다
  // 컴포넌트가 처음화면에 나타날 때 한번만 실행되게 ->
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(storedUser);
  }, []);

  return (
    <div>
      <h1>회원목록</h1>
      {/* 로그인 한 상태에서 */}
      {currentUser && currentUser.userId === "admin" && currentUser.password === "admin" ? (
        <ul>
          {users.length > 0 ? ( // 0보다 크면 -> 로그인 한 회원이 있으면
            users.map((user, index) => <li key={index}>{user.userId}</li>)
          ) : (
            <li>회원 없다</li>
          )}
        </ul>
      ) : (
        <div>회원목록은 관리자만 볼 수 있습니다.</div>
      )}
    </div>
  );
};

export default MemberListPage;

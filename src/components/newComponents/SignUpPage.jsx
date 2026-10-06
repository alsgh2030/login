import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onsubmit1 = (e) => {
    e.preventDefault();
    // ex) const user={userId:"abc", password:"1234"}
    // 입력창에 적은 값으로 객체 만듦
    // 변수이름과 속성이름이 같아야지 줄일 수 있음
    const user = { userId, password }; // const user2={userId:userId, password:password}

    // 회원가입한 사람들을 localStorage에서 꺼내온다
    // 이미 가입한 사람이 있으면 회원 배열을 가져오고, 없으면 빈배열을 가져온다

    // 1번째                    []
    // 2번째 => 가입 한 사람 했음 [{tom}]
    // 3번째 => 가입 두 사람 했음 [{tom},{jack}]
    let users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);

    // localStorage에 저장한다 (회원가입한 사람들을)
    localStorage.setItem("users", JSON.stringify(users));

    setUserId(""); // 다른 사람이 입력해야하기 때문에 공백으로 설정
    setPassword("");

    // 로그인 페이지로 강제이동
    navigate("/login");
    
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={onsubmit1} className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4 text-center">회원가입</h1>
        <input
          className="border w-full p-2 mb-3 rounded"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          className="border w-full p-2 mb-3 rounded"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white w-full py-2 rounded">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;

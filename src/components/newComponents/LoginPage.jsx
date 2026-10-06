import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  // userId, password 공백으로 초기화 (useState)
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onsubmit2 = (e) => {
    e.preventDefault();
    // 회원가입할 때 저장한 회원들 빼낸다
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // 회원가입할 때 저장한 회원들 정보({userId, password})
    const loginUser = users.find((user) => user.id === userId && user.password === password);

    if(loginUser){
      localStorage.setItem("currentUser", JSON.stringify());
    }
    // 회원가입시 localStorage에 저장(SignupPage.jsx -setItem)을 해서 -> 로그인하게 되면 내가 작성한 아이디, 비번이 회원가입시에 입력했던 아이디, 비번인지 확인
    // localStorage에 회원가입시에 저장했던 값이 있으면 로그인된다
    // 로그인을 한 후 localStorage에 setItem으로 저장하는 코드를 넣을거임

    // 아이디, 비번 등 잘못 입력해서 로그인이 안됨 (회원가입 할 때 저장했던 아이디, 비번이랑 비교했을 때 값이 일치하지 않으면)-> alert
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={onsubmit2} className="bg-white p-8 rounded shadow w-80">
        <h1 className="text-xl font-bold mb-4 text-center">로그인</h1>
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
        <button className="bg-blue-500 text-white w-full py-2 rounded">
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

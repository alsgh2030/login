import React, { createContext, useContext, useState } from 'react'

const AuthContext=createContext()

export const AuthContextPro=({children})=>{
  // 초기값을 localSotrage에서 읽기 (로그인 여부 확인해야함)
  // 로그인 기능을 구현할 때, 로그인을 한 후 localStorage에 setItem으로 저장하는 코드를 넣을거임

  // 로그인 되어있으면 -> 로그인 사용자를 currentUser에 대입
  // 로그인 안되어있으면 -> null -> currentUser에 대입
  const [currentUser, setCurrentUser]=useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  )

  // 로그아웃 하면 사용자 상태 null로 만들고, localStorage에서 저장한 값(로그인한 사용자 정보) 지운다
  const logout=()=>{
    setCurrentUser(null)
    localStorage.removeItem("currentUser")
  }

  return (
    <AuthContext.Provider value={{currentUser, setCurrentUser, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

// custom hook
export const useAuth=()=>useContext(AuthContext)

export default AuthContextPro

"use client"
import { redirect, usePathname } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quizDatas, setQuizDatas] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname()

  const getCurrentUser = () => {
    try {
      let result = localStorage.getItem("quizDatas");
      return result ? JSON.parse(result) : null;
    } catch (error) {
      console.log("error:", error);
      return null;
    }
  };

  useEffect(() => {
    const quizDatas = getCurrentUser();
    if (quizDatas) {
      setIsLoggedIn(true);
      setQuizDatas(quizDatas);
    } else {
      setIsLoggedIn(false);
      setQuizDatas(null);
    }
    setIsLoading(false);
  }, []);
if(pathname=="/")
  {
    redirect("/home")
  }
  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        quizDatas,
        setQuizDatas,
        isLoading,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

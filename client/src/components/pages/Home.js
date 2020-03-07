import AuthContext from "../../contexts/auth/AuthContext";
import React, { useEffect, useContext } from "react";
import spinner from "../../img/spinner.gif";

const Home = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    if (localStorage.getItem("myToken")) loadUser();

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>안녕하세요. beyondwoo에 오신 것을 환영 합니다</h1>
      <img src={spinner} alt="spinner..." />
    </div>
  );
};

export default Home;

import React, { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth/AuthContext";

const About = () => {
  const authContext = useContext(AuthContext);
  const { loadUser } = authContext;

  useEffect(() => {
    if (localStorage.getItem("myToken")) loadUser();

    //eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>About this App</h1>
      <h2>This is a contacts manager app</h2>
      <p className="my-1">
        you can easily REGISTER, MODIFY, DELETE your contacts online
      </p>
      <p>you can bring all in anytime, anywhere</p>
      <p className="bg-dark p">
        <strong>Version</strong> 1.0.1
      </p>
    </div>
  );
};

export default About;

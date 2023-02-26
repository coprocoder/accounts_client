import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import users from "../../store/users";
import BottomNav from "./bottomNav";
import "./index.scss";

const AppWrapper = observer(({children}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const curRoute = window.location.pathname;
    const nonAuthRoutes = ["/signin", "/signup"];

    const token = localStorage.getItem("token");

    const isUnauthInsideApp = !token && !nonAuthRoutes.includes(curRoute);
    const isAuthOnSignPage = token && nonAuthRoutes.includes(curRoute);
    if (isUnauthInsideApp || isAuthOnSignPage) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="appWrapper">
      <div className="appWrapper-content">{children}</div>
      {users.token && <BottomNav className="appWrapper-nav" />}
    </div>
  );
});

export default AppWrapper;

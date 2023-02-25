import {observer} from "mobx-react-lite";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";

import users from "../../store/users";
import BottomNav from "./bottomNav";
import "./index.scss";

const AppWrapper = observer(({children}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!users.token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="appWrapper">
      <div className="appWrapper-content">{children}</div>
      {users.token && <BottomNav className="appWrapper-nav" />}
    </div>
  );
});

export default AppWrapper;

import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newRoute) => {
        setValue(newRoute);
        navigate(newRoute);
      }}
      sx={{
        background: "var(--lightGray)",
        borderTop: "1px solid var(--gray)",
      }}
    >
      <BottomNavigationAction label="Главная" value="/" icon={<HomeIcon />} />
      <BottomNavigationAction
        label="Аккаунт"
        value="/account"
        icon={<PersonIcon />}
      />
      <BottomNavigationAction
        label="Люди"
        value="/people"
        icon={<PeopleAltIcon />}
      />
    </BottomNavigation>
  );
};

export default BottomNav;

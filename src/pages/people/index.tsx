import Box from "@mui/material/Box";
import {useEffect} from "react";
import PeopleList from "./peopleList";
import UserView from "./userView";
import users from "../../store/users";

const PeoplePage = () => {
  useEffect(() => {
    users.fetchPeople();
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        height: "100%",
      }}
    >
      <PeopleList />
      <UserView />
    </Box>
  );
};

export default PeoplePage;

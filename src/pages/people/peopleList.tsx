import React, {useEffect, useState} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./index.scss";
import Skeleton from "@mui/material/Skeleton";
import users, {IUser} from "../../store/users";
import {observer} from "mobx-react-lite";

const PeopleList = observer(() => {
  const [isVisible, setVisible] = useState<boolean>(true);

  const checkVisible = () => {
    const newVisible =
      users.selectedUserId == null ||
      (users.selectedUserId != null && window.innerWidth > 960);
    setVisible(newVisible);
  };

  useEffect(() => {
    window.addEventListener("resize", checkVisible);
    return () => window.removeEventListener("resize", checkVisible);
  }, []);

  useEffect(() => {
    checkVisible();
  }, [users.selectedUserId]);

  return (
    <List
      className="peopleList"
      style={{display: isVisible ? "unset" : "none"}}
      sx={{
        height: "100%",
        width: "100%",
        maxWidth: 300,
        borderRight: "1px solid var(--gray)",
      }}
    >
      {users.people
        ? (users.people as IUser[]).map((user: IUser, index: number) => {
            const imageUrl = user?.avatar
              ? process.env.REACT_APP_SERVER_URL + "/" + user?.avatar?.thumbnail
              : "";
            return (
              <React.Fragment key={`userListItem_${index}`}>
                {index > 0 && <Divider variant="inset" component="li" />}
                <ListItem
                  alignItems="flex-start"
                  onClick={() => {
                    users.selectedUserId = index as any;
                  }}
                  className="peopleList-user"
                  style={{
                    background:
                      users.selectedUserId == index
                        ? "var(--lightGray)"
                        : "transparent",
                  }}
                >
                  <ListItemAvatar>
                    <Avatar src={imageUrl} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user?.username}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{display: "inline"}}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          <>Birthday: {user?.birthday}</>
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
            );
          })
        : Array(3)
            .fill(0)
            .map((x, i) => (
              <React.Fragment key={`userListPlug_${i}`}>
                {i > 0 && <Divider variant="inset" component="li" />}
                <ListItem alignItems="flex-start" className="peopleList-user">
                  <ListItemAvatar>
                    <Skeleton
                      variant="circular"
                      width={40}
                      height={40}
                      animation="wave"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    secondary={
                      <React.Fragment>
                        <Skeleton
                          variant="text"
                          sx={{fontSize: "1.5rem"}}
                          animation="wave"
                        />
                        <Skeleton
                          variant="text"
                          sx={{fontSize: "1rem"}}
                          animation="wave"
                        />
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
    </List>
  );
});

export default PeopleList;

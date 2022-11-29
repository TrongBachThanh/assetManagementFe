import { createContext, useReducer, useEffect, useContext } from "react";

import UserReducer from "../reducers/UserReducer";
import {
  addUserAction,
  setUsersAction,
  editUserAction,
  setDisbleUserAction,
} from "../actions/UserAction";
import { AppContext } from "./AppProvider";
export const UserContext = createContext();

const initState = {
  users: [],
};

const UserProvider = (props) => {
  const [userState, dispatch] = useReducer(UserReducer, initState);
  const { appState } = useContext(AppContext);
  useEffect(() => {
    if (appState.user != null) setUsersAction()(dispatch);
  }, [appState.user]);

  const addUser = (user) => {
    addUserAction(user)(dispatch);
  };
  const editUser = (user) => {
    editUserAction(user)(dispatch);
  };
  const deleUser = (userId) => {
    setDisbleUserAction(userId)(dispatch);
  };

  const value = {
    userState,
    addUser,
    editUser,
    deleUser,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

export default UserProvider;

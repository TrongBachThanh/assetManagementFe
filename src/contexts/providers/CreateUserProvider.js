import { createContext, useContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { changeToSlug } from "../../utils/ConvertString";
import { getAge, isDay, isGreater } from "../../utils/DateUtils";
import * as Validate from "../../utils/Validate";
import {
  addErrorFieldAction,
  removeErrorFieldAction,
  setEnableSubmitAction,
  setFieldAction,
  submitAction,
} from "../actions/CreateUserAction";
import CreateUserReducer from "../reducers/CreateUserReducer";
import { UserContext } from "./UserProvider";

export const CreateUserContext = createContext();
const initState = {
  form: {
    firstName: "",
    lastName: "",
    dob: null,
    gender: true,
    joinedDate: null,
    role: "ADMIN",
  },
  status: {
    isLoading: false,
    success: true,
    message: "",
  },
  error: {},
  enableSubmit: false,
};

const CreateUserProvider = (props) => {
  const navigate = useNavigate();
  const [createUserState, dispatch] = useReducer(CreateUserReducer, initState);
  const { addUser } = useContext(UserContext);

  useEffect(() => {
    if (Object.keys(createUserState.error).length > 0 || isBlankField()) {
      setEnableSubmitAction(false)(dispatch);
    } else {
      setEnableSubmitAction(true)(dispatch);
    }
  }, [createUserState.error]);

  const changeField = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFieldAction(name, value)(dispatch);
    validateField(name, value);
  };

  const validateField = (name, value) => {
    value = value.trim();

    switch (name) {
      case "firstName":
        validateFirstName(value);
        break;
      case "lastName":
        validateLastName(value);
        break;
      case "dob":
        validateDob(value);
        break;
      case "joinedDate":
        validateJoinedDate(value);
        break;
      default:
        break;
    }
  };

  const validateFirstName = (value) => {
    const slug = changeToSlug(value);

    if (!Validate.validateFirstName(slug)) {
      if (value.length > 50) {
        addErrorFieldAction(
          "firstName",
          "First name is incorrect format. Max length is 50"
        )(dispatch);
      } else {
        addErrorFieldAction(
          "firstName",
          "First name is incorrect format"
        )(dispatch);
      }
    } else {
      if (value.length > 50) {
        addErrorFieldAction("firstName", "Max length is 50")(dispatch);
      } else {
        removeErrorFieldAction("firstName")(dispatch);
      }
    }
  };

  const validateLastName = (value) => {
    const slug = changeToSlug(value);

    if (!Validate.validateLastname(slug)) {
      if (value.length > 50) {
        addErrorFieldAction(
          "lastName",
          "Last name is incorrect format. Max length is 50"
        )(dispatch);
      } else {
        addErrorFieldAction(
          "lastName",
          "Last name is incorrect format"
        )(dispatch);
      }
    } else {
      if (value.length > 50) {
        addErrorFieldAction("lastName", "Max length is 50")(dispatch);
      } else {
        removeErrorFieldAction("lastName")(dispatch);
      }
    }
  };

  const validateDob = (value) => {
    if (value && getAge(value) < 18) {
      addErrorFieldAction(
        "dob",
        "User is under 18. Please select a different date"
      )(dispatch);
    } else {
      removeErrorFieldAction("dob")(dispatch);
    }

    validateJoinedDate(createUserState.form.joinedDate);
  };

  const validateJoinedDate = (value) => {
    const joinedDate = value;
    const { dob } = createUserState.form;
    const { error } = createUserState;

    if (dob && joinedDate && isGreater(dob, joinedDate)) {
      addErrorFieldAction(
        "joinedDate",
        "Joined date is not later than Date of Birth. Please select a different date"
      )(dispatch);
    } else if (joinedDate && (isDay(joinedDate, 0) || isDay(joinedDate, 6))) {
      if (error.joinedDate == null) {
        addErrorFieldAction(
          "joinedDate",
          "Joined date is Saturday or Sunday. Please select a different date"
        )(dispatch);
      } else {
        addErrorFieldAction(
          "joinedDate",
          "Joined date is not later than Date of Birth. Please select a different date. Joined date is Saturday or Sunday. Please select a different date. "
        )(dispatch);
      }
    } else {
      removeErrorFieldAction("joinedDate")(dispatch);
    }
  };

  const isBlankField = () => {
    if (
      createUserState.form.firstName == null ||
      createUserState.form.firstName.trim() == ""
    )
      return true;
    if (
      createUserState.form.lastName == null ||
      createUserState.form.lastName.trim() == ""
    )
      return true;
    if (
      createUserState.form.dob == null ||
      createUserState.form.dob.trim() == ""
    )
      return true;
    if (
      createUserState.form.joinedDate == null ||
      createUserState.form.joinedDate.trim() == ""
    )
      return true;
    if (createUserState.form.role == null) return true;
    if (createUserState.form.gender == null) return true;
    return false;
  };

  const submit = () => {
    if (Object.keys(createUserState.error).length == 0) {
      submitAction({ ...createUserState.form }, navigate, addUser)(dispatch);
    }
  };

  const value = {
    createUserState,
    changeField,
    submit,
    navigate,
  };

  return (
    <CreateUserContext.Provider value={value}>
      {props.children}
    </CreateUserContext.Provider>
  );
};

export default CreateUserProvider;

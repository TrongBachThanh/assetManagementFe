import { ACTIONS } from "../actions/ListAssignmentAction";

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.SET_FIELD_CONDITION:
      state = {
        ...state,
        conditions: {
          ...state.conditions,
          [payload.name]: payload.value,
        },
      };
      break;
    case ACTIONS.SET_FIELD_MODAL:
      state = {
        ...state,
        modalDetail: {
          ...state.modalDetail,
          [payload.name]: payload.value,
        },
      };
      break;
    case ACTIONS.SET_RETURN_ASSIGNMENT:
      state = { ...state, dialogReturn: payload };
      break;
    case ACTIONS.SET_ASSIGMENT_ID:
      state = { ...state, assignmentId: payload };
      break;
    case ACTIONS.SET_FIELD_DIALOG_RETURN:
      state = {
        ...state,
        dialogReturn: {
          ...state.dialogReturn,
          [payload.name]: payload.value,
        },
      };
      break;
    default:
      break;
  }
  return { ...state };
};

export default reducer;

import { ACTIONS } from "../actions/CreateUserAction";

const reducer = (state, {type,payload}) => {
  switch(type) {
    case ACTIONS.SET_FIELD:
      state = {...state, form: {...state.form, [payload.name] : payload.value}}
      break;
    case ACTIONS.SET_ENABLE_SUBMIT:
      state = {...state, enableSubmit: payload};
      break;
    case ACTIONS.SET_FIELD_ERROR:
      state = {...state, error: {...state.error, [payload.name]: payload.value}}
      break;
    case ACTIONS.REMOVE_FIELD_ERROR:
      delete state.error[payload];
      state = {...state, error: {...state.error}}
      break;
    case ACTIONS.ADD_FIELD_ERROR:
      state = {...state, error: {...state.error, [payload.name]: payload.value}}
      break;
    default: 
      break;
  }

  return {...state};
}

export default reducer;
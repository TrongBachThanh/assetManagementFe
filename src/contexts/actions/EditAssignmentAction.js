import axios from 'axios';


export const ACTIONS = {
  SET_FIELD: 'SET_FIELD',
  SET_ENABLE_SUBMIT: 'SET_ENABLE_SUBMIT',
  REMOVE_FIELD_ERROR: 'REMOVE_FIELD_ERROR',
  ADD_FIELD_ERROR: 'ADD_FIELD_ERROR',
  SET_ASSIGNMENT: 'SET_ASSIGNMENT',

  SET_LOADING: 'SET_LOADING',
  SET_MESSAGE: 'SET_MESSAGE',
  SET_SUCCESS: 'SET_SUCCESS',
  SET_STATUS: 'SET_STATUS',

  SET_FIELD_POPUP_ASSET: 'SET_FIELD_POPUP_ASSET',
  SET_FIELD_POPUP_USER: 'SET_FIELD_POPUP_USER'
}
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export const loadAssignmentAction = (id) => async dispatch => {
  await setTimeout(() => {
    const now = new Date();
    dispatch({
      type: ACTIONS.SET_ASSIGNMENT,
      payload: {
        id: id,
        userId: null,
        assetId: null,
        assignedDate: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
        note: "Nothing"    
      }
    })

    dispatch({
      type: ACTIONS.SET_FIELD_POPUP_USER,
      payload: {
        name: 'selected',
        value: 10
      }
    })

    dispatch({
      type: ACTIONS.SET_FIELD_POPUP_ASSET,
      payload: {
        name: 'selected',
        value: 12
      }
    });
  }, 1000)
}

export const loadAssetAction = () => async dispatch => {
  await axios.get(`${API_ENDPOINT}/v1/assets`).then(response => {
    setFieldPopupAssetAction('assets', response.data)(dispatch);
  }).catch(error => {
    if(error.response == undefined) {
      setStatusAction({
        isLoading: false,
        message: error.message,
        success: false
      })(dispatch)
    } else {
      setStatusAction({
        isLoading: false,
        message: error.response.data,
        success: false
      })(dispatch)
    }
  });

}

export const loadUserAction = () => async dispatch => {
  await axios.get(`${API_ENDPOINT}/v1/users`).then(response => {
    setFieldPopupUserAction('users', response.data)(dispatch);
  }).catch(error => {
    if(error.response == undefined) {
      setStatusAction({
        isLoading: false,
        message: error.message,
        success: false
      })(dispatch)
    } else {
      setStatusAction({
        isLoading: false,
        message: error.response.data,
        success: false
      })(dispatch)
    }
  });
}

export const setFieldAction = (name, value) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_FIELD,
    payload: {name, value}
  })
}

export const setEnableSubmitAction = (enable) => (dispatch) => {
  dispatch({
    type: ACTIONS.SET_ENABLE_SUBMIT,
    payload: enable
  });
}

export const setLoadingAction = (isLoading) => dispatch => {
  dispatch({
    type: ACTIONS.SET_LOADING,
    payload: isLoading
  })
}

export const addErrorFieldAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.ADD_FIELD_ERROR,
    payload: {name, value}
  })
}

export const removeErrorFieldAction = (name) => dispatch => {
  dispatch({
    type: ACTIONS.REMOVE_FIELD_ERROR,
    payload: name
  })
}

export const setStatusAction = (status) => dispatch => {
  dispatch({
    type: ACTIONS.SET_STATUS,
    payload: status
  })
}

export const setMessageAction = (message) => dispatch => {
  dispatch({
    type: ACTIONS.SET_MESSAGE,
    payload: message
  })
}

export const setSuccesAction = (success) => dispatch => {
  dispatch({
    type: ACTIONS.SET_SUCCESS,
    payload: success
  })
}

export const submitAction = (form, navigate, editAssignmentFunc) => async (dispatch) => {
  setLoadingAction(true)(dispatch);

  setTimeout(() => {
    editAssignmentFunc(form);   
    navigate("/assignments");
  }, 1000);

  setLoadingAction(false)(dispatch);
}

export const setFieldPopupAssetAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_POPUP_ASSET,
    payload: {name, value}
  })
}

export const setFieldPopupUserAction = (name, value) => dispatch => {
  dispatch({
    type: ACTIONS.SET_FIELD_POPUP_USER,
    payload: {name, value}
  })
}

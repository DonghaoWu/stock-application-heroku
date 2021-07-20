import axios from 'axios';
import { FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from './types';
import { setAlert } from './alert.action';

// fetch users list.
export const fetchUsers = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/admin');

    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: res.data,
    });
    dispatch(
      setAlert({
        msg: 'Fetch Users data success',
        alertType: 'success',
      })
    );
  } catch (error) {
    console.error(error);
    dispatch({
      type: FETCH_USERS_FAILURE,
    });
    const errors = error.response.data.message;
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAlert({
            msg: error.msg,
            alertType: 'danger',
          })
        )
      );
    }
  }
};

//Create a user
export const createUser =
  ({ name, email, password, admin, balance }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      name,
      email,
      password,
      admin,
      balance,
    });

    try {
      const response = await axios.post('/api/admin', body, config);
      dispatch(fetchUsers());
      dispatch(
        setAlert({
          msg: response.data,
          alertType: 'success',
        })
      );
    } catch (error) {
      const errors = error.response.data.message;
      if (errors) {
        errors.forEach((error) =>
          dispatch(
            setAlert({
              msg: error.msg,
              alertType: 'danger',
            })
          )
        );
      }
    }
  };

//Update a user
export const updateUser =
  ({ email, admin, balance }) =>
  async (dispatch) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const body = JSON.stringify({
      email,
      admin,
      balance,
    });

    try {
      const response = await axios.put('/api/admin', body, config);
      dispatch(fetchUsers());
      dispatch(
        setAlert({
          msg: response.data,
          alertType: 'success',
        })
      );
    } catch (error) {
      const errors = error.response.data.message;
      if (errors) {
        errors.forEach((error) =>
          dispatch(
            setAlert({
              msg: error.msg,
              alertType: 'danger',
            })
          )
        );
      }
    }
  };

//Delete a user
export const deleteUser = (id) => async (dispatch) => {
  try {
    const response = await axios.delete(`/api/admin/${id}`);
    dispatch(fetchUsers());
    dispatch(
      setAlert({
        msg: response.data,
        alertType: 'success',
      })
    );
  } catch (error) {
    const errors = error.response.data.message;
    if (errors) {
      errors.forEach((error) =>
        dispatch(
          setAlert({
            msg: error.msg,
            alertType: 'danger',
          })
        )
      );
    }
  }
};

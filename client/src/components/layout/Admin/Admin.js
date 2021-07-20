import React, { useEffect, useState, Fragment } from 'react';
import moment from 'moment';
import 'moment-timezone';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CreateUserForm from './CreateUserForm';

import './styles.css';

import {
  fetchUsers,
  deleteUser,
  updateUser,
} from '../../../actions/admin.action';

const Admin = ({
  fetchUsers,
  deleteUser,
  updateUser,
  isAdmin,
  users,
  isAuthenticated,
}) => {
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const [editIndex, setEditIndex] = useState(-1);
  const [createForm, setCreateForm] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    balance: 0,
    admin: null,
  });

  const { email, balance, admin } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheck = () => {
    setFormData({ ...formData, admin: !formData.admin });
  };

  const handleShowForm = () => {
    setCreateForm(!createForm);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setFormData({
      email: users[index].email,
      balance: users[index].balance,
      admin: users[index].admin,
    });
  };

  const handleSave = () => {
    setEditIndex(-1);
    updateUser({ email, balance, admin });
  };

  const handleDelete = (id) => {
    deleteUser(id);
  };

  if (!isAuthenticated || !isAdmin) {
    return <Redirect to="/" />;
  }

  return (
    <div className="subpage-container">
      <div className="subpage-header">
        <p>ADMIN</p>
        {createForm ? (
          <button className={`btn btn-danger`} onClick={() => handleShowForm()}>
            - Collapse
          </button>
        ) : (
          <button
            className={`btn btn-success`}
            onClick={() => handleShowForm()}
          >
            + Create User
          </button>
        )}
      </div>
      <div className="admin-form-table">
        {createForm ? <CreateUserForm /> : null}
        {users.length ? (
          <div className="main-table-container">
            <table className="main-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Email</th>
                  <th>Name</th>
                  <th>Balance</th>
                  <th>admin</th>
                  <th>Create date</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {users.map((el, index) => {
                  return (
                    <Fragment key={index}>
                      {index !== editIndex ? (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.email}</td>
                          <td>{el.name}</td>
                          <td>{el.balance.toFixed(0)}</td>
                          <td>{el.admin ? 'Yes' : 'No'}</td>
                          <td>
                            {moment(el.date)
                              .tz('America/New_York')
                              .format('MMMM Do YYYY, h:mm:ss a')}{' '}
                            EST
                          </td>
                          <td>
                            <button
                              className={
                                editIndex === -1
                                  ? 'btn btn-primary'
                                  : 'btn btn-disable'
                              }
                              onClick={() => handleEdit(index)}
                              disabled={editIndex !== -1}
                            >
                              Edit
                            </button>
                          </td>
                          <td>
                            <button
                              className={
                                editIndex === -1
                                  ? 'btn btn-danger'
                                  : 'btn btn-disable'
                              }
                              onClick={() => handleDelete(el._id)}
                              disabled={editIndex !== -1}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ) : (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{el.email}</td>
                          <td>{el.name}</td>
                          <td>
                            <input
                              type="number"
                              className="admin-table-input"
                              name="balance"
                              value={formData.balance}
                              onChange={handleChange}
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              className="admin-table-input"
                              name="admin"
                              defaultChecked={el.admin}
                              onChange={handleCheck}
                            />
                          </td>
                          <td>{el.date}</td>
                          <td>
                            <button
                              className="btn btn-success"
                              onClick={() => handleSave()}
                            >
                              Save
                            </button>
                          </td>
                          <td>
                            <button
                              className="btn btn-danger"
                              onClick={() => handleDelete(el._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <h3>No transaction yet.</h3>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  isAdmin: state.auth.user.admin,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    updateUser: (info) => dispatch(updateUser(info)),
    deleteUser: (id) => dispatch(deleteUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);

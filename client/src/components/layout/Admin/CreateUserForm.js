import React, { useState } from 'react';
import { connect } from 'react-redux';

import { createUser } from '../../../actions/admin.action';

const CreateUserForm = ({ createUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    balance: 5000,
    name: '',
    password: '',
    admin: false,
  });

  const { email, balance, name, password, admin } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = () => {
    setFormData({ ...formData, admin: !formData.admin });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser({ email, balance, name, password, admin });
    setFormData({
      email: '',
      balance: 5000,
      name: '',
      password: '',
      admin: false,
    });
  };

  return (
    <div className="opeation-container">
      <form className=" oper-form-container" onSubmit={(e) => handleSubmit(e)}>
        <h4>Please input the new user info</h4>
        <div className="oper-form">
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="oper-form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="oper-form">
          <input
            type="text"
            placeholder="Balance"
            name="balance"
            value={balance}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="oper-form">
          <input
            type="text"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleChange(e)}
            required
          />
        </div>
        <div className="oper-form checkbox-inline">
          <label className="checkbox-label">admin</label>
          <input
            type="checkbox"
            name="admin"
            checked={admin}
            onChange={() => handleCheck()}
          />
        </div>
        <div className="operation-button-spinner">
          <input
            type="submit"
            className="operate-nav-tag place-btn"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createUser: (user) => dispatch(createUser(user)),
  };
};

export default connect(null, mapDispatchToProps)(CreateUserForm);

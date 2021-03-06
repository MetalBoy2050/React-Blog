import React from "react";
import userActions from "../actions/userActions";
import userStore from "../store/userStore";

const Admin = props => {
  let nameValue = "";
  let passwordValue = "";

  let loginInformation, usersInformation;

  userStore.subscribe(() => {
    console.log("listening!");
    loginInformation = userStore.getState().login;
    usersInformation = userStore.getState().user;
  });

  const handleChangeName = event => {
    nameValue = event.target.value;
  };

  const handleChangePassword = event => {
    passwordValue = event.target.value;
  };

  const handleLogin = event => {
    event.preventDefault();
    userStore.dispatch(
      userActions.LOGIN_USER({
        name: nameValue,
        password: passwordValue
      })
    );

    for (let i = 0; i < usersInformation.length; i++) {
      if (
        JSON.stringify(loginInformation) === JSON.stringify(usersInformation[i])
      ) {
        console.log("we did it!");
        props.history.push("/home");
        i = usersInformation.length;
      }
    }
  };

  return (
    <div id="admin">
      <h1>Login</h1>

      <form id="login-form" onSubmit={handleLogin}>
        <div className="user-input">
          <label htmlFor="name">Name: </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={handleChangeName}
          />
        </div>
        <div className="user-input">
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChangePassword}
          />
        </div>
        <input id="button-login" type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Admin;

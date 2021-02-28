const initialState = {
  user: false,
};

const UserLogIn = (state = initialState, action) => {
  switch (action.type) {
    case "Login": {
      return { user: action.payload };
    }
    case "Logout": {
      return { user: false };
    }
    default:
      return state;
  }
};

export default UserLogIn;

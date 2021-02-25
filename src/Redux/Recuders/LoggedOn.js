const initialState = {
  loggedOn: false,
};

const LoggedOn = (state = initialState, action) => {
  switch (action.type) {
    case "FadeOut": {
      return { loggedOn: true };
    }
    default:
      return state;
  }
};

export default LoggedOn;

export const userMethod = (user) => {
  return {
    type: "Login",
    payload: user,
  };
};

export const logOut = () => {
  return {
    type: "Logout",
    payload: null,
  };
};

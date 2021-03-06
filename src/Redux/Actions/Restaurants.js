export const fetchRestaurants = (restaurants) => {
  return {
    type: "FETCH",
    payload: restaurants,
  };
};

export const addLike = (like) => {
  return {
    type: "ADDLIKE",
    payload: like,
  };
};

export const searchFilter = (filters) => {
  return {
    type: "FILTER",
    payload: filters,
  };
};

export const resultUsers = (users) => {
  return {
    type: "USERS",
    payload: users,
  };
};

export const selectRestaurant = (restaurant) => {
  return {
    type: "MAPRESTAURANT",
    payload: restaurant,
  };
};

const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  filterString: false,
  resultUsers: [],
};

const RestaurantReducer = (state = initialState, action) => {
  console.log(action.payload);
  switch (action.type) {
    case "FETCH": {
      return {
        restaurants: action.payload,
        filteredRestaurants: action.payload,
      };
    }
    case "ADDLIKE": {
      let restaurants = state.restaurants;

      return {
        ...state,
        restaurants: restaurants.map((restaurant) => {
          if (restaurant.id === action.payload.id) {
            return action.payload;
          } else {
            return restaurant;
          }
        }),
        filteredRestaurants: state.filteredRestaurants.map((restaurant) => {
          if (restaurant.id === action.payload.id) {
            return action.payload;
          } else {
            return restaurant;
          }
        }),
      };
    }
    case "FILTER": {
      let filresy = [...state.restaurants]
        .filter(
          (restaurant) => restaurant.area == action.payload.target.area.value
        )
        .filter(
          (restaurant) =>
            restaurant.casual == Boolean(action.payload.target.casual.value)
        )
        .filter(
          (restaurant) =>
            restaurant[action.payload.nativeEvent.submitter.value] == true
        );
      return {
        ...state,
        filterString: action.payload,
        filteredRestaurants: filresy,
      };
    }
    case "USERS": {
      return {
        ...state,
        resultUsers: action.payload,
      };
    }
    default:
      return state;
  }
};

export default RestaurantReducer;

const initialState = {
  restaurants: [],
  filteredRestaurants: [],
  filterString: false,
  resultUsers: [],
  mapRestaurant: false,
};

const RestaurantReducer = (state = initialState, action) => {
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
      let time = new Date(action.payload.target.date.value);
      let weekday = new Array(7);
      weekday[0] = "Sunday";
      weekday[1] = "Monday";
      weekday[2] = "Tuesday";
      weekday[3] = "Wednesday";
      weekday[4] = "Thursday";
      weekday[5] = "Friday";
      weekday[6] = "Saturday";
      let dayName = weekday[time.getDay()];
      let filresy = [...state.restaurants].filter(
        (restaurant) =>
          restaurant[action.payload.nativeEvent.submitter.value] == true
      );
      filresy =
        action.payload.target.area.value == 0
          ? filresy
          : filresy.filter(
              (restaurant) =>
                restaurant.area == action.payload.target.area.value
            );
      filresy =
        action.payload.target.casual.value == 1
          ? filresy
          : filresy.filter(
              (restaurant) =>
                restaurant.casual == Boolean(action.payload.target.casual.value)
            );
      filresy =
        filresy.length > 0
          ? filresy.filter((restaurant) => restaurant[dayName] === true)
          : filresy;
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
    case "MAPRESTAURANT": {
      return {
        ...state,
        mapRestaurant: action.payload,
      };
    }
    default:
      return state;
  }
};

export default RestaurantReducer;

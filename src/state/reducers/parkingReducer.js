const initialState = {
  isLoading: false,
  parkingSlots: [],
  parkSize: {},
  exceedingRate: {},
};

export default function parkingReducer(state = initialState, action) {
  switch (action.type) {
    case "get_parking_slot":
      console.log("loading");
      return {
        ...state,
        isLoading: true,
      };
    case "parking_slot_loaded":
      return {
        ...state,
        isLoading: false,
        parkingSlots: action.payload,
      };
    case "park_size_loaded":
      return {
        ...state,
        isLoading: false,
        parkSize: action.payload,
      };

    case "exceeding_rate_loaded":
      return {
        ...state,
        isLoading: false,
        exceedingRate: action.payload,
      };

    default:
      return state;
  }
}

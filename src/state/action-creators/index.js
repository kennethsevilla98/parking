import axios from "axios";

export const getParkingSlot = () => (dispatch) => {
  dispatch({ type: "loading" });
  axios
    .get("https://parking-1f98b-default-rtdb.firebaseio.com/parking.json")
    .then((res) => {
      const data = Object.keys(res?.data.parkingSlots).map((key, i) => ({
        ...res?.data.parkingSlots[key],
        id: key,
      }));

      dispatch({
        type: "parking_slot_loaded",
        payload: data,
      });

      dispatch({
        type: "park_size_loaded",
        payload: res?.data.vehicleSize,
      });
      dispatch({
        type: "exceeding_rate_loaded",
        payload: res?.data.parkingFee,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const assignParking =
  (id, size, plateNo, available, entry) => (dispatch) => {
    console.log(id, available);
    axios
      .put(
        "https://parking-1f98b-default-rtdb.firebaseio.com/parking/parkingSlots/" +
          id +
          "/available.json",
        JSON.stringify(available)
      )
      .then((res) =>
        axios
          .post(
            "https://parking-1f98b-default-rtdb.firebaseio.com/parking/logs/" +
              plateNo +
              ".json",
            JSON.stringify({ [entry]: Date.now(), size, parkingID: id })
          )
          .then((res) => dispatch(getParkingSlot()))
      )
      .catch((err) => console.log(err));
  };

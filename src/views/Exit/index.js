import { Box, TextField, Typography, Card, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { assignParking } from "../../state/action-creators";

const Exit = () => {
  const dispatch = useDispatch();

  const exceedingRate = useSelector((state) => state.parking.exceedingRate);

  console.log(exceedingRate);

  const [lastEntry, setLastEnry] = useState({});
  const [plateNo, setPlateNo] = useState("");
  const [unpark, setUnpark] = useState(false);
  const [fee, setFee] = useState(0);

  const fetchParkingData = () => {
    axios
      .get(
        "https://parking-1f98b-default-rtdb.firebaseio.com/parking/logs/" +
          plateNo +
          ".json"
      )
      .then((res) => {
        Object.keys(res.data).map((key, i) => {
          if (i + 1 === Object.keys(res.data).length) {
            setLastEnry(res.data[key]);
          }
        });
        setUnpark(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const diff =
      (new Date("July 19, 2022 21:13:00").getTime() - lastEntry.entry) / 1000;
    const hourDiff = diff / (60 * 60);

    const hour = Math.abs(Math.round(hourDiff));

    console.log(hour);
    if (hour <= 4) {
      setFee(40);
    }

    if (hour > 4) {
      const exceedingHour = hour - 4;
      setFee(40 + exceedingHour * exceedingRate[lastEntry.size].exceedingRate);
    }
  }, [lastEntry]);

  const payParkingFee = () => {
    dispatch(
      assignParking(lastEntry.parkingID, lastEntry.size, plateNo, true, "exit")
    );
    setLastEnry({});
    setPlateNo("");
    setUnpark(false);
  };

  return (
    <Box
      display={"flex"}
      justifyContent="center"
      alignItems={"center"}
      height={"100vh"}
      flexDirection="column"
    >
      {!unpark && (
        <>
          <Typography variant="h3">Exit</Typography>
          <Card sx={{ p: 5 }}>
            <TextField
              label="Plate Number"
              variant="standard"
              value={plateNo}
              onChange={(e) => {
                setPlateNo(e.target.value);
              }}
              fullWidth
            />
            <Button
              sx={{ mt: 4 }}
              variant="contained"
              onClick={fetchParkingData}
              fullWidth
            >
              Unpark
            </Button>
          </Card>
        </>
      )}
      {unpark && (
        <>
          <Typography variant="h3">Parking fee is {fee}</Typography>
          <Button
            sx={{ mt: 4 }}
            size="large"
            variant="contained"
            onClick={payParkingFee}
          >
            Pay
          </Button>
        </>
      )}
    </Box>
  );
};

export default Exit;

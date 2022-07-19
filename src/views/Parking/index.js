import {
  Card,
  TextField,
  Box,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { assignParking, getParkingSlot } from "../../state/action-creators";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Parking = () => {
  const { entryNo } = useParams();

  const dispatch = useDispatch();

  const parkingSlots = useSelector((state) => state.parking.parkingSlots);
  const parkSize = useSelector((state) => state.parking.parkSize);

  const [assignedSlot, setAssignedSlot] = useState();
  const [size, setSize] = useState("");
  const [plateNo, setPlateNo] = useState("");

  const onAssign = () => {
    const { canPark } = parkSize[size];

    console.log(canPark.includes("SP"));

    const assigned = parkingSlots.filter(
      (slot) =>
        slot.available &&
        canPark.includes(slot.size) &&
        slot.nearEntry === entryNo.toString()
    );
    setAssignedSlot(assigned[0]);

    dispatch(
      assignParking(assigned[0].id, assigned[0].size, plateNo, false, "entry")
    );
  };

  const onAddNewVehicle = () => {
    setSize("");
    setPlateNo("");
    setAssignedSlot(null);
  };

  useEffect(() => {
    dispatch(getParkingSlot());
  }, []);

  console.log(parkingSlots);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding="20px"
    >
      {!assignedSlot && (
        <>
          <Typography variant="h3"> Entry No. {entryNo}</Typography>
          <Card style={{ width: "300px", padding: "20px" }}>
            <TextField
              variant="standard"
              label="Plate No."
              onChange={(e) => setPlateNo(e.target.value)}
              fullWidth
            />
            <FormControl fullWidth variant="standard">
              <InputLabel
                id="demo-simple-select-label"
                onChange={(e) => {
                  setPlateNo(e.target.value);
                }}
              >
                vehicle Size
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                value={size}
                onChange={(e) => {
                  setSize(e.target.value);
                }}
              >
                <MenuItem value={"S"}>Small</MenuItem>
                <MenuItem value={"M"}>Medium</MenuItem>
                <MenuItem value={"L"}>Large</MenuItem>
              </Select>
            </FormControl>
            <Button variant="contained" fullWidth onClick={onAssign}>
              Assign
            </Button>
          </Card>
        </>
      )}

      {assignedSlot && (
        <>
          <Typography variant="h1">
            Your parking slot number is {assignedSlot.parkingNo}
          </Typography>
          <Button variant="contained" onClick={onAddNewVehicle}>
            Add new vehicle
          </Button>
        </>
      )}
    </Box>
  );
};

export default Parking;

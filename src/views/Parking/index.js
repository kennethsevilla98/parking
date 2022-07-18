import {
  Card,
  TextField,
  Box,
  Grid,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import React, { useState } from "react";
import LocalParkingIcon from "@mui/icons-material/LocalParking";

const entry = 3;

const parkingSpace = {
  SP: {
    exceedingRate: 20,
  },
  MP: {
    exceedingRate: 60,
  },
  LP: {
    exceedingRate: 100,
  },
};

const exceed24hrs = 5000;

const vehicleType = {
  S: {
    canPark: ["SP", "MP", "LP"],
  },
  M: {
    canPark: ["SP", "MP", "LP"],
  },

  L: {
    canPark: ["SP", "MP", "LP"],
  },
};

const parkingSlots = [
  {
    parkingNo: 1,
    size: "S",
    nearEntry: [1, 2, 3],
    available: true,
  },
  {
    parkingNo: 2,
    size: "M",
    nearEntry: [1, 2, 3],
    available: true,
  },
  {
    parkingNo: 3,
    size: "M",
    nearEntry: [1, 2, 3],
    available: true,
  },
  {
    parkingNo: 4,
    size: "M",
    nearEntry: [1, 2, 3],
    available: true,
  },
  {
    parkingNo: 5,
    size: "L",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 6,
    size: "L",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 7,
    size: "L",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 8,
    size: "S",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 1,
    size: "S",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 2,
    size: "M",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 3,
    size: "M",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 4,
    size: "M",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 5,
    size: "L",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 6,
    size: "LP",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 7,
    size: "LP",
    nearEntry: 1,
    available: true,
  },
  {
    parkingNo: 8,
    size: "S",
    nearEntry: 1,
    available: true,
  },
];

const entryNo = 1;

const Parking = () => {
  const [entryPoint, setEntryPoint] = useState(entry);
  const [assignedSlot, setAssignedSlot] = useState();
  const [size, setSize] = useState("");
  const [plateNo, setPlateNo] = useState("");

  const onAssign = () => {
    const assigned = parkingSlots.filter(
      (slot) => slot.available && slot.size === size && slot.nearEntry === 1
    );

    console.log(size, assigned, size);
    setAssignedSlot(assigned[0]);
  };

  const onAddNewVehicle = () => {
    setSize("");
    setPlateNo("");
    setAssignedSlot(null);
  };

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      padding="20px"
    >
      {!assignedSlot && (
        <Card style={{ width: "300px", padding: "20px" }}>
          <TextField variant="standard" label="Plate No." fullWidth />
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
      )}

      {assignedSlot && (
        <Box>
          <Typography variant="h1">
            Your parking slot number is {assignedSlot.parkingNo}
          </Typography>
          <Button variant="contained" onClick={onAddNewVehicle}>
            Add new vehicle
          </Button>
          {/* <Grid container spacing={8}>
            {parkingSlots.map((slot) => (
              <Grid item xs={1}>
                <Card
                  style={{
                    height: "200px",
                    backgroundColor: slot.available ? "red" : null,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {slot.parkingNo}
                </Card>
              </Grid>
            ))}
        
          </Grid> */}
        </Box>
      )}
    </Box>
  );
};

export default Parking;

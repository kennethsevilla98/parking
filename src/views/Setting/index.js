import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  Box,
  Fab,
  Modal,
  Typography,
  TextField,
  Button,
} from "@mui/material";

import { Settings } from "@mui/icons-material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const Setting = () => {
  const [parkingSlots, setParkingSlots] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [parkingNo, setParkingNo] = useState("");
  const [size, setSize] = useState("");
  const [near, setNear] = useState("");

  const clear = () => {
    setParkingNo("");
    setSize("");
    setNear("");
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    clear();
  };

  const onEditSlot = () => {
    const edit = parkingSlots.find((data) => data.parkingNo === "G1");
    setParkingNo(edit.parkingNo);
    setSize(edit.size);
    setNear(edit.nearEntry);
    setOpen(true);
  };

  const fetchData = () =>
    axios
      .get("https://parking-1f98b-default-rtdb.firebaseio.com/parking.json")
      .then((res) => {
        const data = Object.keys(res?.data.parkingSlots).map(
          (key, i) => res?.data.parkingSlots[key]
        );
        setParkingSlots(data);
      })
      .catch((err) => {
        console.log(err);
      });

  const onAddData = () => {
    const body = JSON.stringify({
      parkingNo,
      size,
      nearEntry: near,
      available: true,
    });

    axios
      .post(
        "https://parking-1f98b-default-rtdb.firebaseio.com/parking/parkingSlots.json",
        body
      )
      .then((res) => {
        console.log(body);
        fetchData();
        handleClose();
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box padding={10}>
      <Grid container spacing={8}>
        {parkingSlots.map((slot, i) => (
          <Grid item xs={2} key={i}>
            <Card
              onClick={onEditSlot}
              style={{
                height: "200px",
                backgroundColor: slot.available ? "green" : "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {slot.parkingNo}
            </Card>
          </Grid>
        ))}
      </Grid>
      <Fab
        style={{ position: "absolute", bottom: 10, right: 10 }}
        onClick={handleOpen}
      >
        <Settings />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography>Add Parking Slot</Typography>
          <TextField
            variant="standard"
            value={parkingNo}
            label="Parking No"
            onChange={(e) => setParkingNo(e.target.value)}
            fullWidth
          />
          <TextField
            variant="standard"
            value={size}
            label="Size"
            onChange={(e) => setSize(e.target.value)}
            fullWidth
          />
          <TextField
            variant="standard"
            value={near}
            label="Near Entry"
            onChange={(e) => setNear(e.target.value)}
            fullWidth
          />
          <Button onClick={onAddData} fullWidth>
            SAVE
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default Setting;

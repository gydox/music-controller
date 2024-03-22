import React from "react";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function RoomJoinPage() {
  const [roomCode, setRoomCode] = useState("");
  const [error, setError] = useState("");

  const handleTextFieldChange = (e) => {
    setRoomCode(e.target.value);
  };

  const roomButtonPressed = () => {
    const requestData = {
      code: roomCode,
    };

    axios
      .post("http://localhost:8000/api/join_room", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        // navigateTo("/room/" + response.data.code);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="h4" component="h4">
          Join A Room
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          error={error.length > 0}
          label="Code"
          placeholder="Enter a room code"
          value={roomCode}
          helperText={error}
          variant="outlined"
          onChange={handleTextFieldChange}
        />
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={roomButtonPressed}>
          Enter Room
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="secondary" to="/" component={Link}>
          Back
        </Button>
      </Grid>
    </Grid>
  );
}

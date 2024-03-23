import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, Button, Typography } from "@material-ui/core";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Room(props) {
  const navigateTo = useNavigate();
  const defaultVotes = 0;
  const params = useParams();
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_room" + `?code=${params.roomCode}`)
      .then((response) => {
        const data = response.data;
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause.toString());
        setIsHost(data.is_host.toString());
      })
      .catch((error) => {
        // console.error("Error fetching room data:", error);
        navigateTo("/");
      });
  }, [params.roomCode]);

  const leaveButtonPressed = () => {
    axios
      .post("http://localhost:8000/api/leave_room")
      .then((response) => {
        const data = response.data;
        navigateTo("/");
      })
      .catch((error) => {
        console.error("Error leaving room:", error);
      });
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} align="center">
        <Typography variant="h4" component="h4">
          Room Code: {params.roomCode}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Votes: {votesToSkip}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Guest Can Pause: {guestCanPause.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Typography variant="h6" component="h6">
          Is Host: {isHost.toString()}
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button
          variant="contained"
          color="secondary"
          onClick={leaveButtonPressed}
        >
          Leave Room
        </Button>
      </Grid>
    </Grid>
  );
}

import React from "react";
import { Grid, Button, ButtonGroup, Typography } from "@material-ui/core";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function HomePage(props) {
  const navigateTo = useNavigate();
  const [roomCode, setRoomCode] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user_in_room")
      .then((response) => {
        setRoomCode(response.data.room_code);
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, []);

  useEffect(() => {
    if (roomCode != null) {
      navigateTo("/room/" + roomCode);
    }
  }, [roomCode, navigateTo]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" compact="h3">
          House Party
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <ButtonGroup disableElevation variant="contained" color="primary">
          <Button color="primary" to="/join_room" component={Link}>
            Join A Room
          </Button>
          <Button color="secondary" to="/create_room" component={Link}>
            Create A room
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}

import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

export default function Room(props) {
  const defaultVotes = 2;
  const params = useParams();
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/get_room" + `?code=${params.roomCode}`)
      .then((response) => {
        const data = response.data; // Access response data directly
        setVotesToSkip(data.votes_to_skip);
        setGuestCanPause(data.guest_can_pause.toString());
        setIsHost(data.is_host.toString());
      })
      .catch((error) => {
        console.error("Error fetching room data:", error);
      });
  }, [params.roomCode]);

  return (
    <div>
      <h3>Room Code: {params.roomCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest can Pause: {guestCanPause}</p>
      <p>Host: {isHost}</p>
    </div>
  );
}

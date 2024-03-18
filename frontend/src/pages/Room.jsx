import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Room(props) {
  const defaultVotes = 2;
  const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
  const [guestCanPause, setGuestCanPause] = useState(false);
  const [isHost, setIsHost] = useState(false);

  // Get the room ID from the URL parameters.
  const params = useParams();
  return (
    <div>
      <h3>Room Code: {params.roomCode}</h3>
      <p>Votes: {votesToSkip}</p>
      <p>Guest can Pause: {guestCanPause}</p>
      <p>Host: {isHost}</p>
    </div>
  );
}

import React from "react";

function playPause({setIsTimerRunning, setSession, focusDuration}) {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
f (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {

            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60, //{secondsToDuration(breakDuration * 60)}
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

export default PlayButton;
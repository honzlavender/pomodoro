import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import { minutesToDuration } from "../utils/duration";
import Session from "./Session";
import TimerGifs from "./TimerGifs";
import nextTick from "./nextTick";
import nextSession from "./nextSession"
//import playPause from "./playPause";



function Pomodoro() {
  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false); //INITIAL_STATE.isTimerRunning
  // The current session - null where there is no session running
  const [session, setSession] = useState(null); //INITIAL_STATE.session
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  //console.log(focusDuration)

  const initialState = {
    isTimerRunning: false,
    session: null,
    focusDuration: 25,
    breakDuration: 5,
  };
  //console.log(timeRemaining)

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
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

  //* Custom hook that invokes the callback function every second
  //*
  //* NOTE: You will not need to make changes to the callback function
//https://bigsoundbank.com/UPLOAD/mp3/2363.mp3 clapping
//https://bigsoundbank.com/UPLOAD/mp3/1482.mp3 bell
//0241


  useInterval(
    () => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/0241.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

 

  //focus
  function handleDecreaseFocus() {
    if (focusDuration === 5) return;
    setFocusDuration((state) => state - 5);
  }
  function handleIncreaseFocus() {
    if (focusDuration === 60) return;
    setFocusDuration((state) => state + 5);
  }

  //break
  function handleDecreaseBreak() {
    if (breakDuration === 1) return;
    setBreakDuration((state) => state - 1);
  }
  function handleIncreaseBreak() {
    if (breakDuration === 15) return;
    setBreakDuration((state) => state + 1);
  }

  function handleState() {
    setIsTimerRunning(initialState.isTimerRunning);
    setSession(initialState.session);
  }

  //console.log(currentDuration)

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: {minutesToDuration(focusDuration)}
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={handleDecreaseFocus}
                disabled={session}
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={handleIncreaseFocus}
                disabled={session}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: {minutesToDuration(breakDuration)}
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={handleDecreaseBreak}
                  disabled={session}
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={handleIncreaseBreak}
                  disabled={session}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
              //show
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session.timeRemaining and disable the stop button when there is no active session */}
            {/* TODO: Disable the stop button when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              disabled={!session}
              onClick={handleState}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <Session
        isTimerRunning={isTimerRunning}
        session={session}
        currentDuration={
          session?.label === "Focusing" ? focusDuration : breakDuration
        }
      />
      <TimerGifs
        label={session?.label}
      />
      <nextTick />
      <nextSession />
    </div>
  );
}

export default Pomodoro;

//can playPause work as a component?
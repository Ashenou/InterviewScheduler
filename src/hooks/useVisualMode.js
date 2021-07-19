import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Push newMode to the array without modyifing history(state);
  function transition(newMode, replace = false) {
    
    if (!replace) {
      setHistory(prev => ([...prev, newMode])); 
    }

    // if replace === true it should change the last element in history and set mode to the last value in new array
    else {
      setHistory(history.slice(0, -1));
      setHistory(prev => ([...prev, newMode]));
    }
    setMode(newMode);
  }

  // Goes back one state in the appointment component display mode so when there is an error it automatically renders the previous state
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }

  return { mode, transition, back };
}

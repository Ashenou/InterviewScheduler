import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  // Push newMode to the array without modyifing history(state);
  function transition(newMode, replace = false) {
    if (!replace) {
      setMode(newMode);
      setHistory([...history, newMode]);
    }
    // if replace === true it should change the last element in history and set mode to the last value in new array
    else {
      setMode(history[history.length - 2]);
      const prevArray = history.slice(0, -1);
      setHistory([...prevArray, newMode]);
    }
  }
  function back() {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(history.slice(0, -1));
    }
  }

  return { mode, transition, back };
}

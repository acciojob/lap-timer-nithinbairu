import React, { useState, useEffect, useRef } from "react";
import './../styles/App.css';

const App = () => {
  // Time in centiseconds (1/100th of a second)
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  // Format time as mm:ss:cs
  const formatTime = (time) => {
    const hour=Math.floor(time/36000000)
    const minutes = Math.floor(time / 6000);
    const seconds = Math.floor((time % 6000) / 100);
    const centiseconds = time % 100;

    const pad = (num) => num.toString().padStart(2, "0");
    return `${pad(hour)}:${pad(minutes)}:${pad(seconds)}:${pad(centiseconds)}`;
  };

  // Start or resume timer
  const handleStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 10); // every 10ms = 1 centisecond
    }
  };

  // Stop timer
  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
    }
  };

  // Record current lap
  const handleLap = () => {
    if (isRunning) {
      setLaps((prev) => [...prev, time]);
    }
  };

  // Reset everything
  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div>
      {/* Do not remove the main div */}
      <h2>Lap Timer</h2>
      <p>{formatTime(time)}</p>

      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleLap}>Lap</button>
      <button onClick={handleReset}>Reset</button>

      <ul>
        {laps.map((lap, index) => (
          <li key={index}>Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;

import React, { useState } from "react";
import "./App.css";

/** Presentation component (UI only) */
type DisplayProps = {
  value: number;
  onIncrement?: () => void;
};

function Display({ value, onIncrement }: DisplayProps) {
  return (
    <div style={{ border: "2px solid red" }}>
      <p>Value: {value}</p>

      {onIncrement && <button onClick={onIncrement}>Increment</button>}
    </div>
  );
}

/** Container component (state + logic) */
export default function Container() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div style={{ border: "2px solid blue" }}>
        <Display value={count} onIncrement={() => setCount((c) => c + 1)} />
      </div>
      <div
        style={{
          marginTop: "20px",
          backgroundColor: "transparent",
          border: "none",
          boxShadow: "none",
          padding: 0,
        }}
      >
        <div
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            display: "flex",
            padding: 0,
          }}
        >
          <div
            style={{
              border: "none",
              boxShadow: "none",
              backgroundColor: "red",
              height: "20px",
              minWidth: "20px",
              margin: "0px",
              padding: 0,
              borderRadius: "2px",
            }}
          ></div>
          <span style={{ color: "white ", fontSize: "15px" }}>
            presentational component
          </span>
        </div>
        <div
          style={{
            backgroundColor: "transparent",
            border: "none",
            boxShadow: "none",
            padding: 0,
            marginTop: "10px",
            display: "flex",
            gap: "10px",
          }}
        >
          <div
            style={{
              border: "none",
              boxShadow: "none",
              backgroundColor: "blue",
              height: "20px",
              minWidth: "20px",
              margin: "0px",
              padding: 0,
              borderRadius: "2px",
              width: "10px",
            }}
          ></div>
          <span style={{ color: "white", fontSize: "15px" }}>
            container component
          </span>
        </div>
      </div>
    </>
  );
}

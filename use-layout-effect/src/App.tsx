import "./App.css";

import { useLayoutEffect, useRef, useState } from "react";

const App = () => {
  const boxRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>(0);

  useLayoutEffect(() => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();

      setWidth(rect.width);
    }
  }, []);

  return (
    <div className="container">
      <div ref={boxRef} className="cute-box">
        Measurement for this box is computed before painting the box
      </div>
      <p className="cute-text">Box width: {width}px</p>
    </div>
  );
};

export default App;

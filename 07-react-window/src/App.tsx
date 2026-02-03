import { UIEvent, useCallback, useState } from "react";
import { List, type RowComponentProps } from "react-window";
import "./App.css"

// Generate 10,000 items
const items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);

type RowProps = {
  items: string[]
}

// Memoized row component for performance
const Row = ({ index, items: data, style }: RowComponentProps<RowProps>) => (
  <div style={{ ...style, borderBottom: "1px solid #ddd" }}>
    {data[index]}
  </div>
)

export default function App() {
  const [useVariableSize, setUseVariableSize] = useState(false);

  // For variable-size list: alternating heights
  const getItemSize = useCallback((index: number) => (index % 2 === 0 ? 50 : 30), []);

  // Scroll handler example(dynamic loading / threshold detection)
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;

    if (scrollTop + clientHeight >= scrollHeight - 3000) {
      console.log("Scrolled past 3000px, could fetch more items here");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Windowed List</h3>
      <button onClick={() => setUseVariableSize((v) => !v)}>
        Toggle {useVariableSize ? "Fixed Size" : "Variable Size"}
      </button>

      <div style={{ marginTop: 20, height: '400px' }}>
        {useVariableSize ? (
          <List<RowProps>
            defaultHeight={100}
            rowComponent={Row}
            rowProps={{ items }}
            rowCount={items.length}
            rowHeight={getItemSize}
            onScroll={handleScroll}
          />
        ) : (
          <List<RowProps>
            defaultHeight={100}
            rowCount={items.length}
            rowHeight={35} 
            onScroll={handleScroll}
            rowComponent={Row}
            rowProps={{ items }}
          />
        )}
      </div>
    </div>
  );
}

import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import "./App.css";

/**
 * The ONLY public imperative API
 */
export type CounterHandle = {
  increment: () => void;
  reset: () => void;
  readonly value: number;
};

/**
 * Child component
 */
const Counter = forwardRef<CounterHandle, {}>(function Counter(_, ref) {
  const [count, setCount] = useState<number>(0);

  useImperativeHandle(
    ref,
    () => ({
      increment() {
        setCount((c) => c + 1);
      },
      reset() {
        setCount(0);
      },
      get value() {
        return count;
      },
    }),
    [count],
  );

  return <p>Count: {count}</p>;
});

/**
 * Parent component
 */
export default function App() {
  const counterRef = useRef<CounterHandle | null>(null);

  return (
    <div>
      <h3>Allowed (via useImperativeHandle)</h3>

      <Counter ref={counterRef} />

      <button onClick={() => counterRef.current?.increment()}>Increment</button>

      <button onClick={() => counterRef.current?.reset()}>Reset</button>

      <button
        onClick={() => alert(`Current value: ${counterRef.current?.value}`)}
      >
        Read value
      </button>

      <hr />

      <h3>❌ Not allowed (compile-time error)</h3>

      {/* 
        ❌ Uncommenting this button will FAIL TypeScript compilation
        because setCount is NOT part of CounterHandle
      */}

      <button
      // onClick={() => counterRef.current?.setCount(999)}
      >
        Force set to 999 (compile error if onClick uncommented)
      </button>

      <hr />

      <h3>❌ Sneaky attempt (runtime no-op)</h3>

      <button
        onClick={() => {
          // TypeScript is bypassed, but runtime still fails safely
          (counterRef.current as any)?.setCount?.(999);
          alert(
            "Tried to call non-exposed setCount. Check the count — it did not change.",
          );
        }}
      >
        Sneaky setCount (does nothing)
      </button>
    </div>
  );
}

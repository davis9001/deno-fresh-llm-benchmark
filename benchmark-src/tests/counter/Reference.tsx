import { useState } from "preact/hooks";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div class="counter">
      <button data-testid="decrement-button" onClick={() => setCount(count - 1)}>
        -
      </button>
      <span data-testid="count-value">{count}</span>
      <button data-testid="increment-button" onClick={() => setCount(count + 1)}>
        +
      </button>
    </div>
  );
}

# Counter Island Task

Create a Deno Fresh island component that implements a simple counter with increment and decrement functionality.

## Requirements:

1. Create a Preact island component with interactive state
2. The counter should start at 0
3. Include a decrement button with the `data-testid="decrement-button"` attribute  
4. Include an increment button with the `data-testid="increment-button"` attribute
5. Display the current count with the `data-testid="count-value"` attribute
6. Clicking increment should increase the count by 1
7. Clicking decrement should decrease the count by 1
8. Use Preact's useState hook for state management

Example structure:

```tsx
import { useState } from "preact/hooks";

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div class="counter">
      <button data-testid="decrement-button" onClick={() => setCount(count - 1)}>-</button>
      <span data-testid="count-value">{count}</span>
      <button data-testid="increment-button" onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
}
```

Please implement this island using Deno Fresh and Preact syntax. Make sure you only return one component.

# Props Component Task

Create a Deno Fresh component that accepts and displays props.

## Requirements:

1. Create a component that accepts a `name` prop (string)
2. Create a component that accepts an `age` prop (number)
3. Display a greeting message using the name: "Hello, {name}!"
4. Display the age: "You are {age} years old."
5. Add data-testid="greeting" to the greeting element
6. Add data-testid="age" to the age element

Example structure:

```tsx
interface GreetingProps {
  name: string;
  age: number;
}

export default function Greeting({ name, age }: GreetingProps) {
  return (
    <div>
      <p data-testid="greeting">Hello, {name}!</p>
      <p data-testid="age">You are {age} years old.</p>
    </div>
  );
}
```

Please implement this component using Deno Fresh syntax. Make sure you only return one component.

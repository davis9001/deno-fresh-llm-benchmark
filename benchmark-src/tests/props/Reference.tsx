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

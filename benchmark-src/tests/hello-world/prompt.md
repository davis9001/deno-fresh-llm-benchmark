# Hello World Route Task

Create a simple Deno Fresh route that displays "Hello, World!" with some styling.

## Requirements:

1. Create a Fresh route component that exports a default handler function
2. The component should display the text "Hello, World!" in a div with data-testid="greeting"
3. Add a CSS class "greeting" to style the text
4. Make the text color blue
5. Center the text on the page
6. Add a small margin around the text

Example structure (you can modify it as needed):

```tsx
export default function HelloWorld() {
  return (
    <div data-testid="greeting" class="greeting">
      Hello, World!
    </div>
  );
}
```

Please implement this route using Deno Fresh syntax. Make sure you only return one component.

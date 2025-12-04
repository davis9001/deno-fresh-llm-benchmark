import { expect } from "vitest";

export function testProps(ComponentModule: any) {
  const { default: Component } = ComponentModule;
  
  return {
    name: "Props",
    tests: [
      {
        name: "exports default component",
        test: () => {
          expect(Component).toBeDefined();
          expect(typeof Component).toBe("function");
        }
      },
      {
        name: "renders with name prop",
        test: () => {
          const rendered = Component({ name: "Alice", age: 30 });
          const str = JSON.stringify(rendered);
          expect(str).toContain("Alice");
        }
      },
      {
        name: "renders with age prop",
        test: () => {
          const rendered = Component({ name: "Alice", age: 30 });
          const str = JSON.stringify(rendered);
          expect(str).toContain("30");
        }
      },
      {
        name: "has greeting testid",
        test: () => {
          const rendered = Component({ name: "Alice", age: 30 });
          const str = JSON.stringify(rendered);
          expect(str).toContain('data-testid="greeting"') || expect(str).toContain("data-testid='greeting'");
        }
      },
      {
        name: "has age testid",
        test: () => {
          const rendered = Component({ name: "Alice", age: 30 });
          const str = JSON.stringify(rendered);
          expect(str).toContain('data-testid="age"') || expect(str).toContain("data-testid='age'");
        }
      }
    ]
  };
}

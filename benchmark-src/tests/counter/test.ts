import { expect } from "vitest";

export function testCounter(ComponentModule: any) {
  const { default: Component } = ComponentModule;
  
  return {
    name: "Counter",
    tests: [
      {
        name: "exports default component",
        test: () => {
          expect(Component).toBeDefined();
          expect(typeof Component).toBe("function");
        }
      },
      {
        name: "uses useState from preact/hooks",
        test: () => {
          // Check if the component source contains useState
          const componentStr = Component.toString();
          expect(componentStr).toContain("useState") || expect(ComponentModule.toString()).toContain("useState");
        }
      },
      {
        name: "has increment and decrement buttons",
        test: () => {
          const rendered = Component();
          const str = JSON.stringify(rendered);
          expect(str).toContain('data-testid="increment-button"') || expect(str).toContain("data-testid='increment-button'");
          expect(str).toContain('data-testid="decrement-button"') || expect(str).toContain("data-testid='decrement-button'");
        }
      },
      {
        name: "has count value display",
        test: () => {
          const rendered = Component();
          const str = JSON.stringify(rendered);
          expect(str).toContain('data-testid="count-value"') || expect(str).toContain("data-testid='count-value'");
        }
      }
    ]
  };
}

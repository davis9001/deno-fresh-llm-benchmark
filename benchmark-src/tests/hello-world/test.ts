import { expect } from "vitest";

export function testHelloWorld(ComponentModule: any) {
  const { default: Component } = ComponentModule;
  
  return {
    name: "HelloWorld",
    tests: [
      {
        name: "exports default component",
        test: () => {
          expect(Component).toBeDefined();
          expect(typeof Component).toBe("function");
        }
      },
      {
        name: "renders Hello, World! text",
        test: () => {
          const rendered = Component();
          const str = JSON.stringify(rendered);
          expect(str).toContain("Hello, World!");
        }
      },
      {
        name: "has greeting testid",
        test: () => {
          const rendered = Component();
          const str = JSON.stringify(rendered);
          expect(str).toContain('data-testid="greeting"') || expect(str).toContain("data-testid='greeting'");
        }
      }
    ]
  };
}

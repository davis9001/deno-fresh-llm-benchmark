export default function HelloWorld() {
  return (
    <div>
      <style>{`
        .greeting {
          color: blue;
          text-align: center;
          margin: 20px;
        }
      `}</style>
      <div data-testid="greeting" class="greeting">
        Hello, World!
      </div>
    </div>
  );
}

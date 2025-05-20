import app from "./src/app";

const PORTA = 3000;

app.listen(PORTA, () => {
  console.log(`Server running on http://localhost:${PORTA}`);
});

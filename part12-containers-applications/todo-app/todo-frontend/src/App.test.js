import { render, screen } from "@testing-library/react";
import App from "./App";
import Todo from "./Todos/Todo";

test("renders App", () => {
  render(<App />);
  const linkElement = screen.getByText(/Todos/i);
  expect(linkElement).toBeInTheDocument();
});

test("renders Todo", () => {
  const todo = {
    text: "Test Text",
    done: false,
  };
  const component = render(<Todo todo={todo} />);

  const span = component.container.querySelector(".text");

  expect(span).toBeVisible("Test Text");
});

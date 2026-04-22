import { render, screen } from "@testing-library/react";
import { Header } from "./Header";

describe("Header", () => {
  it("renders title and install button", () => {
    render(<Header />);

    expect(screen.getByRole("heading", { name: "STAEM" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Install" })).toBeInTheDocument();
  });
});

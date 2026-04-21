import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import EmailField from "./EmailField";

describe("EmailField", () => {
  it("shows warning when email is invalid after blur", async () => {
    const user = userEvent.setup();
    render(<EmailField />);

    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "email-invalido");
    await user.tab();

    expect(screen.getByText("Digite um email valido.")).toBeInTheDocument();
    expect(emailInput).toHaveClass("login__input--error");
  });

  it("hides warning when email is valid", async () => {
    const user = userEvent.setup();
    render(<EmailField />);

    const emailInput = screen.getByLabelText("Email");
    await user.type(emailInput, "usuario@email.com");
    await user.tab();

    expect(screen.queryByText("Digite um email valido.")).not.toBeInTheDocument();
    expect(emailInput).not.toHaveClass("login__input--error");
  });
});

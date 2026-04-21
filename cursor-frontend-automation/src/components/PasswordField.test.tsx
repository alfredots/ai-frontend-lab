import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import PasswordField from "./PasswordField";

describe("PasswordField", () => {
  it("does not show validation messages when password has fewer than 8 chars after blur", async () => {
    const user = userEvent.setup();
    render(<PasswordField />);

    const passwordInput = screen.getByLabelText("Senha");
    await user.type(passwordInput, "abc");
    await user.tab();

    expect(screen.queryByText("A senha deve ter no minimo 8 caracteres.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra maiuscula.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra minuscula.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos um numero.")).not.toBeInTheDocument();
    expect(passwordInput).not.toHaveClass("login__input--error");
  });

  it("shows minimum length message after submit attempt for short password", async () => {
    const user = userEvent.setup();
    render(<PasswordField hasSubmitAttempt />);

    const passwordInput = screen.getByLabelText("Senha");
    await user.type(passwordInput, "abc");

    expect(screen.getByText("A senha deve ter no minimo 8 caracteres.")).toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra maiuscula.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra minuscula.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos um numero.")).not.toBeInTheDocument();
    expect(passwordInput).toHaveClass("login__input--error");
  });

  it("shows only missing uppercase message", async () => {
    const user = userEvent.setup();
    render(<PasswordField />);

    const passwordInput = screen.getByLabelText("Senha");
    await user.type(passwordInput, "senha1234");
    await user.tab();

    expect(screen.getByText("A senha deve conter ao menos uma letra maiuscula.")).toBeInTheDocument();
    expect(screen.queryByText("A senha deve ter no minimo 8 caracteres.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos um numero.")).not.toBeInTheDocument();
  });

  it("shows only missing lowercase message", async () => {
    const user = userEvent.setup();
    render(<PasswordField />);

    const passwordInput = screen.getByLabelText("Senha");
    await user.type(passwordInput, "SENHA1234");
    await user.tab();

    expect(screen.getByText("A senha deve conter ao menos uma letra minuscula.")).toBeInTheDocument();
    expect(screen.queryByText("A senha deve ter no minimo 8 caracteres.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos um numero.")).not.toBeInTheDocument();
  });

  it("shows only missing number message", async () => {
    const user = userEvent.setup();
    render(<PasswordField />);

    const passwordInput = screen.getByLabelText("Senha");
    await user.type(passwordInput, "Senhaaaaa");
    await user.tab();

    expect(screen.getByText("A senha deve conter ao menos um numero.")).toBeInTheDocument();
    expect(screen.queryByText("A senha deve ter no minimo 8 caracteres.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra maiuscula.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra minuscula.")).not.toBeInTheDocument();
  });

  it("hides all validation messages for a valid password", async () => {
    const user = userEvent.setup();
    render(<PasswordField />);

    const passwordInput = screen.getByLabelText("Senha");
    await user.type(passwordInput, "Senha1234");
    await user.tab();

    expect(screen.queryByText("A senha deve ter no minimo 8 caracteres.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra maiuscula.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos uma letra minuscula.")).not.toBeInTheDocument();
    expect(screen.queryByText("A senha deve conter ao menos um numero.")).not.toBeInTheDocument();
    expect(passwordInput).not.toHaveClass("login__input--error");
  });
});

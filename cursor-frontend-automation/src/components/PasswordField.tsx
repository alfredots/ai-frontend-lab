import { useEffect } from "react";
import { usePasswordValidation } from "../hooks/usePasswordValidation";

type PasswordFieldProps = {
  hasSubmitAttempt?: boolean;
  onValidationChange?: (isValid: boolean) => void;
};

function PasswordField({ hasSubmitAttempt = false, onValidationChange }: PasswordFieldProps) {
  const {
    password,
    isValidPassword,
    shouldShowError,
    unmetMessages,
    handlePasswordChange,
    handlePasswordBlur,
  } = usePasswordValidation({ hasSubmitAttempt });

  useEffect(() => {
    onValidationChange?.(isValidPassword);
  }, [isValidPassword, onValidationChange]);

  return (
    <div className="login__field">
      <label className="login__label" htmlFor="password">
        Senha
      </label>
      <input
        className={`login__input ${shouldShowError ? "login__input--error" : ""}`}
        id="password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(event) => handlePasswordChange(event.target.value)}
        onBlur={handlePasswordBlur}
      />
      {shouldShowError ? (
        <ul className="login__field-warning-list">
          {unmetMessages.map((message) => (
            <li className="login__field-warning" key={message}>
              {message}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default PasswordField;

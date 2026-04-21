import { useEffect } from "react";
import { useEmailValidation } from "../hooks/useEmailValidation";

type EmailFieldProps = {
  onValidationChange?: (isValid: boolean) => void;
};

function EmailField({ onValidationChange }: EmailFieldProps) {
  const {
    email,
    isValidEmail,
    shouldShowError,
    handleEmailBlur,
    handleEmailChange,
  } = useEmailValidation();

  useEffect(() => {
    onValidationChange?.(isValidEmail);
  }, [isValidEmail, onValidationChange]);

  return (
    <div className="login__field">
      <label className="login__label" htmlFor="email">
        Email
      </label>
      <input
        className={`login__input ${shouldShowError ? "login__input--error" : ""}`}
        id="email"
        type="email"
        placeholder="seu@email.com"
        value={email}
        onChange={(event) => handleEmailChange(event.target.value)}
        onBlur={handleEmailBlur}
      />
      {shouldShowError ? (
        <p className="login__field-warning">Digite um email valido.</p>
      ) : null}
    </div>
  );
}

export default EmailField;

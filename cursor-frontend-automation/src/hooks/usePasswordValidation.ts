import { useMemo, useState } from "react";

const PASSWORD_RULES = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /\d/,
};

type UsePasswordValidationParams = {
  hasSubmitAttempt?: boolean;
};

export function usePasswordValidation({ hasSubmitAttempt = false }: UsePasswordValidationParams = {}) {
  const [password, setPassword] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const validations = useMemo(() => {
    return {
      minLength: password.length >= PASSWORD_RULES.minLength,
      hasUppercase: PASSWORD_RULES.hasUppercase.test(password),
      hasLowercase: PASSWORD_RULES.hasLowercase.test(password),
      hasNumber: PASSWORD_RULES.hasNumber.test(password),
    };
  }, [password]);

  const isValidPassword =
    validations.minLength &&
    validations.hasUppercase &&
    validations.hasLowercase &&
    validations.hasNumber;

  const shouldValidateOnTyping = hasInteracted && password.length >= PASSWORD_RULES.minLength;
  const shouldShowError =
    (shouldValidateOnTyping || hasSubmitAttempt) && password.length > 0 && !isValidPassword;

  const unmetMessages = useMemo(() => {
    if (!shouldShowError) {
      return [];
    }

    const messages: string[] = [];

    if (password.length < PASSWORD_RULES.minLength) {
      messages.push("A senha deve ter no minimo 8 caracteres.");
      return messages;
    }

    if (!validations.minLength) {
      messages.push("A senha deve ter no minimo 8 caracteres.");
    }
    if (!validations.hasUppercase) {
      messages.push("A senha deve conter ao menos uma letra maiuscula.");
    }
    if (!validations.hasLowercase) {
      messages.push("A senha deve conter ao menos uma letra minuscula.");
    }
    if (!validations.hasNumber) {
      messages.push("A senha deve conter ao menos um numero.");
    }

    return messages;
  }, [password.length, shouldShowError, validations]);

  function handlePasswordChange(value: string) {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setPassword(value);
  }

  function handlePasswordBlur() {
    setHasInteracted(true);
  }

  return {
    password,
    isValidPassword,
    shouldShowError,
    unmetMessages,
    handlePasswordChange,
    handlePasswordBlur,
  };
}

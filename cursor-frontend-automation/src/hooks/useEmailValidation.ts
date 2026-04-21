import { useMemo, useState } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function useEmailValidation() {
  const [email, setEmail] = useState("");
  const [hasInteracted, setHasInteracted] = useState(false);

  const isValidEmail = useMemo(() => EMAIL_REGEX.test(email), [email]);
  const shouldShowError = hasInteracted && email.length > 0 && !isValidEmail;

  function handleEmailChange(value: string) {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
    setEmail(value);
  }

  function handleEmailBlur() {
    setHasInteracted(true);
  }

  return {
    email,
    isValidEmail,
    shouldShowError,
    handleEmailChange,
    handleEmailBlur,
  };
}

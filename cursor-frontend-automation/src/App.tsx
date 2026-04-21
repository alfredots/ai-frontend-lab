import "./App.css";
import { useState } from "react";
import { Toaster, toast } from "sonner";
import EmailField from "./components/EmailField";
import PasswordField from "./components/PasswordField";

function App() {
  const [hasSubmitAttempt, setHasSubmitAttempt] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  function handleSubmitAttempt() {
    setHasSubmitAttempt(true);

    if (isEmailValid && isPasswordValid) {
      toast.success("Login realizado com sucesso.");
    }
  }

  return (
    <main className="login">
      <div className="login__container">
        <section className="login__card">
          <header className="login__header">
            <h1 className="login__brand">Kiki&apos;s Delivery</h1>
            <p className="login__subtitle">Entre na sua conta magica</p>
          </header>

          <form className="login__form" action="#">
            <EmailField onValidationChange={setIsEmailValid} />
            <PasswordField
              hasSubmitAttempt={hasSubmitAttempt}
              onValidationChange={setIsPasswordValid}
            />

            <div className="login__options">
              <label className="login__remember">
                <input className="login__checkbox" type="checkbox" />
                Lembrar-me
              </label>
              <a className="login__link" href="#">
                Esqueceu a senha?
              </a>
            </div>

            <button className="login__submit" type="button" onClick={handleSubmitAttempt}>
              Entrar
            </button>
          </form>

          <p className="login__signup">
            Nao tem uma conta?{" "}
            <a className="login__link" href="#">
              Cadastre-se
            </a>
          </p>

          <div className="login__separator" aria-hidden="true">
            <span className="login__separator-line"></span>
            <span className="login__separator-text">ou continue com</span>
            <span className="login__separator-line"></span>
          </div>

          <div className="login__socials">
            <button className="login__social-button" type="button">
              Google
            </button>
            <button className="login__social-button" type="button">
              Facebook
            </button>
          </div>
        </section>

        <p className="login__footer">Feito com magia e carinho</p>
      </div>

      <Toaster position="top-right" richColors />
    </main>
  );
}

export default App;

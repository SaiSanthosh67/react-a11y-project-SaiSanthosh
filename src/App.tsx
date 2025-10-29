import { useState } from "react";
import { useIntl } from "react-intl";
import { add, CalculatorError } from "./stringCalculator";
import styles from "./webCommon.module.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { formatMessage } = useIntl();

  const handleInputChange = (value: string) => {
    setInput(value);
    setResult(null);
    setError(null);
  };

  const handleCalculate = () => {
    if (!input.trim()) {
      setError(formatMessage({ id: "messages.emptyInput" }));
      return;
    }

    setError(null);
    setResult(null);

    try {
      const sum = add(input);
      setResult(sum);
    } catch (error) {
      if (error instanceof CalculatorError) {
        setError(error.message);
      } else {
        setError(formatMessage({ id: "messages.unexpectedError" }));
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && e.ctrlKey) {
      e.preventDefault();
      handleCalculate();
    }
  };

  const isDisabled = !input.trim();

  return (
    <>
      <a href="#main-content" className={styles.skipLink}>
        {formatMessage({ id: "accessibility.skipLink" })}
      </a>
      <main id="main-content" className={styles.main}>
        <div className={styles.container}>
          <img
            src="https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            width={600}
            height={300}
            alt={formatMessage({ id: "image.alt" })}
            className={styles.image}
          />

          <div className={styles.content}>
            <h1 className={styles.title}>
              {formatMessage({ id: "app.title" })}
            </h1>

            <label htmlFor="numbers-input" className={styles.label}>
              {formatMessage({ id: "form.label" })}
            </label>

            <textarea
              id="numbers-input"
              className={`${styles.textarea} ${
                error ? styles["textarea--error"] : ""
              }`}
              placeholder={formatMessage({ id: "form.placeholder" })}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              onKeyDown={handleKeyPress}
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "error-message" : "help-text"}
            />

            <button
              onClick={handleCalculate}
              aria-disabled={isDisabled}
              aria-describedby={isDisabled ? "button-help" : "help-text"}
              className={`${styles.button} ${
                isDisabled ? styles["button--disabled"] : ""
              }`}
              title={
                isDisabled
                  ? formatMessage({ id: "form.buttonTitleDisabled" })
                  : formatMessage({ id: "form.buttonTitleEnabled" })
              }
            >
              {formatMessage({ id: "form.buttonText" })}
            </button>

            {isDisabled && (
              <p id="button-help" className={styles.buttonHelp}>
                {formatMessage({ id: "messages.buttonHelp" })}
              </p>
            )}

            {error && (
              <div
                id="error-message"
                role="alert"
                aria-live="assertive"
                className={styles.errorContainer}
              >
                <p className={styles.errorText}>
                  {formatMessage({ id: "error.prefix" })} {error}
                </p>
              </div>
            )}

            {result !== null && !error && (
              <div
                role="status"
                aria-live="polite"
                className={styles.resultContainer}
              >
                <p className={styles.resultText}>
                  {formatMessage({ id: "result.prefix" })} {result}
                </p>
              </div>
            )}

            <div id="help-text" className={styles.helpContainer}>
              <p className={styles.helpText}>
                {formatMessage({ id: "messages.helpText" })}
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default App;

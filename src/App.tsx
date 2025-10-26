import { useState, useCallback, useMemo } from 'react';
import { StringCalculator } from './stringCalculator';

const App = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const calculator = useMemo(() => new StringCalculator(), []);

  const handleCalculate = useCallback(() => {
    try {
      if (!input.trim()) {
        throw new Error('Please enter numbers before calculating');
      }
      setError(null);
      const sum = calculator.add(input);
      setResult(sum);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        setResult(null);
      }
    }
  }, [calculator, input]);

  return (
    <main style={{ padding: '20px', backgroundColor: '#fff', color: '#444' }}>
      <div style={{ maxWidth: 680, margin: '0 auto' }}>
        <header style={{ textAlign: 'center', marginBottom: 16 }}>
          <img
            src='https://images.unsplash.com/photo-1594352161389-11756265d1b5?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt="Calculator on a desk with papers and pencils"
            style={{ width: '100%', maxWidth: 600, height: 'auto', borderRadius: 6 }}
          />
          <h1>String Calculator</h1>
        </header>

        <section aria-label="Calculator Input" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="numberInput" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Enter numbers:
          </label>
          <textarea
            id="numberInput"
            style={{
              width: '100%',
              minHeight: '100px',
              padding: '12px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              color: '#444',
              fontSize: '16px',
              fontFamily: 'inherit'
            }}
            placeholder='Enter numbers separated by commas (e.g., "1,2,3")'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-describedby={error ? "errorHelp" : "inputHelp"}
          />
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '20px' }}>
          <button
            onClick={handleCalculate}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCalculate();
              }
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#005079',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'all 0.2s',
              outline: 'none'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#003c5a'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#005079'}
            onFocus={(e) => e.currentTarget.style.boxShadow = '0 0 0 3px rgba(0, 80, 121, 0.3)'}
            onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
            aria-label="Calculate sum">
            Calculate
          </button>

          {result !== null && (
            <output 
              style={{ 
                color: '#005f03ff',
                fontSize: '18px',
                fontWeight: '700'
              }}
              aria-live="polite">
              Result: {result}
            </output>
          )}
        </div>

        {error && (
          <div 
            role="alert" 
            aria-live="assertive" 
            id="errorHelp"
            style={{
              color: '#A5040C',
              backgroundColor: '#ffebee',
              padding: '12px',
              borderRadius: '4px',
              marginBottom: '16px'
            }}>
            <p style={{ margin: 0 }}>{error}</p>
          </div>
        )}
        </section>
      </div>
    </main>
  );
};

export default App;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';


function App() {
  const [length, setLength] = useState(0);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  
  const passwordRef = useRef();

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*_~?}{|:?><()[]';

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);
  }, [numberAllowed, charAllowed, length]);

  useEffect(() => {
    passwordGenerator();
  }, [numberAllowed, charAllowed, length, passwordGenerator]);

  const copyPasswordToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      document.execCommand('copy');
    }
  }, [password]);

  return (
    
    <div className="container-top">
      <div>
        <h1>Random Password Generator</h1>
        <input
          type="text"
          ref={passwordRef}
          className="input-box"
          placeholder="Password"
          value={password}
          readOnly
        />
        <button className="btn" onClick={copyPasswordToClipboard}>
          Copy
        </button>
      </div>
      <div>
        <input
          type="range"
          style={{ cursor: 'pointer' }}
          value={length}
          min={0}
          max={100}
          onChange={(e) => setLength(Number(e.target.value))}
        />
        <label htmlFor="length">Length: {length}</label>

        <input
          type="checkbox"
          style={{ cursor: 'pointer' }}
          id="numberAllowed"
          checked={numberAllowed}
          onChange={() => setNumberAllowed((prev) => !prev)}
        />
        <label htmlFor="numberAllowed">Numbers</label>

        <input
          type="checkbox"
          style={{ cursor: 'pointer' }}
          id="charAllowed"
          checked={charAllowed}
          onChange={() => setCharAllowed((prev) => !prev)}
        />
        <label htmlFor="charAllowed">Characters</label>
      </div>
    </div>
  );
}

export default App;

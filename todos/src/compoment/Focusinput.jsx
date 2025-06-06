import React, { useRef, useState } from 'react';

const FocusInput = () => {
  const inputRef = useRef(null);
  const [focused, setFocused] = useState(false);

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.style.backgroundColor = 'red'; 
      setFocused(true);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <input
        ref={inputRef}
        type="text"
        placeholder="Click the button to focus me"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <br /><br />
      <button onClick={handleClick} style={{ padding: '10px 15px', fontSize: '16px' }}>
        Focus Input
      </button>
      {focused && (
        <p style={{ color: 'green', marginTop: '10px' }}>Focused!</p>
      )}
    </div>
  );
};

export default FocusInput;



import React, { useState } from 'react';

const App: React.FC = () => {
  const [name, setName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  return (
    <div>
      <h1>What's your name?</h1>
      <input type="text" value={name} onChange={handleChange} />
      <h2>Hello {name}!</h2>
    </div>
  );
};

export default App;
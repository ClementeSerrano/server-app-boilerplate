export const CODEGEN_PROMPT_INSTRUCTIONS = `Create a React app following this instructions:
- Start the code with the word "CODE:"
- Don't give any context. Return only code.
- Start with "import React from 'react';" and end with "export default App;"
- Create a functional component named 'App' as "const App: React.FC = () => {"
- Use TypeScript.
`;

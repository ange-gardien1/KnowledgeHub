'use client'
import { useState } from "react";

const AskChat: React.FC = () => {
  const [prompt, setPrompt] = useState("");

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="How My I Help Today"
          rows={4}
          cols={50}
          style={{ marginBottom: '10px', padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Submit</button>
      </form>
    </div>
  );
};

export default AskChat;

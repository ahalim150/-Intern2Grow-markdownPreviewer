import './App.css';
import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import useLocalStorage from './Hook/useLocalStorage';

const App = () => {
  const [code, setCode] = useLocalStorage('markdown', '## Hello');
  const [compiled, setCompiled] = useState(marked.parse(code));
  const [view, setView] = useState('markdown'); // 'markdown', 'preview', 'docs'
  const [docs, setDocs] = useState('');

  useEffect(() => {
    if (view === 'docs') {
      fetch('https://www.markdownguide.org/api/v1/basic-syntax.json')
        .then(response => response.text())
        .then(data => setDocs(data));
    }
  }, [view]);

  const handleChange = (e) => {
    setCode(e.target.value);
    setCompiled(marked.parse(e.target.value));
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>
      <div className="container">
        <div className="btns">
          <button onClick={() => setView('markdown')} className="btn">MarkDown</button>
          <button onClick={() => setView('preview')}>Preview</button>
          <button onClick={() => setView('docs')}>Docs</button>
        </div>
        {view === 'markdown' && (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        )}
        {view === 'preview' && (
          <div>
            <textarea value={compiled} readOnly />
          </div>
        )}
        {view === 'docs' && (
          <div>
            <textarea value={docs} readOnly />
          </div>
        )}
      </div>
    </>
  );
};

export default App;

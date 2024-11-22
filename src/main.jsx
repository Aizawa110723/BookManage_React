import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.jsx';

// rootElement の取得
const rootElement = document.getElementById('root');

// createRoot() を一度だけ呼び出して root オブジェクトを取得
const root = createRoot(rootElement);

// 初回のレンダリング
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

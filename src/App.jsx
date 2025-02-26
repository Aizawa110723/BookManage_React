import { BrowserRouter } from 'react-router-dom';
import { CsrfTokenProvider } from './context/CsrfTokenContext';
import { RoutesSetup } from './components/RoutesSetup';  // ルーティング設定をインポート

export const App = () => {
  return (
    <CsrfTokenProvider>
      <BrowserRouter>
        <RoutesSetup /> {/* ルーティング設定を任せる */}
      </BrowserRouter>
    </CsrfTokenProvider>
  );
};

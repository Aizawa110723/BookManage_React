import React, { useEffect } from 'react';
import { setCsrfToken } from './api/axios';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Typography, Box, Button } from '@mui/material';
import { topButton, buttonStyle_a, bigStyles } from './components/Styles';
import { BcRoute } from './components/BcRoute';
import { CsrfTokenProvider, useCsrfToken } from './context/CsrfTokenContext';  // CsrfTokenProviderのインポート

export const App = () => {
  return (
    <CsrfTokenProvider>  {/* CSRFトークン管理用のコンテキストプロバイダー */}
      <RoutesComponent />
    </CsrfTokenProvider>
  );
};

// CSRFトークンを取得するコンポーネント
const RoutesComponent = () => {
  const { csrfToken, loading } = useCsrfToken();  // CSRFトークンの取得

  // axiosインスタンスにCSRFトークンを設定
  useEffect(() => {
    if (csrfToken) {
      setCsrfToken(csrfToken);
    }
  }, [csrfToken]);

  // ローディング中の表示
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* トップページ */}
        <Route
          path="/"
          element={
            <div>
              <Box sx={{ ...topButton }}>
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: '"Roboto", sans-serif',
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    color: '#3D120E',
                    textAlign: 'center',
                    letterSpacing: '2px',
                  }}
                >
                  書籍管理＆検索
                </Typography>
              </Box>

              <Box sx={{ ...bigStyles, height: '70vh', backgroundColor: '#F5D19A' }}>
                <Button component={Link} to="/BookForm" variant="outlined" sx={{ ...buttonStyle_a }}>
                  書籍登録フォーム
                </Button>

                <Button component={Link} to="/SearchForm" variant="outlined" sx={{ ...buttonStyle_a }}>
                  書籍検索フォーム
                </Button>

                <Button component={Link} to="/BookList" variant="outlined" sx={{ ...buttonStyle_a }}>
                  書籍リスト
                </Button>
              </Box>
            </div>
          }
        />

        {/* 書籍登録フォーム */}
        <Route
          path="/BookForm"
          element={
            <>
              <BcRoute isVertical={false} />
              <BookForm />
            </>
          }
        />

        {/* 書籍検索フォーム */}
        <Route
          path="/SearchForm"
          element={
            <>
              <BcRoute isVertical={false} />
              <SearchForm />
            </>
          }
        />

        {/* 書籍リスト */}
        <Route
          path="/BookList"
          element={
            <>
              <BcRoute isVertical={false} />
              <BookList />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

import React from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Typography, Box, Button } from '@mui/material';
import { topButton, buttonStyle_a, bigStyles } from './components/Styles';
import { Root } from './components/Bcroute';
import { CsrfTokenProvider } from './context/CsrfTokenContext';  // CsrfTokenProviderのインポート


// Axiosの設定
axios.defaults.withCredentials = true;  // これで全てのリクエストにクレデンシャルを含める

export const App = () => {

  // const [books, setBooks] = useState([]);  // Appコンポーネント内で`books`の状態を管理
  // const [error, setError] = useState(null); // setError を定義

  return (
    <CsrfTokenProvider>    {/* App全体をCsrfTokenProviderでラップ */}
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
                <Root isVertical={false} />
                <BookForm />
              </>
            }
          />

          {/* 書籍検索フォーム */}
          <Route
            path="/SearchForm"
            element={
              <>
                <Root isVertical={false} />
                <SearchForm />
              </>
            }
          />

          {/* 書籍リスト */}
          <Route
            path="/BookList"
            element={
              <>
                <Root isVertical={false} />
                <BookList />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </CsrfTokenProvider>
  );
};

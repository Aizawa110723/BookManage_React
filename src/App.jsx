import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { topButton, buttonStyle_a, bigStyles } from './components/Styles';
// import { CsrfTokenProvider } from './context/CsrfTokenContext';  // 追加

export const App = () => {
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

        {/* 書籍登録フォーム - CSRF トークンを提供 */}
        <Route path="/BookForm" element={
          <CsrfTokenProvider>
            <BookForm />
          </CsrfTokenProvider>
        } />

        {/* 書籍検索フォーム - CSRF トークンを提供 */}
        <Route path="/SearchForm" element={
          <CsrfTokenProvider>
            <SearchForm />
          </CsrfTokenProvider>
        } />

        {/* 書籍リスト */}
        <Route path="/BookList" element={<BookList />} />
      </Routes>
    </BrowserRouter>
  );
};

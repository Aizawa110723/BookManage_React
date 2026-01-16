import { Link, BrowserRouter, Route, Routes } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Box, Typography, Button } from '@mui/material';
import { topButton, buttonStyle_a, bigStyles } from './components/Styles';
import { BcRoutes } from './components/BcRoutes';  // BcRouteをインポート

// import { CsrfTokenProvider } from './context/CsrfTokenContext';  // 追加

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* トップページ */}
        {/* トップページ（BcRoutesを表示しない） */}
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
                  書籍登録
                </Button>

                <Button component={Link} to="/SearchForm" variant="outlined" sx={{ ...buttonStyle_a }}>
                  書籍検索
                </Button>

                <Button component={Link} to="/BookList" variant="outlined" sx={{ ...buttonStyle_a }}>
                  登録一覧
                </Button>
              </Box>
            </div>
          }
        />

        {/* 書籍登録フォーム（BcRoutesを表示） */}
        <Route
          path="/BookForm"
          element={
            <>
              <BcRoutes isVertical={false} /> {/* BcRoutesを表示 */}
              <BookForm />
            </>
          }
        />

        {/* 書籍検索フォーム（BcRoutesを表示） */}
        <Route
          path="/SearchForm"
          element={
            <>
              <BcRoutes isVertical={false} /> {/* BcRoutesを表示 */}
              <SearchForm />
            </>
          }
        />

        {/* 書籍リスト（BcRoutesを表示） */}
        <Route
          path="/BookList"
          element={
            <>
              <BcRoutes isVertical={false} /> {/* BcRoutesを表示 */}
              <BookList />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
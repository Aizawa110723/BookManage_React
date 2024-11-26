import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Typography, Box, Button } from '@mui/material';

export const App = () => {
  // const [books, setBooks] = useState([]);  // 書籍データを保持
  // const [error, setError] = useState(null);  // エラーメッセージを保持

  return (
    <>
      <BrowserRouter>
        {/* トップページ以外のページにはNavBarを表示 */}
        <Routes>
          {/* トップページにはNavBarを縦並び（中央配置）で表示 */}
          <Route
            path="/"
            element={
              <div>
                <Box display="flex" justifyContent="center" alignItems="center" p={2} bgcolor="#AEE0FF">
                  <Typography variant="h6">書籍登録・検索フォーム</Typography>
                </Box>

                <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2} sx={{ height: '100vh', borderRadius: '20px' }}>
                  <Button component={Link} to="/BookForm" variant="outlined" sx={{ margin: '16px' }}>
                    書籍登録フォーム
                  </Button>

                  <Button component={Link} to="/SearchForm" variant="outlined" sx={{ margin: '16px' }}>
                    書籍検索フォーム
                  </Button>

                  <Button component={Link} to="/BookList" variant="outlined" sx={{ margin: '16px' }}>
                    書籍リスト
                  </Button>
                </Box>
              </div>
            }
          />

          {/* トップページ以外のページにはNavBarを横並び（上部配置）で表示 */}
          <Route
            path="/BookForm"
            element={
              <>
                <NavBar isVertical={false} />  {/* 横並び */}
                <BookForm />
              </>
            }
          />
          <Route
            path="/SearchForm"
            element={
              <>
                <NavBar isVertical={false} />
                <SearchForm />
              </>
            }
          />
          <Route
            path="/BookList"
            element={
              <>
                <NavBar isVertical={false} />
                <BookList />
              </>
            }
          />
        </Routes>
      </BrowserRouter>

    </>
  );
};

import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Typography, Box, Button } from '@mui/material';

export const App = () => {
  const [books, setBooks] = useState([]);  // 書籍データを保持
  const [error, setError] = useState(null);  // エラーメッセージを保持

  return (
    <>
      <BrowserRouter>

        {/* ヘッダー */}
        <Box display="flex" justifyContent="center" alignItems="center" p={2} bgcolor="#AEE0FF">
          <Typography variant="h6">書籍検索・登録フォーム</Typography>
        </Box>

        {/* ナビゲーションリンク */}

        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2} sx={{ height: '100vh', borderRadius: '20px', }}>

          {/* トップページ */}
          <Button component={Link} to="/" variant="contained" sx={{ margin: '16px' }}>
            トップページ
          </Button>

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

        {/* <Routes>
          <Route path="/" element={<Typography variant="h6">ようこそ！ページを選択してください。</Typography>} />
          {/* <Route path="/BookForm" element={<BookForm />} />
          {/* <Route path="/SearchForm" element={<SearchForm />} />
          {/* <Route path="/BookList" element={<BookList />} />
        {/* </Routes> */} */

      </BrowserRouter>
    </>
  );
};

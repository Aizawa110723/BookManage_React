import { useState } from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './components/BookForm';
import { SearchForm } from './components/SearchForm';
import { BookList } from './components/BookList';
import { Typography, Box, Button } from '@mui/material';

export const App = () => {
  // const [books, setBooks] = useState([]);  // 書籍データを保持
  // const [error, setError] = useState(null);  // エラーメッセージを保持

  return (
    <>
      <BrowserRouter>

        {/* ヘッダー */}
        <Box display="flex" justifyContent="center" alignItems="center" p={2} bgcolor="#AEE0FF">
          <Typography variant="h6">
            書籍検索・登録フォーム
          </Typography>
        </Box>

        {/* ナビゲーションリンク */}
        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" p={2} sx={{ height: '100vh', borderRadius: '20px', }}>

          {/* トップページ（選択不可） */}
          <Button component={Link} to="/" disabled variant="contained" sx={{ margin: '16px' }}>
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

        {/* ルーティング */}
        <Routes>
          <Route path="/" element={null} /> {/* トップページ */}
          <Route path="/SearchForm" element={<SearchForm />} /> {/* 書籍検索フォーム */}
          <Route path="/BookForm" element={<BookForm />} /> {/* 書籍登録フォーム */}
          <Route path="/BookList" element={<BookList />} /> {/* 書籍リスト表示 */}
        </Routes>

      </BrowserRouter>
    </>
  );
};

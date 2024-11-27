import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Typography, Box, Button } from '@mui/material';

const buttonStyle_a = {
  margin: '20px',
  fontWeight: 'bold',
  fontFamily: '"Roboto", sans-serif', // フォント変更
  backgroundColor: '#003366',
  color: 'white',
  borderRadius: '50px', // ボタンを丸く
  boxShadow: 'none', // ボタンの影を消す
  alignItems: 'center',
  fontSize: '1.5rem',  // フォントサイズを少し大きく
  padding: '35px 24px', // ボタンのパディング（大きさ調整）
  width: '30%',  // 幅を統一
  minWidth: '200px',
  height: '60px', // 高さを統一
  '&:hover': {
    backgroundColor: '#6495ED',
    color: 'white',
  },
};


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
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // 影を右下に設定（BookFormの影に合わせる）
                  backgroundColor: '#AEE0FF',
                  width: '100%',
                  maxWidth: '100%',
                  margin: '0 auto',  // 中央に配置
                  '@media (max-width: 600px)': {  // 画面が600px以下になった場合
                    width: '100%',
                    padding: '10px',
                  },
                }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Roboto", sans-serif',
                      fontWeight: 'bold',
                      color: '#003366',
                      textAlign: 'center',
                      letterSpacing: '1px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                    }}
                  >
                    書籍管理＆検索
                  </Typography>
                </Box>

                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    fontFamily: '"Roboto", sans-serif', // フォント変更
                    fontWeight: "bold",
                    color: '#003366',
                    textAlign: 'center',
                    borderRadius: "10px",
                    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // 同じ影を設定
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    backgroundColor: '#ffffff', // 背景色を白に設定
                    width: '100%',  // 幅を統一
                    maxWidth: '100%', // 最大幅を設定
                    margin: '0 auto', // 中央に配置
                    '@media (max-width: 600px)': {  // スクリーンサイズが600px以下の時
                      width: '100%',  // 幅を90%に調整
                      padding: '10px', // パディングを調整
                    },
                  }}
                >

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

          {/* トップページ以外のページにはNavBarを横並び（上部配置）で表示 */}

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
            path="/BookForm"
            element={
              <>
                <NavBar isVertical={false} />
                <BookForm />
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

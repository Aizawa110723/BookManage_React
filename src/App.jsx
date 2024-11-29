// import { useState } from 'react';
import { NavBar } from './components/NavBar';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Typography, Box, Button } from '@mui/material';
import { topStyles, bigStyles } from "./components/Styles";
import { lineHeight } from '@mui/system';

const buttonStyle_a = {
  margin: '20px',
  fontWeight: 'bold',
  fontFamily: '"Roboto", sans-serif', // フォント変更
  backgroundColor: '#003366',
  color: 'white',
  borderRadius: '50px', // ボタンを丸く
  boxShadow: 'none', // ボタンの影を消す
  alignItems: 'center',
  fontSize: '1.8rem',  // フォントサイズを少し大きく
  padding: '45px 45px', // ボタンのパディング（大きさ調整）
  width: '20%',  // 幅を統一
  minWidth: '200px',
  height: '60px', // 高さを統一
  lineHeight: '1.2',
  '&:hover': {
    backgroundColor: '#6495ED',
    color: 'white',
  },
  '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
    fontSize: '1.5rem',  // フォントサイズを少し小さく
    padding: '35px 35px', // パディングを少し小さく
    width: '30%',  // 幅を30%に調整
    height: '50px', // 高さを調整
  },
  '@media (max-width: 768px)': { // スマートフォン向け
    fontSize: '1.2rem',  // フォントサイズをさらに小さく
    padding: '25px 25px', // パディングをさらに小さく
    width: '50%',  // 幅を50%に調整
    height: '45px', // 高さを調整
  },
  '@media (max-width: 480px)': { // より小さな画面向け
    fontSize: '1rem',  // フォントサイズを最小限に
    padding: '15px 15px', // パディングを最小限に
    width: '70%',  // 幅を70%に調整
    height: '40px', // 高さを調整
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
                <Box sx={topStyles}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: '"Roboto", sans-serif',
                      fontSize: '2.5rem',
                      fontWeight: 'bold',
                      color: '#003366',
                      textAlign: 'center',
                      letterSpacing: '2px',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                    }}
                  >
                    書籍管理＆検索
                  </Typography>
                </Box>

                {/* トップのみ背景白 */}
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "top",
                  alignItems: "center",
                  fontFamily: '"Roboto", sans-serif', // フォント変更
                  fontWeight: "bold",
                  color: '#003366',
                  textAlign: 'center',
                  borderRadius: "10px",
                  boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // 同じ影を設定
                  paddingTop: '80px',
                  // paddingBottom: '30px',
                  backgroundColor: '#ffffff', // 背景色を白に設定
                  width: '100%',  // 幅を統一
                  margin: '0 auto', // 中央に配置
                  height: '100vh',
                  '@media (max-width: 600px)': {  // スクリーンサイズが600px以下の時
                    width: '100%',
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

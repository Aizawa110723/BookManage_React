// import { useState } from 'react';
import { Root } from './components/Root';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { BookForm } from './pages/BookForm';
import { SearchForm } from './pages/SearchForm';
import { BookList } from './pages/BookList';
import { Typography, Box, Button } from '@mui/material';

// トップのみボタンスタイル
 export const buttonStyle_a = {
  margin: '20px',
  fontWeight: 'bold',
  fontFamily: '"Roboto", sans-serif', // フォント変更
  backgroundColor: '#003366',
  color: 'white',
  borderRadius: '50px', // ボタンを丸く
  alignItems: 'center',
  fontSize: '1.8rem',  // フォントサイズを少し大きく
  padding: '45px 45px', // ボタンのパディング（大きさ調整）
  width: '23%',  // 幅を統一
  minWidth: '200px',
  height: '60px', // 高さを統一
  lineHeight: '1.2',
  boxShadow: 'none !important', // 影を削除
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
        {/* トップページ以外のページにはRootを表示 */}


        <Routes>
          <Route
            path="/"
            element={
              <div>
                {/* トップページのみRootをタテ並び（中央配置）で表示 */}
                <Box
                  sx={{
                    display: "flex",
                    boxShadow: 'none',
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    fontFamily: '"Roboto", sans-serif', // フォント変更
                    fontWeight: "bold",
                    color: '#003366',
                    textAlign: 'center',
                    borderRadius: "10px",
                    border: "1px solid rgba(0, 0, 0, 0.1)",
                    height: '60px', // 高さを統一
                    backgroundColor: '#AEE0FF',
                    width: '90%',  // 幅を統一
                    paddingTop: '30px',
                    paddingBottom: '30px',
                    margin: '0 auto', // 中央に配置
                    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
                      fontSize: '1.5rem',  // フォントサイズを少し小さく
                      padding: '35px 35px', // パディングを少し小さく
                      width: 'auto',  // 幅を30%に調整
                      height: '50px', // 高さを調整
                    },
                    '@media (max-width: 768px)': { // スマートフォン向け
                      fontSize: '1.2rem',  // フォントサイズをさらに小さく
                      padding: '25px 25px', // パディングをさらに小さく
                      width: 'auto',  // 幅を50%に調整
                      height: '45px', // 高さを調整
                    },
                    '@media (max-width: 480px)': { // より小さな画面向け
                      fontSize: '1rem',  // フォントサイズを最小限に
                      padding: '15px 15px', // パディングを最小限に
                      width: 'auto',  // 幅を70%に調整
                      height: '40px', // 高さを調整
                    },

                  }}

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
                    }}
                  >
                    書籍管理＆検索
                  </Typography>
                </Box>

                {/* トップのみ背景白 */}
                <Box sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: '"Roboto", sans-serif', // フォント変更
                  fontWeight: "bold",
                  color: '#003366',
                  textAlign: 'center',
                  borderRadius: "10px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderTop: "none",
                  height: '70vh',  // 高さを統一
                  margin: '0 auto', // 中央に配置
                  backgroundColor: '#ffffff', // 背景色を白に設定
                  width: '90%',  // 幅を統一
                  '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
                    fontSize: '1.5rem',  // フォントサイズを少し小さく
                    padding: '35px 35px', // パディングを少し小さく
                    width: 'auto',  // 幅を30%に調整
                    height: 'auto', // 高さを調整
                  },
                  '@media (max-width: 768px)': { // スマートフォン向け
                    fontSize: '1.2rem',  // フォントサイズをさらに小さく
                    padding: '25px 25px', // パディングをさらに小さく
                    width: 'auto',  // 幅を50%に調整
                    height: 'auto', // 高さを調整
                  },
                  '@media (max-width: 480px)': { // より小さな画面向け
                    fontSize: '1rem',  // フォントサイズを最小限に
                    padding: '15px 15px', // パディングを最小限に
                    width: 'auto',  // 幅を70%に調整
                    height: 'auto', // 高さを調整
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

          {/* トップページ以外のページにはRootを横並び（上部配置）で表示 */}

          <Route
            path="/SearchForm"
            element={
              <>
                <Root isVertical={false} />
                <SearchForm />
              </>
            }
          />
          <Route
            path="/BookForm"
            element={
              <>
                <Root isVertical={false} />
                <BookForm />
              </>
            }
          />

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
      </BrowserRouter >

    </>
  );
};

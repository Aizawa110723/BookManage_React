import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { topStyles } from "../components/Styles";
import { padding } from '@mui/system';

// トップ以外のボタン
const buttonStyle = {
    display: 'flex',
    margin: '20px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif', // フォント変更
    backgroundColor: '#003366',
    color: 'white',
    borderRadius: '50px', // ボタンを丸く
    boxShadow: 'none', // ボタンの影を消す
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',  // フォントサイズを少し大きく
    padding: '24px 24px', // ボタンのパディング（大きさ調整）
    width: 'auto',  // 幅を統一
    minWidth: '200px',
    height: '50px', // 高さを統一
    margin: '10px', // 中央に配置
    '&:hover': {
        backgroundColor: '#6495ED',
        color: 'white',
    },

    // レスポンシブデザインでもボタンのサイズやフォントは変えない
    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
        fontSize: '1.2rem', // フォントサイズを固定
        padding: '24px 24px', // パディングを固定
        width: 'auto', // 幅は自動調整
        height: '50px', // 高さを固定
    },
    '@media (max-width: 768px)': { // スマートフォン向け
        fontSize: '1.2rem', // フォントサイズを固定
        padding: '24px 24px', // パディングを固定
        width: 'auto', // 幅は自動調整
        height: '50px', // 高さを固定
    },
    '@media (max-width: 480px)': { // より小さな画面向け
        fontSize: '1rem',  // フォントサイズを最小限に
        padding: '15px 15px', // パディングを最小限に
        width: 'auto', // 幅は自動調整
        height: '50px', // 高さを固定
    },
};



export const NavBar = ({ isVertical }) => {

    return (
        <div>
            <Box
                display="flex"
                flexDirection={isVertical ? 'column' : 'row'}  // isVerticalによって縦並び・横並びを変更
                alignItems="center"  // どちらの方向でも中央揃えにする
                justifyContent="center"  // 横並びの場合は中央揃えにする

                sx={{ ...topStyles }}

            >
                <Button component={Link} to="/" variant="contained" sx={{ ...buttonStyle }}>
                    トップページ
                </Button>
                <Button component={Link} to="/BookForm" variant="outlined" sx={{ ...buttonStyle }}>
                    書籍登録フォーム
                </Button>
                <Button component={Link} to="/SearchForm" variant="outlined" sx={{ ...buttonStyle }}>
                    書籍検索フォーム
                </Button>
                <Button component={Link} to="/BookList" variant="outlined" sx={{ ...buttonStyle }}>
                    書籍リスト
                </Button>
            </Box>
        </div>
    );
};
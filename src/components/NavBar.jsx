import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const buttonStyle = {
    margin: '20px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif', // フォント変更
    backgroundColor: '#003366',
    color: 'white',
    borderRadius: '50px', // ボタンを丸く
    boxShadow: 'none', // ボタンの影を消す
    alignItems: 'center',
    fontSize: '1.2rem',  // フォントサイズを少し大きく
    padding: '25px 24px', // ボタンのパディング（大きさ調整）
    width: 'auto',  // 幅を統一
    minWidth: '200px',
    height: '50px', // 高さを統一
    '&:hover': {
        backgroundColor: '#6495ED',
        color: 'white',
    },
};

export const NavBar = ({ isVertical }) => {

    return (
        <Box
            display="flex"
            flexDirection={isVertical ? 'column' : 'row'}  // isVerticalによって縦並び・横並びを変更
            alignItems="center"  // どちらの方向でも中央揃えにする
            justifyContent="center"  // 横並びの場合は中央揃えにする
            
            sx={{
                width: '100%',
                margin: '0 auto',  // 中央に配置
                boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // 影を右下に設定（BookFormの影に合わせる）
                borderRadius: '10px', // 角丸
                '@media (max-width: 600px)': {
                    flexDirection: 'column', // 画面が小さくなったら縦並びに変更
                    width: '100%',
                    padding: '10px',
                },
            }}
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
    );
};
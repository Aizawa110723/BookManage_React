import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import { navStyles, buttonStyles } from './Styles';

export const NavBar = ({ isVertical }) => {

    return (
        <div>
            <Box
                display="flex"
                flexDirection={isVertical ? 'column' : 'row'}  // isVerticalによって縦並び・横並びを変更
                alignItems="center"  // どちらの方向でも中央揃えにする
                justifyContent="center"  // 横並びの場合は中央揃えにする

                sx={{ ...navStyles }}

            >
                <Button component={Link} to="/" variant="contained" sx={{ ...buttonStyles }}>
                    トップページ
                </Button>
                <Button component={Link} to="/BookForm" variant="outlined" sx={{ ...buttonStyles }}>
                    書籍登録フォーム
                </Button>
                <Button component={Link} to="/SearchForm" variant="outlined" sx={{ ...buttonStyles }}>
                    書籍検索フォーム
                </Button>
                <Button component={Link} to="/BookList" variant="outlined" sx={{ ...buttonStyles }}>
                    書籍リスト
                </Button>
            </Box>
        </div>
    );
};
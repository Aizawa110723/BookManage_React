// NavBar.jsx (共通のナビゲーションコンポーネント)
import { Link } from 'react-router-dom';
import { Box, Button } from '@mui/material';

export const NavBar = () => {
    return (
        <Box display="flex" flexDirection="column" alignItems="flex-start" p={2}>
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
    );
};

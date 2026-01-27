import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Typography,
    Grid,
    Card,
    CardMedia,
    CardContent,
    CircularProgress,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    TableContainer,
    Paper,
    Pagination,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button
} from '@mui/material';
import { bigStyles, getButtonStyles, dialogButtonStyle, titleCells, bodyCells } from "../components/Styles";


const DEFAULT_IMAGE = '/images/noprinting.png';

export const BookList = () => {
    const [books, setBooks] = useState([]); // 書籍データを格納するstate
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // エラーステートを定義
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'card'
    const [currentPage, setCurrentPage] = useState(1); // 現在のページ
    const [totalPages, setTotalPages] = useState(1); // 総ページ数
    const [openDialog, setOpenDialog] = useState(false); // エラーダイアログの状態


    // 書籍データ取得
    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);  // ローディング開始
            setError(null);  // エラーメッセージをリセット
            try {
                // viewMode によって 1ページあたり件数を変える
                const perPage = viewMode === 'card' ? 9 : 10;

                // 自分のAPIから書籍データを取得(テーブル表示・ページネーション対応)
                const response = await axios.get(`http://127.0.0.1:8000/api/books?page=${currentPage}&perPage=${perPage}`

                );
                const data = response.data;

                console.log('data array check:', Array.isArray(data));

                const booksWithImages = data.data.map(book => ({
                    ...book,
                    imageUrl: book.image_url || DEFAULT_IMAGE
                }));
                console.log('booksWithImages:', booksWithImages);
                setBooks(booksWithImages);
                setTotalPages(data.last_page || 1);
            } catch (err) {
                console.error(err);
                setError('書籍情報の取得に失敗しました'); // エラーをセット
                setOpenDialog(true);  // エラーダイアログを開く
            } finally {
                setLoading(false);  // ローディング終了
            }
        };

        loadBooks();  // データをロード
    }, [currentPage, viewMode]);  // currentPageが変更されたら再度データを取得/viewMode を依存に追加

    // ページ切り替え処理
    const handlePageChange = (event, value) => setCurrentPage(value);
    // ダイアログの「閉じる」ボタン
    const handleCloseDialog = () => setOpenDialog(false);

    return (
        <>
            {/* エラーダイアログ */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>エラー</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="error">{error}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} sx={dialogButtonStyle}>
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={bigStyles}>
                <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto', }}>
                    <Typography
                        variant="h3"
                        sx={{
                            color: '#8B3A2F',
                            textAlign: 'center',
                            letterSpacing: '4px',
                            fontWeight: 'bold',
                            paddingTop: '30px',
                            marginTop: '10px',
                            height: '70px',
                        }}
                    >
                        書籍リスト
                    </Typography>

                    {/* モード切り替えボタン */}
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            gap: '20px',
                            marginBottom: '20px'
                        }}
                    >
                        <button
                            onClick={() => setViewMode('table')}
                            style={getButtonStyles(viewMode === 'table')}>テーブル表示</button>
                        <button
                            onClick={() => setViewMode('card')}
                            style={getButtonStyles(viewMode === 'card')}>カード表示</button>
                    </Box>
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '40px 0' }}>
                        <CircularProgress />
                    </Box>
                )}

                {/* テーブル表示 */}
                <Box sx={{ width: '100%', maxWidth: '1200px', margin: '0 auto' }}>
                    {viewMode === 'table' && (
                        <Box sx={{ width: '95%', margin: '0 auto' }}>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                backgroundColor: '#D88F34', // タイトル行の背景
                                                '& th': { color: 'white', fontWeight: 'bold' }, // タイトルセルの文字色
                                                borderBottom: '3px solid #8B3A2F', // タイトル行のみ下線
                                            }}
                                        >
                                            <TableCell sx={titleCells}>管理ID</TableCell>
                                            <TableCell sx={titleCells}>タイトル</TableCell>
                                            <TableCell sx={titleCells}>著者</TableCell>
                                            <TableCell sx={titleCells}>出版社</TableCell>
                                            <TableCell sx={titleCells}>出版年月日</TableCell>
                                            <TableCell sx={titleCells}>ジャンル</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {books.map((book) => (
                                            <TableRow key={book.id}>
                                                <TableCell sx={bodyCells}>{book.id}</TableCell>
                                                <TableCell sx={bodyCells}>{book.title}</TableCell>
                                                <TableCell sx={bodyCells}>{book.authors}</TableCell>
                                                <TableCell sx={bodyCells}>{book.publisher}</TableCell>
                                                <TableCell sx={bodyCells}>{book.year}</TableCell>
                                                <TableCell sx={bodyCells}>{book.genre}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {/* カード表示 */}
                    {viewMode === 'card' && (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                flexGrow: 1,           // 下まで伸ばす
                                width: '100%',
                                maxWidth: '1200px',
                                margin: '0 auto',
                            }}
                        >
                            <Grid container spacing={3}>
                                {books.map((book) => (
                                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                                        <Card sx={{
                                            width: '100%',
                                            maxWidth: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            overflow: 'hidden',
                                        }}>
                                            <CardMedia
                                                component="img"
                                                height="150"
                                                image={book.imageUrl}
                                                alt={book.title || 'No Image'}
                                                sx={{ objectFit: 'cover' }}
                                            />
                                            <CardContent
                                                sx={{
                                                    flexGrow: 1,
                                                    display: 'flex',
                                                    flexDirection: 'column',
                                                    justifyContent: 'flex-start',
                                                    textAlign: 'left',
                                                    gap: 0.3,
                                                }}>
                                                <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold' }}>
                                                    {book.title}
                                                </Typography>
                                                <Typography variant="body2" noWrap>著者：{book.authors}</Typography>
                                                <Typography variant="body2" noWrap>出版社：{book.publisher}</Typography>
                                                <Typography variant="body2" noWrap>出版年月日：{book.year}</Typography>
                                                <Typography variant="body2" noWrap>ジャンル：{book.genre}</Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    )}

                    {/* ページネーション（テーブル・カード共通） */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Box>
                </Box>
            </Box >
        </>
    );
};
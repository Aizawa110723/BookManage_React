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
    const [selectedBook, setSelectedBook] = useState(null);


    // ------------------------
    // ダイアログ用の状態判定
    // ------------------------
    const hasSelection = !!selectedBook;         // 書籍を選択したか
    const hasValidISBN = selectedBook?.isbn;     // 選択した書籍に ISBN があるか
    const isValidSelection = hasSelection && hasValidISBN;

    // 書籍データ取得
    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);  // ローディング開始
            setError(null);  // エラーメッセージをリセット
            try {
                // viewMode によって 1ページあたり件数を指定
                // const perPage = viewMode === 'card' ? 12 : 12;

                const perPage = 12;

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
            } finally {
                setLoading(false);  // ローディング終了
            }
        };

        loadBooks();  // データをロード
    }, [currentPage, viewMode]);  // currentPageが変更されたら再度データを取得/viewMode を依存に追加

    // ページ切り替え処理
    const handlePageChange = (event, value) => setCurrentPage(value);


    return (
        <>
            {/* エラーダイアログ */}
            <Dialog
                open={!!error}
                onClose={() => setError(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        padding: 2,
                        backgroundColor: '#fffaf5',
                        fontFamily: '"Roboto", sans-serif',
                    }
                }}
            >
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                        color: '#8B3A2F',
                        fontWeight: 'bold'
                    }}
                >
                    エラー
                </DialogTitle>

                <DialogContent>
                    <Typography
                        variant="body2"
                        color="error"
                        sx={{ textAlign: 'center', mt: 1 }}
                    >
                        {error}
                    </Typography>
                </DialogContent>

                <DialogActions sx={{ justifyContent: 'center' }}>
                    <Button onClick={() => setError(null)} sx={dialogButtonStyle}>
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
                <Box sx={{ width: '100%', maxWidth: '1800px', margin: '0 auto' }}>
                    {viewMode === 'table' && (
                        <Box sx={{ width: '95%', margin: '0 auto' }}>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    borderRadius: 5,
                                    overflow: 'hidden',
                                }}
                            >
                                <Table sx={{ tableLayout: 'fixed', width: '100%' }}>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#D88F34', borderBottom: '3px solid #8B3A2F' }}>
                                            <TableCell sx={{ ...titleCells, width: '10%' }}>管理ID</TableCell>
                                            <TableCell sx={{ ...titleCells, width: '25%' }}>タイトル</TableCell>
                                            <TableCell sx={{ ...titleCells, width: '15%' }}>著者</TableCell>
                                            <TableCell sx={{ ...titleCells, width: '20%' }}>出版社</TableCell>
                                            <TableCell sx={{ ...titleCells, width: '15%' }}>出版年月日</TableCell>
                                            <TableCell sx={{ ...titleCells, width: '15%' }}>ジャンル</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {books.map(book => (
                                            <TableRow key={book.id}>
                                                <TableCell sx={{ ...bodyCells, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.id}</TableCell>
                                                <TableCell sx={{ ...bodyCells, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.title}</TableCell>
                                                <TableCell sx={{ ...bodyCells, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.authors}</TableCell>
                                                <TableCell sx={{ ...bodyCells, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.publisher}</TableCell>
                                                <TableCell sx={{ ...bodyCells, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.year}</TableCell>
                                                <TableCell sx={{ ...bodyCells, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{book.genre}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}

                    {/* カード表示 */}
                    {viewMode === 'card' && (
                        <>
                            <Grid
                                container
                                spacing={3}
                                sx={{
                                    width: '100%',
                                    maxWidth: '1800px',
                                    margin: '0 auto',
                                    paddingLeft: { xs: 1, sm: 2, md: 3 },
                                    paddingRight: { xs: 1, sm: 2, md: 3 },
                                    minHeight: '700px',
                                }}

                            >
                                {books.map((book) => (
                                    <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                                        <Card
                                            sx={{
                                                width: '100%',
                                                maxWidth: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                overflow: 'hidden',
                                            }}
                                            onClick={() => {
                                                if (selectedBook?.id === book.id) setSelectedBook(null);
                                                else setSelectedBook(book);
                                            }}
                                        >
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

                            {/* ダイアログ（楽天ボタン・キャンセルボタン） */}
                            <Dialog
                                open={!!selectedBook}
                                onClose={() => setSelectedBook(null)}
                                maxWidth="lg"
                                fullWidth
                                PaperProps={{ sx: { borderRadius: 3, padding: 2 } }}
                            >
                                <DialogTitle sx={{ textAlign: 'center', color: '#8B3A2F', fontWeight: 'bold' }}>
                                    {selectedBook?.title || '選択中の書籍'}
                                </DialogTitle>
                                <DialogContent>
                                    {/* 注意文：常に表示 */}
                                    <Typography
                                        sx={{
                                            color: !hasSelection ? '#aaa194'           // 未選択 → グレー
                                                : hasValidISBN ? '#aaa194'           // 選択済み & ISBNあり → グレー
                                                    : '#8B3A2F',                         // 選択済み & ISBNなし → 赤
                                            fontWeight: 'bold',
                                            fontFamily: '"Roboto", sans-serif',
                                            fontSize: '1.1rem',
                                            textAlign: 'center',
                                            mb: 1
                                        }}
                                    >
                                        ISBN未登録書籍は詳細情報を参照できません
                                    </Typography>
                                    {/* ボタン横並び */}
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: 2,
                                        }}
                                    >
                                        {/* isbnあり：楽天ブックスリンク */}
                                        <Button
                                            sx={{
                                                ...dialogButtonStyle,
                                                opacity: isValidSelection ? 1 : 0.4,
                                                cursor: isValidSelection ? 'pointer' : 'not-allowed'
                                            }}
                                            disabled={!isValidSelection}
                                            onClick={() => {

                                                // ★ 最終ガード
                                                if (!isValidSelection) return;

                                                window.open(
                                                    `https://books.rakuten.co.jp/search?sitem=${selectedBook.isbn}`,
                                                    '_blank'
                                                );
                                            }}
                                        >
                                            楽天で詳細情報を見る
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            sx={dialogButtonStyle}
                                            onClick={() => {
                                                setSelectedBook(null); // ★閉じる時も初期化
                                            }}
                                        >
                                            キャンセル
                                        </Button>
                                    </Box>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}

                    {/* ページネーション（テーブル・カード共通） */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0 40px' }}>
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                        />
                    </Box>
                </Box >
            </Box >
        </>
    );
};
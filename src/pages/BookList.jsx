import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Link, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, Pagination, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { bigStyles, getButtonStyles, titleCells, bodyCells } from "../components/Styles";


export const BookList = () => {
    const [books, setBooks] = useState([]); // 書籍データを格納するstate
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // エラーステートを定義
    const [viewMode, setViewMode] = useState('table'); // viewMode: 'table' or 'card'
    const [currentPage, setCurrentPage] = useState(1); // 現在のページ
    const [totalPages, setTotalPages] = useState(1); // 総ページ数
    const [openDialog, setOpenDialog] = useState(false); // エラーダイアログの状態


    // コンポーネントがマウントされた時にAPIから書籍データを取得
    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);  // ローディング開始
            setError(null);  // エラーメッセージをリセット
            try {
                // 自分のAPIから書籍データを取得(テーブル表示・ページネーション対応)
                const response = await axios.get(`http://127.0.0.1:8000/api/books?page=${currentPage}`, {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',   // ヘッダーの設定
                    }
                });

                console.log('API Response:', response.data);  // レスポンス内容を確認するためにログ出力

                const bookData = response.data;
                // 書籍情報にGoogle Books APIの画像とIDを追加
                if (bookData.items && Array.isArray(bookData.items)) {
                    // booksWithDetails に画像やGoogle BooksのIDを追加
                    const booksWithDetails = bookData.items.map((book) => {
                        const googleBooksId = book.google_books_url
                            ? book.google_books_url.split('=')[1]  // Google BooksのIDを抽出
                            : null; // google_books_urlがない場合はnullを設定
                        return {
                            ...book,
                            imageUrl: book.image_path ? `http://localhost:8000/storage/${book.image_path}` : null,
                            googleBooksId,  // Google BooksのIDをセット
                        };
                    });
                    setBooks(booksWithDetails);  // 書籍データをセット
                    setTotalPages(bookData.data.last_page);  // 総ページ数をセット
                } else {
                    setError('書籍情報の取得に失敗しました。'); // エラーをセット
                    setOpenDialog(true);  // エラーダイアログを開く
                }
            } catch (err) {
                console.error('API Error:', err);  // 詳細なエラー情報をコンソールに出力
                setError('データの取得に失敗しました。'); // より一般的なエラーメッセージを設定
                setOpenDialog(true);  // エラーダイアログを開く
            } finally {
                setLoading(false);  // ローディング終了
            }
        };
        loadBooks();  // データをロード
    }, [currentPage]);  // currentPageが変更されたら再度データを取得
    // ページ切り替え処理
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };
    // ダイアログの「閉じる」ボタン
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <>
            {/* エラーダイアログの表示 */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>エラー</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="error">
                        {error}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>
            <Box sx={bigStyles}>
                <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 'bold', paddingTop: '65px' }}>
                    書籍リスト
                </Typography>
                {/* ローディング表示 */}
                {loading ? (
                    <CircularProgress sx={{ margin: '0 auto', display: 'block' }} />
                ) : (
                    <>
                        {/* モード切り替えボタン */}
                        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                            <button onClick={() => setViewMode('table')} style={getButtonStyles(viewMode === 'table')}>テーブル表示</button>
                            <button onClick={() => setViewMode('card')} style={getButtonStyles(viewMode === 'card')}>カード表示</button>
                        </Box>
                        {/* テーブル表示 */}
                        {viewMode === 'table' && (
                            <Box sx={{ width: '90%', margin: '0 auto' }}>
                                <TableContainer component={Paper} sx={{ width: '100%' }}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>管理ID</TableCell>
                                                <TableCell>タイトル</TableCell>
                                                <TableCell>著者</TableCell>
                                                <TableCell>出版社</TableCell>
                                                <TableCell>出版年</TableCell>
                                                <TableCell>ジャンル</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {books.map((book) => (
                                                <TableRow key={book.id}>
                                                    <TableCell>{book.id}</TableCell>
                                                    <TableCell>{book.title}</TableCell>
                                                    <TableCell>{book.authors}</TableCell>
                                                    <TableCell>{book.publisher}</TableCell>
                                                    <TableCell>{book.year}</TableCell>
                                                    <TableCell>{book.genre}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {/* ページネーション */}
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
                                </Box>
                            </Box>
                        )}
                        {/* カード表示 */}
                        {viewMode === 'card' && (
                            <Grid container spacing={4}>
                                {books.map((book) => (
                                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                                        <Link href={book.google_books_url || '#'} target="_blank" rel="noopener noreferrer">
                                            <Card>
                                                {book.imageUrl ? (
                                                    <CardMedia component="img" alt={book.title} height="200px" image={book.imageUrl} />
                                                ) : (
                                                    <div>画像がありません</div>
                                                )}
                                                <CardContent>
                                                    <Typography variant="h6">{book.title}</Typography>
                                                    <Typography variant="body2">{book.authors}</Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </>
                )}
            </Box>
        </>
    );
};
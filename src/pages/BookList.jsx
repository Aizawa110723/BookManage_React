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
                        'Content-Type': 'application/json',
                    }
                });
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

            <Box sx={{
                ...bigStyles,
                height: 'auto',
            }}>

                <Typography
                    variant="h3"
                    sx={{
                        textAlign: 'center',
                        letterSpacing: '3px',
                        fontWeight: 'bold',
                        paddingTop: '65px',
                        marginTop: '40px',
                        height: '70px'
                    }}
                >
                    書籍リスト
                </Typography>




                {/* ローディング表示 */}
                {loading ? (
                    <CircularProgress sx={{
                        margin: '0 auto',
                        display: 'block',
                    }} />
                ) : (
                    <>
                        {/* モード切り替えボタン */}
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '40px',
                            marginBottom: '20px',
                            gap: '20px', // ボタン間のスペースを確保
                            '@media (max-width: 768px)': { // スマートフォンやタブレット向け
                                flexDirection: 'column',  // 横並びから縦並びに変更
                                gap: '10px', // ボタン間のスペースを少し狭くする
                            },
                        }}>
                            <button onClick={() => setViewMode('table')}
                                style={getButtonStyles(viewMode === 'table')}
                            >
                                テーブル表示
                            </button>
                            <button onClick={() => setViewMode('card')}
                                style={getButtonStyles(viewMode === 'card')}
                            >
                                カード表示
                            </button>
                        </Box>

                        {/* テーブル表示 */}
                        {viewMode === 'table' && (
                            <Box
                                sx={{
                                    width: '90%',
                                    margin: '0 auto',
                                    marginTop: '20px',
                                    marginBottom: '150px',
                                    whiteSpace: 'nowrap',
                                }}>
                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        width: '100%',
                                        boxShadow: 'none',
                                        borderRadius: '30px',
                                        border: '3px solid #8B3A2F',
                                    }}>
                                    <Table
                                        sx={{
                                            tableLayout: 'fixed',
                                            fontWeight: 'bold',
                                        }}
                                        aria-label="simple table">
                                        <TableHead>
                                            <TableRow
                                                sx={{
                                                    backgroundColor: '#8B3A2F',
                                                }}>
                                                <TableCell sx={{ ...titleCells, width: '8%' }}>管理ID</TableCell>
                                                <TableCell sx={{ ...titleCells }}>タイトル</TableCell>
                                                <TableCell sx={{ ...titleCells }}>著者</TableCell>
                                                <TableCell sx={{ ...titleCells }}>出版社</TableCell>
                                                <TableCell sx={{ ...titleCells, width: '8%' }}>出版年</TableCell>
                                                <TableCell sx={{ ...titleCells }}>ジャンル</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {books.map((book, index) => (
                                                <TableRow key={book.id}
                                                    sx={index === books.length - 1 ? { '& td': { borderBottom: 'none' } } : {}}
                                                >
                                                    <TableCell sx={{ ...bodyCells }}>{book.id}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.title}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.authors}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.publisher}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.year}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.genre}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>

                                {/* ページネーション*/}
                                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                                    <Pagination
                                        count={totalPages > 0 ? totalPages : 1} // もしtotalPagesが1以下なら1を指定
                                        page={currentPage}
                                        onChange={handlePageChange}
                                    />
                                </Box>
                            </Box>
                        )}

                        {/* カード表示 */}
                        {viewMode === 'card' && (
                            <Grid
                                container spacing={4}
                                justifyContent="flex-start"
                                sx={{
                                    width: '90%',
                                    marginBottom: '150px',
                                }}>
                                {books.map((book) => (
                                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                                        <Link
                                            href={book.google_books_url || '#'}  // google_books_urlが無ければ#
                                            target="_blank"
                                            rel="noopener noreferrer"   // <a>タグリンク属性。target="_blank"を指定している場合のリンク先）に対して、親ページ（現在のページ）の window.opener プロパティへのアクセスを防ぐ
                                            underline="none"
                                            sx={{
                                                display: 'block', // Link全体をブロック要素にして、カード全体をクリック可能にする
                                                '&:hover': {
                                                    transform: 'scale(1.05)', // ホバー時に少し大きくする
                                                    transition: 'transform 0.3s ease', // スムーズに変化させる
                                                },
                                            }}
                                        >
                                            <Card
                                                sx={{
                                                    width: '100%',
                                                    borderRadius: '30px',
                                                    boxShadow: '2px 3px 2px rgba(0, 0, 0, 0.1)',
                                                    height: '300px',

                                                }}>

                                                {book.imageUrl ? (
                                                    // image_urlが存在する場合に画像を表示
                                                    <CardMedia
                                                        component="img"
                                                        alt={book.title}
                                                        height="200px"
                                                        image={book.imageUrl} // imageUrlを使用
                                                        sx={{
                                                            objectFit: 'cover',
                                                            minHeight: '200px',
                                                        }}
                                                    />
                                                ) : (
                                                    // 画像がない場合表示される部分
                                                    <div
                                                        style={{
                                                            height: '200px',
                                                            display: 'flex',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            fontFamily: '"Roboto", sans-serif',
                                                            fontWeight: 'bold',
                                                            fontSize: '1.2rem',
                                                            color: 'lightgray',
                                                            backgroundColor: '#F2F2F2',
                                                            overflow: 'hidden',
                                                            margin: 0,
                                                            padding: 0,
                                                        }}
                                                    >
                                                        画像がありません
                                                    </div>
                                                )}

                                                <CardContent sx={{ flexGrow: 1, }} // コンテンツが多くてもスペースを確保   
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        component="div"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: '#8B3A2F', // タイトルのカラー
                                                        }}
                                                    >
                                                        {book.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {book.authors}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Grid>
                                ))}
                            </Grid>
                        )}


                    </>
                )}
            </Box >
        </>
    );
};

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Link, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper } from '@mui/material';
import { bigStyles, getButtonStyles, titleCells, bodyCells } from "../components/Styles";


// Google Books APIからサムネイル画像を取得する関数(カード表示)
const fetchGoogleBookImage = async (title) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`);
        const bookData = response.data.items && response.data.items[0];
        if (bookData && bookData.volumeInfo && bookData.volumeInfo.imageLinks) {
            return bookData.volumeInfo.imageLinks.thumbnail; // サムネイル画像のURLを返す
        }
        return ''; // 画像がない場合は空文字を返す
    } catch (error) {
        console.error('Error fetching Google book image:', error);
        return ''; // 画像取得失敗時は空文字を返す
    }
};

export const BookList = () => {
    const [books, setBooks] = useState([]); // 書籍データを格納するstate
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // エラーステートを定義
    const [viewMode, setViewMode] = useState('table'); // viewMode: 'table' or 'card'

    // コンポーネントがマウントされた時に書籍情報を取得
    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);  // ローディング開始

            try {
                // 自分のAPIから書籍データを取得(テーブル表示)
                const bookData = await axios.get('http://127.0.0.1:8000/api/books');

                // 書籍情報にGoogle Books APIの画像を追加
                const booksWithImages = await Promise.all(bookData.data.map(async (book) => {
                    const imageUrl = await fetchGoogleBookImage(book.title); // タイトルで画像を取得
                    return { ...book, imageUrl }; // 画像URLを追加
                }));

                setBooks(booksWithImages);  // 書籍データをセット
                setLoading(false);
            } catch (err) {
                setError(err.message); // エラーメッセージをセット
                setLoading(false);
            }
        };
        loadBooks();
    }, []);

    return (
        <>
            {/* エラーメッセージの表示 */}
            {error && (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    color: 'red',
                    textAlign: 'center',
                    padding: '10px 0',
                    zIndex: 1000
                }}>
                    <Typography variant="body2">{error}</Typography>
                </Box>
            )}

            <Box sx={{
                ...bigStyles,
                height: 'auto',
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#003366',
                        textAlign: 'center',
                        letterSpacing: '3px',
                        fontWeight: 'bold',
                        paddingTop: '50px',
                        marginTop: '25px',
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
                                    width: '80%',
                                    margin: '0 auto',
                                    marginTop: '20px',
                                    marginBottom: '60px',
                                    whiteSpace: 'nowrap',
                                }}>
                                <TableContainer
                                    component={Paper}
                                    sx={{
                                        width: '100%',
                                        boxShadow: 'none',
                                        borderRadius: '30px',
                                        overflowX: 'hidden',  // 横スクロールを隠す
                                        overflowY: 'auto',     // 縦スクロールを有効にする

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
                                                    backgroundColor: '#003366',
                                                }}>
                                                <TableCell sx={{ ...titleCells }}>管理ID</TableCell>
                                                <TableCell sx={{ ...titleCells, width: '13.33%' }}>タイトル</TableCell>
                                                <TableCell sx={{ ...titleCells }}>著者</TableCell>
                                                <TableCell sx={{ ...titleCells }}>出版社</TableCell>
                                                <TableCell sx={{ ...titleCells }}>出版年</TableCell>
                                                <TableCell sx={{ ...titleCells, width: '15%' }}>ジャンル</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {books.map((book) => (
                                                <TableRow key={book.id}>
                                                    <TableCell sx={{ ...bodyCells }}>{book.id}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.title}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.author}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.publisher}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.year}</TableCell>
                                                    <TableCell sx={{ ...bodyCells }}>{book.genre}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}

                        {/* カード表示 */}
                        {viewMode === 'card' && (
                            <Grid container spacing={4} justifyContent="center" sx={{ width: '90%' }}>
                                {books.map((book) => (
                                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                                        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
                                            <CardMedia
                                                component="img"
                                                alt={book.title}
                                                height="200"
                                                image={book.imageUrl || ''}
                                                onError={(e) => e.target.style.display = 'none'}
                                            />
                                            {!book.imageUrl && (
                                                <div style={{
                                                    height: '200px',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    fontWeight: 'bold',
                                                    fontSize: '1.2rem',
                                                    color: '#003366',
                                                    backgroundColor: '#f0f0f0',
                                                }}>
                                                    画像がありません
                                                </div>
                                            )}
                                            <CardContent>
                                                <Typography variant="h6" component="div">
                                                    <Link href={`https://www.google.com/search?q=${book.title}`} target="_blank" rel="noopener noreferrer" underline="hover">
                                                        {book.title}
                                                    </Link>
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {book.author}
                                                </Typography>
                                            </CardContent>
                                        </Card>
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

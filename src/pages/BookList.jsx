import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Link, Table, TableHead, TableRow, TableCell, TableBody, TableContainer, Paper, TextareaAutosize } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { bigStyles, getButtonStyles, titleCells, bodyCells } from "../components/Styles";
import { Link as RouterLink } from 'react-router-dom';
import { display, textAlign } from '@mui/system';


// Google Books APIからサムネイル画像を取得する関数(カード表示)
const fetchGoogleBookInfo = async (title) => {
    try {
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(title)}`);
        console.log('Google Books API response:', response.data); // レスポンス内容を確認

        const bookData = response.data.items && response.data.items[0];
        if (bookData && bookData.volumeInfo) {
            const imageUrl = bookData.volumeInfo.imageLinks ? bookData.volumeInfo.imageLinks.thumbnail : ''; // サムネイル画像のURL
            const googleBooksId = bookData.id;  // Google BooksのID
            return { imageUrl, googleBooksId }; // サムネイル画像とIDを返す
        }
        return { imageUrl: '', googleBooksId: '' }; // 画像がない場合、IDも空文字を返す
    } catch (error) {
        console.error('Error fetching Google book info:', error);
        return { imageUrl: '', googleBooksId: '' }; // 取得失敗時
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

                // 書籍情報にGoogle Books APIの画像とIDを追加
                const booksWithDetails = await Promise.all(bookData.data.map(async (book) => {
                    const { imageUrl, googleBooksId } = await fetchGoogleBookInfo(book.title); // タイトルで画像を取得
                    return { ...book, imageUrl, googleBooksId }; // 画像URLを追加
                }));

                console.log('Books with details:', booksWithDetails); // 画像が正しく追加されているか
                setBooks(booksWithDetails);  // 書籍データをセット
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
                                        border: '3px solid #003366',
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
                            <Grid container spacing={4} justifyContent="flex-start" sx={{ width: '90%', marginBottom: '150px' }}>
                                {books.map((book) => (
                                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                                        <Link
                                            href={`https://books.google.com/books?id=${book.googleBooksId}`}  // Google Booksのリンク
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            underline="none"
                                            sx={{
                                                display: 'block', // Link全体をブロック要素にして、カード全体をクリック可能にする
                                                '&:hover': {
                                                    transform: 'scale(1.05)', // ホバー時に少し大きくする
                                                    transition: 'transform 0.3s ease', // スムーズに変化させる
                                                },
                                            }}
                                        >
                                            <Card sx={{ width: '100%', borderRadius: '30px', boxShadow: '2px 3px 2px rgba(0, 0, 0, 0.1)' }}>
                                                {book.imageUrl ? (
                                                    <CardMedia
                                                        component="img"
                                                        alt={book.title}
                                                        height="200px"
                                                        image={book.imageUrl}
                                                        sx={{
                                                            objectFit: 'cover',
                                                            minHeight: '200px',
                                                        }}
                                                    />
                                                ) : (
                                                    // 画像がない場合でも表示される部分
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
                                                <CardContent>
                                                    <Typography
                                                        variant="h6"
                                                        component="div"
                                                        sx={{
                                                            fontWeight: 'bold',
                                                            color: '#003366', // タイトルのカラー
                                                        }}
                                                    >
                                                        {book.title}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        {book.author}
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

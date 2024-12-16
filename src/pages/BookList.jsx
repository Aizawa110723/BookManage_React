import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress, Grid, Card, CardMedia, CardContent, Link } from '@mui/material';
import { bigStyles } from "../components/Styles";

// APIから書籍データを取得する関数
const fetchBooks = async () => {
    try {
        const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;  // 環境変数からAPIキーを取得
        const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=subject:fiction&key=${apiKey}`);

        return response.data.items.map(book => ({
            ...book,
            imageUrl: book.volumeInfo?.imageLinks?.thumbnail || ''
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('書籍情報の取得に失敗しました。');
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
                const bookData = await fetchBooks();
                setBooks(bookData);  // 書籍データをセット
                setLoading(false);
            } catch (err) {
                setError(err.message); // エラーメッセージをセット
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    // Amazonの共通リンク (ベースURL)を生成
    const amazonBaseUrl = "https://www.amazon.com/dp/";

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
                            marginBottom: '20px',
                            gap: '20px', // ボタン間のスペースを確保
                        }}>
                            <button onClick={() => setViewMode('table')}
                                style={{
                                    backgroundColor: viewMode === 'table' ? '#6495ED' : '#003366',
                                    color: 'white',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    padding: '12px 18px',
                                    width: '150px',
                                    height: '50px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 'none',
                                    outline: 'none',
                                    border: 'none',
                                    '&:hover': {
                                        backgroundColor: '#6495ED',
                                    },
                                    '&:active': {
                                        backgroundColor: '#6495ED',
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }}
                            >
                                テーブル表示
                            </button>
                            <button onClick={() => setViewMode('card')}
                                style={{
                                    backgroundColor: viewMode === 'card' ? '#6495ED' : '#003366',
                                    color: 'white',
                                    borderRadius: '50px',
                                    fontSize: '1.1rem',
                                    padding: '12px 18px',
                                    width: '150px',
                                    height: '50px',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    boxShadow: 'none',
                                    outline: 'none',
                                    border: 'none',
                                    '&:hover': {
                                        backgroundColor: '#6495ED',
                                    },
                                    '&:active': {
                                        backgroundColor: '#6495ED',
                                    },
                                    '&:focus': {
                                        outline: 'none',
                                    },
                                }}
                            >
                                カード表示
                            </button>
                        </Box>

                        {/* テーブル表示 */}
                        {viewMode === 'table' && (
                            <Box sx={{ width: '80%', margin: '0 auto', marginTop: '60px', marginBottom: '100px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse', borderRadius: '30px', overflow: 'hidden' }}>
                                    <thead>
                                        <tr style={{ backgroundColor: '#003366', color: 'white', textAlign: 'center' }}>
                                            <th style={{ padding: '20px' }}>管理ID</th>
                                            <th style={{ padding: '20px' }}>タイトル</th>
                                            <th style={{ padding: '20px' }}>著者</th>
                                            <th style={{ padding: '20px' }}>出版社</th>
                                            <th style={{ padding: '20px' }}>出版年</th>
                                            <th style={{ padding: '20px' }}>ジャンル</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {books.map((book, index) => (
                                            <tr key={book.id} style={{ backgroundColor: '#fff', textAlign: 'center' }}>
                                                <td style={{ padding: '18px' }}>{book.id}</td>
                                                <td style={{ padding: '18px' }}>{book.title}</td>
                                                <td style={{ padding: '18px' }}>{book.author}</td>
                                                <td style={{ padding: '18px' }}>{book.publisher}</td>
                                                <td style={{ padding: '18px' }}>{book.year}</td>
                                                <td style={{ padding: '18px' }}>{book.genre}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </Box>
                        )}

                        {/* カード表示 */}
                        {viewMode === 'card' && (
                            <Grid container spacing={4} justifyContent="center" sx={{ width: '90%' }}>
                                {books.map((book, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}>
                                            {/* 書籍画像 */}
                                            <CardMedia
                                                component="img"
                                                alt={book.title}
                                                height="200"
                                                image={book.imageUrl || 'default-image.jpg'} // デフォルト画像を指定する
                                                onError={(e) => {
                                                    console.error('Image load failed for:', book.title, e); // 詳細エラーメッセージを出力
                                                    e.target.style.display = 'none'; // 画像の読み込み失敗時に画像を非表示
                                                }}
                                            />

                                            {/* 画像が存在しない場合に代わりにテキストを表示 */}
                                            {!book.imageUrl && (
                                                <div
                                                    style={{
                                                        height: '200px',
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        fontSize: '1.2rem',
                                                        color: '#888',
                                                        backgroundColor: '#f0f0f0',
                                                    }}
                                                >
                                                    画像がありません
                                                </div>
                                            )}

                                            <CardContent>
                                                <Typography variant="h6" component="div">
                                                    <Link href={`${amazonBaseUrl}${book.isbn}`} target="_blank" rel="noopener noreferrer" underline="hover">
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
            </Box>
        </>
    );
};

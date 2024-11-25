import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

export const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);  // エラーハンドリング用の状態

    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error.response ? error.response.data.message : '書籍情報の取得に失敗しました。');
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []); // 初回のみ実行

    return (
        <>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4" sx={{ marginBottom: '20px' }}>書籍リスト</Typography>

                {loading ? (
                    // {/* ローディング表示 */ }
                    <Typography>読み込み中...</Typography>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : (
                    <Box>
                        {books.length > 0 ? (
                            books.map((book, index) => (
                                <Box key={book.id || index} sx={{ marginBottom: '20px' }}>
                                    <Typography variant="h6">{book.title}</Typography>
                                    <Typography variant="body1">著者: {book.author}</Typography>
                                    <Typography variant="body2">出版社: {book.publisher}</Typography>
                                    <Typography variant="body2">発行年: {book.year}</Typography>
                                    <Typography variant="body2">ジャンル: {book.genre}</Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography>書籍がありません。</Typography>
                        )}
                    </Box>
                )}
            </Box>

        </>
    );
};

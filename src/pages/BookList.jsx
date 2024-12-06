import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { bigStyles, fieldItem } from "../components/Styles";

export const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);  // エラーステートを定義

    useEffect(() => {
        const fetchBooks = async () => {
            setLoading(true);  // ローディング開始
            setError(null);     // エラーをリセット

            try {
                const response = await axios.get('http://127.0.0.1:8000/api/books');
                setBooks(response.data);
            } catch (error) {
                console.error('Error fetching books:', error);
                setError(error.response ? error.response.data.message : '書籍情報の取得に失敗しました。');
            } finally {
                setLoading(false); // ローディング終了
            }
        };

        fetchBooks();
    }, []); // 初回のみ実行

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

            {/* bigStylesの中にリストを配置 */}
            <Box sx={{
                ...bigStyles,
                height: 'auto',
                
            }}>
                <Typography
                    variant="h3"
                    sx={{
                        color: '#003366',
                        textAlign: 'center',  // タイトルを中央揃えにする
                        letterSpacing: '3px',  // 文字間隔を広めにして清潔感を出す
                        fontWeight: 'bold',
                        paddingTop: '50px',  // 上にスペースを加える
                        // paddingBottom: '10px',  // 下に少しスペース
                        marginTop: '25px',
                        // marginBottom: '60px',
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
                    <Box sx={{
                        width: '80%',
                        margin: '0 auto', // 中央揃え
                        alignItems: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        marginTop: '60px', // 白Box全体のTop
                        marginBottom: '60px', // 白Box全体のBottom

                    }}>

                        {/* 本のリスト */}
                        {books.length === 0 ? (
                            <Typography
                                variant="body1"
                                sx={{ textAlign: 'center' }}>書籍が登録されていません。</Typography>
                        ) : (
                            books.map((book) => (
                                <Box
                                    key={book.id} // book.idをkeyに使って、一意の識別子として設定
                                    id={`book-${book.id}`} // id属性にbook.idを追加

                                    // 白Box中の調整
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '45%',
                                        margin: '0 auto',
                                        borderRadius: '10px',
                                        color: '#003366',
                                        border: '1px solid #ddd',
                                        padding: '20px',
                                        backgroundColor: '#fff',
                                        marginBottom: '20px', // 各本のBox間に隙間を追加
                                        alignItems: 'flex-start'
                                    }}
                                >

                                    {/* ID */}
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-start', // IDとその値を横並びに
                                        color: '#003366',
                                        marginBottom: '8px', // ID項目の下に隙間を追加
                                    }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold', marginRight: '10px' }}>ID:</Typography>
                                        <Typography variant="body1">{book.id}</Typography>
                                    </Box>

                                    {/* 本のタイトル */}
                                    <Typography variant="h5" sx={{
                                        fontWeight: 'bold',
                                        color: '#003366',
                                        textAlign: 'left',
                                        marginBottom: '12px', // タイトル下の隙間
                                    }}>
                                        {book.title}
                                    </Typography>

                                    {/* 本の情報（著者、出版社、出版年、ジャンル） */}
                                    <Box sx={{
                                        display: 'block',
                                        margin: 'left',
                                        justifyContent: 'left', // 横並びに配置
                                        gridTemplateColumns: '1fr 1fr', // 2列にする
                                        gap: '15px', // 各項目の間隔を設定
                                        width: '80%',
                                    }}>

                                        {/* 著者 */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>著者:</Typography>
                                            <Typography variant="body1">{book.author}</Typography>
                                        </Box>

                                        {/* 出版社 */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>出版社:</Typography>
                                            <Typography variant="body1">{book.publisher}</Typography>
                                        </Box>

                                        {/* 出版年 */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>出版年:</Typography>
                                            <Typography variant="body1">{book.year}</Typography>
                                        </Box>

                                        {/* ジャンル */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>ジャンル:</Typography>
                                            <Typography variant="body1">{book.genre}</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                        )}
                    </Box>
                )}
            </Box >
        </>
    );
};

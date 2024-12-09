import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { bigStyles, listIcon } from "../components/Styles";


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

                    // 白Box
                    <Box sx={{
                        width: '90%',
                        margin: '0 auto', // 中央揃え
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexWrap: 'wrap',
                        marginTop: '60px', // 白Box全体のTop
                        marginBottom: 'auto', // 白Box全体のBottom
                        gap: '5px',
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

                                    // 白Box内の調整
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '30%',
                                        margin: '0 auto',
                                        borderRadius: '50px',
                                        color: '#003366',
                                        border: '2px solid #ddd',// 白Box外側の線
                                        padding: '10px',
                                        backgroundColor: '#fff',
                                        marginBottom: '10px', // 各本のBox間に隙間を追加
                                        height: '100%',
                                        alignItems: 'center',
                                        '@media (max-width: 900px)': {
                                            width: '45%', // 中くらいの画面サイズでは2列にする
                                        },
                                        '@media (max-width: 600px)': {
                                            width: '100%', // モバイルでは1列にする
                                        },
                                        // レスポンシブの際に著者とタイトルを一列に並べる
                                        '@media (max-width: 600px)': {
                                            // アイテムが横並びになるように調整
                                            display: 'flex',
                                            flexDirection: 'row',  // 横並びに変更
                                            justifyContent: 'space-between',  // 左右にスペースを確保
                                            alignItems: 'center', // 高さを揃える
                                            gap: '10px',  // アイテム間の隙間
                                        },
                                    }}
                                >

                                    {/* 本のタイトル */}
                                    <Typography
                                        variant="h4" sx={{
                                            fontWeight: 'bold',
                                            color: '#003366',
                                            marginBottom: '20px', // タイトル下の隙間
                                            marginTop: '20px',
                                            textAlign: 'center'
                                        }}>
                                        {book.title}
                                    </Typography>


                                    <Box>
                                        {/* 本の情報（著者、出版社、出版年、ジャンル） */}

                                        {/* 著者 */}
                                        <Box sx={{ ...listIcon }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>著者：　</Typography>
                                            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{book.author}</Typography>
                                        </Box>


                                        {/* 出版社 */}
                                        <Box sx={{ ...listIcon }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>出版社：　</Typography>
                                            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{book.publisher}</Typography>
                                        </Box>

                                        
                                        <Box sx={{ ...listIcon }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>出版年：　</Typography>
                                            <Typography variant="body1" sx={{ fontSize: '1.1rem' }}>{book.year}</Typography>
                                        </Box>

                                        {/* ジャンル */}
                                        <Box sx={{ ...listIcon }}>
                                            <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>ジャンル：　</Typography>
                                            <Typography variant="body1" sx={{  fontSize: '1.1rem' }}>{book.genre}</Typography>
                                        </Box>

                                        {/* ID */}
                                        <Box sx={{
                                            display: 'flex',
                                            justifyContent: 'flex-end', // IDとその値を横並びに
                                            color: '#003366',
                                            marginTop: 'auto',
                                            alignItems: 'center',
                                        }}>
                                            <Typography variant="body1" sx={{ marginRight: '10px' }}>管理ID:</Typography>
                                            <Typography variant="body1">{book.id}</Typography>
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

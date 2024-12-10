import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, CircularProgress } from '@mui/material';
import { bigStyles } from "../components/Styles";
import { padding } from '@mui/system';


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
                    <Box sx={{
                        width: '80%',
                        margin: '0 auto',  // テーブル自体を中央揃え
                        marginTop: '60px',
                        display: 'flex',     // フレックスボックス
                        justifyContent: 'center',  // 横方向に中央揃え
                        alignItems: 'center',  // 縦方向に中央揃え
                        flexDirection: 'column',  // 子要素を縦に並べる
                    }}>

                        {/* 書籍データがある場合のテーブル */}
                        {books.length === 0 ? (
                            <Typography variant="body1" sx={{ textAlign: 'center' }}>
                                書籍が登録されていません。
                            </Typography>
                        ) : (
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',  // セルのボーダーを分ける
                                borderRadius: '50px',         // 外枠だけ角を丸くする
                                border: '3px solid #003366',  // 外枠のボーダー
                                margin: '0 auto',
                                overflow: 'hidden',           // 角が丸くなるように隠す
                            }}>

                                <thead>
                                    <tr style={{
                                        backgroundColor: '#003366',
                                        color: 'white',
                                        textAlign: 'center',
                                        padding: '10px',
                                    }}>
                                        <th style={{ padding: '15px' }}>管理ID</th>
                                        <th style={{ padding: '15px' }}>タイトル</th>
                                        <th style={{ padding: '15px' }}>著者</th>
                                        <th style={{ padding: '15px' }}>出版社</th>
                                        <th style={{ padding: '15px' }}>出版年</th>
                                        <th style={{ padding: '15px' }}>ジャンル</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {/* 動的に書籍データを表示 */}
                                    {books.map((book, index) => (
                                        <tr key={book.id} style={{
                                            backgroundColor: '#fff',
                                            textAlign: 'center',
                                            borderBottom: index === books.length - 1 ? 'none' : '5px dotted #cccccc',  // 最後の行のボーダーを消す
                                        }}>
                                            <td style={{
                                                padding: '15px',
                                                borderRight: '5px solid transparent',  // セル間のボーダー（透明）
                                            }}>{book.id}</td>
                                            <td style={{
                                                padding: '15px',
                                                borderRight: '5px solid transparent',  // セル間のボーダー（透明）
                                            }}>{book.title}</td>
                                            <td style={{
                                                padding: '15px',
                                                borderRight: '5px solid transparent',  // セル間のボーダー（透明）
                                            }}>{book.author}</td>
                                            <td style={{
                                                padding: '15px',
                                                borderRight: '5px solid transparent',  // セル間のボーダー（透明）
                                            }}>{book.publisher}</td>
                                            <td style={{
                                                padding: '15px',
                                                borderRight: '5px solid transparent',  // セル間のボーダー（透明）
                                            }}>{book.year}</td>
                                            <td style={{
                                                padding: '15px',
                                                borderRight: 'none',  // 最後のセルには右のボーダーを消す
                                            }}>
                                                {book.genre}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        )}
                    </Box>
                )}
            </Box>
        </>
    );
};

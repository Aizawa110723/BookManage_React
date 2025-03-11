import React, { useState, } from 'react';
import axios from 'axios';
// import { axiosInstance } from '../api/axios.js';
import { Box, Button, CircularProgress, TextField, Typography, Dialog, DialogTitle, DialogContent, DialogActions, FormControl, MenuItem, InputLabel, Select } from "@mui/material";
import { bigStyles, buttonStyle_a, formFrame, fieldItem } from "../components/Styles";
// import { useCsrfToken } from "../context/CsrfTokenContext"; // CSRFトークンを取得するフック

// // クッキーから値を取得する関数
// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;
// };

export const BookForm = ({ setBooks, setError, error }) => {

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState('');  // エラーメッセージ
    const [isSubmitted, setIsSubmitted] = useState(false); // データ送信が完了したかどうかの判定
    const [openDialog, setOpenDialog] = useState(false);  // ダイアログボックスの表示・非表示ステート
    const [localToken, setLocalCsrfToken] = useState(""); // CSRFトークン用のステートを追加

    // // CSRFトークンを取得（フックを使用）
    // const { csrfToken, loading: csrfLoading, error: csrfError } = useCsrfToken();

    // // CSRFトークン取得エラーがあった場合の処理
    // useEffect(() => {
    //     if (csrfError) {
    //         console.log("CSRF Error:", csrfError); // エラー内容の確認
    //         setErrorMessage("CSRFトークンの取得に失敗しました");
    //     } else if (!csrfToken) {
    //         // `csrfToken` がない場合、クッキーから直接取得してセット
    //         const token = getCookie('XSRF-TOKEN');
    //         setLocalCsrfToken(token); // ローカルトークンに設定
    //     } else {
    //         // フックから取得した `csrfToken` を使用
    //         setLocalCsrfToken(csrfToken); // ローカルトークンに設定
    //     }
    // }, [csrfToken, csrfError]);

    // 出版年の選択欄を1868年（明治）から2024年まで作成
    const years = Array.from({ length: 2024 - 1868 + 1 }, (_, index) => 1868 + index);  // 1868年から2024年までの配列

    // ジャンルの選択欄を定義（必要に応じて変更可能）
    const genres = ["文学・評論", "自伝・伝記", "ノンフィクション", "ファンタジー・SF", "ミステリー・推理", "教育・学習", "ビジネス・経済", "歴史・社会", "芸能・エンターテインメント", "アート・建築・デザイン", "人文・思想・宗教", "科学・テクノロジー・プログラミング", "健康・ライフスタイル", "旅行・ガイド", "料理・グルメ",];


    // データ送信関数 (CSRF必要なときCSRFトークンをヘッダーに追加)
    const postData = async () => {
        if (loading || isSubmitted) return;  // リクエストが送信中なら何もしない

        try {
            const url = 'http://127.0.0.1:8000/api/books'; // リクエストを送るURL

            const data = {
                title: title,
                authors: authors,
                publisher: publisher,
                year: year ? parseInt(year, 10) : null,
                genre: genre
            };

            setLoading(true);
            setSuccessMessage('');
            setErrorMessage('');

            // // CSRFトークンが取得できなかった場合
            // if (!csrfToken) {
            //     setErrorMessage('CSRFトークンが取得できませんでした');
            //     setLoading(false);
            //     return;
            // }

            // APIリクエストを送る
            const response = await axios.post(url, data, {
                withCredentials: true,
                // headers: {
                //     // params: queryParams,
                //     // 'Content-Type': 'application/json',
                //     // 'X-XSRF-TOKEN': csrfToken,  // CSRFトークンをヘッダーに追加
                // }
            });

            setBooks((prevBooks) => [...prevBooks, response.data]);
            setSuccessMessage('本の登録に成功しました');
            setIsSubmitted(true);  // 送信完了フラグを立てる

        } catch (error) {
            console.log('エラー:', error);
            setErrorMessage('本の追加に失敗しました');
            setSuccessMessage('');
            setIsSubmitted(true);    // エラー時でも送信完了フラグを立てる
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !authors || !publisher || !year || !genre) {
            setErrorMessage("すべてのフィールドを入力してください");
            setSuccessMessage('');
            setIsSubmitted(true); // バリデーション失敗時にも送信完了フラグを立てる
            return;
        }
        postData();
    };

    const isFormValid = title && authors && publisher && year && genre;

    return (
        <>
            {/* 送信成功/エラーダイアログ */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{successMessage ? "成功" : "エラー"}</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color={successMessage ? 'primary' : 'error'}>
                        {successMessage || errorMessage}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>

            <Box sx={bigStyles}>
                {/* タイトル */}
                <Typography
                    variant="h3"
                    sx={{
                        color: '#8B3A2F',
                        textAlign: 'center',
                        letterSpacing: '4px',
                        fontWeight: 'bold',
                        paddingTop: '30px',
                        marginTop: '10px',
                        height: '70px'
                    }}
                >
                    書籍登録
                </Typography>

                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 'normal',
                        fontSize: '1.2rem',
                        color: '#8B3A2F',
                        textAlign: 'center',
                        marginTop: '0',
                        marginBottom: '60px',
                    }}
                >
                    書籍情報を入力してください
                </Typography>

                {/* 検索フォーム */}
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                    {[{ label: "タイトル", value: title, setter: setTitle, type: "text" },
                    { label: "著者", value: authors, setter: setAuthors, type: "text" },
                    { label: "出版社", value: publisher, setter: setPublisher, type: "text" },
                    { label: "出版年", value: year, setter: setYear, type: "select", options: years },
                    { label: "ジャンル", value: genre, setter: setGenre, type: "select", options: genres }].map(({ label, value, setter, type, options }) => (
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                marginBottom: '16px',
                                width: '100%',
                            }} key={label}>
                            <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                                <InputLabel htmlFor={label} sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    color: '#8B3A2F'
                                }} shrink>{label}</InputLabel>
                            </FormControl>

                            {type === "select" ? (
                                <Select
                                    value={value}
                                    onChange={(e) => setter(e.target.value)}
                                    sx={{ ...fieldItem }}
                                >
                                    {options && options.map((option, index) => (
                                        <MenuItem key={index} value={option}>{option}</MenuItem>
                                    ))}
                                </Select>
                            ) : (
                                <TextField
                                    id={label}
                                    value={value}
                                    onChange={(e) => setter(e.target.value)}
                                    type={type}
                                    variant="outlined"
                                    sx={{ ...formFrame }}
                                />
                            )}
                        </Box>
                    ))}

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '16px',
                        width: '100%',
                        paddingTop: '20px',
                    }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color={isFormValid ? "primary" : "default"}
                            disabled={!isFormValid || loading}
                            sx={{
                                ...buttonStyle_a,
                                padding: '35px 15px',
                            }}
                        >
                            {loading ? <CircularProgress size={24} /> : (
                                <Typography
                                    variant="button"
                                    sx={{
                                        fontSize: '1.998rem',
                                        fontWeight: 'bold',
                                    }}
                                >
                                    登　録
                                </Typography>
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};
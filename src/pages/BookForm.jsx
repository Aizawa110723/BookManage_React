import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../api/axios.js';
import { Box, Button, TextField, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { buttonStyle_a, bigStyles, fieldItem, formFrame, MyComponent } from "../components/Styles";
import { useCsrfToken } from "../context/CsrfTokenContext"; // CSRFトークンを取得するフック

export const BookForm = ({ setBooks, setError, error }) => {

    const [openDialog, setOpenDialog] = useState(false);  // ダイアログボックスの表示・非表示ステート

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState('');  // エラーメッセージ
    const [isSubmitted, setIsSubmitted] = useState(false); // データ送信が完了したかどうかの判定

    // CSRFトークンを取得（フックを使用）
    const { csrfToken, loading: csrfLoading, error: csrfError } = useCsrfToken();

    // CSRFトークン取得エラーがあった場合の処理
    if (csrfError) {
        console.log("CSRF Error:", csrfError); // エラー内容の確認
        setErrorMessage("CSRFトークンの取得に失敗しました");
    }

    // データ送信関数 (CSRFトークンをヘッダーに追加)
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

            // CSRFトークンが取得できなかった場合
            if (!csrfToken) {
                setErrorMessage('CSRFトークンが取得できませんでした');
                setLoading(false);
                return;
            }

            // APIリクエストを送る
            const response = await axiosInstance.post(url, data, {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                    'X-XSRF-TOKEN': csrfToken,  // CSRFトークンをヘッダーに追加
                }
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
            setError("すべてのフィールドを入力してください");
            setSuccessMessage('');
            setIsSubmitted(true); // バリデーション失敗時にも送信完了フラグを立てる
            return;
        }
        postData();
    };

    const isFormValid = title && authors && publisher && year && genre;

    return (
        <Box sx={{ ...bigStyles }}>
            <Typography variant="h3" sx={{ color: '#8B3A2F', textAlign: 'center', fontWeight: 'bold', paddingTop: '30px' }}>
                書籍登録
            </Typography>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                {/* フォームの入力フィールドと送信ボタン */}
                <Button
                    type="submit"
                    variant="contained"
                    color={isFormValid ? "primary" : "default"}
                    disabled={!isFormValid || loading}
                >
                    {loading ? <CircularProgress size={24} /> : "登録"}
                </Button>
            </form>
        </Box>
    );
};

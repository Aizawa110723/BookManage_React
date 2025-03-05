import React, { useState } from "react";
import axios from 'axios';
import { Box, Button, TextField, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { bigStyles, fieldItem, formFrame, buttonStyle_a } from "../components/Styles";
// import { axiosInstance } from '../api/axios.js';
// import { useCsrfToken } from "../context/CsrfTokenContext"; // CSRFトークンを取得するフック

// // クッキーから値を取得する関数
// const getCookie = (name) => {
//     const value = `; ${document.cookie}`;
//     const parts = value.split(`; ${name}=`);
//     if (parts.length === 2) return parts.pop().split(';').shift();
//     return null;
// };

export const SearchForm = () => {
    const [title, setTitle] = useState("");  // タイトル
    const [authors, setAuthors] = useState("");  // 著者
    const [publisher, setPublisher] = useState("");  // 出版社
    const [year, setYear] = useState("");  // 出版年
    const [genre, setGenre] = useState("");  // ジャンル
    const [loading, setLoading] = useState(false);  // ローディング状態
    const [localError, setLocalError] = useState(null);  // ローカルエラーステートを追加
    const [books, setBooks] = useState([]);  // 検索結果を格納するステート
    const [openDialog, setOpenDialog] = useState(false);  // ダイアログボックスの表示・非表示ステート
    const [successMessage, setSuccessMessage] = useState("");  // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState("");      // エラーメッセージ
    // const [localToken, setLocalCsrfToken] = useState(""); // CSRFトークン用のステートを追加

    // *------------------*

    // // CSRFトークンを取得（フックを使用）
    // const { csrfToken, loading: csrfLoading, error: csrfError } = useCsrfToken();

    // useEffect(() => {
    //     // 初期化時に CSRF トークンを取得（必要に応じて）
    //     const token = getCookie('XSRF-TOKEN');
    //     setLocalCsrfToken(token);  // ローカルのCSRFトークンにセット
    //     // CSRFトークン取得エラーがあった場合の処理
    //     if (csrfError) {
    //         setLocalError("CSRFトークンの取得に失敗しました");
    //     }
    // }, [csrfError]);

    // *------------------*

    // 出版年の選択欄を1868年（明治）から2024年まで作成
    const years = Array.from({ length: 2024 - 1868 + 1 }, (_, index) => 1868 + index);  // 1868年から2024年までの配列

    // ジャンルの選択欄を定義（必要に応じて変更可能）
    const genres = ["文学・評論", "自伝・伝記", "ノンフィクション", "ファンタジー・SF", "ミステリー・推理", "教育・学習", "ビジネス・経済", "歴史・社会", "芸能・エンターテインメント", "アート・建築・デザイン", "人文・思想・宗教", "科学・テクノロジー・プログラミング", "健康・ライフスタイル", "旅行・ガイド", "料理・グルメ",];

    // いずれかのフィールドに値が入っていれば検索可能
    const isFormValid = title || authors || publisher || year || genre;

    const handleSearch = async (e) => {
        e.preventDefault();

        // いずれかのフィールドが入力されていない場合にエラー
        if (!isFormValid) {
            setLocalError("少なくとも1つのフィールドに入力してください");
            return;
        }

        setLoading(true);  // 検索開始時にローディングを開始
        setLocalError(null);    // エラーメッセージをリセット

        // 空のフィールドはクエリパラメータから削除する
        const queryParams = {};
        if (title) queryParams.title = title;
        if (authors) queryParams.authors = authors;
        if (publisher) queryParams.publisher = publisher;
        if (year) queryParams.year = year;
        if (genre) queryParams.genre = genre;

        try {
            // フィールドに入力された情報をまとめてAPIに渡す
            // APIリクエストを送る
            const response = await axios.post(url, data, {
                withCredentials: true,
                headers: {
                    params: queryParams,
                    // 'Content-Type': 'application/json',
                    // 'X-XSRF-TOKEN': csrfToken,  // CSRFトークンをヘッダーに追加
                }
            });

            const bookData = response.data;

            // 正規表現を使った検索※完全一致と部分一致
            let filteredBooks = data.filter(book => {
                return (
                    (title ? title === book.title : true) &&  // タイトルに対する完全一致検索
                    (authors ? authors === book.authors : true) &&  // 著者に対する完全一致検索
                    (publisher ? new RegExp(publisher, 'i').test(book.publisher) : true) &&  // 出版社に対する部分一致検索
                    (year ? new RegExp(`^${year}$`).test(book.year.toString()) : true) &&  // 出版年を完全一致で検索
                    (genre ? new RegExp(genre, 'i').test(book.genre) : true)  // ジャンルに対する部分一致検索
                );
            });

            // 結果があればメッセージをセット
            if (booksData.length > 0) {
                setSuccessMessage("検索結果が見つかりました");
                setIsSubmitted(true);
            } else {
                setErrorMessage("検索結果が見つかりませんでした");
                setIsSubmitted(true);
            }
        } catch (error) {
            setErrorMessage("検索に失敗しました");
            setSuccessMessage('');
            setIsSubmitted(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* 検索成功/エラーダイアログ */}
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
                {/* タイトルと検索フォーム */}
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
                    書籍検索
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
                    検索条件を入力してください
                </Typography>

                {/* 検索フォーム */}
                <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '500px' }}>
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
                                    検　索
                                </Typography>
                            )}
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};
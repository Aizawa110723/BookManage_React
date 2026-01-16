import { useState } from "react";
import axios from 'axios';
import { Box, Button, TextField, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { bigStyles, fieldItem, formFrame, buttonStyle_a } from "../components/Styles";

export const SearchForm = () => {
    const [title, setTitle] = useState("");  // タイトル
    const [authors, setAuthors] = useState("");  // 著者
    const [publisher, setPublisher] = useState("");  // 出版社
    const [year, setYear] = useState("");  // 出版年
    const [genre, setGenre] = useState("");  // ジャンル
    const [loading, setLoading] = useState(false);  // ローディング状態
    const [books, setBooks] = useState([]);  // 検索結果を格納するステート
    const [openDialog, setOpenDialog] = useState(false);  // ダイアログボックスの表示・非表示ステート
    const [successMessage, setSuccessMessage] = useState("");  // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState("");      // エラーメッセージ


    // 出版年の選択欄を1868年から最新年まで作成
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1868 + 1 },
        (_, index) => 1868 + index
    );

    // ジャンルの選択欄を定義（必要に応じて変更可能）
    const genres = ["文学・評論", "自伝・伝記", "ノンフィクション", "ファンタジー・SF", "ミステリー・推理", "教育・学習", "ビジネス・経済", "歴史・社会", "芸能・エンターテインメント", "アート・建築・デザイン", "人文・思想・宗教", "科学・テクノロジー・プログラミング", "健康・ライフスタイル", "旅行・ガイド", "料理・グルメ",];

    // いずれかのフィールドに値が入っていれば検索可能
    const isFormValid = title || authors || publisher || year || genre;

    const handleSearch = async (e) => {
        e.preventDefault();

        // いずれかのフィールドが入力されていない場合にエラー
        if (!title && !authors && !publisher && !year && !genre) {
            setErrorMessage("少なくとも1つのフィールドに入力してください");
            setOpenDialog(true);
            return;
        }

        setLoading(true);  // 検索開始時にローディングを開始
        setSuccessMessage("");
        setErrorMessage("");

        try {
            // フィールドに入力された情報をまとめてAPIに渡す
            // APIリクエストを送る
            const response = await axios.get(
                "http://127.0.0.1:8000/api/books/search",
                {
                    params: {
                        title,
                        authors,
                        publisher,
                        year,
                        genre,
                    },
                }
            );

            setBooks(response.data);

            // 結果があればメッセージをセット
            if (response.data.length > 0) {
                setSuccessMessage("検索結果が見つかりました");
            } else {
                setErrorMessage("検索結果が見つかりませんでした");
            }
        } catch (error) {
            console.error(error);
            setErrorMessage("検索に失敗しました");
        } finally {
            setLoading(false);
            setOpenDialog(true);
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

                {/* 検索結果リスト */}
                {books.length > 0 && (
                    <Box sx={{ width: '100%', maxWidth: '500px', margin: '40px auto' }}>
                        <Typography variant="h5" sx={{ mb: 2 }}>検索結果</Typography>
                        {books.map((book, index) => (
                            <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                                <Typography variant="subtitle1"><strong>タイトル:</strong> {book.title}</Typography>
                                <Typography variant="body2"><strong>著者:</strong> {book.authors}</Typography>
                                <Typography variant="body2"><strong>出版社:</strong> {book.publisher}</Typography>
                                <Typography variant="body2"><strong>出版年:</strong> {book.year}</Typography>
                                <Typography variant="body2"><strong>ジャンル:</strong> {book.genre}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}

            </Box>
        </>
    );
};
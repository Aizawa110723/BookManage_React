// 書籍検索フォーム
import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { bigStyles } from "../components/Styles";
import { buttonStyle_a } from "../App";
import { fieldItem } from "../components/Styles";
import { formFrame } from "../components/Styles";

export const SearchForm = ({ setBooks, setError }) => {

    const [title, setTitle] = useState("");  // タイトル
    const [author, setAuthor] = useState("");  // 著者
    const [publisher, setPublisher] = useState("");  // 出版社
    const [year, setYear] = useState("");  // 出版年
    const [genre, setGenre] = useState("");  // ジャンル
    const [loading, setLoading] = useState(false);  // ローディング状態
    const [error, setErrorState] = useState(null);  // エラーメッセージを管理する状態

    // 出版年の選択肢を1868年（明治）から2024年まで作成
    const years = Array.from({ length: 2024 - 1868 + 1 }, (_, index) => 1868 + index);  // 1868年から2024年までの配列

    // ジャンルの選択肢を定義（必要に応じて変更可能）
    const genres = ["文学", "ビジネス", "科学", "歴史", "アート", "コンピュータ", "自己啓発", "趣味"];


    // いずれかのフィールドに値が入っていれば検索可能
    const isFormValid = title || author || publisher || year || genre;

    const handleSearch = async (e) => {
        e.preventDefault();

        // いずれかのフィールドが入力されていない場合にエラー
        if (!isFormValid) {
            setError("少なくとも1つのフィールドに入力してください");
            return;
        }

        setLoading(true);  // 検索開始時にローディングを開始
        setError(null);    // エラーメッセージをリセット

        try {
            // フィールドに入力された情報をまとめてAPIに渡す
            const { data } = await axios.get("http://127.0.0.1:8000/api/searchbooks", {
                params: {
                    title,
                    author,
                    publisher,
                    year,
                    genre,
                }
            });

            if (data.length === 0) {
                // 検索結果がない場合
                setBooks([]);
                setError("検索結果が見つかりませんでした");
            } else {
                // 検索結果があれば表示
                setBooks(data);
            }
        } catch (error) {
            setError("検索に失敗しました");
            console.error('Error', error);
        } finally {
            // ローディング完了
            setLoading(false);
        }
    };

    return (
        <Box sx={{ ...bigStyles }}>

            <Typography
                variant="h3"
                sx={{
                    color: '#003366',
                    textAlign: 'center',
                    letterSpacing: '4px',
                    fontWeight: 'bold',
                    paddingTop: '20px',
                    paddingBottom: '10px',
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
                    color: '#003366',
                    textAlign: 'center',
                    marginBottom: '40px',
                }}
            >
                検索条件を入力してください
            </Typography>

            <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '500px' }}>
                {[{ label: "タイトル", value: title, setter: setTitle, type: "text" },
                { label: "著者", value: author, setter: setAuthor, type: "text" },
                { label: "出版社", value: publisher, setter: setPublisher, type: "text" },
                { label: "出版年", value: year, setter: setYear, type: "select", options: years },
                { label: "ジャンル", value: genre, setter: setGenre, type: "text" }]
                    .map(({ label, value, setter, type }) => (
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
                                    color: '#003366'
                                }} shrink>{label}</InputLabel>
                            </FormControl>

                            {type === "select" ? (
                                <Select
                                    value={value}
                                    onChange={(e) => setter(e.target.value)}
                                    sx={{...fieldItem}}

                                >
                                    {years && years.map((year) => (
                                        <MenuItem key={year} value={year}>{year}</MenuItem>
                                    ))}
                                </Select>

                            ) : (
                                <TextField
                                    id={label}
                                    value={value}
                                    onChange={(e) => setter(e.target.value)}
                                    type={type}
                                    variant="outlined"
                                    sx={{...formFrame}}
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
                        color={isFormValid ? "primary" : "default"}  // 入力がある場合はボタンを青に
                        disabled={!isFormValid || loading}  // いずれかが入力されていないとボタン無効
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

                {/* エラーメッセージの表示 */}
                {error && (
                    <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
                        {error}
                    </Typography>
                )}
            </form>
        </Box>
    );
};

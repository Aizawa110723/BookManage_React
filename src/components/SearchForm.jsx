// 書籍検索フォーム
import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Typography } from "@mui/material";


export const SearchForm = ({ setBooks, setError }) => {
    // 検索キーワード
    const [query, setQuery] = useState("");

    // 検索フィールドの状態
    const [searchField, setSearchField] = useState("title");

    // ローディング状態
    const [loading, setLoading] = useState(false);

    // ページネーションの状態
    const [page, setPage] = useState(1);


    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) {
            setError("検索ワードを入力してください");
            return;
        }

        setLoading(true);  // 検索開始時にローディングを開始
        setError(null);    // エラーメッセージをリセット

        try {

            // 1ページに10件の本を表示
            // query と searchField をAPIに渡す
            const { data } = await axios.get("http://127.0.0.1:8000/api/searchbooks", {
                params: {
                    query,
                    searchField,
                    page,
                    limit: 10
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

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePreviousPage = () => {
        if (page > 1) {
            setPage((prevPage) => prevPage - 1);
        }
    };

    const searchFields = [
        { value: "title", label: "タイトル" },
        { value: "author", label: "著者" },
        { value: "publisher", label: "出版社" },
        { value: "year", label: "出版年" },
        { value: "genre", label: "ジャンル" }
    ];

    return (
        <>
            <Box sx={{ padding: "20px", borderRadius: "8px", boxShadow: 3 }}>
                <form onSubmit={handleSearch}>
                    {/* 検索ワードの入力フィールド */}
                    <TextField
                        label="検索ワード"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />

                    {/* 検索対象フィールドの選択 */}
                    <FormControl fullWidth margin="normal">
                        <InputLabel>検索対象</InputLabel>
                        <Select
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            label="検索対象"
                        >
                            {searchFields.map((field) => (
                                <MenuItem key={field.value} value={field.value}>
                                    {field.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    {/* 検索ボタン */}
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={loading}
                        sx={{ marginTop: "16px", padding: "10px 20px" }}
                    >
                        {loading ? <CircularProgress size={24} /> : "検索"}
                    </Button>

                    {/* ローディング表示 */}
                    {loading && (
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
                            検索中...
                        </Typography>
                    )}

                    {/* エラーメッセージ表示 */}
                    {setError && (
                        <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
                            {setError}
                        </Typography>
                    )}
                </form>
            </Box>
        </>
    );
};

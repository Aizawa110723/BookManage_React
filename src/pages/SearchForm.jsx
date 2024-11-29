// 書籍検索フォーム
import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Typography } from "@mui/material";
import { buttonStyles } from "../components/Styles";


export const SearchForm = ({ setBooks, setError }) => {

    const [query, setQuery] = useState("");  // 検索キーワード
    const [searchField, setSearchField] = useState("title"); // 検索フィールドの状態
    const [loading, setLoading] = useState(false); // ローディング状態
    const [page, setPage] = useState(1); // ページネーションの状態

    const handleSearch = async (e) => {
        e.preventDefault();

        // 検索ワードが空で、かつ検索対象が選ばれていない場合
        if (!query.trim() && !searchField) {
            setError("少なくとも1つのフィールドを入力してください");
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
                    limit: 10,  // 1ページに表示する件数
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
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
    };

    const searchFields = [
        { value: "title", label: "タイトル" },
        { value: "author", label: "著者" },
        { value: "publisher", label: "出版社" },
        { value: "year", label: "出版年" },
        { value: "genre", label: "ジャンル" }
    ];

    return (
        <Box sx={{
            padding: "20px",
            borderRadius: "10px",
            boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#AEE0FF',  // BookFormの背景色に一致
            maxWidth: '100%',
            margin: '0 auto',  // 中央に配置
            height: '100vh',
            '@media (max-width: 600px)': {  // 画面が600px以下になった場合
                padding: '10px',
                width: '100%',
                maxWidth: '100%'
            }
        }}>

            <Typography
                variant="h4"
                sx={{
                    color: '#003366',
                    textAlign: 'center',
                    letterSpacing: '1px',
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

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '16px',
                    width: '100%'
                }}>

                    <TextField
                        label="検索ワード"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        fullWidth
                        variant="outlined"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            fontFamily: '"Roboto", sans-serif',
                            fontWeight: 'bold',
                            height: '40px',
                            padding: '4px 12px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
                                },
                                '& input': {
                                    boxShadow: 'none',
                                    padding: '10px',
                                },
                            },
                        }}
                    />
                </Box>

                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '16px',
                    width: '100%',
                    paddingTop: '20px'
                }}>

                    <FormControl sx={{ marginBottom: '16px' }}>
                        <InputLabel htmlFor="searchField"
                            sx={{
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                color: '#003366'
                            }}>
                            検索対象
                        </InputLabel>

                        <Select
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                            label="検索対象"
                            id="searchField"
                        >
                            {searchFields.map((field) => (
                                <MenuItem key={field.value} value={field.value}>
                                    {field.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '16px',
                    width: '100%',
                    paddingTop: '20px',
                }}>

                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    sx={{ ...buttonStyles }}>

                    {loading ? <CircularProgress size={24} /> : "検 索"}

                </Button>

                {/* ローディング表示 */}
                {
                    loading && (
                        <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px" }}>
                            検索中...
                        </Typography>
                    )
                }

                {/* エラーメッセージ表示 */}
                {
                    setError && (
                        <Typography variant="body2" color="error" sx={{ marginTop: "10px" }}>
                            {setError}
                        </Typography>
                    )
                }
            </form >
        </Box >
    );
};

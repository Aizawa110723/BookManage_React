import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
    Box,
    Button,
    CircularProgress,
    TextField, Typography,
    Dialog, DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
    Grid,
    Card,
    CardContent,
    CardMedia,
} from "@mui/material";
import { bigStyles, buttonStyle_a, formFrame, fieldItem } from "../components/Styles";

// デフォルト画像URL
const DEFAULT_IMAGE = '/images/noprinting.png';

export const BookForm = ({ setBooks }) => {

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState('');  // エラーメッセージ
    const [openDialog, setOpenDialog] = useState(false);  // ダイアログボックスの表示・非表示ステート
    const [candidateDialogOpen, setCandidateDialogOpen] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [candidates, setCandidates] = useState([]);  //複数候補


    // 出版年の選択欄を1868年から最新年まで作成
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1868 + 1 },
        (_, index) => 1868 + index
    ).reverse();

    // ジャンルの選択欄を定義（必要に応じて変更可能）
    const genres = [
        "文学・評論",
        "自伝・伝記",
        "ノンフィクション",
        "ファンタジー・SF",
        "ミステリー・推理",
        "教育・学習",
        "ビジネス・経済",
        "歴史・社会",
        "芸能・エンターテインメント",
        "アート・建築・デザイン",
        "人文・思想・宗教",
        "科学・テクノロジー・プログラミング",
        "健康・ライフスタイル",
        "旅行・ガイド",
        "料理・グルメ",
    ];

    const isFormValid = title || authors || publisher || year || genre;

    // -----------------------
    // 候補選択後のDB登録
    // -----------------------
    const registerBook = async (book) => {
        try {
            setLoading(true);
            const response = await axios.post('http://127.0.0.1:8000/api/books', book);
            setBooks(prev => [...prev, response.data]);
            setSuccessMessage('書籍を登録しました');
            setOpenDialog(true);
        } catch (err) {
            console.error(err);
            setErrorMessage('登録に失敗しました');
        } finally {
            setLoading(false);
            setCandidateDialogOpen(false);
        }
    };

    // -----------------------
    // 登録ボタン押下 → 楽天API検索
    // -----------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!isFormValid) {
            setErrorMessage('少なくとも1つの項目を入力してください');
            setOpenDialog(true);
            return;
        }

        setLoading(true);

        try {
            // 楽天APIで検索
            const response = await axios.get('http://127.0.0.1:8000/api/books/fetch-rakuten', {
                params: { title, authors, publisher, year, genre }
            });

            const results = response.data; // 配列
            if (!results || results.length === 0) {
                setErrorMessage('該当書籍が見つかりませんでした');
                setOpenDialog(true);
            } else if (results.length === 1) {
                // 1件だけ → 直接登録
                registerBook(results[0]);
            } else {
                // 複数候補 → モーダルで選択
                setCandidates(results);
                setCandidateDialogOpen(true);
            }
        } catch (err) {
            console.error(err);
            setErrorMessage('検索に失敗しました');
            setOpenDialog(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            {/* 登録成功/エラーダイアログ */}
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

            {/* 複数候補選択ダイアログ */}
            <Dialog open={candidateDialogOpen} onClose={() => setCandidateDialogOpen(false)}>
                <DialogTitle>候補を選択してください</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        {candidates.map((book, index) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        cursor: "pointer",
                                        border: selectedCandidate?.id === book.id ? "2px solid #1976d2" : "1px solid #ccc"
                                    }}
                                    onClick={() => setSelectedCandidate(book)}
                                >
                                    <CardMedia
                                        component="img"
                                        alt="No Image"
                                        height="200px"
                                        image={book.imageUrl || DEFAULT_IMAGE} // book.imageUrl がなければ DEFAULT_IMAGE を表示
                                    />

                                    <CardContent>
                                        <Typography variant="subtitle1">{book.title}</Typography>
                                        <Typography variant="body2">{book.authors}</Typography>
                                        <Typography variant="body2">{book.publisher} / {book.year}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setCandidates([]);
                        setSelectedCandidate(null);
                    }}
                     color="secondary">キャンセル</Button>
                    <Button
                        onClick={() => {
                            if (selectedCandidate) {
                                registerBook(selectedCandidate); // Laravel に送信
                                setCandidates([]);
                            }
                        }}
                        color="primary"
                        disabled={!selectedCandidate}
                    >
                        選択して登録
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

                {/* 登録フォーム */}
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
                            }} key={label}
                        >
                            <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                                <InputLabel htmlFor={label} sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    color: '#8B3A2F'
                                }} shrink
                                >{label}</InputLabel>
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

BookForm.propTypes = {
    setBooks: PropTypes.func.isRequired,
};


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

export const BookForm = () => {

    const [title, setTitle] = useState('');
    const [authors, setAuthors] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState('');  // エラーメッセージ
    const [openDialog, setOpenDialog] = useState(false);  // ダイアログボックスの表示・非表示ステート
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
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
    // 候補選択後のDB登録（API優先・手入力補完）
    // -----------------------
    const registerBook = async (bookFromAPI) => {
        try {
            setLoading(true);

            // 手入力データ
            const manualData = {
                title,      // 手入力タイトル
                authors,    // 手入力著者
                publisher,  // 手入力出版社
                year,       // 手入力年
                genre,      // 手入力ジャンル
            };

            // -----------------------
            // 登録データを作成（API優先・補完ルール）
            // マッピングしてDBに送る
            // -----------------------
            const mergedData = {
                // 正確さ重視は API 優先
                title: bookFromAPI.title || manualData.title,
                authors: bookFromAPI.authors || manualData.authors,
                publisher: bookFromAPI.publisherName || manualData.publisher,
                isbn: bookFromAPI.isbn || null,
                imageUrl: bookFromAPI.largeImageUrl || bookFromAPI.mediumImageUrl || null,
                year: bookFromAPI.salesDate || manualData.year,

                // 手入力優先の補完（genreはキーになし）
                genre: manualData.genre ? manualData.genre : bookFromAPI.genre || null,
            };

            // LaravelにPOST
            await axios.post('http://127.0.0.1:8000/api/books', mergedData);

            setSuccessMessage('書籍を登録しました');
            setOpenDialog(true);

        } catch (err) {
            console.error(err);
            setErrorMessage('登録に失敗しました');
            setOpenDialog(true);
        } finally {
            setLoading(false);
            setCandidateDialogOpen(false);
            setSelectedCandidate(null);

            // 入力欄リセット
            setTitle('');
            setAuthors('');
            setPublisher('');
            setYear('');
            setGenre('');
        }
    };

    // -----------------------
    // 登録ボタン押下 → 楽天API検索
    // -----------------------
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!title && !authors && !publisher && !year && !genre) {
            setErrorMessage('少なくとも1つの項目を入力してください');
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

            } else if (results.length === 1) {
                // 候補1件でも確認ダイアログを出す
                setSelectedCandidate(results[0]);
                setConfirmDialogOpen(true);
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
                    {/* // 選択中タイトル表示 */}
                    {selectedCandidate && (
                        <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold', color: '#af1d03' }}>
                            選択中：{selectedCandidate.title}
                        </Typography>
                    )}

                    {/* // 候補カード部分 */}
                    <Grid container spacing={2} alignItems="stretch">
                        {candidates.map((book, index) => (
                            <Grid item xs={6} sm={6} md={4} key={index}>
                                <Card
                                    sx={{
                                        cursor: "pointer",
                                        border: selectedCandidate?.isbn === book.isbn ? "2px solid #e0b26c" : "1px solid #ccc",
                                        backgroundColor: selectedCandidate?.isbn === book.isbn ? "#fff2d1" : "#fff",
                                        display: "flex",
                                        flexDirection: "column",
                                        minHeight: 250,
                                        width: '100%',
                                    }}
                                    onClick={() => {
                                        const key = book.isbn || book.title + book.authors + book.publisher;
                                        const selectedKey = selectedCandidate?.isbn || selectedCandidate?.title + selectedCandidate?.authors + selectedCandidate?.publisher;
                                        if (key === selectedKey) setSelectedCandidate(null);
                                        else setSelectedCandidate(book);
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        alt="No Image"
                                        height="140"
                                        image={book.imageUrl || DEFAULT_IMAGE}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography variant="subtitle1" noWrap>{book.title}</Typography>
                                        <Typography variant="body2" noWrap>{book.authors}</Typography>
                                        <Typography variant="body2" noWrap>{book.publisher} / {book.year}</Typography>
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
                        setCandidateDialogOpen(false); // ← ダイアログを即座に閉じる
                    }}
                        color="secondary">キャンセル</Button>
                    <Button
                        onClick={() => {
                            if (selectedCandidate) {
                                setConfirmDialogOpen(true);
                            }
                        }}
                        color="primary"
                        disabled={!selectedCandidate}
                    >
                        選択して登録
                    </Button>

                    {/* 確認ダイアログ */}
                    <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                        <DialogTitle>登録内容確認</DialogTitle>
                        <DialogContent>
                            <Typography>次の内容で登録しますか？</Typography>
                            {selectedCandidate && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography>タイトル: {selectedCandidate.title}</Typography>
                                    <Typography>著者: {selectedCandidate.authors}</Typography>
                                    <Typography>出版社: {selectedCandidate.publisher}</Typography>
                                    <Typography>出版年: {selectedCandidate.year || year}</Typography>
                                    <Typography>ジャンル: {selectedCandidate.genre || genre}</Typography>
                                </Box>
                            )}
                        </DialogContent>
                        <DialogActions>
                            <Button
                                onClick={() => setConfirmDialogOpen(false)}
                                color="secondary">
                                キャンセル
                            </Button>
                            <Button onClick={() => { if (selectedCandidate) registerBook(selectedCandidate); }}
                                color="primary">
                                OK
                            </Button>
                        </DialogActions>
                    </Dialog>
                </DialogActions>
            </Dialog>

            {/* 登録フォーム */}
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


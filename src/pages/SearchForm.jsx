import { useState } from "react";
import axios from 'axios';
import {
    Box,
    Button,
    TextField,
    CircularProgress,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Card,
    CardContent,
    CardMedia
} from "@mui/material";
import { bigStyles, fieldItem, formFrame, buttonStyle_a } from "../components/Styles";
import { dialogButtonStyle } from "../components/Styles";


// デフォルト画像URL
const DEFAULT_IMAGE = '/images/noprinting.png';

export const SearchForm = () => {
    const [title, setTitle] = useState("");  // タイトル
    const [authors, setAuthors] = useState("");  // 著者
    const [publisher, setPublisher] = useState("");  // 出版社
    const [year, setYear] = useState("");  // 出版年
    const [genre, setGenre] = useState("");  // ジャンル

    const [loading, setLoading] = useState(false);  // ローディング状態
    const [books, setBooks] = useState([]);  // 検索結果を格納するステート
    const [searchDialogOpen, setSearchDialogOpen] = useState(false); // ダイアログ表示
    const [noResultsDialogOpen, setNoResultsDialogOpen] = useState(false);       // ヒットなし

    const [selectedBook, setSelectedBook] = useState(null);



    // 出版年の選択欄を1868年から最新年まで作成
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: currentYear - 1868 + 1 },
        (_, i) => `${currentYear - i}年`);

    // ジャンルの選択欄を定義
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
        "哲学・思想・宗教",
        "科学・テクノロジー・プログラミング",
        "健康・ライフスタイル",
        "旅行・ガイド",
        "料理・グルメ",
    ];

    const isFormValid = title || authors || publisher || year || genre;  // 少なくとも1つ入力

    // ISBN判定用
    const getBookKey = (book) => book.isbn ?? `${book.title}_${book.authors}_${book.publisher}`;

    // ------------------------
    // ダイアログ用の状態判定
    // ------------------------
    const hasSelection = !!selectedBook;            // 書籍を選択したか
    const hasValidISBN = selectedBook?.isbn;       // 選択した書籍に ISBN があるか
    const isValidSelection = hasSelection && hasValidISBN && books.some(
        b => getBookKey(b) === getBookKey(selectedBook)
    );

    const handleSearch = async (e) => {
        e.preventDefault();

        const searchParams = {};
        if (title) searchParams.title = title;
        if (authors) searchParams.authors = authors;
        if (publisher) searchParams.publisher = publisher;
        if (year) searchParams.year = year;
        if (genre) searchParams.genre = genre;

        // いずれかのフィールドが入力されていない場合にエラー
        if (Object.keys(searchParams).length === 0) {
            setNoResultsDialogOpen(true);
            return;
        }

        setLoading(true);  // 検索開始時にローディングを開始

        try {
            // APIにリクエストを送る
            const response = await axios.post(
                "http://127.0.0.1:8000/api/searchbooks", searchParams
            );

            setBooks(response.data);
            setSelectedBook(null); // ★ 検索結果が確定→必ず未選択

            if (response.data.length === 0) {
                setNoResultsDialogOpen(true);  // ヒットなし
            } else {
                setSearchDialogOpen(true);    // ヒットあり
            }
        } catch (err) {
            console.error(err);
            setNoResultsDialogOpen(true);      // エラー時も同じダイアログ使う
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            {/* ------------------------検索ヒットなしダイアログ------------------------ */}
            <Dialog
                open={noResultsDialogOpen}
                onClose={() => {
                    setNoResultsDialogOpen(false);
                    setSelectedBook(null);
                }}
                maxWidth='sm'
                fullWidth
                PaperProps={{
                    sx: {
                        borderRadius: 3,
                        padding: 2,
                        backgroundColor: '#fffaf5',
                        fontFamily: '"Roboto", sans-serif',
                    }
                }}
            >
                <DialogContent>
                    <Typography
                        sx={{
                            textAlign: 'center',
                            fontWeight: 'bold',
                            color: '#8B3A2F',
                            mb: 2,
                        }}>
                        該当書籍が見つかりませんでした
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', gap: 2 }}>
                    <Button
                        onClick={() => setNoResultsDialogOpen(false)}
                        sx={{ ...dialogButtonStyle }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ------------------------検索結果ダイアログ------------------------ */}
            <Dialog
                open={searchDialogOpen}
                onClose={() => setSearchDialogOpen(false)}
                maxWidth="lg"
                fullWidth
                PaperProps={{ sx: { borderRadius: 3, padding: 2 } }}
            >
                <DialogTitle sx={{ textAlign: 'center', color: '#8B3A2F', fontWeight: 'bold' }}>
                    検索結果 {selectedBook ? `- 選択: ${selectedBook.title}` : ''}
                </DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        {books.map(book => {
                            console.log(book.image_url);
                            // 画像は image_url だけ見る
                            // image_url があればそれを使う（DBにフルURLが入ってる場合のみ）
                            const bookImage = book.image_url
                                ? book.image_url
                                : DEFAULT_IMAGE; // React public に置いたやつ

                            // 選択判定
                            const isSelected = selectedBook && getBookKey(selectedBook) === getBookKey(book);


                            return (
                                <Grid item xs={12} sm={6} md={4} key={getBookKey(book)}>
                                    <Card
                                        sx={{
                                            cursor: 'pointer',
                                            border: isSelected ? '2px solid #af1d03' : '1px solid #ccc',
                                            backgroundColor: isSelected ? '#F5D19A' : '#f5f5f5',
                                            height: 320,              // 高さ固定
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                        onClick={() => {
                                            if (isSelected) setSelectedBook(null);
                                            else setSelectedBook(book);
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="150" // サムネイル固定
                                            image={bookImage}
                                            alt={book.title || 'No Image'}
                                            sx={{ objectFit: 'cover' }}
                                        />
                                        <CardContent
                                            sx={{
                                                flexGrow: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'flex-start',
                                                gap: 0.2
                                            }}>
                                            <Typography variant="subtitle1" noWrap sx={{ fontWeight: 'bold'}}>
                                                {book.title || 'タイトルなし'}
                                            </Typography>
                                            <Typography variant="body2" noWrap>著者：{book.authors}</Typography>
                                            <Typography variant="body2" noWrap>出版社：{book.publisher}</Typography>
                                            <Typography variant="body2" noWrap>出版日：{book.year}</Typography>
                                            <Typography variant="body2" noWrap>ジャンル：{book.genre}</Typography>
                                            <Typography variant="body2" noWrap>ISBN：{book.isbn || 'なし'}</Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            );
                        })}
                    </Grid>

                    {/* 楽天ボタン・キャンセルボタン */}
                    <Box
                        sx={{
                            mt: 3,
                            p: 2,
                            borderRadius: 2,
                            backgroundColor: '#fffaf5',
                            border: '1px solid #e0d6c9',
                        }}
                    >
                        {/* 注意文：常に表示 */}
                        <Typography
                            sx={{
                                color: !hasSelection ? '#aaa194'           // 未選択 → グレー
                                    : hasValidISBN ? '#aaa194'           // 選択済み & ISBNあり → グレー
                                        : '#8B3A2F',                         // 選択済み & ISBNなし → 赤
                                fontWeight: 'bold',
                                fontFamily: '"Roboto", sans-serif',
                                fontSize: '1.1rem',
                                textAlign: 'center',
                                mb: 1
                            }}
                        >
                            ISBN未登録書籍は詳細情報を参照できません
                        </Typography>

                        {/* ボタン横並び */}
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 2,
                            }}
                        >
                            {/* isbnあり：楽天ブックスリンク */}
                            <Button
                                sx={{
                                    ...dialogButtonStyle,
                                    opacity: isValidSelection ? 1 : 0.4,
                                    cursor: isValidSelection ? 'pointer' : 'not-allowed'
                                }}
                                disabled={!isValidSelection}
                                onClick={() => {

                                    // ★ 最終ガード
                                    if (!isValidSelection) return;

                                    window.open(
                                        `https://books.rakuten.co.jp/search?sitem=${selectedBook.isbn}`,
                                        '_blank'
                                    );
                                }}
                            >
                                楽天で詳細情報を見る
                            </Button>
                            <Button
                                variant="outlined"
                                sx={dialogButtonStyle}
                                onClick={() => {
                                    setSearchDialogOpen(false);
                                    setSelectedBook(null); // ★閉じる時も初期化
                                }}
                            >
                                キャンセル
                            </Button>
                        </Box>
                    </Box>
                </DialogContent>
            </Dialog>


            {/* ------------------------検索フォーム------------------------ */}
            <Box sx={bigStyles} >
                {/* タイトル*/}
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
                    }
                    }
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
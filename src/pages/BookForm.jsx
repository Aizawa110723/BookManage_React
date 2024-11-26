import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, CircularProgress, Typography, FormControl, InputLabel } from "@mui/material";


export const BookForm = ({ setBooks, setError, error }) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);


    const postData = async () => {
        try {
            const url = 'http://127.0.0.1:8000/api/books'; // リクエストを送るURL

            // 年の値を整数に変換（数値でない場合は null に設定）
            const parsedYear = year ? parseInt(year, 10) : null;

            const data = {
                title: title,
                author: author,
                publisher: publisher,
                year: parsedYear,
                genre: genre
            };

            // ローディング状態を開始
            setLoading(true);

            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // レスポンスがあれば新しい本をセット
            setBooks((prevBooks) => [...prevBooks, response.data]);


            // フォーム送信後にリセット
            setTitle('');
            setAuthor('');
            setPublisher('');
            setYear('');
            setGenre('');
            setError(null); // エラーをリセット


        } catch (error) {
            setError('本の追加に失敗しました'); // エラーをstateに保存
            console.error('Error', error);
        } finally {
            // ローディング完了
            setLoading(false);
        }
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        // バリデーション: 必須フィールドのチェック
        if (!title || !author || !publisher || !year || !genre) {
            setError("すべてのフィールドを入力してください");
            return;
        }
        postData(); // バリデーション通過後にデータを送信
    };

    // フィールドがすべて入力されているか確認
    const isFormValid = title && author && publisher && year && genre;

    return (
        <>
            {/* エラーメッセージの表示（画面上部に固定） */}
            {error && (
                <Box sx={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: 'white',
                    color: 'red',
                    textAlign: 'center',
                    padding: '10px 0',
                    zIndex: 1000
                }}>
                    <Typography variant="body2">{error}</Typography>
                </Box>
            )}


            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                padding: "20px",
                borderRadius: "10px",
                boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // 影を右下に設定（BookFormの影に合わせる）
                backgroundColor: '#AEE0FF',
                maxWidth: '100%',
                margin: '0 auto',  // 中央に配置
                '@media (max-width: 600px)': {  // 画面が600px以下になった場合
                    padding: '10px',
                    width: '100%',
                    maxWidth: '100%'
                }
            }} >

                <Typography
                    variant="h4"
                    sx={{
                        color: '#003366',
                        textAlign: 'center',  // タイトルを中央揃えにする
                        letterSpacing: '1px',  // 文字間隔を広めにして清潔感を出す
                        fontWeight: 'bold',
                        paddingTop: '20px',  // 上にスペースを加える
                        paddingBottom: '10px',  // 下に少しスペース
                    }}
                >
                    書籍登録

                </Typography>

                <Typography
                    variant="h6"
                    component="h2"
                    sx={{
                        fontWeight: 'normal',
                        fontSize: '1.2rem',  // サブタイトルを小さく
                        color: '#003366',
                        textAlign: 'center',
                        marginBottom: '40px', // 入力フォームとの間に広めのスペース
                    }}
                >
                    詳細を入力してください
                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                    {[
                        { label: "タイトル", value: title, setter: setTitle, type: "text" },
                        { label: "著者", value: author, setter: setAuthor, type: "text" },
                        { label: "出版社", value: publisher, setter: setPublisher, type: "text" },
                        { label: "出版年", value: year, setter: setYear, type: "number" },
                        { label: "ジャンル", value: genre, setter: setGenre, type: "text" }

                    ].map(({ label, value, setter, type }) => (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',  // ラベルをフィールドの上に配置
                            marginBottom: '16px',
                            width: '100%' // フィールド幅を100%に設定
                        }} key={label}>

                            <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                                <InputLabel htmlFor={label} sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    color: '#003366'
                                }} shrink>{label}</InputLabel>
                            </FormControl>

                            <TextField
                                id={label}
                                value={value}
                                onChange={(e) => setter(e.target.value)}
                                type={type}
                                fullWidth
                                variant="outlined"
                                sx={{
                                    backgroundColor: 'white',  // 背景を白く
                                    borderRadius: '10px',      // 角を丸く
                                    fontFamily: '"Roboto", sans-serif', // フォント変更
                                    fontWeight: 'bold',  // 入力フィールド内のテキストを太字に
                                    height: '40px',       // 入力フィールドの高さを固定
                                    padding: '4px 12px',      // 内部のパディング調整
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            border: 'none',  // 枠線を非表示にする
                                        },
                                        '& input': {
                                            boxShadow: 'none',
                                            padding: '10px',  // 影を完全に取り除く
                                        },
                                    },
                                }}
                            />
                        </Box>
                    ))}

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '16px',
                        width: '100%', // 親の幅に合わせる
                        paddingTop: '20px',  // 上にスペースを加える

                    }}>

                        <Button
                            type="submit"
                            variant="contained"
                            color={isFormValid ? "primary" : "default"} // フィールドが入力されている場合に色を変更
                            disabled={!isFormValid || loading} // フィールドが未入力またはローディング中は無効
                            sx={{
                                marginTop: "16px",
                                padding: "15px 20px",
                                backgroundColor: '#003366', // ネイビー色
                                color: 'white',
                                fontSize: '1.rem',
                                fontFamily: '"Roboto", sans-serif', // フォント変更
                                fontWeight: 'bold',  // 入力フィールド内のテキストを太字に
                                boxShadow: 'none', // ボタンの影を消す
                                width: '40%', // ボタンの幅をフォームのフィールドに合わせる
                                maxWidth: '400px', // 最大幅を設定
                                borderRadius: '50px',      // 角を丸く
                                '&:hover': {
                                    backgroundColor: '#6495ED',
                                    color: 'white',
                                },
                            }}>

                            {loading ? (
                                <CircularProgress size={24} />
                            ) : (
                                <Typography sx={{ fontSize: '1.3rem', fontWeight: 'bold', display: 'inline-block' }}>
                                    登　録
                                </Typography>  // 登録文字のサイズを大きく
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
            </Box >
        </>
    );
};
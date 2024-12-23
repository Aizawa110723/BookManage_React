import { useState } from "react";
import axios from "axios";
import { Box, Button, TextField, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { buttonStyle_a, bigStyles, fieldItem, formFrame, MyComponent } from "../components/Styles";



export const BookForm = ({ setBooks, setError, error }) => {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publisher, setPublisher] = useState('');
    const [year, setYear] = useState('');
    const [genre, setGenre] = useState('');
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // 成功メッセージ
    const [errorMessage, setErrorMessage] = useState('');  // エラーメッセージ
    const [isSubmitted, setIsSubmitted] = useState(false); // データ送信が完了したかどうかの判定


    // 出版年の選択肢を1868年（明治）から2024年まで作成
    const years = Array.from({ length: 2024 - 1868 + 1 }, (_, index) => 1868 + index);  // 1868年から2024年までの配列

    // ジャンルの選択肢を定義（必要に応じて変更可能）
    const genres = ["文学・評論", "自伝・伝記", "ノンフィクション", "ファンタジー・SF", "ミステリー・推理", "教育・学習", "ビジネス・経済", "歴史・社会", "芸能・エンターテインメント", "アート・建築・デザイン", "人文・思想・宗教", "科学・テクノロジー・プログラミング", "健康・ライフスタイル", "旅行・ガイド", "料理・グルメ"];


    const postData = async () => {

        if (loading || isSubmitted) return;  // リクエストが送信中なら何もしない

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

            // 成功メッセージをリセット（エラーメッセージ表示前にリセットする）
            setSuccessMessage('');
            setErrorMessage(''); // ★成功する前にエラーメッセージをクリア★

            // APIリクエストを送る
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // APIレスポンスをコンソールで表示
            console.log(response.data); 

            // レスポンスがあれば新しい本をセット
            setBooks((prevBooks) => [...prevBooks, response.data]);

            // 成功メッセージをセット
            setSuccessMessage('本の登録に成功しました');
            setIsSubmitted(true);  // ●送信完了フラグ●

        } catch (error) {
            if (error.response && error.response.data) {
                // バリデーションエラーや他のエラーが発生した場合に詳細を表示
                setErrorMessage(error.response.data.error || '本の追加に失敗しました'); // エラーをstateに保存
            } else {
                // ネットワークエラーなど
                setErrorMessage('サーバーとの通信に失敗しました');
            }

            setSuccessMessage('');  // ★エラー時には成功メッセージをクリア★
            setIsSubmitted(true);   // ●送信完了フラグ●

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
            setSuccessMessage('');
            setIsSubmitted(true); // バリデーション失敗時にも送信完了フラグを立てる
            return;
        }
        postData(); // バリデーション通過後にデータを送信
    };

    // フィールドがすべて入力されているか確認
    const isFormValid = title && author && publisher && year && genre;

    return (
        <>
            <Box sx={{ ...bigStyles }} >

                {/* MyComponentに成功・失敗メッセージを渡す */}

                {(isSubmitted && (successMessage || errorMessage)) && (
                    <MyComponent
                        successMessage={successMessage}
                        errorMessage={errorMessage}
                        onClose={() => {
                            // フォームリセット
                            setTitle('');
                            setAuthor('');
                            setPublisher('');
                            setYear('');
                            setGenre('');
                            setSuccessMessage('');  // 成功メッセージをリセット
                            setErrorMessage('');    // エラーメッセージをリセット
                            setIsSubmitted(false);  // ダイアログが閉じられたら送信完了フラグをリセット
                        }}
                    />
                )}

                <Typography
                    variant="h3"
                    sx={{
                        color: '#003366',
                        textAlign: 'center',  // タイトルを中央揃えにする
                        letterSpacing: '4px',  // 文字間隔を広めにして清潔感を出す
                        fontWeight: 'bold',
                        paddingTop: '30px',  // 上にスペースを加える
                        // paddingBottom: '10px',  // 下に少しスペース
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
                        fontSize: '1.2rem',  // サブタイトルを小さく
                        color: '#003366',
                        textAlign: 'center',
                        marginTop: '0',
                        marginBottom: '60px', // 入力フォームとの間に広めのスペース
                    }}
                >
                    詳細を入力してください

                </Typography>

                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px' }}>
                    {[
                        { label: "タイトル", value: title, setter: setTitle, type: "text" },
                        { label: "著者", value: author, setter: setAuthor, type: "text" },
                        { label: "出版社", value: publisher, setter: setPublisher, type: "text" },
                        { label: "出版年", value: year, setter: setYear, type: "select", options: years },
                        { label: "ジャンル", value: genre, setter: setGenre, type: "select", options: genres }

                    ].map(({ label, value, setter, type, options }) => (
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'column',  // ラベルをフィールドの上に配置
                            marginBottom: '16px',
                            width: '100%', // フィールド幅を100%に設定

                        }} key={label}>

                            <FormControl fullWidth sx={{ marginBottom: '16px' }}>
                                <InputLabel htmlFor={label} sx={{
                                    fontWeight: 'bold',
                                    fontSize: '1.2rem',
                                    color: '#003366',
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
                                    autoComplete="off"  // 予測変換をオフにする
                                    sx={{ ...formFrame }}

                                />
                            )}
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
                                ...buttonStyle_a,  // ボタンの基本スタイル
                                padding: '35px 15px',
                            }}>

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
            </Box >
        </>
    );
};
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// CSRFトークンを保持するコンテキストを作成
const CsrfTokenContext = createContext();

// CSRFトークンを提供するプロバイダー
export const CsrfTokenProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState(null);  // トークンの初期状態はnull
    const [loading, setLoading] = useState(true); // ローディング状態の管理
    const [error, setError] = useState(null); // エラーステートを追加

    // CSRF トークンを取得する関数
    const fetchCsrfToken = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-csrf-token');  // サーバーで設定したAPIエンドポイント
            setCsrfToken(response.data.csrf_token);  // トークンをセット
            console.log('CSRFトークン:', response.data.csrf_token);
        } catch (error) {
            console.error('CSRF トークンの取得に失敗しました:', error);
            setError('CSRF トークンの取得に失敗しました');
        } finally {
            setLoading(false);  // トークン取得後、ローディングを終了
        }
    };

    // 初期トークン取得
    useEffect(() => {
        fetchCsrfToken();  // コンポーネントがマウントされたときのみ実行
    }, []);

    // axios インスタンスに CSRF トークンを設定
    useEffect(() => {
        if (csrfToken) {
            // CSRFトークンが取得できた場合のみ、axiosのデフォルトヘッダーに設定
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
        }
    }, [csrfToken]);  // csrfTokenが変更された時にのみ実行

    return (
        <CsrfTokenContext.Provider value={{ csrfToken, loading, error }}>
            {children}
        </CsrfTokenContext.Provider>
    );
};

// CSRF トークンを取得するカスタムフック
export const useCsrfToken = () => {
    const { csrfToken, loading, error } = useContext(CsrfTokenContext);

    // トークンが取得されていないか、ローディング中の場合
    if (loading) {
        return { csrfToken: null, loading, error }; // ローディング中はnull
    }

    if (!csrfToken) {
        throw new Error('CSRFトークンが取得できません');
    }

    return { csrfToken, loading, error }; // トークン、ローディング状態、エラーを返す
};

// APIリクエストを送る関数
const postData = async (title, authors, publisher, year, genre, csrfToken, loading, setLoading, setErrorMessage, setSuccessMessage, setBooks, setIsSubmitted) => {
    if (loading) return;  // リクエストが送信中なら何もしない

    try {
        const url = 'http://127.0.0.1:8000/api/books'; // リクエストを送るURL

        // 年の値を整数に変換（数値でない場合は null に設定）
        const parsedYear = year ? parseInt(year, 10) : null;

        const data = {
            title,
            authors,
            publisher,
            year: parsedYear,
            genre,
        };

        // ローディング状態を開始
        setLoading(true);

        // 成功メッセージとエラーメッセージをリセット
        setSuccessMessage('');
        setErrorMessage('');

        // CSRFトークンがない場合、エラーメッセージを設定
        if (!csrfToken) {
            setErrorMessage('CSRFトークンが取得できませんでした');
            setLoading(false);
            return;
        }

        // APIリクエストを送信
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // 成功の場合
        console.log('成功:', response);
        setBooks((prevBooks) => [...prevBooks, response.data]);  // 書籍データを更新
        setSuccessMessage('本の登録に成功しました');

    } catch (error) {
        console.error('エラー:', error);

        // エラー処理
        if (error.response && error.response.data) {
            setErrorMessage('本の追加に失敗しました');
            setSuccessMessage('');
        } else {
            setErrorMessage('サーバーとの通信に失敗しました');
        }
        setIsSubmitted(true);  // 送信完了フラグ

    } finally {
        setLoading(false);  // ローディング完了
    }
};
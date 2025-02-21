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
        } catch (error) {
            console.error('CSRF トークンの取得に失敗しました:', error);
            setError('CSRF トークンの取得に失敗しました');
        } finally {
            setLoading(false);  // トークン取得後、ローディングを終了
        }
    };

    useEffect(() => {
        fetchCsrfToken();  // コンポーネントがマウントされたときに CSRF トークンを取得
    }, []);

    // axios インスタンスに CSRF トークンを設定
    useEffect(() => {
        if (csrfToken) {
            axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;  // トークンをaxiosのデフォルトヘッダーに設定
        }
    }, [csrfToken]);

    return (
        <CsrfTokenContext.Provider value={{ csrfToken, loading, error }}>
            {children}
        </CsrfTokenContext.Provider>
    );
};

// CSRF トークンを取得するカスタムフック
export const useCsrfToken = () => {
    const { csrfToken, loading, error } = useContext(CsrfTokenContext);

    if (csrfToken === null && !loading) {
        throw new Error('CsrfTokenContext が見つかりません');
    }

    // トークンが取得できていない場合やローディング中の場合の処理
    // ローディング中はnullを返す
    if (loading) {
        return { csrfToken: null, loading, error };
    }

    if (!csrfToken) {
        throw new Error('CSRF トークンが取得できません');
    }

    return { csrfToken, loading, error }; // トークン、ローディング状態、エラーを返す

};

// /例：フォーム送信時にCSRFトークンが期限切れの場合、再取得して送信を試みる

let retryCount = 0; // 再試行回数のカウンター
const maxRetryCount = 3; // 最大再試行回数

const postData = async (csrfToken, setBooks, setLoading, setErrorMessage, setSuccessMessage) => {

    if (loading) return;  // リクエストが送信中なら何もしない

    try {
        const url = 'http://127.0.0.1:8000/api/books'; // リクエストを送るURL

        // 年の値を整数に変換（数値でない場合は null に設定）
        const parsedYear = year ? parseInt(year, 10) : null;

        const data = {
            title: title,
            authors: authors,
            publisher: publisher,
            year: parsedYear,
            genre: genre
        };

        // ローディング状態を開始
        setLoading(true);

        // 成功メッセージをリセット
        setSuccessMessage('');
        setErrorMessage(''); // エラーメッセージリセット

        // CSRFトークンがない場合
        if (!csrfToken) {
            setErrorMessage('CSRFトークンが取得できませんでした');
            setLoading(false);
            return;
        }

        // APIリクエストを送る
        const response = await axios.post(url, data, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': csrfToken,  // CSRFトークンをヘッダーに追加
            }
        });

        // 成功の場合
        console.log('成功:', response);
        setBooks((prevBooks) => [...prevBooks, response.data]);  // レスポンスを元に書籍データを更新
        setSuccessMessage('本の登録に成功しました');

    } catch (error) {
        // エラーの場合
        console.log('エラー:', error);

        if (error.response && error.response.status === 419 && retryCount < maxRetryCount) {
            // CSRFトークンが期限切れの場合、再取得を試みる
            retryCount++; // 再試行カウントを増やす
            console.log('CSRFトークンが期限切れです。再取得します...');

            // トークンを再取得して再送信
            await fetchCsrfToken();
            postData(csrfToken, setBooks, setLoading, setErrorMessage, setSuccessMessage); // 再度APIリクエストを送る
        } else {
            // バリデーションエラーや他のエラーが発生した場合に詳細を表示
            setErrorMessage('本の追加に失敗しました');
            setSuccessMessage('');
        }

        setSuccessMessage('');
    } finally {
        // ローディング完了
        setLoading(false);
    }
};
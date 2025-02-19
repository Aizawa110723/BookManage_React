import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// CSRF トークンを保持するコンテキストを作成
const CsrfTokenContext = createContext();

// CSRF トークンを提供するプロバイダー
export const CsrfTokenProvider = ({ children }) => {
    const [csrfToken, setCsrfToken] = useState(null);  // トークンの初期状態はnull
    const[loading, setLoading] = useState(true); // ローディング状態の管理


    // CSRF トークンを取得する関数
    const fetchCsrfToken = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/get-csrf-token');  // サーバーで設定したAPIエンドポイント
            setCsrfToken(response.data.csrf_token);  // トークンをセット
        } catch (error) {
            console.error('CSRF トークンの取得に失敗しました:', error);
        } finally {
            setLoading(false);  // トークン取得後、ローディングを終了
        }
    };

    useEffect(() => {
        fetchCsrfToken();  // コンポーネントがマウントされたときに CSRF トークンを取得
    }, []);

    return (
        <CsrfTokenContext.Provider value={csrfToken}>
            {children}
        </CsrfTokenContext.Provider>
    );
};

// CSRF トークンを取得するカスタムフック
export const useCsrfToken = () => {
    const csrfToken = useContext(CsrfTokenContext);
    if (csrfToken === null) {
        throw new Error('CSRF トークンが利用できません');
    }
    return csrfToken;
};

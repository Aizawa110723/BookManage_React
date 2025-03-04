// import { createContext, useContext, useState, useEffect } from 'react';
// import { axiosInstance } from '../api/axios';  // axiosインスタンスをインポート

// // CSRFトークンを保持するコンテキストを作成
// const CsrfTokenContext = createContext();

// // CSRFトークンを提供するプロバイダー
// export const CsrfTokenProvider = ({ children }) => {
//     const [csrfToken, setCsrfToken] = useState(null);  // トークンの初期状態はnull
//     const [loading, setLoading] = useState(true); // ローディング状態の管理
//     const [error, setError] = useState(null); // エラーステートを追加

//     // CSRF トークンを取得する関数
//     const fetchCsrfToken = async () => {
//         try {
//             // axiosインスタンスを使ってリクエストを送信
//             const response = await axiosInstance.get('http://127.0.0.1:8000/api/get-csrf-token');  // サーバーで設定したAPIエンドポイント
//             setCsrfToken(response.data.csrf_token);  // トークンをセット
//             console.log('CSRFトークン:', response.data.csrf_token);
//         } catch (error) {
//             console.error('CSRF トークンの取得に失敗しました:', error);
//             setError('CSRF トークンの取得に失敗しました');
//         } finally {
//             setLoading(false);  // トークン取得後、ローディングを終了
//         }
//     };

//     // 初期トークン取得
//     useEffect(() => {
//         fetchCsrfToken();  // コンポーネントがマウントされたときのみ実行
//     }, []);

//     // axios インスタンスに CSRF トークンを設定
//     useEffect(() => {
//         if (csrfToken) {
//             // CSRFトークンが取得できた場合のみ、axiosのデフォルトヘッダーに設定
//             axios.defaults.headers.common['X-XSRF-TOKEN'] = csrfToken;
//         }
//     }, [csrfToken]);  // csrfTokenが変更された時にのみ実行

//     return (
//         <CsrfTokenContext.Provider value={{ csrfToken, loading, error }}>
//             {children}
//         </CsrfTokenContext.Provider>
//     );
// };

// // CSRF トークンを取得するカスタムフック
// export const useCsrfToken = () => {
//     const { csrfToken, loading, error } = useContext(CsrfTokenContext);

//     // トークンが取得されていないか、ローディング中の場合
//     if (loading) {
//         return { csrfToken: null, loading, error }; // ローディング中はnull
//     }

//     if (error) {
//         return { csrfToken: null, loading, error }; // エラーが発生した場合はnullを返す
//     }

//     if (!csrfToken) {
//         throw new Error('CSRFトークンが取得できません');
//     }

//     return { csrfToken, loading, error }; // トークン、ローディング状態、エラーを返す
// };
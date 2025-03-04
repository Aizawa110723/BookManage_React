// import axios from 'axios';

// // CSRFトークンの取得関数（クッキーから取得）
// const getCsrfToken = () => {
//     return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1];
// };

// // axios インスタンスを作成
// export const axiosInstance = axios.create({
//     baseURL: 'http://localhost:8000/api', // APIのベースURL
//     withCredentials: true,            // クレデンシャル（クッキー）を含める
// });

// // リクエストインターセプターでCSRFトークンをヘッダーに追加
// axiosInstance.interceptors.request.use(
//     (config) => {
//         const csrfToken = getCsrfToken();
//         console.log('CSRF Token in Interceptor:', csrfToken);  // ここで確認
//         if (csrfToken) {
//             config.headers['X-XSRF-TOKEN'] = csrfToken;   // ヘッダーに追加
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


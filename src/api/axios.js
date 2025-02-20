import axios from 'axios';

// CSRFトークンの取得関数（例えば、cookieやlocalStorageから取得）
const getCsrfToken = () => {
    // クッキーやlocalStorageなどからCSRFトークンを取得
    return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]; // クッキーからCSRFトークンを取得する例
};

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // APIのベースURL
    withCredentials: true,            // クレデンシャル（クッキー）を含める
});

// リクエストインターセプターでCSRFトークンをヘッダーに追加
axiosInstance.interceptors.request.use(
    (config) => {
        const csrfToken = getCsrfToken();
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken; // CSRFトークンをリクエストヘッダーに追加
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


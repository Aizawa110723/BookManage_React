import axios from 'axios';

// CSRFトークンの取得関数（例えば、cookieやlocalStorageから取得）
const getCsrfToken = () => {
    // クッキーやlocalStorageなどからCSRFトークンを取得
    return document.cookie.match(/XSRF-TOKEN=([^;]+)/)?.[1]; // クッキーからCSRFトークンを取得する例
};

// axios インスタンスを作成
export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000', // APIのベースURL
    withCredentials: true,            // クレデンシャル（クッキー）を含める
});

// CSRFトークンを設定する関数を追加
export const setCsrfToken = (token) => {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
        axiosInstance.defaults.headers['X-XSRF-TOKEN'] = csrfToken;
    }
};

// リクエストインターセプターでCSRFトークンをヘッダーに追加
axiosInstance.interceptors.request.use(
    (config) => {
        const csrfToken = getCsrfToken();
        console.log('CSRF Token:', csrfToken);
        if (csrfToken) {
            config.headers['X-XSRF-TOKEN'] = csrfToken; // CSRFトークンをリクエストヘッダーに追加
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


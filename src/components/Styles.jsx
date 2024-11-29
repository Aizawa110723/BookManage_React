import { height, lineHeight, maxWidth } from '@mui/system';
import { Link } from 'react-router-dom';

// トップのボタン
export const buttonStyles = {
    display: "flex",
    marginTop: '16px',
    backgroundColor: '#003366',
    padding: '20px 20px',
    color: 'white',
    fontSize: '1.7rem',
    fontFamily: '"Roboto", sans-serif',
    fontWeight: 'bold',
    justifyContent: "center",
    boxShadow: 'none',
    width: '160px',
    height: '60px',
    lineHeight: '1.2',
    borderRadius: '50px',
    '&:hover': {
        backgroundColor: '#6495ED',
        color: 'white',
    },
    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
        fontSize: '1.5rem',  // フォントサイズを少し小さく
        padding: '35px 35px', // パディングを少し小さく
        width: '30%',  // 幅を30%に調整
        height: '50px', // 高さを調整
    },
    '@media (max-width: 768px)': { // スマートフォン向け
        fontSize: '1.2rem',  // フォントサイズをさらに小さく
        padding: '25px 25px', // パディングをさらに小さく
        width: '50%',  // 幅を50%に調整
        height: '45px', // 高さを調整
    },
    '@media (max-width: 480px)': { // より小さな画面向け
        fontSize: '1rem',  // フォントサイズを最小限に
        padding: '15px 15px', // パディングを最小限に
        width: '70%',  // 幅を70%に調整
        height: '40px', // 高さを調整
    },
};

export const topStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto", sans-serif', // フォント変更
    fontWeight: "bold",
    color: '#003366',
    textAlign: 'center',
    borderRadius: "10px",
    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // 同じ影を設定
    paddingTop: '30px',
    paddingBottom: '30px',
    backgroundColor: '#ffffff',
    width: '90%',  // 幅を統一
    height: 'auto',  // 高さを統一
    margin: '0 auto', // 中央に配置
    '@media (max-width: 1024px)': { // 1024px以下の画面サイズ
        flexDirection: 'column', // 小さい画面では縦並びにする
        padding: '10px',  // パディングを少し小さく
    },
}

export const bigStyles = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto", sans-serif', // フォント変更
    fontWeight: "bold",
    color: '#003366',
    textAlign: 'center',
    borderRadius: "10px",
    boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.2)', // 同じ影を設定
    paddingTop: '30px',
    paddingBottom: '30px',
    backgroundColor: '#ffffff', // 背景色を白に設定
    width: '90%',  // 幅を統一
    margin: '0 auto', // 中央に配置
    height: '90%',
    '@mui/material': {
        '@media (max-width: 600px)': {  // スクリーンサイズが600px以下の時
            width: '90%',  // 幅を90%に調整
            padding: '10px', // パディングを調整
        },
    },
};
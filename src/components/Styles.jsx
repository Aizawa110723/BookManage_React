// import { Box, Typography, Button } from '@mui/material';


//ダイアログボタン（共通）
export const dialogButtonStyle = {
    backgroundColor: '#af1d03',
    color: 'white',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
    fontSize: '1.1rem',
    border: 'none',
    borderRadius: '50px',
    padding: '8px 20px',
    '&:hover': { backgroundColor: '#D2691E' },
};



// トップのみボタンスタイル
export const buttonStyle_a = {
    margin: '20px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif', // フォント変更
    backgroundColor: '#8B3A2F',
    color: 'white',
    border: '#8B3A2F',
    borderRadius: '50px', // ボタンを丸く
    alignItems: 'center',
    fontSize: '1.8rem',  // フォントサイズを少し大きく
    padding: '45px 45px', // ボタンのパディング（大きさ調整）
    width: '23%',  // 幅を統一
    minWidth: '200px',
    height: '60px', // 高さを統一
    lineHeight: '1.2',
    boxShadow: 'none !important', // 影を削除
    '&:hover': {
        backgroundColor: '#F24D3A',
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

// トップページのみボタン（タテ並び）、背景
export const topButton = {
    display: "flex",
    boxShadow: 'none',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "bold",
    textAlign: 'center',
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    height: '60px',
    backgroundColor: '#D88F34',
    width: '90%',
    paddingTop: '30px',
    paddingBottom: '30px',
    margin: '0 auto',
    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
        width: 'auto',  // 幅を30%に調整
        height: 'auto',
        flexDirection: 'column', // 横並びから縦並びに変更 
    },
    '@media (max-width: 768px)': { // スマートフォン向け
        width: 'auto',  // 幅を50%に調整
        height: 'auto',
        flexDirection: 'column', // 横並びから縦並びに変更
    },
    '@media (max-width: 480px)': { // より小さな画面向け
        width: 'auto',  // 幅を70%に調整
        height: 'auto',
        flexDirection: 'column', // 横並びから縦並びに変更 
    },


}


// トップ以外のボタン(バナー)
export const buttonStyles = {
    display: 'flex',
    margin: '20px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif', // フォント変更
    backgroundColor: '#8B3A2F',
    color: 'white',
    borderRadius: '50px', // ボタンを丸く
    border: "1px solid rgba(0, 0, 0, 0.1)",
    alignItems: 'center',
    fontSize: '1.3rem',  // フォントサイズを少し大きく
    padding: '18px 18px', // ボタンのパディング（大きさ調整）
    width: 'auto',  // 幅を統一
    height: '60px', // 高さを統一
    minWidth: '200px',
    lineHeight: '1.2',
    boxShadow: 'none !important', // 影を削除
    '&:hover': {
        backgroundColor: '#F24D3A',
        color: 'white',
    },
    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
        fontSize: '1.2rem',  // フォントサイズを少し小さく
        width: '50%',  // 幅を30%に調整
    },
    '@media (max-width: 768px)': { // スマートフォン向け
        fontSize: '1.2rem',  // フォントサイズをさらに小さく
        width: '60%',  // 幅を50%に調整
    },
    '@media (max-width: 480px)': { // より小さな画面向け
        fontSize: '1.2rem',  // フォントサイズを最小限に
        width: '70%',  // 幅を70%に調整
    },
};

// トップページ以外のバナー背景
export const navStyles = {
    display: "flex",
    boxShadow: 'none',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto", sans-serif', // フォント変更
    fontWeight: "bold",
    color: '#8B3A2F',
    textAlign: 'center',
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: '#D88F34',
    width: '90%',  // 幅を統一
    paddingTop: '10px',  // 重複を避けてここに設定
    paddingBottom: '10px',  // 重複を避けてここに設定
    margin: '0 auto', // 中央に配置
    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
        width: 'auto',  // 幅を30%に調整
        height: 'auto',
        flexDirection: 'column', // 横並びから縦並びに変更 
    },
    '@media (max-width: 768px)': { // スマートフォン向け
        width: 'auto',  // 幅を50%に調整
        height: 'auto',
        flexDirection: 'column', // 横並びから縦並びに変更
    },
    '@media (max-width: 480px)': { // より小さな画面向け
        width: 'auto',  // 幅を70%に調整
        height: 'auto',
        flexDirection: 'column', // 横並びから縦並びに変更 
    },
}

// トップページ以外の下の背景(トップページ色のみ直)
export const bigStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto", sans-serif', // フォント変更
    fontWeight: "bold",
    textAlign: 'center',
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderTop: "none",
    height: '100vh',
    margin: '0 auto', // 中央に配置
    backgroundColor: '#F5D19A',
    width: '90%',  // 幅を統一
    position: 'relative',  // 親コンテナにrelativeを追加


    // // レスポンシブ
    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
        padding: '35px 35px', // パディングを少し小さく
        width: 'auto',
        height: 'auto', // 高さを調整
    },
    '@media (max-width: 768px)': { // スマートフォン向け
        padding: '25px 25px', // パディングをさらに小さく
        width: 'auto',
        height: 'auto', // 高さを調整
    },
    '@media (max-width: 480px)': { // より小さな画面向け
        padding: '15px 15px', // パディングを最小限に
        width: 'auto',
        height: 'auto', // 高さを調整
    },

};

// // ダイアログのスタイル（成功メッセージ、失敗メッセージ用）
// const dialogStyle = {
//     position: 'absolute',  // 固定位置で表示
//     top: '50px',  // 上部から少し余白を取る
//     left: '50%',
//     transform: 'translateX(-50%)',  // 横方向の中央揃え
//     backgroundColor: 'white',  // 少し透過した白,
//     borderRadius: '10px',
//     padding: '20px',
//     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//     zIndex: 8,  // ダイアログを最前面に表示
//     width: '50%', // 幅の設定
//     maxWidth: '400px', // 最大幅を400pxに制限
//     textAlign: 'center',

//     // レスポンシブ対応
//     '@media (max-width: 768px)': {
//         width: '90%',  // スマートフォン向けに幅を調整
//         padding: '15px',  // パディングも調整
//     },
//     '@media (max-width: 480px)': {
//         width: '100%',  // より小さな画面では全幅に調整
//         maxWidth: 'none',  // 最大幅制限を解除
//         padding: '10px',  // パディング調整
//     },

// };

// // 成功メッセージのスタイル
// const successDialogStyle = {
//     ...dialogStyle,
//     color: '#8B3A2F',
// };

// // 失敗メッセージのスタイル
// const errorDialogStyle = {
//     ...dialogStyle,
//     color: 'red',
//     fontFamily: '"Roboto", sans-serif',
//     fontWeight: 'bold',

// };

// // 閉じるボタンのスタイルを登録ボタンに合わせる
// const closeButtonStyle = {
//     marginTop: '20px',
//     backgroundColor: '#8B3A2F',  // ボタンの色
//     color: 'white',  // ボタン文字色
//     padding: '10px 10px',
//     fontWeight: 'bold',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     fontSize: '16px',
//     width: '100%',
//     textAlign: 'center',
//     '&:hover': {
//         backgroundColor: '#D2691E',
//     },
// };

// // 成功・失敗メッセージ表示用のコンポーネント
// export const MyComponent = ({ successMessage, errorMessage, onClose }) => {
//     const message = successMessage || errorMessage;
//     const color = successMessage ? '#8B3A2F' : 'green';
//     return (
//         message && (
//             <Box
//                 sx={{
//                     position: 'absolute',
//                     top: '50px',
//                     left: '50%',
//                     transform: 'translateX(-50%)',
//                     backgroundColor: 'white',
//                     borderRadius: '20px',
//                     padding: '20px',
//                     boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
//                     zIndex: 8,
//                     width: '50%',
//                     maxWidth: '400px',
//                     textAlign: 'center',
//                     '@media (max-width: 768px)': { width: '90%', padding: '15px' },
//                     '@media (max-width: 480px)': { width: '100%', padding: '10px' },
//                 }}
//             >
//                 <Typography
//                     variant="h6"
//                     color={color}
//                     sx={{
//                         fontWeight: 'bold',
//                         fontSize: '1.5rem'
//                     }}>
//                     {message}
//                 </Typography>
//                 <Button
//                     onClick={() => {
//                         onClose();  // onCloseがフォームリセットを実行する
//                     }}
//                     variant="contained"
//                     color="primary"
//                     sx={{
//                         marginTop: '20px',
//                         backgroundColor: '#8B3A2F',
//                         color: 'white',
//                         padding: '8px 8px',
//                         fontWeight: 'bold',
//                         borderRadius: '50px',
//                         fontSize: '20px',
//                         width: '50%',
//                         '&:hover': { backgroundColor: '#D2691E' },
//                     }}
//                 >
//                     閉じる
//                 </Button>
//             </Box>
//         )
//     );
// };


// 選択項目
export const fieldItem = {
    display: 'flex',
    backgroundColor: 'white',
    borderRadius: '10px',
    fontFamily: '"Roboto", sans-serif',
    height: '55px',
    // padding: '4px',
    fontWeight: 'bold',
    alignItems: 'center',
    '& .MuiSelect-icon': {
        top: '50%',
        right: '8px',
        transform: 'translateY(-50%)',
    },
    // FormControlの枠線も消す
    '& .MuiSelect-root': {
        border: 'none', // 親要素の枠線を消す
    },
    // この部分が重要: outlineを消す
    '& .MuiSelect-outlined': {
        border: 'none', // Selectの枠線を消す
    },
    '& .MuiSelect-select': {
        textAlign: 'left', // 選択した文字を左揃え
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
        fontSize: '1.3rem',
    },
}

export const formFrame = {
    backgroundColor: 'white',
    borderRadius: '10px',
    fontFamily: '"Roboto", sans-serif',
    height: '45px',
    padding: '4px 12px',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            border: 'none'
        },
        '& input': {
            boxShadow: 'none',
            padding: '10px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
        },
    },
};

// メッセージ
export const messages = {
    top: '-80px', // 初期位置は上部外
    left: 0,
    right: 0,
    backgroundColor: 'white',
    color: '#8B3A2F',
    textAlign: 'center',
    padding: '20px 0', // パディングを大きくして高さを増す
    zIndex: 1000,
    height: '80px', // 高さを大きく設定
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', // テキストを中央に配置
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', // 少し影を付けて目立たせる
    animation: 'slideIn 1s ease-out, slideOut 1s ease-in 5s', // アニメーションを追加
}

// BookListボタンのスタイルを共通化する関数
export const getButtonStyles = (isActive) => ({
    backgroundColor: isActive ? '#F24D3A' : '#8B3A2F',
    color: 'white',
    borderRadius: '50px',
    fontSize: '1.1rem',
    padding: '12px 18px',
    width: '150px',
    height: '50px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: 'none',
    outline: 'none',
    border: 'none',
    '&:hover': {
        backgroundColor: '#D2691E ',
    },
    '&:active': {
        backgroundColor: '#D2691E ',
    },
    '&:focus': {
        outline: 'none',
    },
});

// テーブルタイトルのセルの設定
export const titleCells = {
    color: 'white',
    padding: '20px',
    textAlign: 'center',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    wordBreak: 'break-word'
};

// 内容のセルの設定
export const bodyCells = {
    color: '#8B3A2F',
    padding: '18px',
    textAlign: 'center',
    fontSize: '1.0rem',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
};





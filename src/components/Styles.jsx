import { display } from "@mui/system";

// トップのみボタンスタイル
export const buttonStyle_a = {
    margin: '20px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif', // フォント変更
    backgroundColor: '#003366',
    color: 'white',
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

// トップページのみボタン（タテ並び）
export const topButton = {
    display: "flex",
    boxShadow: 'none',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto", sans-serif',
    fontWeight: "bold",
    color: '#003366',
    textAlign: 'center',
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    height: '60px',
    backgroundColor: '#AEE0FF',
    width: '90%',
    paddingTop: '30px',
    paddingBottom: '30px',
    margin: '0 auto',

}


// トップ以外のボタン(バナー)
export const buttonStyles = {
    display: 'flex',
    margin: '20px',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif', // フォント変更
    backgroundColor: '#003366',
    color: 'white',
    borderRadius: '50px', // ボタンを丸く
    alignItems: 'center',
    fontSize: '1.3rem',  // フォントサイズを少し大きく
    padding: '18px 18px', // ボタンのパディング（大きさ調整）
    width: 'auto',  // 幅を統一
    height: '60px', // 高さを統一
    minWidth: '200px',
    lineHeight: '1.2',
    boxShadow: 'none !important', // 影を削除
    '&:hover': {
        backgroundColor: '#6495ED',
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
    color: '#003366',
    textAlign: 'center',
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    backgroundColor: '#ffffff',
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

// 下の背景
export const bigStyles = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: '"Roboto", sans-serif', // フォント変更
    fontWeight: "bold",
    color: '#003366',
    textAlign: 'center',
    borderRadius: "10px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    borderTop: "none",
    height: '100vh',
    margin: '0 auto', // 中央に配置
    backgroundColor: '#AEE0FF',
    width: '90%',  // 幅を統一
    '@media (max-width: 1024px)': { // タブレットや中型スクリーン向け
        padding: '35px 35px', // パディングを少し小さく
        width: 'auto',  // 幅を30%に調整
        height: 'auto', // 高さを調整
    },
    '@media (max-width: 768px)': { // スマートフォン向け
        padding: '25px 25px', // パディングをさらに小さく
        width: 'auto',  // 幅を50%に調整
        height: 'auto', // 高さを調整
    },
    '@media (max-width: 480px)': { // より小さな画面向け
        padding: '15px 15px', // パディングを最小限に
        width: 'auto',  // 幅を70%に調整
        height: 'auto', // 高さを調整
    },
};

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
    color: '#003366',
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
    backgroundColor: isActive ? '#6495ED' : '#003366',
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
        backgroundColor: '#6495ED',
    },
    '&:active': {
        backgroundColor: '#6495ED',
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
    color: '#003366',
    padding: '18px',
    textAlign: 'center',
    fontSize: '1.0rem',
    fontWeight: 'bold',
    fontFamily: '"Roboto", sans-serif',
    whiteSpace: 'normal',
    wordWrap: 'break-word',
    wordBreak: 'break-word',
};
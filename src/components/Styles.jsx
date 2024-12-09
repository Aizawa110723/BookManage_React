import { ForkLeft, MarginTwoTone } from "@mui/icons-material";
import { fontSize, textAlign, width } from "@mui/system";

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

// リストの項目
export const listIcon = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: '10px',
    padding: '10px',
    border: '2px solid #cccccc',
    borderRadius: '50px',
    position: 'relative',  // 位置を調整するためにrelativeを追加

    // メディアクエリでレスポンシブデザイン対応
    '@media (max-width: 1200px)': {
        // 中くらいのデバイス（例: タブレット）
        padding: '8px', // パディングを少し小さくする
        marginBottom: '8px', // 各アイテムの間隔を縮める
        marginLeft: '0', // モバイルビューでは左右のマージンをリセット
        // flexDirection: 'column',  // 小さい画面では縦並びに
        alignItems: 'center', // 左揃えに
        width: '100%',  // 横幅を100%に設定して伸ばす
        left: 'auto',
    },
    '@media (max-width: 900px)': {
        // 小さめのデバイス（例: モバイル）
        padding: '6px', // パディングをさらに小さく
        marginBottom: '6px', // アイテム間の間隔をさらに縮める
        // flexDirection: 'column', // 項目を縦並びに変更
        alignItems: 'center', // 左揃えにする
        width: '100%',
        left: 'auto',  // 横幅を100%に設定して伸ばす
    },
    '@media (max-width: 600px)': {
        // モバイル表示でさらに小さく
        padding: '4px', // パディングをさらに小さくする
        marginBottom: '4px', // アイテム間の間隔を縮める
        fontSize: '14px', // フォントサイズを小さくする
        marginLeft: '0', // モバイルビューでは左右のマージンをリセット
        flexDirection: 'column',  // 小さい画面では縦並びに
        alignItems: 'flex-start', // 左揃えに
        width: '100%'  // 横幅を100%に設定して伸ばす
    },

};
# [経験値増減アイテム、スキル](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ExpItem.js)
# Ver.1.2.1
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_ExpItem.js)

経験値を増減させるアイテムやスキルを作ることが出来ます。

## 経験値増減アイテム、スキルの設定
アイテム、スキルのメモ欄  
`<ExpIncrease:[exp]>` 経験値を増減させます。  
`<ExpIncrease:10000>` 経験値が10000増加します。  
`<ExpIncrease:-5000>` 経験値が5000減少します。  
`<levelUpStop>` 次のレベルに上がるまで経験値が増加します。  
`<NolevelDown>` 現在のレベルの経験値が0になるまで経験値が減少します。  

## メッセージフォーマット
経験値増加時減少時のメッセージ  
%1:使用者 %2：対象者 %3：経験値  
効果なしの時のメッセージ  
%1:使用者 %2：対象者  

## 更新履歴
2021/12/13 Ver 1.2.1  
経験値が正常に加算されない問題を修正。  
2021/12/6 Ver 1.2.0  
メッセージのフォーマットを変更。  
 最大レベルの時に経験値を増加させたときに経験値が減ってしまう問題を修正。  
2021/5/2 Ver 1.1.1  
効果がなかった時のメッセージログを追加。  
2020/12/24 Ver 1.1.0  
使用時のバトルログをメッセージウィンドウに表示する機能を追加。  
2020/12/8 Ver 1.0.3  
最大レベルの累計必要経験値超えて取得してしまう不具合を修正。  
2020/11/22 Ver 1.0.2  
バトルログに表示するように対応。  
2020/11/21 Ver 1.0.1  
レベルが１上がったら経験値の増加をしない機能と、経験値減少時にレベルダウンをしない機能を追加。  
2020/11/21 Ver 1.0.0  
初版  

  

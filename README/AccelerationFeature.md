# [能力値ターン毎増減特徴](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AccelerationFeature.js)
# Ver.2.0.0
[ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_AccelerationFeature.js)  

ターンごとに徐々に通常能力値が上昇していく特徴を設定できます。

## 設定方法
特徴を有するメモ欄  
`<Accelerationb[paramId]:[rate]>` ターン終了時に[]paramId]の能力値が[rate]%ずつ上昇（減少）します。  
`[paramId]`:能力値　0:最大HP 1:最大MP 2:攻撃力 3:防御力 4:魔法力 5:魔法防御 6:敏捷性 7:運  
`[rate]`:増加率　ターンごとに増加率が加算されます。  
`<Accelerationb6:10>` ターンごとに敏捷性が10%ずつ上昇します。  
取得する増加率値がない場合はリセットされます。  

特徴　敏捷性　ターンごとに10% 及び 15%  
能力値 *= 加算率 + (10 + 15) / 100  
初回ターンの加算率は1倍  
2ターンの加算率は1.25倍  
3ターンの加算率は1.5倍  

## 更新履歴
2022/1/25 Ver.2.0.0  
全ての能力値に対応。  
経過ターンの処理を別プラグイン化。  
ステートでの経過ターンを付与してからのターンに変更。  
2021/8/10 Ver.1.0.1  
アクターのTPBが進行しない問題を修正。  
2021/8/9 Ver.1.0.0  
初版  

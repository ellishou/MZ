# [レベル上限限界突破](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LevelUnlimited.js)
# Ver.1.1.0  
 [ダウンロード](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_LevelUnlimited.js)

アクターのレベルの最大値を１００以上にすることができます。  

### 最大レベルの設定
アクターのメモ欄  
`<MaxLevel:[maxlevel]>` 最大レベルを設定します。  
`<MaxLevel:200>` 最大レベルが200になります。  

`<StartLevel:[level]>` 加入時の初期レベルを設定します。  
`<StartLevel:120>` 加入時のレベルが120になります。  

### レベル１００以上でのスキル習得設定
データベース上ではレベル９９まで設定できませんが、習得スキルのメモ欄に以下を記入します。  
`<LearnSkill:[Learnlevel]>` 習得レベルを設定します。  
`<LearnSkill:153>` 設定のスキルをレベル153で習得します。  
上記のタグを記入した場合、データベース上で設定している習得するスキルのレベルは無視されます。  

## 更新履歴
2021/6/27 Ver 1.1.0  
初期レベルをレベル１００以上に設定できる機能を追加。  
2020/12/12 Ver 1.0.1  
レベル１００以上のステータスの計算が間違っていたのを修正。  
2020/12/12 Ver 1.0.0  
初版  

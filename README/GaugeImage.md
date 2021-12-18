# [ゲージ画像化](https://raw.githubusercontent.com/nuun888/MZ/master/NUUN_GaugeImage.js)
# Ver.1.3.0

ゲージを画像化します。  

![画像](img/GaugeImage4.png)  

## 設定方法
### 共通設定
#### ゲージ画像
メインゲージ画像に画像を設定します。

#### 表示オフセット位置X
画像のX座標を調整します。

#### 表示オフセット位置Y
画像のY座標を調整します。

#### 画像トリミング横幅
画像を表示する範囲横幅を指定します。

#### 画像トリミング高さ
画像を表示する範囲高さを指定します。

#### 画像トリミング座標X
画像の表示する開始X地点を指定します。

#### 画像のトリミング座標Y
画像の表示する開始Y地点を指定します。

### メインゲージ画像
メインとなるゲージを設定します。
#### 補正幅
メインゲージの画像の幅を補正します。元の画像範囲から補正されます。
ゲージ幅引き伸ばしではゲージの幅がはみ出る場合に設定します。

#### 満タン時ゲージ画像切り替え
対象のパラメータが満タンの時に画像を切り替えます。

#### 満タン時メインゲージ画像
満タン時にメインゲージから切り替える画像を設定します。画像無指定の場合はメインゲージ画像が設定されます。

#### 特定条件下ゲージ画像切り替え
対象のパラメータが特定条件下の時に画像を切り替えます。

#### 特定条件下メインゲージ画像
特定条件下にメインゲージから切り替える画像を設定します。画像無指定の場合はメインゲージ画像が設定されます。

### 背後ゲージ画像
ゲージの一番後ろに表示する画像を設定します。無指定の場合はメインゲージ画像が設定されます。
表示しない場合は

### 前面ゲージ画像
ゲージの一番前に表示する画像を設定します。無指定の場合はメインゲージ画像が設定されます。
表示しない場合は

### ラベル画像設定
#### ラベル画像
ラベルの画像を設定します。

### ゲージ幅引き伸ばし

### 傾斜率

## 更新履歴
2021/10/4 Ver.1.3.0  
最大時の画像を設定できる機能を追加。  
溺死、キャストタイム中のゲージの画像が、特定条件の画像設定をしていなかった場合反映しなかった問題を修正。  
2021/9/24 Ver.1.2.0  
ラベルを画像化する機能を追加。  
画像を１枚にまとめなくとも表示できるように修正。  
画像が重複して表示されてしまう問題を修正。  
2021/9/22 Ver.1.1.1  
メインゲージが正常に表示されない問題を修正。  
2021/9/20 Ver.1.1.0  
フィルタリング機能を追加。  
ゲージの前面に画像を表示出来る機能を追加。  
2021/9/20 Ver.1.0.1  
当プラグインに対応していないゲージで、ゲージが表示されない問題を修正。  
2021/9/20 Ver.1.0.0  
初版  
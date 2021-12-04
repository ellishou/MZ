/*:-----------------------------------------------------------------------------------
 * NUUN_GaugeValueEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */ 
/*:
 * @target MZ
 * @plugindesc ゲージ表示拡張
 * @author NUUN
 * @version 1.0.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ゲージの表示を拡張します。
 * このプラグインでは以下の機能を拡張します。
 * ゲージの非表示
 * 数値の表示方法
 * 数値、ラベルのフォント、色変更
 * 数値、ラベルの座標変更
 * 最大時、特定の割合以下でのゲージの色変更
 * 
 * ゲージ数値表示形式の仕様
 * timeは数値が表示されません。
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/12/5 Ver.1.0.1
 * 現在値/最大値が右揃えになるように修正。
 * HP以外の特定割合以下でのゲージが適用されていなかった問題を修正。
 * 最大時、特定割合以下での数値の色が適用されていなかった問題を修正。
 * ラベルのX座標が適用されていなかった問題を修正。
 * 一部の処理を修正。
 * 2021/12/4 Ver.1.0.0
 * 初版
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param ValueDigits
 * @desc ゲージ数値表示形式が現在値/最大値の数値の表示幅。
 * @text 数値の表示幅
 * @type string
 * @default '0000'
 * @parent CommonSetting
 * 
 * @param DefaultGaugeVisible
 * @desc デフォルトのゲージを表示、非表示を設定します。
 * @text デフォルトゲージ表示
 * @type boolean
 * @default true
 * @parent CommonSetting
 * 
 * @param DefaultGaugeHeight
 * @desc デフォルトのゲージの高さ。
 * @text デフォルトゲージ高さ
 * @type number
 * @default 10
 * @min 1
 * @parent CommonSetting
 * 
 * @param DefaultValueFontSize
 * @desc デフォルトの現在数値のフォントサイズ。（メインフォントサイズから）
 * @text デフォルト現在数値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent CommonSetting
 * 
 * @param DefaultMaxValueFontSize
 * @desc デフォルトの最大値のフォントサイズ。（メインフォントサイズから）
 * @text デフォルト最大値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent CommonSetting
 * 
 * @param DefaultSeparationFontSize
 * @desc /のフォントサイズ。（メインフォントサイズから）
 * @text /フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent CommonSetting
 * 
 * @param DefaultLabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントサイズから）
 * @text ラベルフォントサイズ
 * @type number
 * @default -2
 * @min -9999
 * @parent CommonSetting
 * 
 * @param ValueVisibleType
 * @text ゲージ設定
 * @desc ゲージ設定
 * @type struct<ValueGauge>[]
 * @default ["{\"Type\":\"[\\\"'hp'\\\"]\",\"ValueVisible\":\"'ValueMaxValue'\",\"GaugeVisible\":\"true\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"ValueColor\":\"0\",\"MaxValueFontSize\":\"-6\",\"MaxValueColor\":\"0\",\"SeparationFontSize\":\"-6\",\"SeparationColor\":\"0\",\"LabelFontSize\":\"-2\",\"LabelColor\":\"16\",\"CoordinateSetting\":\"------------------------------\",\"GaugeX\":\"-1\",\"GaugeY\":\"12\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"ValueMargin\":\"32\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"20\",\"GaugeColor2\":\"21\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"0\",\"MaxGaugeColor2\":\"0\",\"MaximumValueColor\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\",\"RatioValueColor\":\"0\"}","{\"Type\":\"[\\\"'mp'\\\"]\",\"ValueVisible\":\"'ValueMaxValue'\",\"GaugeVisible\":\"true\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"ValueColor\":\"0\",\"MaxValueFontSize\":\"-6\",\"MaxValueColor\":\"0\",\"SeparationFontSize\":\"-6\",\"SeparationColor\":\"0\",\"LabelFontSize\":\"-2\",\"LabelColor\":\"16\",\"CoordinateSetting\":\"------------------------------\",\"GaugeX\":\"-1\",\"GaugeY\":\"12\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"ValueMargin\":\"32\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"22\",\"GaugeColor2\":\"23\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"-1\",\"MaxGaugeColor2\":\"-1\",\"MaximumValueColor\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\",\"RatioValueColor\":\"0\"}","{\"Type\":\"[\\\"'tp'\\\"]\",\"ValueVisible\":\"'Value'\",\"GaugeVisible\":\"true\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"ValueColor\":\"0\",\"MaxValueFontSize\":\"-6\",\"MaxValueColor\":\"0\",\"SeparationFontSize\":\"-6\",\"SeparationColor\":\"0\",\"LabelFontSize\":\"-2\",\"LabelColor\":\"16\",\"CoordinateSetting\":\"------------------------------\",\"GaugeX\":\"-1\",\"GaugeY\":\"12\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"ValueMargin\":\"0\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"28\",\"GaugeColor2\":\"29\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"-1\",\"MaxGaugeColor2\":\"-1\",\"MaximumValueColor\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\",\"RatioValueColor\":\"0\"}","{\"Type\":\"[\\\"'time'\\\"]\",\"ValueVisible\":\"'Value'\",\"GaugeVisible\":\"true\",\"FontSetting\":\"------------------------------\",\"ValueFontSize\":\"-6\",\"ValueColor\":\"0\",\"MaxValueFontSize\":\"-6\",\"MaxValueColor\":\"0\",\"SeparationFontSize\":\"-6\",\"SeparationColor\":\"0\",\"LabelFontSize\":\"-2\",\"LabelColor\":\"16\",\"CoordinateSetting\":\"------------------------------\",\"GaugeX\":\"-1\",\"GaugeY\":\"12\",\"LabelX\":\"0\",\"LabelY\":\"3\",\"ValueX\":\"0\",\"ValueY\":\"0\",\"ValueMargin\":\"0\",\"GaugeColorSetting\":\"------------------------------\",\"GaugeColor1\":\"26\",\"GaugeColor2\":\"27\",\"GaugeColorMaxSetting\":\"------------------------------\",\"GaugeColorMaxApply\":\"false\",\"MaxGaugeColor1\":\"-1\",\"MaxGaugeColor2\":\"-1\",\"MaximumValueColor\":\"0\",\"GaugeColorRatioSetting\":\"------------------------------\",\"GaugeColorRatioApply\":\"false\",\"RatioGauge\":\"0\",\"RatioGaugeColor1\":\"0\",\"RatioGaugeColor2\":\"0\",\"RatioValueColor\":\"0\"}"]
 * @parent CommonSetting
 * 
 */
/*~struct~ValueGauge:
 * 
 * @param Type
 * @text 表示対象
 * @desc 表示ステータスタイプ対象
 * @type combo[]
 * @option 'hp'
 * @option 'mp'
 * @option 'tp'
 * @option 'time'
 * @option 'limit'
 * @default 
 * 
 * @param ValueVisible
 * @desc ゲージ数値表示形式を指定します。
 * @text ゲージ数値表示形式
 * @type select
 * @option 現在値のみ
 * @value 'Value'
 * @option 現在値/最大値
 * @value 'ValueMaxValue'
 * @option 表示なし
 * @value 'NoValue'
 * @default 'Value'
 * 
 * @param GaugeVisible
 * @desc ゲージを表示する。
 * @text ゲージ表示
 * @type boolean
 * @default true
 * 
 * @param FontSetting
 * @text フォント設定
 * @default ------------------------------
 * 
 * @param ValueFontSize
 * @desc 現在数値のフォントサイズ。（メインフォントサイズから）
 * @text 現在数値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param ValueColor
 * @desc 通常時の現在数値の色。テキストタブでカラーコードを入力できます。
 * @text 現在数値色
 * @type number
 * @default 0
 * @min 0
 * @parent FontSetting
 * 
 * @param MaxValueFontSize
 * @desc 最大値のフォントサイズ。（メインフォントサイズから）
 * @text 最大値フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param MaxValueColor
 * @desc 最大値の色。テキストタブでカラーコードを入力できます。
 * @text 最大値色
 * @type number
 * @default 0
 * @min 0
 * @parent FontSetting
 * 
 * @param SeparationFontSize
 * @desc /のフォントサイズ。（メインフォントサイズから）
 * @text /フォントサイズ
 * @type number
 * @default -6
 * @min -9999
 * @parent FontSetting
 * 
 * @param SeparationColor
 * @desc /の色。テキストタブでカラーコードを入力できます。
 * @text /色
 * @type number
 * @default 0
 * @min 0
 * @parent FontSetting
 * 
 * @param LabelFontSize
 * @desc ラベルのフォントサイズ。（メインフォントサイズから）
 * @text ラベルフォントサイズ
 * @type number
 * @default -2
 * @min -9999
 * @parent FontSetting
 * 
 * @param LabelColor
 * @desc ラベルの色。テキストタブでカラーコードを入力できます。
 * @text ラベル色
 * @type number
 * @default 16
 * @min 0
 * @parent FontSetting
 * 
 * @param CoordinateSetting
 * @text 座標設定
 * @default ------------------------------
 * 
 * @param GaugeX
 * @desc ゲージの左端の開始X座標。(-1でラベル分シフトします)
 * @text ゲージ開始X座標
 * @type number
 * @default -1
 * @min -1
 * @parent CoordinateSetting
 * 
 * @param GaugeY
 * @desc ゲージのY座標。
 * @text ゲージY座標
 * @type number
 * @default 12
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param LabelX
 * @desc ラベルのX座標。
 * @text ラベルX座標
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param LabelY
 * @desc ラベルのY座標。
 * @text ラベルY座標
 * @type number
 * @default 3
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueX
 * @desc 数値のX座標。
 * @text 数値X座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueY
 * @desc 数値のY座標。
 * @text 数値Y座標
 * @type number
 * @default 0
 * @min -9999
 * @parent CoordinateSetting
 * 
 * @param ValueMargin
 * @desc 左側の数値の余白を指定します。ゲージの表示横幅は余白分差し引かれます。
 * @text 数値の余白
 * @type number
 * @default 0
 * @min 0
 * @parent CoordinateSetting
 * 
 * @param GaugeColorSetting
 * @text ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColor1
 * @desc ゲージの色１（テキストタブからカラーコードを入力できます）
 * @text ゲージ色１
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorSetting
 * 
 * @param GaugeColor2
 * @desc ゲージの色２（テキストタブからカラーコードを入力できます）
 * @text ゲージ色２
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorSetting
 * 
 * @param GaugeColorMaxSetting
 * @text 最大時ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColorMaxApply
 * @desc 最大時のゲージ、数値の色変更を適用する。
 * @text 最大時ゲージ、数値色変更適用
 * @type boolean
 * @default false
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor1
 * @desc 最大時のゲージの色１
 * @text 最大時ゲージ色１
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param MaxGaugeColor2
 * @desc 最大時のゲージの色２
 * @text 最大時ゲージ色２
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param MaximumValueColor
 * @desc 最大時の現在数値の色。テキストタブでカラーコードを入力できます。
 * @text 最大時現在数値色
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorMaxSetting
 * 
 * @param GaugeColorRatioSetting
 * @text 特定割合以下時ゲージ設定
 * @default ------------------------------
 * 
 * @param GaugeColorRatioApply
 * @desc 変化する残り割合時のゲージ、数値の色変更を適用する。
 * @text 変化残り割合時ゲージ、数値色変更適用
 * @type boolean
 * @default false
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGauge
 * @desc 変化する残り割合を百分率で指定します。HPの場合0を指定することで瀕死時に適用されます。
 * @text 変化残り割合%
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor1
 * @desc 特定割合以下のゲージの色１。テキストタブでカラーコードを入力できます。
 * @text 特定割合以下ゲージ色１
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioGaugeColor2
 * @desc 特定割合以下のゲージの色２。テキストタブでカラーコードを入力できます。
 * @text 特定割合以下ゲージ色２
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 * @param RatioValueColor
 * @desc 特定割合以下時の現在数値の色。テキストタブでカラーコードを入力できます。
 * @text 特定割合以下時現在数値色
 * @type number
 * @default 0
 * @min 0
 * @parent GaugeColorRatioSetting
 * 
 */
var Imported = Imported || {};
Imported.NUUN_GaugeValueEX = true;

(() => {
  const parameters = PluginManager.parameters('NUUN_GaugeValueEX');
  const ValueDigits = String(parameters['ValueDigits'] || '0000');
  const DefaultGaugeVisible = eval(parameters['DefaultGaugeVisible'] || 'true');
  const DefaultGaugeHeight = Number(parameters['DefaultLabelHeight'] || 12);
  const DefaultValueFontSize = Number(parameters['DefaultValueFontSize'] || -6);
  const DefaultMaxValueFontSize = Number(parameters['DefaultMaxValueFontSize'] || -6);
  const DefaultSeparationFontSize = Number(parameters['DefaultSeparationFontSize'] || -6);
  const DefaultLabelFontSize = Number(parameters['DefaultLabelFontSize'] || -2);
  const ValueVisibleType = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['ValueVisibleType'])) : null) || [];
  let GaugeTextColor = null;

  const _Sprite_Gauge_initMembers = Sprite_Gauge.prototype.initMembers;
  Sprite_Gauge.prototype.initMembers = function() {
    _Sprite_Gauge_initMembers.call(this);
    this._gaugeData = null;
    this._valueTextWidth = 0;
    this._isGaugeData = false;
  };

  const _Sprite_Gauge_setup = Sprite_Gauge.prototype.setup;
  Sprite_Gauge.prototype.setup = function(battler, statusType) {
    this.initGaugeData(statusType);
    _Sprite_Gauge_setup.call(this, battler, statusType);
    this._valueTextWidth = this.setValueTextWidth();
  };

  Sprite_Gauge.prototype.initGaugeData = function(statusType) {
    this._gaugeData = this.isValueVisibleType(statusType);
    this._isGaugeData = true;
  };

  Sprite_Gauge.prototype.isValueVisibleType = function(statusType) {
    return ValueVisibleType.find(type => type.Type[0] === statusType);
  };

  Sprite_Gauge.prototype.gaugeHeight = function() {//再定義
    return DefaultGaugeHeight;
  };

  Sprite_Gauge.prototype.isGaugeData = function() {
    if (this._isGaugeData) {
      return this._isGaugeData;
    }
    this.initGaugeData(this._statusType);
    return this._isGaugeData;
  };

  Sprite_Gauge.prototype.setValueTextWidth = function() {
    if (!this._valueTextWidth) {
      this._valueTextWidth = this.bitmap.measureTextWidth(ValueDigits);
    }
  };

  Sprite_Gauge.prototype.gaugeVisible = function() {
    return this._isGaugeData ? this._gaugeData.GaugeVisible : DefaultGaugeVisible;
  };

  Sprite_Gauge.prototype.valueFontSize  = function() {//再定義
    return $gameSystem.mainFontSize() + (this._gaugeData ? this._gaugeData.ValueFontSize : DefaultValueFontSize);
  };

  Sprite_Gauge.prototype.maxValueFontSize  = function() {
    return $gameSystem.mainFontSize() + (this._gaugeData ? this._gaugeData.MaxValueFontSize : DefaultMaxValueFontSize);
  };

  Sprite_Gauge.prototype.separationFontSize  = function() {
    return $gameSystem.mainFontSize() + (this._gaugeData ? this._gaugeData.SeparationFontSize : DefaultSeparationFontSize);
  };

  Sprite_Gauge.prototype.labelFontSize = function() {//再定義
    return $gameSystem.mainFontSize() + (this._gaugeData ? this._gaugeData.LabelFontSize : DefaultLabelFontSize);
  };

  const _Sprite_Gauge_valueColor = Sprite_Gauge.prototype.valueColor;
  Sprite_Gauge.prototype.valueColor = function() {
    if (this._isGaugeData) {
      GaugeTextColor = this.changeValueColor();
    }
    const color = _Sprite_Gauge_valueColor.call(this);
    GaugeTextColor = null;
    return color;
  };

  Sprite_Gauge.prototype.changeValueColor = function() {
    if (this._gaugeData.GaugeColorMaxApply && this.currentMaxValue() === this.currentValue()) {
      return this._gaugeData.MaximumValueColor;
    } else if (this._gaugeData.GaugeColorRatioApply && this._statusType === 'hp' && this.getGaugeHpRatio()) {
      return this._gaugeData.RatioValueColor;
    } else if (this._gaugeData.GaugeColorRatioApply && this.isRatioGauge()) {
      return this._gaugeData.RatioValueColor;
    }
    return this._gaugeData.ValueColor;
  };

  Sprite_Gauge.prototype.maxValueColor  = function() {
    return this._isGaugeData ? getColorCode(this._gaugeData.MaxValueColor) : ColorManager.textColor(0);
  };

  Sprite_Gauge.prototype.separationColor  = function() {
    return this._isGaugeData ? getColorCode(this._gaugeData.SeparationColor) : ColorManager.textColor(0);
  };

  const _Sprite_Gauge_labelColor = Sprite_Gauge.prototype.labelColor;
  Sprite_Gauge.prototype.labelColor = function() {
    return this._isGaugeData ? getColorCode(this._gaugeData.LabelColor) : _Sprite_Gauge_labelColor.call(this);
  };

  Sprite_Gauge.prototype.isRatioGauge = function() {
    return this._battler.isAlive() && this._hp < this.mhp * this._gaugeData.RatioGauge / 100;
  };

  const _Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
  Sprite_Gauge.prototype.gaugeColor1 = function() {
    if (this._isGaugeData) {
      return getColorCode(this.changeGaugeColor1())
    }
    return _Sprite_Gauge_gaugeColor1.call(this);
  };

  const _Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
  Sprite_Gauge.prototype.gaugeColor2 = function() {
    if (this._isGaugeData) {
      return getColorCode(this.changeGaugeColor2())
    }
    return _Sprite_Gauge_gaugeColor2.call(this);
  };

  Sprite_Gauge.prototype.getGaugeHpRatio = function() {
    if (this._gaugeData.RatioGauge === 0) {
      return this._battler.isDying();
    } else {
      return this.isRatioGauge();
    }
  };

  Sprite_Gauge.prototype.changeGaugeColor1 = function() {
    if (this._gaugeData.GaugeColorMaxApply && this.currentMaxValue() === this.currentValue()) {
      return this._gaugeData.MaxGaugeColor1;
    } else if (this._gaugeData.GaugeColorRatioApply && this._statusType === 'hp' && this.getGaugeHpRatio()) {
      return this._gaugeData.RatioGaugeColor1;
    } else if (this._gaugeData.GaugeColorRatioApply && this.isRatioGauge()) {
      return this._gaugeData.RatioGaugeColor1;
    }
    return this._gaugeData.GaugeColor1;
  };

  Sprite_Gauge.prototype.changeGaugeColor2 = function() {
    if (this._gaugeData.GaugeColorMaxApply && this.currentMaxValue() === this.currentValue()) {
      return this._gaugeData.MaxGaugeColor2;
    } else if (this._gaugeData.GaugeColorRatioApply && this._statusType === 'hp' && this.getGaugeHpRatio()) {
      return this._gaugeData.RatioGaugeColor2;
    } else if (this._gaugeData.GaugeColorRatioApply && this.isRatioGauge()) {
      return this._gaugeData.RatioGaugeColor1;
    }
    return this._gaugeData.GaugeColor2;
  };

  const _Sprite_Gauge_drawGauge = Sprite_Gauge.prototype.drawGauge;
  Sprite_Gauge.prototype.drawGauge = function() {
    if (this._isGaugeData) {
      _Sprite_Gauge_drawGauge.call(this);
    }
  };

  const _Sprite_Gauge_gaugeX = Sprite_Gauge.prototype.gaugeX;
  Sprite_Gauge.prototype.gaugeX = function() {
    return this._isGaugeData && this._gaugeData.GaugeX >= 0 ? this._gaugeData.GaugeX : _Sprite_Gauge_gaugeX.call(this);
  };

  Sprite_Gauge.prototype.gaugeY = function() {
    return this._gaugeData.GaugeY;
  };

  Sprite_Gauge.prototype.labelX = function() {
    return this._gaugeData.LabelX;
  };

  const _Sprite_Gauge_labelY = Sprite_Gauge.prototype.labelY;
  Sprite_Gauge.prototype.labelY = function() {
    return this._isGaugeData ? this._gaugeData.LabelY : _Sprite_Gauge_labelY.call(this);
  };

  Sprite_Gauge.prototype.valueX = function() {
    return this._gaugeData.ValueX;
  };

  Sprite_Gauge.prototype.valueY = function() {
    return this._gaugeData.ValueY;
  };

  const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
  Sprite_Gauge.prototype.drawValue = function() {//再定義
    if (this._isGaugeData) {
      if (this._gaugeData.ValueVisible === 'ValueMaxValue') {
        this.drawValueMaxValue();
      } else if (this._gaugeData.ValueVisible === 'Value') {
        this.drawValue2(); 
      } else if (this._gaugeData.ValueVisible === 'NoValue') {

      }
    } else {
      _Sprite_Gauge_drawValue.call(this);
    }
  };

  Sprite_Gauge.prototype.drawValue2 = function() {
    const currentValue = this.currentValue();
    const width = this.bitmapWidth();
    const height = this.textHeight();
    this.setupValueFont();
    this.bitmap.drawText(currentValue, this.valueX(), this.valueY(), width, height, "right");
  };

  Sprite_Gauge.prototype.drawValueMaxValue = function() {
    this.setValueTextWidth();
    const currentValue = this.currentValue();
    const currentMaxValue = this.currentMaxValue();
    const bitmapWidth = this.bitmapWidth();
    const ValueMarginX = this._gaugeData.ValueMargin + 6;
    const ValueY = this.valueY();
    const width = (this.bitmapWidth() - ValueMarginX) / 2 - 8;
    const height = this.textHeight();
    const textWidth = Math.min(this._valueTextWidth, width);
    const ValueX = bitmapWidth - (textWidth * 2 + 16);
    this.setupValueFont();
    this.bitmap.fontSize = this.valueFontSize();
    this.bitmap.drawText(currentValue, ValueX, ValueY, textWidth, height, "right");
    this.bitmap.fontSize = this.separationFontSize();
    this.bitmap.textColor = this.separationColor();
    this.bitmap.drawText('/', ValueX + textWidth, ValueY, 16, height, "center");
    this.bitmap.fontSize = this.maxValueFontSize();
    this.bitmap.textColor = this.maxValueColor();
    this.bitmap.drawText(currentMaxValue, ValueX + textWidth + 16, ValueY, textWidth, height, "right");
  };

  Sprite_Gauge.prototype.drawGauge = function() {//再定義
    const gaugeX = this.gaugeX();
    const gaugeY = this._gaugeData ? this.gaugeY() : this.textHeight() - this.gaugeHeight();
    const gaugewidth = this.bitmapWidth() - gaugeX;
    const gaugeHeight = this.gaugeHeight();
    this.drawGaugeRect(gaugeX, gaugeY, gaugewidth, gaugeHeight);
  };

  Sprite_Gauge.prototype.drawLabel = function() {//再定義
    const label = this.label();
    const x = this._isGaugeData ? this.labelX() : this.labelOutlineWidth() / 2;
    const y = this.labelY();
    const width = this.bitmapWidth();
    const height = this.textHeight();
    this.setupLabelFont();
    this.bitmap.paintOpacity = this.labelOpacity();
    this.bitmap.drawText(label, x, y, width, height, "left");
    this.bitmap.paintOpacity = 255;
  };

  const _ColorManager_normalColor = ColorManager.normalColor;
  ColorManager.normalColor = function() {
    return GaugeTextColor ? getColorCode(GaugeTextColor) : _ColorManager_normalColor.call(this);
  };

  function getColorCode(color) {
    if (typeof(color) === "string") {
      return color;
    }
    return ColorManager.textColor(color);
  };

})();
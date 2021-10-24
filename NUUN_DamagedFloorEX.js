/*:-----------------------------------------------------------------------------------
 * NUUN_DamagedFloorEX.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 */
/*:
 * @target MZ
 * @plugindesc  ダメージ床拡張
 * @author NUUN
 * @version 1.0.2
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * ダメージ床のダメージ時の処理を拡張します。
 * リージョン設定を0にすることでリージョンを指定していないマップタイルで適用されます。
 * 
 * 床ダメージ値は評価式が使用できます。
 * a：アクター
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/10/24 Ver.1.0.2
 * 床ダメージを評価式が使用できるように変更。
 * 2021/10/24 Ver.1.0.1
 * デフォルトの床ダメージ、床ダメージ時のSEを指定できる機能を追加。
 * 2021/10/24 Ver.1.0.0
 * 初版
 * 
 * @param DamagedFloorList
 * @text ダメージ床設定
 * @desc ダメージ床設定
 * @type struct<DamagedFloorData>[]
 * @default ["{\"TileSetId\":\"4\",\"DamagedFloorRegion\":\"[\\\"{\\\\\\\"RegionId\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"Damage\\\\\\\":\\\\\\\"10\\\\\\\",\\\\\\\"SE\\\\\\\":\\\\\\\"------------------------------\\\\\\\",\\\\\\\"DamagedFloorSE\\\\\\\":\\\\\\\"Poison\\\\\\\",\\\\\\\"volume\\\\\\\":\\\\\\\"90\\\\\\\",\\\\\\\"pitch\\\\\\\":\\\\\\\"100\\\\\\\",\\\\\\\"pan\\\\\\\":\\\\\\\"50\\\\\\\"}\\\"]\"}"]
 * 
 * @param DamagedFloorFlash
 * @text フラッシュ有効
 * @desc ダメージ時のフラッシュを有効にする。
 * @type boolean
 * @default false
 * 
 * @param DefaultDamage
 * @text デフォルトダメージ
 * @desc デフォルト床ダメージ時のダメージ（a：アクター）
 * @type string
 * @default 10
 * 
 * @param DefaultSE
 * @text デフォルトのSE設定
 * @default ------------------------------
 * 
 * @param DefaultDamagedFloorSE
 * @text デフォルト床ダメージ時SE
 * @desc デフォルトの床ダメージ時のSE
 * @type file
 * @dir audio/se/
 * @parent DefaultSE
 * 
 * @param DefaultVolume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent DefaultSE
 * 
 * @param DefaultPitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent DefaultSE
 * 
 * @param DefaultPan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * @parent DefaultSE
 * 
 */
/*~struct~DamagedFloorData:
 * 
 * @param TileSetId
 * @text タイルセットID
 * @desc タイルセットID
 * @type tileset
 * @default 0
 * 
 * @param DamagedFloorRegion
 * @text ダメージ床リージョン設定
 * @desc ダメージ床リージョン設定
 * @type struct<DamagedFloorRegionData>[]
 * @default []
 * 
 * 
 */
/*~struct~DamagedFloorRegionData:
 * 
 * @param RegionId
 * @text リージョンID
 * @desc リージョンID
 * @type number
 * @default 0
 * 
 * @param Damage
 * @text ダメージ
 * @desc 床ダメージ時のダメージ（a：アクター）
 * @type string
 * @default 10
 * 
 * @param SE
 * @text SE設定
 * @default ------------------------------
 * 
 * @param DamagedFloorSE
 * @text 床ダメージ時SE
 * @desc 床ダメージ時のSE
 * @type file
 * @dir audio/se/
 * @parent SE
 * 
 * @param volume
 * @text 音量
 * @desc 音量。
 * @type number
 * @default 90
 * @parent SE
 * 
 * @param pitch
 * @text ピッチ
 * @desc ピッチ。
 * @type number
 * @default 100
 * @parent SE
 * 
 * @param pan
 * @text 位相
 * @desc 位相。
 * @type number
 * @default 50
 * @parent SE
 * 
 */
var Imported = Imported || {};
Imported.NUUN_DamagedFloorEX = true;

(() => {
const parameters = PluginManager.parameters('NUUN_DamagedFloorEX');
const DamagedFloorList = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['DamagedFloorList'])) : null) || [];
const DamagedFloorFlash = eval(parameters['DamagedFloorFlash'] || 'false');
const DefaultDamage = String(parameters['DefaultDamage'] || '10');
const DefaultDamagedFloorSE = String(parameters['DefaultDamagedFloorSE'] || '');
const DefaultVolume = Number(parameters['DefaultVolume'] || 90);
const DefaultPitch = Number(parameters['DefaultPitch'] || 100);
const DefaultPan = Number(parameters['DefaultPan'] || 50);
//フラッシュ指定　地形タグ　床ダメージ独自処理
let onMapFloorDamage = false;
let floorDamageRefresh = false;

const _Game_Actor_executeFloorDamage = Game_Actor.prototype.executeFloorDamage;
Game_Actor.prototype.executeFloorDamage = function() {
  onMapFloorDamage = true;
  _Game_Actor_executeFloorDamage.call(this);
  onMapFloorDamage = false;
};

const _Game_Actor_performMapDamage = Game_Actor.prototype.performMapDamage;
Game_Actor.prototype.performMapDamage = function() {
  if (onMapFloorDamage) {
    if (!$gameParty.inBattle() && floorDamageRefresh) {
      floorDamageRefresh = false;
      if (DamagedFloorFlash) {
        _Game_Actor_performMapDamage.call(this);
      }
    $gameMap.getDamagedFloorListData();
    }
  } else {
    _Game_Actor_performMapDamage.call(this);
  }
};

const _Game_Actor_basicFloorDamage = Game_Actor.prototype.basicFloorDamage;
Game_Actor.prototype.basicFloorDamage = function() {
  const coreDamage = _Game_Actor_basicFloorDamage.call(this);
  const damagedFloorId = $gameMap._damagedFloorId;
  const a = this;
  if (damagedFloorId >= 0) {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionId = $gameMap.regionId(x, y);
    const damagedFloorData = DamagedFloorList[$gameMap._damagedFloorId].DamagedFloorRegion || [];
    const mainData = damagedFloorData.find(data => data.RegionId === regionId);
    return mainData && mainData.Damage ? eval(mainData.Damage) : DefaultDamage ? eval(DefaultDamage) : coreDamage;
  } else {
    return DefaultDamage ? eval(DefaultDamage) : coreDamage;
  }
};


const _Game_Party_onPlayerWalk = Game_Party.prototype.onPlayerWalk;
Game_Party.prototype.onPlayerWalk = function() {
  floorDamageRefresh = true;
  _Game_Party_onPlayerWalk.call(this);
};


const _Game_Map_initialize  = Game_Map.prototype.initialize ;
Game_Map.prototype.initialize = function() {
  _Game_Map_initialize.call(this);
  this._damagedFloorId = -1;
};

const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
  _Game_Map_setup.call(this, mapId);
  this.initDamagedFloorId()
};

Game_Map.prototype.initDamagedFloorId = function(mapId) {
  this._damagedFloorId = DamagedFloorList.findIndex(data => data.TileSetId === this._tilesetId);
};

Game_Map.prototype.getDamagedFloorListData = function() {
  if (this._damagedFloorId >= 0) {
    const x = $gamePlayer._x;
    const y = $gamePlayer._y;
    const regionId = this.regionId(x, y);
    const damagedFloorData = DamagedFloorList[this._damagedFloorId].DamagedFloorRegion || [];
    const mainData = damagedFloorData.find(data => data.RegionId === regionId);
    if (mainData && mainData.DamagedFloorSE) {
      AudioManager.playSe({"name":mainData.DamagedFloorSE,"volume":mainData.volume,"pitch":mainData.pitch,"pan":mainData.pan});
    } else if (DefaultDamagedFloorSE) {
      AudioManager.playSe({"name":DefaultDamagedFloorSE,"volume":DefaultVolume,"pitch":DefaultPitch,"pan":DefaultPan});
    }
  } else {
    if (DefaultDamagedFloorSE) {
      AudioManager.playSe({"name":DefaultDamagedFloorSE,"volume":DefaultVolume,"pitch":DefaultPitch,"pan":DefaultPan});
    }
  }
};

})();
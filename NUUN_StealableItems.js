﻿/*:-----------------------------------------------------------------------------------
 * NUUN_StealableItems.js
 * 
 * Copyright (C) 2020 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 * 
 * 更新履歴
 * 2020/11/21 Ver 1.0.0
 */ 
/*:
 * @target MZ
 * @plugindesc 盗みスキル
 * @author NUUN
 * 
 * @help
 * 敵または味方からアイテムやお金を盗むスキルを作ることが出来ます。
 * 
 * スキルのメモ欄 アクターエネミー共用
 * <stealSkill:成功確率>
 * 例<stealSkill:80>
 * 盗みスキルを設定します。
 * 
 * アクター専用
 * <goldStealSkill:成功確率>
 * <goldStealSkill:50>
 * 
 * エネミー専用
 * <goldStealSkill:成功確率,盗める金額>
 * <goldStealSkillRate:成功確率,所持金の割合>
 * 
 * 例
 * <goldStealSkill:100, 400>
 * 100%の確率で400Ｇ奪われます。
 * <goldStealSkillRate:70, 30>
 * 70%の確率で所持金の30%が奪われます。
 * 
 * エネミーのメモ欄
 * <steal I:アイテムID, 確率>
 * 盗めるアイテムを設定します。
 * <steal W:武器ID, 確率>
 * 盗める防具を設定します。
 * <steal A:防具ID, 確率>
 * 盗める防具を設定します。
 * <steal M:金額, 確率>
 * 盗める金額を設定します。
 * 
 * アクター、職業、武器、防具、ステート、エネミーのメモ欄
 * <steal_sr:±追加確率>
 * 特徴を有するメモ欄に盗みの成功確率を変更します。
 * 
 * 盗んだ回数等を参照できるように以下の変数及び関数を用意しています。
 * アイテムを盗んだ回数。
 * $gameSystem._stealCount
 * $gameSystem.getBattleSteal()
 * お金を盗んだ合計金額。
 * $gameSystem._stealGoldSum
 * $gameSystem.getBattleStealGold()
 * アイテムを盗まれた回数。
 * $gameSystem._stolenCount
 * $gameSystem.getBattleStolen()
 * お金を盗まれた合計金額。
 * $gameSystem._stolenGoldSum
 * $gameSystem.getBattleStolenGold()
 * 
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * @param NotStealName
 * @text 盗めなかった時のメッセージ
 * @desc 敵からアイテムを盗めなかった時のメッセージ。
 * @default から何も盗めなかった！
 * 
 * @param GetStealName
 * @text 敵からアイテムを盗めた時のメッセージ
 * @desc 敵からアイテムを盗めた時のメッセージ。
 * @default を盗んだ！
 * 
 * @param StolenName
 * @text 敵からアイテムを盗まれた時のメッセージ
 * @desc 敵からアイテムを盗まれた時のメッセージ。
 * @default を盗み取った！
 * 
 * @param StolenItemDrop
 * @text 盗まれたアイテムの回収
 * @desc 敵から盗まれたアイテムを撃破後、ドロップするか。
 * @type boolean
 * @default false
 * 
 * @param StolenGoldDrop
 * @text 盗まれたお金の回収
 * @desc 敵から盗まれたお金を撃破後、ドロップするか。
 * @type boolean
 * @default false
 * 
 * @param stolenItems
 * @text 敵から奪われるアイテム設定
 * @desc 敵から奪われるアイテムの設定です。
 * @default []
 * @type struct<stolenItems>[]
 * 
 */ 
/*~struct~stolenItems:
 * 
 * @param stolenItemId
 * @text 盗まれるアイテムID
 * @desc 敵から盗まれるアイテムIDです。
 * @type item
 * 
 * @param weight
 * @text 重み
 * @desc 盗まれるアイテムの頻度を指定します。数値が高い程盗まれやすくなります。
 * @type number
 * @default 5
 * 
 * @param stolenSwitch
 * @text 条件
 * @desc 盗まれるアイテム条件のスイッチ番号を指定します。
 * @type switch
 * @default 0
 * 
 */
var Imported = Imported || {};
Imported.NUUN_StealableItems = true;

(() => {
'use strict';
const parameters = PluginManager.parameters('NUUN_StealableItems');
const param = JSON.parse(JSON.stringify(parameters, function(key, value) {
  try {
    return JSON.parse(value);
  } catch (e) {
    try {
      return eval(value);
    } catch (e) {
      return value;
    }
  }
}));

Game_BattlerBase.prototype.stealBoost = function(){
	let rate = 0;
	this.traitObjects().forEach(function(traitObject) {
		if (traitObject.meta.steal_sr) {
			rate += Number(traitObject.meta.steal_sr);
		}
	}, this);
	return rate;
};

Game_BattlerBase.prototype.stealItemRate = function() {
  return 100;
};

const _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	_Game_System_initialize .call(this);
	this._stealCount = 0;
	this._stealGoldSum = 0;
	this._stolenCount = 0;
	this._stolenGoldSum = 0;
};

Game_System.prototype.onBattleSteal = function() {
	this._stealCount ? this._stealCount++ : 0;
};

Game_System.prototype.getBattleSteal = function() {
	return (this._stealCount ? this._stealCount : 0);
};

Game_System.prototype.onBattleStealGold = function(gold) {
	this._stealGoldSum ? this._stealGoldSum += gold : 0;
};

Game_System.prototype.getBattleStealGold = function() {
	return (this._stealGoldSum ? this._stealGoldSum : 0);
};

Game_System.prototype.onBattleStolen = function() {
	this._stolenCount ? this._stolenCount++ : 0;
};

Game_System.prototype.getBattleStolen = function() {
	return (this._stolenCount ? this._stolenCount : 0);
};

Game_System.prototype.onBattleStolenGold = function(gold) {
	this._stolenGoldSum ? this._stolenGoldSum += gold : 0;
};

Game_System.prototype.getBattleStolenGold = function() {
	return (this._stolenGoldSum ? this._stolenGoldSum : 0);
};

Game_System.prototype.stolenSwitch = function(item){
	return (item.stolenSwitch > 0 ? $gameSwitches.value(item.stolenSwitch) : true);
};

const _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
	this.getSteal(target);
	_Game_Action_applyItemUserEffect.call(this, target);
};

Game_Action.prototype.getSteal = function(target){
	if (target.isEnemy()) {
		if(this.item().meta.stealSkill){
			this.StealItems(target, 1);
		} else if (this.item().meta.goldStealSkill){
			this.StealItems(target, 2);
		}
	} else {
		if(this.item().meta.stealSkill){
			this.stolenItem(target, 1);
		}	else if	(this.item().meta.goldStealSkill || this.item().meta.goldStealSkillRate){
			this.stolenItem(target, 2);
		}
	}
};

Game_Action.prototype.StealItems = function(target, mode){
	let stealItem;
	if (mode === 1){
		stealItem = target.makeStealItems(this.stealRate(), mode);
	} else if(mode === 2){
		stealItem = target.makeStealItems(this.stealGoldRate(), mode);
	}
	if (stealItem) {
		this.getStealItems(target, stealItem);
	} else {
		BattleManager._logWindow.addText(target.name() + param.NotStealName);
	}
	this.makeSuccess(target);
};

Game_Action.prototype.stolenItem = function(target, mode){
	let item;
	if(mode === 1){
		item = this.getStolenItemList(target, this.stealRate());
		this.subject().keepStolenItem(item);
	} else if(mode === 2){
		const stolenGold = this.lostStolenGoldMode();
		const rate = Number(stolenGold[0]) + this.subject().stealBoost();
		item = this.lostStolenGold(target, rate, stolenGold);
		this.subject().keepStolenGold(item);
	}
	if(item){
		this.lostItem(item);
	} else {
		BattleManager._logWindow.addText(target.name() + param.NotStealName);
	}
	this.makeSuccess(target);
};

Game_Action.prototype.lostStolenGold = function(target, rate, stolenGold){
	let gold = 0;
	if(target.getStolenRate(rate)){
		if(stolenGold[2] === 1){
			gold = Math.floor($gameParty._gold * Number(Math.min(stolenGold[1], 100) / 100));
		} else {
			gold = Number(stolenGold[1]);
		}
		$gameSystem.onBattleStolenGold(gold);
	}
	return gold;
};


Game_Action.prototype.getStealItems = function(target, stealItem){
	let itemName = '';
	if (typeof(stealItem) === 'object') {
		$gameParty.gainItem(stealItem,1);
		itemName = stealItem.name;
	} else {
		$gameParty.gainGold(stealItem);
		itemName = stealItem + TextManager.currencyUnit;
	}
	BattleManager._logWindow.addText(target.name() +"から"+ itemName + param.GetStealName);
};

Game_Action.prototype.lostItem = function(item){
	let itemName = '';
	if (typeof(item) === 'object') {
		$gameParty.loseItem(item, 1)
		itemName = item.name;
	} else {
		$gameParty.loseGold(item);
		itemName = item + TextManager.currencyUnit;
	}
	BattleManager._logWindow.addText(this.subject().name() +"は"+ itemName + param.StolenName);
};

Game_Action.prototype.lostStolenGoldMode = function(){
	const mode = this.item().meta.goldStealSkillRate;
	let stolenGold = [];
	if (mode){
		stolenGold = this.item().meta.goldStealSkillRate.split(',');
		stolenGold[2] = 1;
	} else {
		stolenGold = this.item().meta.goldStealSkill.split(',');
		stolenGold[2] = 0;
	}
	return stolenGold;
};

Game_Action.prototype.getStolenItemList = function(target, rate){
	let weightSum = 0;
	let getItem = null;
	if(target.getStolenRate(rate) && param.stolenItems){
		let stolenItemList = param.stolenItems.reduce(function(r, item) {
			if($gameParty._items[item.stolenItemId] > 0 && $gameSystem.stolenSwitch(item)) {
				weightSum += item.weight;
				return r.concat(item);
			} else {
				return r
			}
		},[]);
		const value = Math.random() * weightSum;
		let probability = 0.0;
		let i = 0;
		if (stolenItemList.length > 0){
			while(stolenItemList.length > i){
				probability += stolenItemList[i].weight / weightSum * weightSum;
				if(probability > value){
					getItem = $dataItems[stolenItemList[i].stolenItemId];
					$gameSystem.onBattleStolen();
					break;
				}
				i++;
			}
		}
	}
	return getItem;
};

Game_Action.prototype.stealRate = function(){
	const rate = Number(this.item().meta.stealSkill);
	return rate + this.subject().stealBoost();
};

Game_Action.prototype.stealGoldRate = function(){
	const rate = Number(this.item().meta.goldStealSkill);
	return rate + this.subject().stealBoost();
};


Game_Actor.prototype.getStolenRate = function(rate) {
	return Math.floor(Math.random() * 100) < (rate / this.stealItemRate() * 100);
};

const _Game_Enemy_initMembers = Game_Enemy.prototype.initMembers;
Game_Enemy.prototype.initMembers = function() {
	_Game_Enemy_initMembers.call(this);
	this._stealItems = [];
	this._keepStolenItem = [];
	this._keepStolenGold = 0;
};

Game_Enemy.prototype.makeStealItems = function(rate, mode) {//最初に一致したアイテムのみ盗む
	$gameSystem._stealIndex = 0;
	for (let i = 0; i < this._stealItems.length; i++) {
		let di = this._stealItems[i];
		if(mode === 1){ 
			if (di.kind > 0 && di.kind < 4 && this.getStealRate(rate, di)) {
				let r = this.stealObject(di.kind, di.dataId);
				this._stealItems[i] = {dataId: 1, denominator: 1, kind: 0};
				$gameSystem._stealIndex = i;
				$gameSystem.onBattleSteal();
				return r;
			}
		} else if(mode === 2) {
			if (di.kind >= 4 && this.getStealRate(rate, di)) {
				let r = this.stealObject(di.kind, di.dataId);
				this._stealItems[i] = {dataId: 1, denominator: 1, kind: 0};
				$gameSystem.onBattleStealGold(r);
				return r;
			}
		}
	}
return null;
};

Game_Enemy.prototype.getStealRate = function(rate, di) {
	return Math.floor(Math.random() * 100) < (rate / 100) * (di.denominator * this.stealItemRate() / 100);
};

Game_Enemy.prototype.keepStolenItem = function(item) {
	if (param.StolenItemDrop && item){
		this._keepStolenItem.push({dataId: item.id, denominator: 100, kind: 1});
	}
};

Game_Enemy.prototype.keepStolenGold = function(gold) {
	if (param.StolenGoldDrop && gold > 0){
		this._keepStolenGold += gold;
	}
};

const _Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
	return _Game_Enemy_gold.call(this) + this._keepStolenGold;
};

Game_Enemy.prototype.stealObject = function(kind, dataId) {
  if (kind === 1) {
    return $dataItems[dataId];
  } else if (kind === 2) {
    return $dataWeapons[dataId];
  } else if (kind === 3) {
    return $dataArmors[dataId];
  } else if (kind === 4) {
		return dataId;
	} else {
    return null;
  }
};

const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
	_Game_Enemy_setup.call(this,enemyId, x, y);
	this.stealSetup();
};

Game_Enemy.prototype.stealSetup = function() {
	const re =/<(?:steal)\s*([IWAM]):\s*(\d+(?:\s*,\s*\d+)*)>/g;
	while(true) {
		let match = re.exec(this.enemy().note);
		if (match) {
			let data = match[2].split(',');
			switch (match[1]) {
				case 'I':
					this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:1});
					break;
				case 'W':
					this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:2});
					break;
				case 'A':
					this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:3});
					break;
				case 'M':
					this._stealItems.push({dataId: parseInt(data[0]), denominator: parseInt(data[1]), kind:4});
					break;
			}
		} else {
			return this;
		}
	}
};

const _Game_Enemy_makeDropItems = Game_Enemy.prototype.makeDropItems;
Game_Enemy.prototype.makeDropItems = function() {
	let dropItems = _Game_Enemy_makeDropItems.call(this);
	if(this._keepStolenItem.length > 0){
  	this._keepStolenItem.forEach(di => {
			dropItems.push(this.itemObject(di.kind, di.dataId));
 		});
	}
	return dropItems;
};
})();

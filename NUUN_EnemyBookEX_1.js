/*:-----------------------------------------------------------------------------------
 * NUUN_EnemyBookEX_1.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 耐性無効弱点表示で受けた事のある属性、ステート、デバフのみ表示（モンスター図鑑拡張）
 * @author NUUN
 * @version 1.0.0
 * @base NUUN_EnemyBook
 * 
 * @help
 * モンスター図鑑の属性、ステート、デバフ耐性無効弱点の表示を、受けた事のある属性、ステート、デバフのみ表示するようにします。
 * 複数属性（NUUN_MultiElement）を導入している場合はこのプラグインを複数属性（NUUN_MultiElement）に配置してください。
 * 
 * このプラグインはモンスター図鑑（NUUN_EnemyBook）の拡張機能です。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/8/13 Ver.1.0.0
 * 初版
 * 
 */
var Imported = Imported || {};
Imported.NUUN_EnemyBookEX_1 = true;

(() => {
const parameters = PluginManager.parameters('NUUN_EnemyBookEX_1');

const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
  if (target.isEnemy()) {  
    if (Imported.NUUN_MultiElement) {
      if (this.item().damage.elementId < 0) {
        this.enemyBookAttackElementDate(target, this.getAttackElements());
      } else {
        this.enemyBookAttackElementDate(target, this.getItemElements());
      }
    } else {
      if (this.item().damage.elementId < 0) {
        this.enemyBookAttackElementDate(target, this.subject().attackElements());
      } else {
        $gameSystem.setEnemyBookElementFlag(target.enemyId(), this.item().damage.elementId, true);
      }
    }
  }
  return _Game_Action_calcElementRate.call(this, target);
};


Game_Action.prototype.enemyBookAttackElementDate = function(target, element) {
  for (const elementId of element) {
    $gameSystem.setEnemyBookElementFlag(target.enemyId(), elementId, true);
  }
};


const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
Game_Action.prototype.itemEffectAddState = function(target, effect) {
  _Game_Action_itemEffectAddState.call(this, target, effect);
  if (target.isEnemy()) {
    if (effect.dataId === 0) {
      this.enemyBookAttackStateDate(target);
    } else {
      $gameSystem.setEnemyBookStateFlag(target.enemyId(), effect.dataId, true);
    }
  }
};

Game_Action.prototype.enemyBookAttackStateDate = function(target) {
  for (const stateId of this.subject().attackStates()) {
    $gameSystem.setEnemyBookStateFlag(target.enemyId(), stateId, true);
  }
};


const _Game_Action_itemEffectAddDebuff = Game_Action.prototype.itemEffectAddDebuff;
Game_Action.prototype.itemEffectAddDebuff = function(target, effect) {
  _Game_Action_itemEffectAddDebuff.call(this, target, effect);
  if (target.isEnemy()) {
    $gameSystem.setEnemyBookDebuffFlag(target.enemyId(), effect.dataId, true);
  }
};

})();
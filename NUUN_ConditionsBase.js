/*:-----------------------------------------------------------------------------------
 * NUUN_ConditionsBase.js
 * 
 * Copyright (C) 2021 NUUN
 * This software is released under the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * -------------------------------------------------------------------------------------
 */
/*:
 * @target MZ
 * @plugindesc 条件付きベース
 * @author NUUN
 * @version 1.0.1
 * @base NUUN_Base
 * @orderAfter NUUN_Base
 * 
 * @help
 * 条件により発動する特徴、スキルなどを設定するためのプラグインです。
 * タグの記述方法は各対応のプラグインで確認してください。
 * 比較モードは全て一致といずれかが一致から指定できますが、指定のタグが未記入の場合はいずれかが一致したときに条件を満たしたときに
 * trueを返します。
 * 例：スキルに使用条件
 * <ConditionalBoost:6,8> 
 * <PartyConditionalBoost:15>
 * <PartialMatchBoost:0>
 * 条件リストの6,8,15のいずれかが一致したときに条件を満たします。
 * 
 * 条件
 * (1)上限下限値：上限値は判定する数値の最大値を参照します。下限値は判定する数値の最小値を参照します。
 * 下限値以上上限値以下なら条件を満たします。上限値が0なら下限値以上なら条件を満たします。
 * 
 * (2)指定した数値：数値は複数設定できますが複数設定する場合は、''または""で囲む必要があります。
 * いずれかの数値が一致したときに条件を満たします。　指定した数値に入力がある場合(1)上限下限値の設定は無視されます。
 * 
 * (3)指定したID：数値は複数設定できますが複数設定する場合は、''または""で囲む必要があります。
 * いずれかのIDが一致したときに条件を満たします。
 * 
 * 対象がアクター、パーティなら味方、エネミー、敵グループなら敵の条件を参照します。
 * 【パーティ、敵グループ】
 * [戦闘メンバー数]
 * 戦闘メンバー該当のメンバーの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 敵グループは戦闘中以外の場合はfalseを返します。
 * [生存メンバー数]
 * 戦闘メンバーで戦闘不能になっていない該当のメンバーの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 敵グループは戦闘中以外の場合はfalseを返します。
 * 
 * 【アクター、敵】
 * [バトラーID]
 * 使用者、または対象のIDが「指定した数値」(3)を一致なら条件を満たします。
 * [一致したバトラーID数]
 * 「指定した数値」(3)が一致したIDの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 
 * 【職業】
 * [クラスID]
 * 使用者、または対象のクラスIDが「指定した数値」(3)を一致なら条件を満たします。対象が敵または敵グループの場合はfalseを返します。
 * [一致したクラスID数]
 * 「指定した数値」(3)が一致したクラスIDの数が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 対象が敵または敵グループの場合はfalseを返します。
 * 
 * 【能力値】
 * [HP][MP][TP]
 * 対象のHP,MP,TPが「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 上限値、下限値は割合(%)、指定の数値は通常の値です。
 * [攻撃][防御][魔法力][魔法防御][敏捷][運]
 * 対象のステータス値が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【追加能力値】
 * 対象のステータス値が「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 上限値、下限値は割合(%)、指定の数値は通常の値です。
 * 
 * 【特殊能力値】
 * 対象のステータス値が「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 上限値、下限値は割合(%)、指定の数値は通常の値です。
 * 
 * 【レベル】
 * [指定のレベル]
 * 対象のレベルが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティの場合はいずれかが一致したときに条件を満たします。
 * [平均レベル]
 * メンバーの平均レベルが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 対象がアクター、パーティなら味方の条件を参照します。
 * 
 * 【ステート】
 * [指定のステートIDにかかっている]
 * 対象が「指定のステートID](3)にかかっていて残りターンが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * ステートごとに残りターン条件を指定したい場合は条件リストを別途追加してください。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * [指定のステートIDにかかっていない]
 * 対象が「指定のステートID](3)にかかっていなければ条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【バフ】
 * [指定のバフIDにかかっている][指定のデバフIDにかかっている]
 * 対象が「指定のバフID](3)にかかっていれば条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * [指定のバフIDにかかっていない][指定のデバフIDにかかっていない]
 * 対象が「指定のバフID](3)にかかっていなければ条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【武器タイプ】
 * [指定の武器装備][指定の防具装備]
 * 対象が「指定の装備ID](3)を装備していれば一致なら条件を満たします。
 * パーティの場合はいずれかが一致したときに条件を満たします。
 * 対象が敵または敵グループの場合はfalseを返します。
 * [指定の武器タイプ][指定の防具タイプ]
 * 対象が「指定の武器、防具タイプID](3)の装備を装備していれば一致なら条件を満たします。
 * パーティの場合はいずれかが一致したときに条件を満たします。
 * 対象が敵または敵グループの場合はfalseを返します。
 * 
 * 【ターン】
 * [指定のターン]
 * 対象または現在のターンが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * ターン制の場合は現在のターンが参照されます。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【属性】
 * [指定の属性]
 * 対象の攻撃属性が「指定した数値」(2)と一致なら条件を満たします。
 * なお対象がパーティ、敵グループの場合は判定しません。
 * 
 * 【有効度】
 * [属性有効度][ステート有効度]
 * 対象の「指定した属性、ステートIDの有効度」(2)が「上限下限値%内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はいずれかが一致したときに条件を満たします。
 * 
 * 【アイテム、スキル使用】
 * [アイテムを使用][スキルを使用]
 * 使用したアイテム、スキル「指定したアイテム、スキルID」(3)が一致なら条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * 
 * 【攻撃】
 * [命中タイプが物理][命中タイプが魔法][命中タイプが必中]
 * 攻撃時の命中タイプが一致すれば条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * [ダメージタイプがHP回復][ダメージタイプがMP回復][ダメージタイプがHP吸収][ダメージタイプがMP吸収]
 * 攻撃時のダメージタイプが一致すれば条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * [クリティカル時]
 * クリティカルなら条件を満たします。
 * 
 * 【ダメージ】
 * [指定のダメージ]
 * ダメージが「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * パーティ、敵グループの場合はfalseを返します。
 * 
 * 【反撃、反射】（未実装）
 * [反撃時][魔法反射時]
 * 反撃時または魔法反射時なら条件を満たします。
 * 
 * 【乗り物】
 * [小舟に乗っている][大型船に乗っている][飛行船に乗っている][乗り物に乗っている]
 * 該当の乗り物に乗っているなら条件を満たします。
 * [小舟に乗っていない][大型船に乗っていない][飛行船に乗っていない][乗り物に乗っていない]
 * 該当の乗り物に乗っていないなら条件を満たします。
 * 
 * 【ゲーム変数】
 * [指定の変数]
 * 「指定した変数ID」(3)の値が「上限下限値内」(1)または「指定した数値」(2)と一致なら条件を満たします。
 * 
 * 【スイッチ】
 * [指定のスイッチがON]
 * 指定したスイッチID」(3)がONなら条件を満たします。
 * [指定のスイッチがOFF]
 *「指定したスイッチID」(3)がOFFなら条件を満たします。
 * 
 * 【条件式】
 * 条件式の評価がtrueなら条件を満たします。
 * 
 * 利用規約
 * このプラグインはMITライセンスで配布しています。
 * 
 * 更新履歴
 * 2021/9/13 Ver.1.0.1
 * 属性時の条件が正常に判定されていなかった問題を修正。
 * 2021/9/13 Ver.1.0.0
 * 初版
 * 
 * @param TriggerConditions
 * @text 適用条件
 * @desc 適用する条件を設定します。
 * @type struct<Conditions>[]
 * 
 */
/*~struct~Conditions:
 * 
 * @param NameStr
 * @text 識別名
 * @desc 識別名
 * @type string
 * @default
 * 
 * @param ConditionsMode
 * @text 条件タイプ
 * @desc 条件を指定します。
 * @type select
 * @option パーティ、敵グループ(Member)
 * @value 'Member'
 * @option アクター、敵(Battler)
 * @value 'Battler'
 * @option 職業(Class)
 * @value 'Class'
 * @option 能力値(Param)
 * @value 'Param'
 * @option 追加能力値(XParam)
 * @value 'Xparam'
 * @option 特殊能力値(SParam)
 * @value 'Sparam'
 * @option レベル(Lavel)
 * @value 'Lavel'
 * @option ステート(State)
 * @value 'State'
 * @option バフ(Buff)
 * @value 'Buff'
 * @option 装備(Equip)
 * @value 'Equip'
 * @option ターン(Turn)
 * @value 'Turn'
 * @option 属性(Element)
 * @value 'Element'
 * @option 有効度(Validity)
 * @value 'Validity'
 * @option アイテム、スキル使用(ItemSkill)
 * @value 'ItemSkill'
 * @option 攻撃(Attack)
 * @value 'Attack'
 * @option ダメージ(Damage)
 * @value 'Damage'
 * @option 反撃、反射(CounterReflection)
 * @value 'CounterReflection'
 * @option 乗り物(Vehicle)
 * @value 'Vehicle'
 * @option ゲーム変数(Variable)
 * @value 'Variable'
 * @option スイッチ(Switch)
 * @value 'Switch'
 * @option 条件式(Eval)
 * @value 'Eval'
 * @default 
 * 
 * @param MemberConditionsType
 * @text パーティ、敵グループ(Member)
 * @desc パーティ、敵グループの条件タイプを指定します。
 * @type select
 * @option 戦闘メンバー数(1)(2)（(1)バトラー数、(2)バトラー数）
 * @value 'BattleMember'
 * @option 生存メンバー数(1)(2)（(1)バトラー数、(2)バトラー数）
 * @value 'AliveMember'
 * @default 
 * 
 * @param BattlerConditionsType
 * @text アクター、敵(Battler)
 * @desc アクター、敵の条件タイプを指定します。
 * @type select
 * @option バトラーID(3)（(3)バトラーID）
 * @value 'ID'
 * @option 一致したバトラーID数(1)(2)(3)（(1)バトラー数、(2)バトラー数、(3)バトラーID）
 * @value 'IDNum'
 * @default 
 * 
 * @param ClassConditionsType
 * @text 職業(Class)
 * @desc 職業の条件タイプを指定します。
 * @type select
 * @option クラスID(2)
 * @value 'ID'
 * @option 一致したバトラーのクラスID数(1)(2)(3)（(1)バトラー数、(2)バトラー数、(3)クラスID）
 * @value 'IDNum'
 * @default 
 * 
 * @param ParamConditionsType
 * @text 能力値(Param)
 * @desc 能力値の条件タイプを指定します。
 * @type select
 * @option HP(1)(2)（(1)HP割合　(2)HP固定値）
 * @value 'HP'
 * @option MP(1)(2)（(1)MP割合　(2)MP固定値）
 * @value 'MP'
 * @option TP(1)(2)（(1)TP割合　(2)TP固定値）
 * @value 'TP'
 * @option 攻撃(1)(2)（(1)攻撃力範囲値　(2)攻撃力固定値）
 * @value 'ATK'
 * @option 防御(1)(2)（(1)防御力範囲値　(2)防御力固定値）
 * @value 'DEF'
 * @option 魔法力(1)(2)（(1)魔法力範囲値　(2)魔法力固定値）
 * @value 'MAT'
 * @option 魔法防御(1)(2)（(1)魔法防御範囲値　(2)魔法防御固定値）
 * @value 'MDF'
 * @option 敏捷(1)(2)（(1)敏捷性範囲値　(2)敏捷性固定値）
 * @value 'AGI'
 * @option 運(1)(2)（(1)運範囲値　(2)運固定値）
 * @value 'LUK'
 * @default 
 * 
 * @param XParamConditionsType
 * @text 追加能力値(XParam)
 * @desc 追加能力値の条件タイプを指定します。
 * @type select
 * @option 命中(1)(2)（(1)命中率割合範囲　(2)命中率割合）
 * @value 'HIT'
 * @option 回避(1)(2)（(1)回避率割合範囲　(2)回避率割合）
 * @value 'EVA'
 * @option 会心(1)(2)（(1)会心率割合範囲　(2)会心率割合）
 * @value 'CRI'
 * @option 会心回避(1)(2)（(1)会心回避率割合範囲　(2)会心回避率割合）
 * @value 'CEV'
 * @option 魔法回避(1)(2)（(1)魔法回避率割合範囲　(2)魔法回避率割合）
 * @value 'MEV'
 * @option 魔法反射(1)(2)（(1)魔法反射率割合範囲　(2)魔法反射率割合）
 * @value 'MRF'
 * @option 反撃(1)(2)（(1)反撃率割合範囲　(2)反撃率割合）
 * @value 'CNT'
 * @option HP再生(1)(2)（(1)HP再生率割合範囲　(2)HP再生率割合）
 * @value 'HRG'
 * @option MP再生(1)(2)（(1)MP再生率割合範囲　(2)MP再生率割合）
 * @value 'MRG'
 * @option TP再生(1)(2)（(1)TP再生率割合範囲　(2)TP再生率割合）
 * @value 'TRG'
 * @default 
 * 
 * @param SParamConditionsType
 * @text 特殊能力値(SParam)
 * @desc 特殊能力値の条件タイプを指定します。
 * @type select
 * @option 狙われ(1)(2)（(1)狙われ率割合範囲　(2)狙われ率割合）
 * @value 'TGR'
 * @option 防御効果(1)(2)（(1)防御効果率割合範囲　(2)防御効果率割合）
 * @value 'GRD'
 * @option 回復効果(1)(2)（(1)回復効果率割合範囲　(2)回復効果率割合）
 * @value 'REC'
 * @option 薬の知識(1)(2)（(1)薬の知識割合範囲　(2)薬の知識割合）
 * @value 'PHA'
 * @option MP消費1)(2)（(1)MP消費率割合範囲　(2)MP消費率割合）
 * @value 'MCR'
 * @option TPチャージ(1)(2)（(1)TPチャージ率割合範囲　(2)TPチャージ率割合）
 * @value 'TCR'
 * @option 物理ダメージ(1)(2)（(1)物理ダメージ率割合範囲　(2)物理ダメージ率割合）
 * @value 'PDR'
 * @option 魔法ダメージ(1)(2)（(1)魔法ダメージ率割合範囲　(2)魔法ダメージ率割合）
 * @value 'MDR'
 * @option 床ダメージ(1)(2)（(1)床ダメージ率割合範囲　(2)床ダメージ率割合）
 * @value 'FDR'
 * @option 獲得経験(1)(2)（(1)獲得経験率割合範囲　(2)獲得経験率割合）
 * @value 'EXR'
 * @default 
 * 
 * @param LavelConditionsType
 * @text レベル(Lavel)
 * @desc レベルの条件タイプを指定します。
 * @type select
 * @option 指定のレベル(1)(2)（(1)レベル　(2)レベル）
 * @value 'DFT'
 * @option 平均（パーティのみ）(1)(2)（(1)レベル　(2)レベル）
 * @value 'AVE'
 * @default 
 * 
 * @param StateConditionsType
 * @text ステート(State)
 * @desc ステートの条件タイプを指定します。
 * @type select
 * @option 指定のステートIDにかかっている(1)(2)(3)（(1)ターン (2)ターン (3)ステートID）
 * @value 'AddState'
 * @option 指定のステートIDにかかっていない(3)（(3)ステートID）
 * @value 'NotState'
 * @default 
 * 
 * @param BuffConditionsType
 * @text バフ(Buff)
 * @desc バフの条件タイプを指定します。
 * @type select
 * @option 指定のバフIDにかかっている(3)
 * @value 'AddBuff'
 * @option 指定のバフIDにかかっていない(3)（(3)で無記入の場合はすべてのステートにかかっていない時に条件を満たします）
 * @value 'NotBuff'
 * @option 指定のデバフIDにかかっている(3)
 * @value 'AddDebuff'
 * @option 指定のデバフIDにかかっていない(3)（(3)で無記入の場合はすべてのステートにかかっていない時に条件を満たします）
 * @value 'NotDebuff'
 * @default 
 * 
 * @param EquipConditionsType
 * @text 装備(Equip)
 * @desc 装備の条件タイプを指定します。
 * @type select
 * @option 指定の武器装備(3)
 * @value 'Weapon'
 * @option 指定の防具装備(3)
 * @value 'Armor'
 * @option 指定の武器タイプ(3)
 * @value 'WeaponType'
 * @option 指定の防具タイプ(3)
 * @value 'ArmorType'
 * @default 
 * 
 * @param TurnConditionsType
 * @text ターン(Turn)
 * @desc ターンの条件タイプを指定します。
 * @type select
 * @option 指定のターン(1)(2)
 * @value 'Turn'
 * @default 
 * 
 * @param ElementConditionsType
 * @text 属性(Element)
 * @desc 属性の条件タイプを指定します。
 * @type select
 * @option 指定の属性(3)
 * @value 'Element'
 * @default 
 * 
 * @param ValidityConditionsType
 * @text 有効度(Validity)
 * @desc 有効度の条件タイプを指定します。
 * @type select
 * @option 属性有効度(1)(2)(3)
 * @value 'ElementValidity'
 * @option ステート有効度(1)(2)(3)
 * @value 'StateValidity'
 * @default 
 * @parent ValiditySetting
 * 
 * @param ItemSkillConditionsType
 * @text アイテム、スキル(ItemSkill)
 * @desc アイテム、スキルの条件タイプを指定します。
 * @type select
 * @option アイテムを使用(3)（(3)のスキルIDが未指定の場合は全てのアイテムが対象）
 * @value 'Item'
 * @option スキルを使用(3)（(3))のアイテムIDが未指定の場合は全てのスキルが対象）
 * @value 'Skill'
 * @default 
 * 
 * @param AttackConditionsType
 * @text 攻撃(Attack)
 * @desc 攻撃の条件タイプを指定します。
 * @type select
 * @option 命中タイプが物理
 * @value 'Physical'
 * @option 命中タイプが魔法
 * @value 'Magical'
 * @option 命中タイプが必中
 * @value 'CertainHit'
 * @option ダメージタイプがHP回復
 * @value 'HpRecover'
 * @option ダメージタイプがMP回復
 * @value 'MpRecover'
 * @option ダメージタイプがHP吸収
 * @value 'HpDrain'
 * @option ダメージタイプがMP吸収
 * @value 'MpDrain'
 * @option クリティカル時
 * @value 'Critical'
 * @default 
 * 
 * @param DamageConditionsType
 * @text ダメージ(Damage)
 * @desc ダメージの条件タイプを指定します。
 * @type select
 * @option 指定のダメージ(1)(2)
 * @value 'Damage'
 * @default 
 * 
 * @param CntRefConditionsType
 * @text 反撃、反射（未実装）(CounterReflection)
 * @desc 反撃、反射の条件タイプを指定します。
 * @type select
 * @option 反撃時(3)（(3)が未指定の場合は全てのスキルが対象）
 * @value 'Counter'
 * @option 魔法反射時(3)（(3)が未指定の場合は全てのスキルが対象）
 * @value 'Reflection'
 * @default 
 * 
 * @param VehicleConditionsType
 * @text 乗り物(Vehicle)
 * @desc 乗り物の条件タイプを指定します。
 * @type select
 * @option 小舟に乗っている
 * @value 'OnBoat'
 * @option 大型船に乗っている
 * @value 'OnShip'
 * @option 飛行船に乗っている
 * @value 'OnAirShip'
 * @option 乗り物に乗っている
 * @value 'OnVehicle'
 * @option 小舟に乗っていない
 * @value 'NotBoat'
 * @option 大型船に乗っていない
 * @value 'NotShip'
 * @option 飛行船に乗っていない
 * @value 'NotAirShip'
 * @option 乗り物に乗っていない
 * @value 'NotVehicle'
 * @default 
 * 
 * @param VariableConditionsType
 * @text ゲーム変数(Variable)
 * @desc ゲーム変数の条件タイプを指定します。
 * @type select
 * @option 指定の変数(1)(2)(3)（(1)範囲値 (2)値 (3)ゲーム変数ID）
 * @value 'Var'
 * @default 
 * 
 * @param SwitchConditionsType
 * @text スイッチ(Switch)
 * @desc スイッチの条件タイプを指定します。
 * @type select
 * @option 指定のスイッチがON(3)（(3)スイッチID）
 * @value 'ONSwitch'
 * @option 指定のスイッチがOFF(3)（(3)スイッチID）
 * @value 'OFFSwitch'
 * @default 
 * @parent SwitchSetting
 * 
 * @param EvalStr
 * @text 評価式(Eval)
 * @desc 評価式
 * @type string
 * @default 
 * 
 * @param CommonSetting
 * @text 共通設定
 * @default ------------------------------
 * 
 * @param UpLimit
 * @text 上限値(1)
 * @desc 上限値(1)
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 * @param DwLimit
 * @text 下限値(1)
 * @desc 下限値(1)
 * @type number
 * @default 0
 * @parent CommonSetting
 * 
 * @param ValList
 * @text 指定の数値(2)
 * @desc 指定の数値（複数の場合は,で区切り''又は""で囲む　例'10, 11, 13'）(2)
 * @type string
 * @default
 * @parent CommonSetting
 * 
 * @param IDList
 * @text 指定のID(3)
 * @desc 指定のID（複数の場合は,で区切り''又は""で囲む　例'10, 11, 13'）(3)
 * @type string
 * @default
 * @parent CommonSetting
 * 
 */

var Imported = Imported || {};
Imported.NUUN_ConditionsBase = true;

(() => {
const parameters = PluginManager.parameters('NUUN_ConditionsBase');
const TriggerConditions = (NUUN_Base_Ver >= 113 ? (DataManager.nuun_structureData(parameters['TriggerConditions'])) : null) || [];

Game_Action.prototype.traitTriggerConditions = function(target, tag1, tag2, tag3, tag4, damage, partialMatch) {//特徴取得
  const subject = this.subject();
  return subject.getTraitTriggerConditions(target, tag1, tag2, tag3, tag4, this, damage, partialMatch);
};

Game_Action.prototype.triggerConditions = function(obj, target, tag1, tag2, tag3, tag4, damage, partialMatch) {//単体
  const subject = this.subject();
  return subject.getTriggerConditions(obj, target, tag1, tag2, tag3, tag4, this, damage, partialMatch);
};

Game_BattlerBase.prototype.getTraitTriggerConditions  = function(target, tag1, tag2, tag3, tag4, action, damage, partialMatch) {//特徴取得
  return this.traitObjects().some(traits => {
    return getTriggerConditions(traits, this, target, tag1, tag2, tag3, tag4, action, damage, partialMatch);
  });
};

Game_BattlerBase.prototype.getTriggerConditions  = function(obj, target, tag1, tag2, tag3, tag4, action, damage, partialMatch) {//単体
  return getTriggerConditions(obj, this, target, tag1, tag2, tag3, tag4, action, damage, partialMatch);
};

function getTriggerConditions(obj, subject, target, tag1, tag2, tag3, tag4, action, damage, partialMatch) {
  if (getTriggerConditionsMeta(obj, tag1, tag2, tag3, tag4)) {
    const partialMode = Number(obj.meta[partialMatch]) || 0;
    const result1 = getTriggerConditionsResult(obj, subject, tag1, 'Subject', action, damage, partialMode);
    const result2 = getTriggerConditionsResult(obj, target, tag2, 'Target', action, damage, partialMode);
    const result3 = getTriggerConditionsResult(obj, null, tag3, 'Party', action, damage, partialMode);
    const result4 = getTriggerConditionsResult(obj, null, tag4, 'Troop', action, damage, partialMode);
    if (partialMode === 0) {
      return result1 || result2 || result3 || result4;
    } else {
      return result1 && result2 && result3 && result4;
    }
  } else {
    return true;
  }
};

function getTriggerConditionsResult(obj, target, tag, mode, action, damage, partialMode) {
  let list = [];
  let result = partialMode === 1;
  if (tag && obj.meta[tag] && !(!$gameParty.inBattle() && mode === 'Troop')) {
    list = obj.meta[tag].split(',').map(Number);
    if (partialMode === 0) {
      result = isTriggerConditionsSome(list, target, mode, action, damage);
    } else {
      result = isTriggerConditionsEvery(list, target, mode, action, damage);
    }
  }
  return result;
};

function isTriggerConditionsSome(list, target, mode, action, damage) {
  return list.some(id => triggerConditions(TriggerConditions[id - 1], target, mode, action, damage));
}

function isTriggerConditionsEvery(list, target, mode, action, damage) {
  return list.every(id => triggerConditions(TriggerConditions[id - 1], target, mode, action, damage));
}

function triggerConditions(data, target, mode, action, damage) {
  if (data.ConditionsMode === 'Member') {
    return memberTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Battler') {
    return battlerTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Class') {
    return classTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Param') {
    return paramTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Xparam') {
    return xparamTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Sparam') {
    return sparamTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Lavel') {
    return lavelTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'State') {
    return stateTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Buff') {
    return buffTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Equip') {
    return equipTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Turn') {
    return turnTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Element') {
    return elementTriggerConditions(data, target, mode, action);
  } else if (data.ConditionsMode === 'Validity') {
    return validityTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'ItemSkill') {
    return itemSkillTriggerConditions(data, target, mode, action);
  } else if (data.ConditionsMode === 'Attack') {
    return attackTriggerConditions(data, target, mode, action);
  } else if (data.ConditionsMode === 'Damage') {
    return damageTriggerConditions(data, target, mode, damage);
  } else if (data.ConditionsMode === 'CounterReflection') {
    return cntRefTriggerConditions(data, target, mode);
  } else if (data.ConditionsMode === 'Vehicle') {
    return vehicleiggerConditions(data);
  } else if (data.ConditionsMode === 'Variable') {
    return variableTriggerConditions(data);
  } else if (data.ConditionsMode === 'Switch') {
    return switchTriggerConditions(data);
  } else if (data.ConditionsMode === 'Eval') {
    return evalTriggerConditions(data);
  }
}

//メンバー
function memberTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.MemberConditionsType === 'BattleMember') {
    return conditionsNum(data, unit.members().length);
  } else if (data.MemberConditionsType === 'AliveMember') {
    return conditionsNum(data, unit.aliveMembers().length);
  }
};

//バトラー
function battlerTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.BattlerConditionsType === 'ID') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => memberId(data.IDList, member));
    } else {
      return memberId(data.IDList, target);
    }
  } else if (data.BattlerConditionsType === 'IDNum') {
    sum = membersSum(data.IDList, unit);
    return conditionsNum(data, sum);
  }
};

//クラス
function classTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.ClassConditionsType === 'ID') {
    if (mode === 'Party') {
      return unit.members().some(member => classId(data.IDList, member));
    } else if (target && target.isActor()) {
      return classId(data.IDList, target);
    }
  } else if (data.ClassConditionsType === 'IDNum') {
    if (mode === 'Party' || target && target.isActor()) {
      let sum = 0;
      sum = classSum(data.IDList, $gameParty);
      return conditionsNum(data, sum);
    }
  }
  return false;
};

//能力値
function paramTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (mode === 'Party' || mode === 'Troop') {
    return unit.members().some(member => member.triggerParamConditions(data));
  } else {
    return target.triggerParamConditions(data);
  }
};

//追加能力値
function xparamTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (mode === 'Party' || mode === 'Troop') {
    return unit.members().some(member => member.triggerParamConditions(data));
  } else {
    return target.triggerParamConditions(data);
  }
};

//特殊能力値
function sparamTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (mode === 'Party' || mode === 'Troop') {
    return unit.members().some(member => member.triggerParamConditions(data));
  } else {
    return target.triggerParamConditions(data);
  }
};

//レベル
function lavelTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.LavelConditionsType === 'DFT') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => lavelConditions(data, member));
    } else {
      return lavelConditions(data, target);
    }
  } else if (data.LavelConditionsType === 'AVE') {
    return conditionsAve(data, unit);
  }
  return false;
};

//ステート
function stateTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.StateConditionsType === 'AddState') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => state(data, member));
    } else {
      return state(data, target);
    }
  } else if (data.StateConditionsType === 'NotState') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => notStates(data, member));
    } else {
      return notStates(data, target);
    }
  }
};
//(ここからデバック)
//バフ
function buffTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.BuffConditionsType === 'AddBuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => buffs(data, member));
    } else {
      return buffs(data, target)
    }
  } else if (data.BuffConditionsType === 'NotBuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => notBuffs(data, member));
    } else {
      return notBuffs(data, target)
    }
  } else if (data.BuffConditionsType === 'AddDebuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => deBuffs(data, member));
    } else {
      return deBuffs(data, target)
    }
  } else if (data.BuffConditionsType === 'NotDebuff') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => notDebuffs(data, member));
    } else {
      return notDebuffs(data, target)
    }
  }
};

//装備
function equipTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.StateConditionsType === 'Weapon') {
    if (mode === 'Party') {
      return unit.members().some(member => equipWeapon(data.IDList, member));
    } else {
      return equipWeapon(data.IDList, target);
    }
  } else if (data.StateConditionsType === 'Armor') {
    if (mode === 'Party') {
      return unit.members().some(member => equipArmor(data.IDList, member));
    } else {
      return equipArmorn(data.IDList, target);
    }
  } else if (data.StateConditionsType === 'WeaponType') {
    if (mode === 'Party') {
      return unit.members().some(member => equipWeaponType(data.IDList, member));
    } else {
      return equipWeaponType(data.IDList, target);
    }
  } else if (data.StateConditionsType === 'ArmorType') {
    if (mode === 'Party') {
      return unit.members().some(member => equipArmorType(data.IDList, member));
    } else {
      return equipArmorType(data.IDList, target);
    }
  }
  return false;
};

//ターン
function turnTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.TurnConditionsType === 'Turn') {
    if (BattleManager.isTpb() && (mode === 'Party' || mode === 'Troop')) {
      return unit.members().some(member => turn(data.IDList, member));
    } else {
      return turn(data.IDList, target);
    }
  }
};

//属性 //Action
function elementTriggerConditions(data, target, mode, action) {
  if (!action || mode === 'Party' || mode === 'Troop') {
    return false;
  }
  if (data.ElementConditionsType === 'Element') {
    return attackElement(data.IDList, action);
  }
};

//有効度
function validityTriggerConditions(data, target, mode) {
  const unit = getUnit(target, mode);
  if (data.ValidityConditionsType === 'ElementValidity') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => elementValidity(data, member));
    } else {
      return elementValidity(data, target)
    }
  } else if (data.ValidityConditionsType === 'StateValidity') {
    if (mode === 'Party' || mode === 'Troop') {
      return unit.members().some(member => stateValidity(data, member));
    } else {
      return stateValidity(data.IDList, target)
    }
  }
};

//使用アイテム、スキル //Action
function itemSkillTriggerConditions(data, target, mode, action) {
  if (!action) {
    return false;
  }
  if (data.ItemSkillConditionsType === 'Item') {
    return action.isItem() ? useItem(data.IDList, action.item().id) : false;
  } else if (data.ItemSkillConditionsType === 'Skill') {
    return action.isSkill() ? useSkill(data.IDList, action.item().id) : false;
  }
};

//攻撃 //Action
function attackTriggerConditions(data, target, mode, action) {
  if (!action) {
    return false;
  }
  const result = target.result();
  if (data.AttackConditionsType === 'Physical') {
    return action.isPhysical();
  } else if (data.AttackConditionsType === 'Magical') {
    return action.isMagical();
  } else if (data.AttackConditionsType === 'CertainHit') {
    return action.isCertainHit();
  } else if (data.AttackConditionsType === 'HpRecover') {
    return action.isHpRecover();
  } else if (data.AttackConditionsType === 'MpRecover') {
    return action.isMpRecover();
  } else if (data.AttackConditionsType === 'HpDrain') {
    return action.checkDamageType([5]);
  } else if (data.AttackConditionsType === 'MpDrain') {
    return action.checkDamageType([6]);
  } else if (data.AttackConditionsType === 'Critical') {
    return result.critical;
  }
};

//ダメージ
function damageTriggerConditions(data, target, mode, damage) {
  if (damage === undefined || damage === null) {
    return false;
  }
  if (data.DamageConditionsType === 'Damage') {
    return conditionsNum(data, damage);
  }
};

//反撃、反射 //Action
function cntRefTriggerConditions(data, target, mode) {
  if (!action || mode === 'Party' || mode === 'Troop') {
    return false;
  }
  const unit = getUnit(target, mode);
  if (data.cntRefConditionsType === 'Counter') {

  } else if (data.cntRefConditionsType === 'Reflection') {

  }
};

//乗り物
function vehicleiggerConditions(data) {
  if (data.VehicleConditionsType === 'OnBoat') {
    return $gamePlayer.isInBoat();
  } else if (data.VehicleConditionsType === 'OnShip') {
    return $gamePlayer.isInShip();
  } else if (data.VehicleConditionsType === 'OnAirShip') {
    return $gamePlayer.isInAirship();
  } else if (data.VehicleConditionsType === 'OnVehicle') {
    return $gamePlayer.isInVehicle();
  } else if (data.VehicleConditionsType === 'NotBoat') {
    return !$gamePlayer.isInBoat();
  } else if (data.VehicleConditionsType === 'NotShip') {
    return !$gamePlayer.isInShip();
  } else if (data.VehicleConditionsType === 'NotAirShip') {
    return !$gamePlayer.isInAirship();
  } else if (data.VehicleConditionsType === 'NotVehicle') {
    return !$gamePlayer.isInVehicle();
  }
  return false;
};

//変数
function variableTriggerConditions(data) {
  if (data.VariableConditionsType === 'Var') {
    return getValList(data.IDList).some(listId => conditionsNum(data, $gameVariables.value(listId)));
  }
  return false;
};

//スイッチ
function switchTriggerConditions(data) {
  if (data.SwitchConditionsType === 'ONSwitch') {
    return getValList(data.IDList).some(listId => $gameSwitches.value(listId));
  } else if (data.SwitchConditionsType === 'OFFSwitch') {
    return getValList(data.IDList).some(listId => !$gameSwitches.value(listId));
  }
  return false;
};

//条件式
function evalTriggerConditions(data) {
  return eval(data.EvalStr);
};


function getValList(valList) {
  valList = String(valList);
  return valList ? valList.split(',').map(Number) : [];
};

function conditionsNum(data, num) {
  if (data.ValList) {
    return getValList(data.ValList).some(val => val === num);
  }
  return num >= data.DwLimit && (data.UpLimit > 0 ? (num <= data.UpLimit) : true);
};

function getUnit(target, mode) {
  if ((target && target.isActor()) || mode === 'Party') {
    return $gameParty;
  } else if ((target && target.isEnemy()) || mode === 'Troop') {
    return $gameTroop;
  }
  return $gameParty;
};

function memberId(idList, member) {
  const id = member.isActor() ? member.actorId() : member.enemyId();
  return getValList(idList).some(listId => listId === id);
};

function membersSum(idList, unit) {
  return unit.members().reduce((r, member) => {
    if (memberId(idList, member)) {
    return r + 1;
    } else {
      return r;
    }
  }, 0);
};

function classId(idList, member) {
  const id = member._classId;
  return getValList(idList).some(listId => listId === id);
};

function classSum(IdList, unit) {
  return unit.members().reduce((r, member) => {
    if (classId(IdList, member)) {
      return r + 1;
    } else {
      return r;
    }
  }, 0);
};

function lavelConditions(data, member) {
  return conditionsNum(data, member._level);
};

function conditionsAve(data, unit) {
  const members = unit.members();
  const sum = members.reduce((r, member) => r + (member._level ? member._level : 0), 0);
  const ave = Math.floor(sum / members.length);
  return conditionsNum(data, ave);
}

function state(data, member) {
  const stateId = member._states;
  return stateId.some(id => id > 0 && stateTurn(data, id, member));
}

function stateTurn(data, id, member) {
  const turn = member._stateTurns[id];
  return conditionsNum(data, turn);
};

function notStates(data, member) {
  const stateId = member._states;
  if (data.ValList) {
    return stateId.some(id => !stateId(data, id));
  } else {
    return !(stateId.some(id => id > 0));
  }
}

function stateId(data, id) {
  return getValList(data.ValList).some(val => val === id);
};

function buffs(data, member) {
  const buffs = member._buffs;
  return buffs.some((id, i) => id > 0 && buffsLavel(data, i, member));
}

function buffsLavel(data, i, member) {
  const lavel = Math.abs(member._buffs[i]);
  return conditionsNum(data, lavel);
};

function buffsTurn(data, i, member) {
  const turn = member._buffTurns[i];
  return conditionsNum(data, turn);
};

function equipWeapon(idList, member) {
  return getValList(idList).some(listId => member.hasWeapon($dataWeapons[listId]));
};

function equipArmor(idList, member) {
  return getValList(idList).some(listId => member.hasArmor($dataArmors[listId]));
};

function equipWeaponType(idList, member) {
  const list = getValList(idList);
  return member.weapons().some(weapon => isEquipType(weapon.wtype, list));
};

function equipArmorType(idList, member) {
  const list = getValList(idList);
  return member.armors().some(armor => isEquipType(armor.atype, list));
};

function isEquipType(typeid, list) {
  return list.some(id => typeid === id);
};

function turn(data, member) {
  return conditionsNum(data, member.turnCount());
};

function attackElement(idList, action) {
  let elementsList = [];
  if (Imported.NUUN_MultiElement) {
    if (action.item().damage.elementId < 0) {
      elementsList = action.getAttackElements();
    } else {
      elementsList = action.getItemElements();
    }
  } else {
    if (action.item().damage.elementId < 0) {
      elementsList = action.subject().attackElements();
    } else {
      elementsList.push(action.item().damage.elementId);
    }
  }
  const list = getValList(idList);
  return elementsList.some(id => elements(list, id));
};

function elements(list, id) {
  return list.some(listid => listid === id);
}

function getTriggerConditionsMeta(obj, tag1, tag2, tag3, tag4) {
  return obj.meta[tag1] || obj.meta[tag2] || obj.meta[tag3] || obj.meta[tag4];
};

Game_BattlerBase.prototype.triggerParamConditions = function(data) {
  switch (data.ParamConditionsType) {
    case 'HP':
      return this.conditionsParam(data, 0);
    case 'MP':
      return this.conditionsParam(data, 1);
    case 'TP':
      return this.conditionsParam(data, 10);
    case 'ATK':
      return this.conditionsStatus(data, 2);
    case 'DEF':
      return this.conditionsStatus(data, 3);
    case 'MAT':
      return this.conditionsStatus(data, 4);
    case 'MDF':
      return this.conditionsStatus(data, 5);
    case 'AGI':
      return this.conditionsStatus(data, 6);
    case 'LUK':
      return this.conditionsStatus(data, 7);
    case 'HIT':
      return this.conditionsXparam(data, 0);
    case 'EVA':
      return this.conditionsXparam(data, 1);
    case 'CRI':
      return this.conditionsXparam(data, 2)
    case 'CEV':
      return this.conditionsXparam(data, 3);
    case 'MEV':
      return this.conditionsXparam(data, 4);
    case 'MRF':
      return this.conditionsXparam(data, 5);
    case 'CNT':
      return this.conditionsXparam(data, 6);
    case 'HRG':
      return this.conditionsXparam(data, 7);
    case 'MRG':
      return this.conditionsXparam(data, 8);
    case 'TRG':
      return this.conditionsXparam(data, 9);
    case 'TGR':
      return this.conditionsSparam(data, 0);
    case 'GRD':
      return this.conditionsSparam(data, 1);
    case 'REC':
      return this.conditionsSparam(data, 2);
    case 'PHA':
      return this.conditionsSparam(data, 3);
    case 'MCR':
      return this.conditionsSparam(data, 4);
    case 'TCR':
      return this.conditionsSparam(data, 5);
    case 'PDR':
      return this.conditionsSparam(data, 6);
    case 'MDR':
      return this.conditionsSparam(data, 7);
    case 'FDR':
      return this.conditionsSparam(data, 8);
    case 'EXR':
      return this.conditionsSparam(data, 9);
  }
};

Game_BattlerBase.prototype.conditionsParam = function(data, paramId) {
  let paramVal = 0;
  if (paramId === 0) {
    paramVal = this._hp;
    paramMaxVal = this.mhp;
  } else if (paramId === 1) {
    paramVal = this._mp;
    paramMaxVal = this.mmp;
  } else if (paramId === 10) {
    paramVal = this._tp;
    paramMaxVal = this.maxTp();
  }
  if (data.ValList) {
    const valList = data.ValList.split(',').map(Number);
    return valList.some(val => val === paramVal);
  }
  return paramVal >= paramMaxVal * data.DwLimit / 100 && (data.UpLimit > 0 ? (paramVal <= paramMaxVal * data.UpLimit / 100) : true);
};

Game_BattlerBase.prototype.conditionsStatus = function(data, paramId) {
  const paramVal = this.param(paramId);
  return conditionsNum(data, paramVal);
};

Game_BattlerBase.prototype.conditionsXparam = function(data, paramId) {
  const paramVal = this.xparam(paramId);
  return conditionsNum(data, paramVal);
};

Game_BattlerBase.prototype.conditionsSparam = function(data, paramId) {
  let paramVal = this.sparam(paramId);
  return conditionsNum(data, paramVal);
};

Game_BattlerBase.prototype.getTraitsTriggerConditions = function(tag) {
  const cond = this.traitObjects().reduce((r, traits) => {
    const data = traits.mata[tag].split(',').map(Number);
    return data ? r.concat(data) : r;
  }, []);
  return cond.length > 0 ? cond : null;
};

})();
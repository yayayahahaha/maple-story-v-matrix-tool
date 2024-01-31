// TODO 產一大堆假資料跑跑看

// 四核六技計算機

import { v4 } from 'uuid'
import { SUCCESS_STATUS, FAILED_STATUS, CHANCE_STATUS } from './dictionary'

function test() {
  const purpose = 4
  const list = [
    ['共鳴', '魔咒', '藝術'],
    ['共鳴', '衝刺', '綻放'],
    ['共鳴', '藝術', '衝刺'],
    ['共鳴', '綻放', '衝刺'],
    ['共鳴', '魔咒', '藝術'],
    ['魔咒', '衝刺', '藝術'],
    ['魔咒', '衝刺', '共鳴'],
    ['突襲', '綻放', '共鳴'],
    // ['藝術', '突襲', '綻放'],
    // ['共鳴', '衝刺', '藝術'],
    // ['綻放', '魔咒', '衝刺'],
    // ['藝術', '魔咒', '突襲'],
  ]
  vMatrixTool(list, purpose)
}
false && test()

export function vMatrixTool(originList, targetSkills) {
  // 全都整理成 VMatrixCore instance
  const list = originList.map((item) => {
    if (item instanceof VMatrixCore) return item
    return new VMatrixCore({ skills: item, required: false })
  })

  // 指定的核心的 map
  const requriedCoreMap = Object.fromEntries(list.filter((core) => core.required).map((item) => [item.id, item]))
  const hasRequiredCore = Object.keys(requriedCoreMap).length !== 0

  const passList = []

  // 排除開頭一樣的組合 和沒有包含指定核心的組合
  const unFilteredCombinations = _uniqueCombinationOfArray(list).filter((combination) => {
    // 開頭一樣
    if (_checkHasStartWithSame(combination)) return false

    // 指定核心
    if (!hasRequiredCore) return true
    return Object.keys(requriedCoreMap).every((requiredCoreId) => {
      return combination.find((core) => core.id === requiredCoreId)
    })
  })

  // 整理完畢，正式開始

  // 過濾出需求技能數目的最低核心數目
  const purpose = Math.ceil((targetSkills.length * 2) / 3)
  const allCombinations = unFilteredCombinations.filter((skills) => skills.length === purpose)

  // 這個時候的排列組合: 已經沒有開頭一樣的 / 沒有不包含指定核心的 / 也沒有有選項是空的(在外層處理)

  // 是否成功
  allCombinations.forEach((combination) => {
    // 計算出每一個排列組合所囊誇的技能總數
    const combinationCount = _countSkillsOfEach(combination)

    // 檢查是不是每個有需要的技能都有兩個
    const successCombination = targetSkills.every((targetSkill) => combinationCount[targetSkill] >= 2)

    if (successCombination) passList.push(combination)
  })

  if (passList.length !== 0) return { status: SUCCESS_STATUS, passList }

  // 計算一下還差哪顆
  const missOneList = unFilteredCombinations.filter((skills) => skills.length === purpose - 1)

  const chanceList = missOneList.reduce((chanceList, coreList) => {
    const combinationCount = _countSkillsOfEach(coreList)
    const integrateCount = targetSkills.reduce(
      (map, skill) => {
        if (combinationCount[skill] >= 2) map.pass.push(skill)
        else if (combinationCount[skill] === 1) map.missOne.push(skill)
        else map.zero.push(skill)

        return map
      },
      { pass: [], missOne: [], zero: [] }
    )

    const { missOne, zero } = integrateCount
    if (missOne.length <= 3 && zero.length === 0) chanceList.push({ coreList, integrateCount, combinationCount })
    return chanceList
  }, [])

  // TODO 特殊場景:
  // TODO 在那種 4 核 5 技有差一顆的:
  // TODO 沒有其他，差的那顆也沒有其他的
  // TODO 沒有其他，差的那顆是其他的
  // TODO 有其他，差的那顆不是其他的
  // TODO 有其他，差的那顆是其他的 (這個應該不會有
  // 雖然沒有找到 ok 的組合，但有只差一顆的組合
  const chanceResult = chanceList.reduce((list, chancePayload) => {
    const { integrateCount, coreList, combinationCount } = chancePayload
    const currentFirstSkillMap = Object.fromEntries(coreList.map((core) => [core.skills[0], true]))

    // TODO 還要考慮一下有'其他'的場景
    const firstCanBeList = integrateCount.missOne
      .map((missOneSkill) => (!currentFirstSkillMap[missOneSkill] ? missOneSkill : false))
      .filter(Boolean)

    // 如果缺的技能都在第一個的話，代表雖然缺但也不行，就不推了、只推不是 0 的
    if (firstCanBeList.length !== 0) list.push({ firstCanBeList, integrateCount, coreList, combinationCount })

    return list
  }, [])

  // 不僅沒有找到 ok 的核心組合，也沒有只差一顆的組合
  if (chanceResult.length === 0) return { status: FAILED_STATUS }

  return { status: CHANCE_STATUS, payload: chanceResult }

  /**
   * @function _countSkillsOfEach
   * @TODO document
   * */
  function _countSkillsOfEach(list) {
    return list.reduce((acc, core) => {
      core.skills.forEach((skill) => {
        acc[skill] = acc[skill] || 0
        acc[skill]++
      })
      return acc
    }, {})
  }

  /**
   * @function _checkHasStartWithSame
   * @TODO document
   * */
  function _checkHasStartWithSame(list) {
    // TODO 檢查 input 格式

    const firstSkillList = list.map((core) => core.skills[0])
    return firstSkillList.length !== [...new Set(firstSkillList)].length
  }

  /**
   * @function _uniqueCombinationOfArray
   * @reference https://blog.pulipuli.info/2011/01/print-all-unique-combination-of-array.html
   * @TODO 改寫成自己的版本，記得寫測試
   * */
  function _uniqueCombinationOfArray(_array) {
    var _combination = []

    var _length = _array.length

    for (var _l = 1; _l < _length; _l++) {
      _combination = __parse_combination(_array, _combination, _l)
    }
    _combination.push(_array)

    return _combination

    function __parse_combination(_array, _output, _length, _length_pos, _length_ang) {
      if (_length_pos == null) _length_pos = 1
      if (_length_ang == null) _length_ang = []

      //初始化的部份
      if (_length_ang.length < _length_pos) {
        if (_length_pos == 1) {
          _length_ang.push(1)
        } else {
          var _prev_index = _length_ang[_length_ang.length - 1]
          _length_ang.push(_prev_index + 1)
        }
      }

      var _index = 0
      if (_length_pos > 1) {
        var _prev_index = _length_ang[_length_pos - 2]
        _index = _prev_index + 1
      }

      if (_length_ang.length < _length_pos) {
        _length_ang.push(_index)
      }

      for (var _i = _index; _i < _array.length - (_length - _length_pos); _i++) {
        if (_length_ang.length > _length_pos) {
          //避免受到傳址影響，必須重整
          var _temp = []
          for (var _p = 0; _p < _length_pos; _p++) _temp.push(_length_ang[_p])
          _length_ang = _temp
        }

        _length_ang[_length_pos - 1] = _i

        //如果抵達這個長度的話
        if (_length_ang.length == _length) {
          //輸出
          var _output_ang = []
          for (var _a in _length_ang) {
            _index = _length_ang[_a]
            var _code = _array[_index]
            _output_ang.push(_code)
          }
          _output.push(_output_ang)
        } //如果尚未抵達這個長度
        else {
          _output = __parse_combination(_array, _output, _length, _length_pos + 1, _length_ang)
        }
      }

      return _output
    }
  }
}
/**
 * @function VMatrixCore
 * @TODO syntax check, document, make id cannot be overwrite with property and getter function
 * */
export function VMatrixCore(config) {
  // skills
  // required
  const id = v4()
  Object.assign(this, { required: false, skills: [null, null, null], validate: true }, config, { id })
  this.skills = this.skills.slice()

  return this
}
VMatrixCore.prototype.doValidate = function () {
  this.validate = (() => {
    const list = this.skills.filter((skill) => skill !== OTHER_SKILL_VALUE && skill != null)
    const sameLength = list.length === [...new Set(list)].length

    return sameLength
  })()
}
export const OTHER_SKILL_VALUE = '________________________________________' // for unique

const LOCAL_STORAGE_KEY = 'maple-story-v-matrix-tool'
export const CURRENT_JOB_KEY = 'CURRENT_JOB'
export function getLocalStorageData() {
  try {
    return JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY))
  } catch {
    return null
  }
}
export function saveLocalStorageData(payload) {
  const { coreList, myJob, skills } = payload
  const data = getLocalStorageData() || {}

  data[CURRENT_JOB_KEY] = myJob
  data[myJob] = data[myJob] || {}
  Object.assign(data[myJob], { coreList, skills })
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data, null, 2))
}
export function resetLocalStorage() {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY)
}

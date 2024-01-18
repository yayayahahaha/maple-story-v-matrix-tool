// 四核六技計算機

const purpose = 4

const list = [
  ['1', '2', '3'],
  ['2', '3', '4'],
  ['3', '4', '5'],
  ['4', '5', '6'],

  // chance
  // ['6', '1', '2'],
  // ['1', '5', '6'],
  // ['6', '5', '1'],
  ['3', '2', '1'],
]

/**
 * @function _countSkillsOfEach
 * @TODO document
 * */
function _countSkillsOfEach(list) {
  return list.reduce((acc, skills) => {
    skills.forEach((skill) => {
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

  return !list.reduce((map, items) => {
    if (map === true) return false
    if (map[items[0]] != null) return false
    map[items[0]] = true

    return map
  }, {})
}

function start() {
  const passList = []

  // 過濾出開頭一樣的組合
  const unFilteredCombinations = uniqueCombinationOfArray(list).filter((skills) => !_checkHasStartWithSame(skills))

  // 過濾出需求數目的組合 (四核六技 or 六核九技)
  const allCombinations = unFilteredCombinations.filter((skills) => skills.length === purpose)

  // 是否成功
  allCombinations.forEach((combination) => {
    // 計算出每一個排列組合所囊誇的技能總數
    const combinationCount = _countSkillsOfEach(combination)

    // 判斷是不是每個技能都有兩個
    const successCombination = Object.keys(combinationCount).every((skill) => combinationCount[skill] === 2)

    if (successCombination) passList.push(combination)
  })

  if (passList.length !== 0) return void console.log('你成功啦', passList)

  // 計算一下還差哪顆
  const missOneList = unFilteredCombinations.filter((skills) => skills.length === purpose - 1)

  const chanceList = missOneList.reduce((chanceList, conbinationList) => {
    const conbinationCount = _countSkillsOfEach(conbinationList)

    // 整理: { [相同技能數量的技能數]: { count: 幾個技能的技能數量是這個n, skillList: [是哪些技能] } }
    const skillCount = Object.keys(conbinationCount).reduce((map, skill) => {
      map[conbinationCount[skill]] = map[conbinationCount[skill]] || {
        count: 0,
        skillList: [],
      }
      map[conbinationCount[skill]].count++
      map[conbinationCount[skill]].skillList.push(skill)

      return map
    }, {})

    // 如果沒有一個技能是只有 1 個的話，後面不用處理
    // ex: [ '共鳴', '魔咒', '藝術' ], [ '魔咒', '衝刺', '共鳴' ], [ '共鳴', '藝術', '衝刺' ]
    // 其中 { 共鳴: 3, 魔咒: 2, 藝術: 2, 衝刺: 2 }
    if (skillCount[1] == null) return

    // 如果剛好只數到 1 個的技能有 3 個的話，就代表只剩這顆。
    if (skillCount[1].count === 3) {
      console.log('好機會!')
      console.log(conbinationList)

      const firstSkill = conbinationList
        .map((conbination) => conbination[0])
        .find((startSkill) => skillCount[1].skillList.find((count1Skill) => startSkill === count1Skill))

      if (firstSkill == null) {
        console.log(`開頭可以是任一技能的 [${skillCount[1].skillList.join(', ')}]`)
      } else {
        console.log(`開頭不能是 ${firstSkill} 的 [${skillCount[1].skillList.join(', ')}]`)
      }
      console.log('')

      chanceList.push({
        firstCannot: firstSkill,
        neededOne: skillCount[1].skillList,
      })
    }

    return chanceList
  }, [])

  if (chanceList.length === 0) console.log('很可惜都沒有，也沒有只差一顆的')
}

start()

// https://blog.pulipuli.info/2011/01/print-all-unique-combination-of-array.html
// TODO 改寫成自己的版本，可以直接重寫沒關係
function uniqueCombinationOfArray(_array) {
  var _combination = []

  var _length = _array.length

  for (var _l = 1; _l < _length; _l++) {
    _combination = _parse_combination(_array, _combination, _l)
  }
  _combination.push(_array)

  return _combination

  function _parse_combination(_array, _output, _length, _length_pos, _length_ang) {
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
        _output = _parse_combination(_array, _output, _length, _length_pos + 1, _length_ang)
      }
    }

    return _output
  }
}

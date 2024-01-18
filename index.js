// 四核六技計算機

const purpose = 4

const list = [
  ['共鳴', '魔咒', '藝術'],
  ['魔咒', '衝刺', '共鳴'],
  ['突襲', '綻放', '共鳴'],
  ['共鳴', '魔咒', '藝術'],
  ['共鳴', '衝刺', '綻放'],
  ['共鳴', '藝術', '衝刺'],
  // ['共鳴', '魔咒', '綻放'],
  // ['共鳴', '綻放', '衝刺'],
  // ['共鳴', '魔咒', '藝術'],
  // ['魔咒', '衝刺', '藝術'],
  // ['藝術', '衝刺', '綻放'],
]

function start() {
  const passList = []

  const allCombinations = uniqueCombinationOfArray(list).filter((item) => item.length === purpose)

  const success = allCombinations.some((combination) => {
    // 計算出每一個排列組合所囊誇的技能總數
    const combinationCount = combination.reduce((acc, skills) => {
      skills.forEach((skill) => {
        acc[skill] = acc[skill] || 0
        acc[skill]++
      })
      return acc
    }, {})

    // 判斷是不是每個技能都有兩個, 有的話接著判斷不可以有同個開頭的
    const successCombination = Object.keys(combinationCount).every((skill) => {
      // 檢查兩個
      if (combinationCount[skill] !== 2) return false

      // 檢查開頭是不是一樣的
      for (let i = 0; i < combination.length; i++) {
        const previous = combination[i]
        for (let j = 0; j < combination.length; j++) {
          if (i === j) continue
          const current = combination[j]

          if (previous[0] === current[0]) return false
        }
      }

      return true
    })

    if (successCombination) passList.push(combination)

    return !!successCombination // 這個是最外面 .some 的那個
  })

  if (success) return void console.log('你成功啦', passList)

  // 計算一下還差哪顆
  const missOneList = uniqueCombinationOfArray(list).filter((item) => item.length === purpose - 1)
  missOneList.forEach((conbinationList) => {
    const conbinationCount = conbinationList.reduce((map, skills) => {
      skills.forEach((skill) => {
        map[skill] = map[skill] || 0
        map[skill]++
      })

      return map
    }, {})

    console.log('')
    console.log('conbinationList:', conbinationList)
    console.log('conbinationCount:', conbinationCount)

    const skillCount = Object.keys(conbinationCount).reduce((map, skill) => {
      map[conbinationCount[skill]] = map[conbinationCount[skill]] || {
        count: 0,
        skillList: [],
      }
      map[conbinationCount[skill]].count++
      map[conbinationCount[skill]].skillList.push(skill)

      return map
    }, {})

    console.log('skillCount:', skillCount)

    if (skillCount[1].count === 3) {
      // first not equal
      const firstNotEqual = conbinationList.every((conbination, i) => {
        const previous = conbination[0]

        for (let j = 0; j < conbinationList.length; j++) {
          if (i === j) continue
          const current = conbinationList[j][0]

          if (current === previous) return false
        }
        return true
      })
      if (firstNotEqual) {
        console.log('好機會!')
        console.log(conbinationList)
        // console.log(skillCount[1].skillList)
        const a = conbinationList
          .map((item) => item[0])
          .find((item) => {
            return skillCount[1].skillList.find((skill) => item === skill)
          })
        console.log(`頭不能是 ${a} 的 [${skillCount[1].skillList.join(', ')}]`)
        console.log()

        return
      }
    }
  })
  // console.log('missOneList:', missOneList)
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

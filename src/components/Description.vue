<template>
  <el-divider></el-divider>
  <el-descriptions>
    <el-descriptions-item>
      <h5>
        註1: 職業的核心選擇參考了巴哈<a target="_blank" href="https://home.gamer.com.tw/homeindex.php?owner=as12bird"
          >天然鳶</a
        >的<a target="_blank" href="https://forum.gamer.com.tw/C.php?bsn=7650&snA=994679">貼文</a>，
        <span style="color: red; font-size: 24px">僅供參考</span>，
        在選擇職業後如果想客製化，也可以根據自身喜好手動調整想要的技能組。
      </h5>
      <h5>
        註2: 凱殷的技能組較為特別，參考了巴哈<a href="https://forum.gamer.com.tw/C.php?bsn=7650&snA=1024022">麒麟</a
        >的文章
      </h5>
      <h5>
        註3: 亞克全部的技能都要用到，參考了巴哈<a href="https://forum.gamer.com.tw/C.php?bsn=7650&snA=993338">阿翔 </a
        >的文章與討論
      </h5>
      <h5>
        註4: 「<span style="color: red">指定</span
        >」的意思是排列組合裡一定要有這顆核心。主要用於已經先把可用的核心提升過等級、但仍未湊齊其他核心的場景，這時就會將這顆已經提升過等級的核心指定為指定核心，避免如果排列組合沒有選到此顆核心時那些經驗值就浪費了。
      </h5>
      <h5>註5: 如果有核心未填滿 3 個技能，此核心將<span style="color: red">不會</span>被納入排列組合裡。</h5>
      <h5>
        註6: 排列組合的函式為使用<a
          target="_blank"
          href="https://blog.pulipuli.info/2011/01/print-all-unique-combination-of-array.html"
          >布丁布丁吃布丁</a
        >的程式碼
      </h5>
      <h5>
        註7:
        <a target="_blank" href="https://github.com/yayayahahaha/maple-story-v-matrix-tool">原始碼</a>
        在這裡，如果喜歡的話也請不吝給我顆星星，感謝
      </h5>
    </el-descriptions-item>
  </el-descriptions>
</template>

<script>
export default { name: 'Description' }
</script>

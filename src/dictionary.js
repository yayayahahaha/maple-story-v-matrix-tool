export const FREE_JOB_TEXT = 'free'
export const SUCCESS_STATUS = 'SUCCESS'
export const FAILED_STATUS = 'FAILED'
export const CHANCE_STATUS = 'CHANCE'

export const jobs = [
  {
    groupName: '冒險者',
    jobs: [
      // 劍士
      {
        name: '英雄',
        skills: ['狂暴攻擊(IV)', '終極攻擊(II)', '憤怒爆發(H)', '劍士意念(H)', '烈焰翔斬(IV)'],
      },
      {
        name: '聖騎士',
        skills: [
          '聖靈之劍(神聖衝擊)(III)',
          '神聖審判/神聖烙印(IV)',
          '騎士衝擊波(IV)',
          '鬼神之擊(IV)',
          '神之滅擊(H)',
          '終極攻擊(II)',
        ],
      },
      {
        name: '黑騎士',
        skills: ['岡格尼爾之擊(IV)', '暗炎斬連殺(IV)', '追隨者(II)', '黑暗統合(IV)', '究極突刺(III)', '終極攻擊(II)'],
      },

      // 法師
      {
        name: '冰雷魔導士',
        skills: ['閃電連擊(IV)', '雷霆萬鈞(H)', '冰鋒刃(IV)', '閃電球(III)', '暴風雪(IV)', '召喚冰魔(IV)'],
      },
      {
        name: '火毒魔導士',
        skills: ['瞬間移動精通(III)', '地獄爆發(IV)', '火焰之襲(IV)', '燎原之火(II)', '流星(IV)', '炙焰毒火(IV)'],
      },
      {
        name: '主教',
        skills: ['核爆術(IV)', '天使之箭(IV)', '天怒(IV)', '群體治癒(II)', '龍精通(IV)', '天堂之門(H)'],
      },

      // 弓箭手
      {
        name: '箭神',
        skills: ['暴風神射(IV)', '魔幻箭筒(II)', '驟雨狂矢(IV)', '箭座(III)', '終極之弓(II)', '波紋衝擊(H)'],
      },
      {
        name: '神射手',
        skills: [
          '光速神弩/覺醒之箭(IV)',
          '必殺狙擊/覺醒必殺狙擊(IV)',
          '狙殺之擊/幻象箭影(H)',
          '迅捷射擊/銀隼(III)',
          '終極之弩(II)',
          '躍退射擊(IV)',
        ],
      },
      {
        name: '開拓者',
        skills: ['基本釋放(I)', '基本爆破(II)', '古代神矢(H)', '連段襲擊(IV)', '稜之共鳴(IV)', '三重衝擊(III)'],
      },

      // 盜賊
      {
        name: '夜使者',
        skills: ['四飛閃(IV)', '挑釁契約(IV)', '夜使者刻印(IV)', '穢土轉生(IV)', '四星鏢雨(H)', '絕殺領域(III)'],
      },
      {
        name: '暗影神偷',
        skills: ['致命暗殺(IV)', '冷血連擊(IV)', '楓幣炸彈(III)', '絕殺領域(III)', '暗影霧殺(H)', '穢土轉生(IV)'],
      },
      {
        name: '影武者',
        skills: ['修羅', '隱藏刀', '幻影劍', '穢土轉生', '短劍升天', '短劍護佑'],
      },

      // 海盜
      {
        name: '拳霸',
        skills: ['閃連殺(IV)', '戰艦鯨魚號(IV)', '海龍之怒/海龍怒擊(IV)', '勾拳爆破(IV)', '海龍爆裂/海龍突擊(IV)'],
      },
      {
        name: '槍神',
        skills: ['瞬．迅雷(IV)', '槍神奧義(IV)', '爆頭射擊(IV)', '海盜炮擊艇(IV)', '霸王射(IV)', '戰艦鯨魚號(IV)'],
      },
      { name: '重砲指揮官', skills: ['加農砲火箭(IV)', '加農砲連擊(IV)', '雙胞胎猴子(IV)', '滾動彩虹加農砲(H)'] },
    ],
  },
  {
    groupName: '皇家騎士團',
    jobs: [
      // 皇家騎士團
      {
        name: '聖魂劍士',
        skills: ['烈日狂斬(I)', '宇宙轟炸(III)', '宇宙爆裂(IV)', '皇家衝擊(III)', '雙重狂斬(IV)', '熾烈突擊(H)'],
      },
      {
        name: '烈焰巫師',
        skills: ['元素之炎(I)', '極致熾烈(IV)', '鳳凰爆裂(H)', '地獄崛起(IV)', '魔法爆發(II)', '大災變(H)'],
      },
      { name: '破風使者', skills: ['天空之歌(IV)', '風妖精之箭(IV)', '風暴使者(H)', '妖精護盾(IV)', '季風(H)'] },
      { name: '暗夜行者', skills: ['連投擲(IV)', '暗影蝙蝠(I)', '闇黑天魔(IV)'] },
      { name: '閃雷悍將', skills: ['消滅(IV)', '霹靂(IV)', '疾風(III)', '雷聲(III)', '昇天(III)', '海浪(II)'] },
      {
        name: '米哈逸',
        skills: ['皇家之盾(I)', '閃光交叉(IV)', '設置盾牌(IV)', '致命衝擊(H)', '進階終極攻擊(IV)', '光明追擊(II)'],
      },
    ],
  },
  {
    groupName: '英雄',
    jobs: [
      { name: '狂狼勇士', skills: ['最終之矛(IV)', '比耀德(IV)', '終極攻擊', '目標鎖定', '粉碎震撼'] },
      { name: '龍魔導士', skills: ['風之環', '地之環', '魔力之環', '龍之主', '閃電之環', '龍之火花'] },
      {
        name: '精靈遊俠',
        skills: ['伊修塔爾(IV)', '光速雙擊(IV)', '元素小精靈(III)', '傳說之槍(IV)', '憤怒天使(H)', '獨角獸射擊(III)'],
      },
      {
        name: '幻影俠盜',
        skills: ['連犽突進(IV)', '卡牌風暴(IV)', '炫目卡牌(II)', '盜亦有道IV(IV)', '玫瑰四重曲(H)', '最終的夕陽(IV)'],
      },
      { name: '夜光', skills: ['絕對擊殺', '暗黑烈焰', '急速反射(IV)'] },
      {
        name: '隱月',
        skills: ['爆流拳(IV)', '鬼斬(IV)', '小狐仙(II)', '精靈的化身(H)', '靈魂帳幕(III)', '死魂烙印(IV)'],
      },
    ],
  },
  {
    groupName: '末日反抗軍',
    jobs: [
      {
        name: '煉獄巫師',
        skills: ['終極攻擊(IV)', '黑色閃電(III)', '死神(I)', '鬥王杖擊(IV)', '黑暗世紀(IV)', '戰鬥衝刺'],
      },
      {
        name: '狂豹獵人',
        skills: [
          '狂野帕爾坎(IV)',
          '終極攻擊(II)',
          '召喚美洲豹(I)',
          '閃光雨/狂豹之怒(H)',
          '音爆(III)+美洲豹靈魂(IV)',
          '連弩陷阱(III)',
        ],
      },
      {
        name: '機甲戰神',
        skills: [
          '巨型火炮(IV)',
          '追蹤飛彈(II)',
          '扭曲領域(H)',
          '機甲大砲：RM7(II)',
          '機器人工廠：RM1(IV)',
          '磁場(III)',
        ],
      },
      {
        name: '惡魔殺手',
        skills: ['惡魔衝擊', '惡魔狂斬', '地獄犬', '變形', '魔力吶喊', '末日烈焰'],
      },
      {
        name: '惡魔復仇者',
        skills: [
          '超越：逆十字文字斬(IV)',
          '盾牌追擊(IV)',
          '強化超越(IV)',
          '瞬千刃(H)',
          '超越：月光斬(III)',
          '惡魔風暴',
        ],
      },
      {
        name: '傑諾',
        skills: ['偽裝掃蕩(IV)', '疾風劍舞(IV)', '能量領域(IV)', '追縱火箭(IV)', '三角列陣(III)', '毀滅轟炸(H)'],
      },
      {
        name: '爆拳槍神',
        skills: ['連發重擊(IV)', '旋轉加農砲(I)', '釋能衝擊椎(IV)', '雙重棒(IV)', '錘之碎擊(IV)', '衝擊波動(IV)'],
      },
    ],
  },
  {
    groupName: '超新星',
    jobs: [
      {
        name: '凱撒',
        skills: ['藍焰恐懼(IV)', '意志之劍(IV)', '龍劍風(III)', '龍劍雨(爆發)(IV)', '龍烈焰(IV)', '地龍襲擊'],
      },
      {
        name: '天使破壞者',
        skills: ['三位一體(IV)', '靈魂探求者(IV)', '超級超新星(H)', '原始咆哮(IV)', '魔力彩帶(IV)', '靈魂震動(IV)'],
      },
      {
        name: '卡蒂娜',
        skills: [
          '鏈之藝術-鞭擊(I,II,III,IV)',
          '召喚:狼牙棒(IV)',
          '召喚:重擊磚頭(IV)',
          '召喚:紫焱幻刀(III)',
          '召喚:霰彈射擊(III)',
          '鏈之藝術-強化撞擊(H)',
        ],
      },
      {
        name: '凱殷',
        skills: [
          '[死亡祝福]/暗地狙擊',
          '龍炸裂/殘留憤恨',
          '衝擊箭/分裂箭矢',
          '散射箭',
          '崩壞爆破',
          '破塵箭',
          '幻影之刃/衝擊利刃',
          '鎖鏈鐮刀/毒針',
        ],
      },
    ],
  },
  {
    groupName: '曉之陣',
    jobs: [
      { name: '劍豪', skills: ['三連斬-雷(IV)', '拔刀術-雷(IV)', '曉月大太刀(H)'] },
      { name: '陰陽師', skills: ['紫扇仰波', '雙天狗', '夜雀', '迎式神', '陰陽除靈符', '紫扇白狐'] },
    ],
  },
  {
    groupName: '雷普族',
    jobs: [
      {
        name: '伊利恩',
        skills: [
          '強化技藝：暗器Ⅱ/榮耀之翼：強化暗器',
          '強化德烏斯/里幽',
          '強化即刻反應：強化破滅Ⅱ',
          '強化瑪奇納/即刻反應：文明爭戰Ⅱ',
          '朗基努斯',
          '詛咒之印',
        ],
      },

      { name: '亞克', skills: [] },

      { name: '阿戴爾', skills: ['切割(IV)', '追蹤(III)', '劍域(III)', '碎片(I)', '創造(II)', '綻放(IV)'] },

      {
        name: '卡莉',
        skills: [
          '藝術：亂舞/新月斬(IV)',
          '虛空衝刺(I)',
          '魔咒：環刃/分裂/之怒(IV)',
          '共鳴/影刃(III)',
          '虛空突襲(IV)',
          '死亡綻放(H)',
        ],
      },
    ],
  },
  {
    groupName: '阿尼瑪族',
    jobs: [
      {
        name: '虎影',
        skills: [
          '幻影分身符(II)',
          '卷術：蝴蝶之夢(IV)',
          '如意扇：人(I)',
          '土波流：地(II)',
          '芭蕉風：天(III)',
          '魔封葫蘆符(I)',
        ],
      },

      {
        name: '菈菈',
        skills: ['精氣散播(I)', '龍脈釋放(II)', '龍脈吸收(IV)', '喚醒(III)', '小山靈(I)', '山之種子(II)'],
      },
    ],
  },
  {
    groupName: '其它',
    jobs: [
      { name: '神之子', skills: [] },

      {
        name: '幻獸師',
        skills: [
          '波波揮擊強化(1.2.3強化)',
          '小波波強化(熊娃娃召喚強化)',
          '鮮魚龍捲風強化(憤怒爆發強化)',
          '紳士之舞強化(雪豹之舞強化)',
          '萊伊的尾巴強化(雪豹一體強化)',
          '電光石火強化(雪豹亂動強化)',
        ],
      },

      {
        name: '凱內西斯',
        skills: ['擷取心靈(IV)', '心靈傳動(III)', 'B.P.M.(IV)', '火車扔擲(III)', '梅泰利爾(I)', '心靈領域(III)'],
      },

      {
        name: '墨玄',
        skills: [
          '玄山：招式進行強化',
          '強化神功：移形換位',
          '強化神功：旋風腳',
          '強化神功：大地崩塌',
          '強化神功：亂打連拳',
          '強化絕技：超熱波神力',
          '強化神功：粉碎拳',
          '強化神功：鐵衫功',
          '強化神功：無影腳',
        ],
      },
    ],
  },
]
export const jobsMap = Object.fromEntries(jobs.map((group) => group.jobs.map((job) => [job.name, job])).flat())

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
    groupName: '末日反抗軍',
    jobs: [
      {
        name: '爆拳槍神',
        skills: [],
      },
      {
        name: '煉獄巫師',
        skills: [],
      },
    ],
  },
]
export const jobsMap = Object.fromEntries(jobs.map((group) => group.jobs.map((job) => [job.name, job])).flat())

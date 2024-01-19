export const FREE_JOB_TEXT = 'free'
export const SUCCESS_STATUS = 'SUCCESS'
export const FAILED_STATUS = 'FAILED'
export const CHANCE_STATUS = 'CHANCE'

export const jobs = [
  {
    groupName: '冒險者',
    jobs: [
      {
        name: '夜使者',
        skills: [],
      },
      {
        name: '影武者',
        skills: ['修羅', '隱藏刀', '幻影劍', '穢土轉生', '短劍升天', '短劍護佑'],
      },
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

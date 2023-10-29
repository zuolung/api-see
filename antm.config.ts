import {defineConfig } from '@antmjs/types'
import { join } from 'path'

export default defineConfig({
  docs: {
    title: 'Api-see',
    src: join(process.cwd(), './docs'),
    menu: [
      {
        name: '指南',
        items: [
          {
            title: '介绍',
            path: 'docs/introduce',
          }
        ]
      },
      {
        name: '功能',
        items: [
          {
            title: '在线文档',
            path: 'docs/code-to-doc',
          },
          {
            title: 'mock服务',
            path: 'docs/mock',
          },
          {
            title: 'swagger功能',
            path: 'docs/swagger',
          },
          {
            title: '请求方法',
            path: 'docs/create-action',
          },
        ]
      },
    ]
  }
})
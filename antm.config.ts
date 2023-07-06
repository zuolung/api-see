import { defineConfig } from '@antmjs/types'
import path from 'path'

const CWD = process.cwd()

// @ts-ignore
export default defineConfig({
	docs: {
		title: 'Api See 接口工具',
		logo: 'https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg',
		src: ['./docs', './'],
		route: {
			level: 2,
			exclude: ['./vscode-plugin/**'],
		},
		globalStyles: [path.join(CWD, './doc.less')],
		menu: [
			{
				name: '指南',
				items: [
					{
						title: '介绍',
						path: '.js'
					}
				]
			},
			{
				name: '命令行',
				items: [
					{
						title: '在线文档',
						path: 'docs/api'
					},
					{
						title: 'mock服务',
						path: 'docs/mock'
					},
				]
			},
			{
				name: '插件',
				items: [
					{
						title: 'vscde插件',
						path: 'vscode-plugin/vscode-plugin'
					},
				]
			}
		]
	}
})
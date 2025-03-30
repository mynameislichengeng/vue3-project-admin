import Mock from 'mockjs'
import HomeApi from './mockData/home.js'

Mock.mock('/api/home/getTableData', 'get', HomeApi.getTableData)
Mock.mock('/api/home/getCountData', 'get', HomeApi.getCountData)
Mock.mock('/api/home/getChartData', 'get', HomeApi.getChartData)


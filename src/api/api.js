import request from './request'

export default{
    getTableData(){
        return request(
            {
                url: '/api/home/getTableData',
                method: "get"
            }
        )
    },
    getCountData(){
        return request(
            {
                url: '/api/home/getCountData',
                method: "get"
            }
        )
    },
    getChartData(){
        return request(
            {
                url: '/api/home/getChartData',
                method: "get"
            }
        )
    }
}
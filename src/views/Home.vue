<template>
    <el-row :gutter="10">
        <el-col :span="8">
            <el-card class="card" shadow="hover">
                <div class="user">
                    <img class="user-img" :src="getImgUrl('user_header')" />
                    <div class="user-info">
                        <p>admin</p>
                        <p>超级管理员</p>
                    </div>
                </div>

                <div class="login-info">
                    <p>上次登录时间: <span>2024-06-30</span></p>
                    <p>上次登录地点:<span>北京</span></p>
                </div>


            </el-card>

            <el-card class="card lesson-table" shadow="hover">
                <el-table :data="tableData">
                    <el-table-column v-for="(val, key) in tableDataLabel" :key="key" :prop="key" :label="val">
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>

        <el-col :span="16">

            <div class="count-data">
                <div class="count-data-item" v-for="(item, index) in countData" :key="index">
                    <el-card shadow="hover">
                        <div class="card-info">
                            <div class="card-icon" :style="{ backgroundColor: item.color }">
                                <el-icon size="50">
                                    <component :is="getIconComponent(item.icon)"></component>
                                </el-icon>
                            </div>
                            <div class="card-detail">
                                <p class="card-detail-name">
                                    {{ item.name }}
                                </p>
                                <p class="card-detail-value">
                                    {{ item.value }}
                                </p>
                            </div>
                        </div>
                    </el-card>

                </div>
            </div>

            <div class="chart-data">
                <el-card shadow="hover">
                    <div id="chart" style="height: 280px;" ref="chartRef">

                    </div>
                </el-card>
            </div>
            <div class="bar-chart-data">
                <el-card shadow="hover">
                    <div id="bar-chart" style="height: 280px;" ref="barChartRef">

                    </div>
                </el-card>
            </div>
        </el-col>
    </el-row>

</template>

<script setup>

import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { createChart } from '../chart/chartHelper.js'

import {
    SuccessFilled,
    StarFilled,
    GoodsFilled
} from '@element-plus/icons-vue'



// 建立图标名称到组件的映射
const iconMap = {
    SuccessFilled,
    StarFilled,
    GoodsFilled
};

const getIconComponent = (iconName) => {
    return iconMap[iconName] || iconMap.SuccessFilled; // 兜底
};

const { proxy } = getCurrentInstance()

const getImgUrl = (user) => {
    return new URL(`../assets/image/${user}.png`, import.meta.url).href
}

const tableData = ref([])
const countData = ref([
    { icon: "SuccessFilled" } // 默认图标
])

//映射dom节点
const chartRef = ref(null)
const barChartRef = ref(null)

//监听页面


const getTableData = async () => {
    const resp = await proxy.$api.getTableData()
    tableData.value = resp.tableData
}

const getCountData = async () => {
    const resp = await proxy.$api.getCountData()
    countData.value = resp.itemList
}

const getChartData = async () => {
    const resp = await proxy.$api.getChartData()
    const { orderData } = resp

    // Extract brands from the first data item (assuming all items have same brands)
    const brands = orderData.data.length > 0 ? Object.keys(orderData.data[0]) : []

    const series = brands.map(brand => ({
        name: brand,
        type: 'line',
        data: orderData.data.map(item => item[brand])
    }))

    const option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: brands
        },
        xAxis: {
            type: 'category',
            data: orderData.date
        },
        yAxis: {
            type: 'value'
        },
        series: series
    }

    createChart(chartRef.value, option)
}

const getBarChartData = async () => {
    const resp = await proxy.$api.getChartData()
    const { userData } = resp

    const dateList = userData.map(item => item.date)
    const barNewList = userData.map(item => item.new)
    const barActiveList = userData.map(item => item.active)

    const option = {

        xAxis: {
            data: dateList
        },
        yAxis: {},
        series: [
            {
                name: '新增用户',
                type: 'bar',
                data: barNewList
            },
            {
                name: '激活用户',
                type: 'bar',
                data: barActiveList
            }
        ]
    }

    createChart(barChartRef.value, option)
}


onMounted(() => {
    getTableData()
    getCountData()
    getChartData()
    getBarChartData()
})

const tableDataLabel = ref({
    name: '课程',
    todayBuy: '今日学习人数',
    monthly: '本月学习人数',
    totalBuy: '累计学习人数'
})


</script>
<style scoped lang="less">
.card {
    margin-left: 10px;
}

.user {
    height: 100px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    .user-img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .user-info {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
        justify-content: center;

        /* 垂直居中 */
        p {
            font-size: 14px;
            color: #999;
        }
    }
}

.login-info {
    margin-top: 10px;

    p {
        font-size: 14px;
        color: #999;
        margin-bottom: 10px;

        span {
            color: #666;
            margin-left: 60px;
        }
    }
}

.lesson-table {
    margin-top: 10px;
}

.count-data {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.count-data-item {
    flex: 0 0 calc(33.3% - 10px);
    margin-bottom: 10px;
    min-width: 0px;

    .el-card {
        width: 100%;
        box-sizing: border-box;
    }

    .card-info {
        display: flex;
        align-items: center;
        justify-content: center;

        .card-icon {
            width: 80px;
            height: 80px;
            display: grid;
            place-items: center;
            color: #fff;
        }

        .card-detail {
            margin-left: 20px;
            display: flex;
            flex-direction: column;
            justify-content: center;

            .card-detail-name {
                font-size: 20px;
                margin-bottom: 10px;
            }

            .card-detail-value {
                font-size: 14px;
                color: #999;
                text-align: center;
            }
        }
    }


}
</style>
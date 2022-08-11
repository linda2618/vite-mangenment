<template>
    <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="id" label="编号" />
        <el-table-column prop="username" label="账号" />
        <el-table-column prop="nickName" label="姓名" />
        <el-table-column prop="email" label="邮箱" />
        <el-table-column label="添加时间">
            <template v-slot:default="scope">
                {{ formateDate(scope.row.createTime) }}
            </template>
        </el-table-column>
        <el-table-column prop="date" label="最后登录">
            <template v-slot:default="scope">
                {{ formateDate(scope.row.loginTime) }}
            </template>
        </el-table-column>
        <el-table-column prop="date" label="是否启用">
            <template v-slot:default="scope">
                <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="date" label="操作">
            <template #default="{ row }">
                <el-button type="text">分配角色</el-button>
                <el-button type="text" @click="editAdmin(row)">编辑</el-button>
            </template>
        </el-table-column>
    </el-table>
    <EditAdmin :visible="visible" @close="closeDialog" :form="rowData" />
</template>

<script lang="ts" setup>
import { ref, reactive, toRefs } from 'vue'
import { getAdminList } from '../../request/api'
import EditAdmin from '../../components/EditAdmin.vue'
const state = reactive<{
    tableData: {}[],
    a: number,
    visible: boolean,
    rowData: {},
}>({
    tableData: [],
    a: 1,
    visible: false,
    rowData: {},
})
const { tableData, a, visible, rowData } = toRefs(state)

getAdminList({
    keyword: '',
    pageNum: 10,
    pageSize: 10,
}).then(res => {
    if (res.code === 200) {
        tableData.value = res.data.list
    }
})

//格式化时间
const formateDate = (time: string | undefined) => {
    if (!time) return ''
    const date = new Date(time)
    const y = date.getFullYear()
    const m = addZero(date.getMonth() + 1)
    const d = addZero(date.getDate())
    const h = addZero(date.getHours())
    const min = addZero(date.getMinutes())
    const s = addZero(date.getSeconds())
    return `${y}-${m}-${d} ${h}:${min}:${s}`
}
const addZero = (num: number) => {
    return num > 9 ? num : '0' + num
}
//点击按钮编辑
const editAdmin = (row: {}) => {
    visible.value = true
}
//隐藏弹框
const closeDialog = () => {
    visible.value = false

}
</script>

<style lang="ts" scoped>
</style>
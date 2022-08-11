<template>
    <div class="login">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" class="demo-ruleForm">
            <el-form-item prop="username">
                <el-input v-model="ruleForm.username" type="text" />
            </el-form-item>
            <el-form-item prop="password">
                <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="login()">登录</el-button>
                <el-button @click="resetForm()">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref, toRefs } from 'vue'
import { adminLoginApi, getAdminInfoApi } from '../../request/api'
// import Cookie from 'js-cookie'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

//获取项目的路由对象
let router = useRouter()
//获取项目vuex对象
let store = useStore()

let { ruleForm } = toRefs(reactive({
    ruleForm: {
        username: 'admin',
        password: '123456'
    },
}))
//获取el-from 组件对象(用ref定义 一个同名的变量) //与vue2不同
let ruleFormRef = ref()

const validatePass = (rule: any, value: string | undefined, cb: (msg?: string) => void) => {
    if (!value) {
        cb("密码不能为空！")
    } else {
        cb()
    }
}
//验证规则
const rules = reactive({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
    ],
    Password: [
        { validator: validatePass, trigger: 'blur' }
    ]

})
//点击登录按钮触发事件
const login = () => {
    ruleFormRef.value.validate().then(() => {
        console.log("验证通过");
        adminLoginApi({
            password: ruleForm.value.password,
            username: ruleForm.value.username
        }).then(res => {
            if (res.code === 200) {
                //先存储token
                //方法一：
                // Cookie.set('token', res.data.tokenHead + res.data.token, { expires: 7 })
                //方法二：
                window.sessionStorage.setItem("token", res.data.tokenHead + res.data.token)

                //获取用户信息
                store.dispatch('getAdminInfo').then(res => {
                    router.push('/homepage')
                })
                // getAdminInfoApi().then(res => {
                //     if (res.code === 200) {
                //         //res.data.menus
                //         //存储到vuex里
                //         store.commit('updateMenus', res.data.menus)

                //         //跳转homepage页面
                //         router.push('/homepage')
                //     }
                // })
            }
        })
    }).catch(() => {
        console.log("验证不通过");

    })
}
//重置表单
const resetForm = () => {
    ruleFormRef.value.resetFields();
}


</script>

<style lang="less" scoped>
.login {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>
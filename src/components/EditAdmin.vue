<template>
    <el-dialog v-model="visible" title="Shipping address" :before-close="close">
        <el-form :model="form" :label-width="formLabelWidth">
            <el-form-item label="Promotion name">
                <el-input v-model="form.name" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Zones">
                <el-select v-model="form.name" placeholder="Please select a zone">
                    <el-option label="Zone No.1" value="shanghai" />
                    <el-option label="Zone No.2" value="beijing" />
                </el-select>
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="visible = false">确定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, toRefs } from 'vue';

const props = defineProps<{
    visible: boolean;
    form: {
        username: string,
    };
}>()

const state = reactive({
    visible: false,
    // form: {
    //     name: '',
    // },
    formLabelWidth: '120px'
})

const { visible, formLabelWidth, } = toRefs(state)

const emit = defineEmits<{
    (event: 'close'): void
}>()
//点击关闭
const close = () => {
    //传到父组件
    emit('close')

}
</script>

<style lang="less" scoped>
</style>
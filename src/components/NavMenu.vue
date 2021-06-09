<template>
		<el-row class="tac">
			<el-col :span="24">
				<el-menu :uniqueOpened="true"
					default-active="1"
					class="el-menu-vertical-demo"
					@open="handleOpen"
					@close="handleClose"
					background-color="#545c64"
					text-color="#fff"
					active-text-color="#ffd04b">
					<el-menu-item index="1">
						<i class="el-icon-takeaway-box"></i>
						<template #title>
							商品管理
						</template>
					</el-menu-item>
					<el-menu-item index="2">
						<i class="el-icon-menu"></i>
						<template #title>
							库存管理
						</template>
					</el-menu-item>
					<el-menu-item index="3">
						<i class="el-icon-document"></i>
						<template #title>
							财务结算
						</template>
					</el-menu-item>
				</el-menu>
			</el-col>
		</el-row>
</template>

<script>
import { getCurrentInstance } from 'vue';
export default {
	props:{
		
	},
	setup() {
		const { proxy } = getCurrentInstance(); // 使用proxy代替ctx，因为ctx只在开发环境有效
		console.log(proxy.$axios); // 路由信息
		// console.log(proxy.$systemName) // 全局挂载对象
		return {
			proxy
		};
	},
	methods: {
		handleOpen(key, keyPath) {
			console.log(key, keyPath);
		},
		handleClose(key, keyPath) {
			console.log(key, keyPath);
		}
	}
};
</script>

<style lang="stylus" scoped>
	.tac
		width 100%
		padding 0
		margin 0
		margin-top 100px
		.el-menu
			border-right 0
</style>

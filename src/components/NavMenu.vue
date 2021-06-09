<template>
		<el-row class="tac">
			<el-col :span="24">
				<el-menu :uniqueOpened="true"
					default-active="1"
					@select="select"
					class="el-menu-vertical-demo"
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
let proxy;
export default {
	props:{
		
	},
	setup() {
		proxy = getCurrentInstance(); // 使用proxy代替ctx，因为ctx只在开发环境有效
		console.log("proxy")
		console.log(proxy); // 路由信息
		// console.log(proxy.$systemName) // 全局挂载对象
		return {
			proxy
		};
	},
	methods: {
		select(key, keyPath) {
			console.log(key, keyPath);
			let str = "";
			if(key==1){
				str = "GoodsList"
			}else if(key==2){
				str = "StoreList"
			}else{
				str = "Report"
			}
			console.log(str)
			proxy.emit("changeCom",str)
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
